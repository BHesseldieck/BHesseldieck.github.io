
var moviesObj = {};
var genres = {};
//get the list of movie genres and ids
$.ajax({
	method: 'GET',
	url: "http://api.themoviedb.org/3/genre/movie/list?api_key=79f81e8b70e985264de2f222934b1bd1",
	success: function(data){
		moviesObj=data;
		getMovies();
	},
	error: function(error){
		console.log(error);
	}
})

// use the list of movie genres and ids to fetch content
var getMovies = function(){
	var genresProcessed = 0;
	moviesObj.genres.forEach(function(item, i, arr){
		var currentGenreID = item.id;
		var currentGenreName = item.name;
		$.ajax({
			method: 'GET',
			url: "http://api.themoviedb.org/3/genre/"+currentGenreID+"/movies?api_key=79f81e8b70e985264de2f222934b1bd1&page=3",
			success: function(data){
				moviesObj[currentGenreName] = data;
				if (genresProcessed == 17) placeMovies();
				genresProcessed++;
			},
			error: function(error){
				console.log(error);
			}
		})
	})
}

var reverser = 1
var counter = 21;
// use the movie info object to create content on the page
var placeMovies = function(){
	//loop for genres
	var i = 0;
	for (var key in moviesObj){
		var posterRotation = 0;
		//loop for movies in a genre
		if (key!=='genres'){
			reverser*=-1
			keyString = key.replace(/\s+/g, '')
			createButton(keyString)
			$('#posters').append("<a-entity id='" + keyString + "_div'><a-animation attribute=rotation from='0 1.5 0'to='0 " +reverser*358.5 + " 0'begin=400 dur=180000 repeat=infinite easing=linear></a-animation></a-entity>")
			moviesObj[key].results.forEach(function(movie, index){
				var posterPath = movie.poster_path === null ? 'http://crossorigin.me/http://www.movli.com/images/movie-default.jpg' : 'http://crossorigin.me/http://image.tmdb.org/t/p/w300' + movie.poster_path
				$("#"+keyString+"_div").append("<a-curvedimage id=" + movie.id + " class='poster' src='" + posterPath + "' radius='10' theta-length='18' height='6' rotation='0 " + posterRotation + " 0'</a-curvedimage>")
				posterRotation += 18;
			})
			animateIn(keyString)
			counter--;
		}
	}


}

// Create buttons dynamically
var buttonRotation = 0;
var heightmod = 0;
var secondRowGlow = 0;
function createButton(genre){
	if (buttonRotation >= 360) {
		heightmod -= .6;
		buttonRotation = 0;
		secondRowGlow += -.15;
	}


	$('#buttons').append('<a-entity id='+ genre +' rotation="0 '+ buttonRotation +' 0"><a-curvedimage id='+genre+' src="http://crossorigin.me/http://fakeimg.pl/439x230/282828/eae0d0/?text='+ genre +'"radius=5.7 theta-length=35 height=.85 position="0 '+(-0.535+heightmod)+' 0"scale=".4 .4 .4"opacity=.8><a-mouseenter target=#'+genre+'_glow opacity=1></a-mouseenter><a-mouseleave target=#'+genre+'_glow opacity=.2></a-mouseleave></a-curvedimage><a-curvedimage id='+genre+'_glow src="glow.jpg" rotation="0 1.5 0"radius=5.7 theta-length=38 height=1.1 position="0 '+(-0.67+heightmod+secondRowGlow)+'-0.67 0"scale=".5 .5 .5"opacity=.2></a-curvedimage></a-entity>')
	buttonRotation += 40;
}

// animate the genre divs in in the beginning
var divcount = 9
var ease = 3500
function animateIn(genre){
	$('#' + genre + '_div').append('<a-animation easing="ease-in" attribute="position" from="0 ' + (divcount*7) + ' 0" to="0 ' + ((divcount*7)-20) + ' 0" dur="'+ease+'" fill="forwards" ></a-animation>');
	divcount--;
	ease -= 100;
}


// Add hover events for the genre buttons
function navigateMovies(key){
	// console.log('navigation to: ' + key);
	$('#posters').append('<a-animation easing="ease-in" attribute="position" to="0 ' + (key * 7) + ' 0" dur="1500" fill="forwards" ></a-animation>').delay(800);
}

// Elevator for the category navigation
function elevate(genre, height){
	// console.log(genre, height);
	$('#buttons').delegate(genre,'click', function(){
		navigateMovies(height);
	});
}

var buttonGenres = ['#Action','#Adventure','#Animation','#Comedy','#Crime','#Documentary','#Drama','#Family','#Fantasy','#Foreign','#History','#Horror','#Music','#Mystery','#Romance','#ScienceFiction','#TVMovie','#Thriller','#War','#Western'];
var count = -6;
for(var i = 0; i < buttonGenres.length; i++){
	elevate(buttonGenres[i], count);
	count++;
};


var trailer = ''
//poster click brings up movie details and trailer
$('#posters').delegate('a-curvedimage', 'click', function(){
	clickedId = $(this).attr('id')
	var found = false;
	$.ajax({
		method: 'GET',
		url: 'http://api.themoviedb.org/3/movie/' + clickedId + '/videos?api_key=79f81e8b70e985264de2f222934b1bd1',
		success: function(data){
			trailer = '<iframe  width="500" height="275" src="https://www.youtube.com/embed/'+data.results[0].key+'" frameborder="0" allowfullscreen></iframe>'
			for (var key in moviesObj){
				if (key!=='genres'){
					moviesObj[key].results.forEach(function(movie, index){
						for(var prop in movie){
							if (movie[prop] === parseInt(clickedId) && !found) {
								found = true;

								$('body').append('<div id="overlay"><div id="background"><h1 id="exit">X</h1><div id="content"><div id="headline"><h1 id="title">'+ movie.title+ '</h1></div><h3 id="synopsis">' + movie.overview +'</h3><div id="trailer">'+trailer+'</div></div></div></div>');
								$("#overlay").hide();
								$('#background').css({
									'background' : 'url(http://crossorigin.me/http://image.tmdb.org/t/p/w1280' + movie.backdrop_path+') no-repeat',
									'background-size': 'cover',
									'filter': 'alpha(Opacity=90)',
									'opacity' : '.9'
								});
								$('#content').css({
									'background-color': 'rgba(0,0,0,.5)',
								});
								$("#overlay").fadeIn("slow");
							}
						}
					});
				}
			}
			$('iframe').css('opacity', '100%')
			$('div').css('cursor', 'auto');
		},
		error: function(error){
			console.log(error);
		}
	})
});
$('body').delegate('#exit', 'click', function(){
	$('#overlay').remove();
})
