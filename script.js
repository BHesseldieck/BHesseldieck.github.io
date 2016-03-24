
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

// for list of popular movies - http://api.themoviedb.org/3/discover/movie?key=79f81e8b70e985264de2f222934b1bd1&page=1&sort_by=popularity.desc

// use the list of movie genres and ids to fetch content
var getMovies = function(){
	var genresProcessed = 0;
	moviesObj.genres.forEach(function(item, i, arr){
		var currentGenreID = item.id;
		var currentGenreName = item.name;
		$.ajax({
			method: 'GET',
			url: "http://api.themoviedb.org/3/genre/"+currentGenreID+"/movies?api_key=79f81e8b70e985264de2f222934b1bd1&page=2",
			success: function(data){		
				moviesObj[currentGenreName] = data;
				console.log(genresProcessed);
				if (genresProcessed == 19) placeMovies();
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
	console.log('placemovies')
	//loop for genres
	for (key in moviesObj){
		var posterRotation = 0;
		//loop for movies in a genre
		if (key!=='genres'){
			reverser*=-1
			keyString = key.replace(/\s+/g, '')
			createButton(keyString)
			$('#posters').append("<a-entity id='" + keyString + "_div'><a-animation attribute=rotation from='0 1.5 0'to='0 " +reverser*358.5 + " 0'begin=400 dur=180000 repeat=infinite easing=linear></a-animation></a-entity>")
			moviesObj[key].results.forEach(function(movie, index){
				$("#"+keyString+"_div").append("<a-curvedimage class='poster' src='http://crossorigin.me/http://image.tmdb.org/t/p/w300" + movie.poster_path + "' radius='10' theta-length='18' height='6' rotation='0 " + posterRotation + " 0'</a-curvedimage>")
				posterRotation += 18;
			})
			animateIn(keyString)
			counter--;
		}
	}
}

// Create buttons dynamically
var buttonRotation=0;
var heightmod=0;
function createButton(genre){
	if (buttonRotation >= 360) {
		heightmod -= .6;
		buttonRotation = 0;
	}
	$('#buttons').append('<a-entity id='+ genre +' rotation="0 '+ buttonRotation +' 0"><a-curvedimage id='+genre+' src="http://crossorigin.me/http://dummyimage.com/600x200/ffffff/000000%26text='+ genre +'"radius=5.7 theta-length=35 height=.85 position="0 '+(-0.535+heightmod)+' 0"scale=".4 .4 .4"opacity=.8><a-mouseenter target=#'+genre+'_glow opacity=1></a-mouseenter><a-mouseleave target=#'+genre+'_glow opacity=.2></a-mouseleave></a-curvedimage><a-curvedimage id='+genre+'_glow src=http://crossorigin.me/http://stampswebdesign.com/withersc/hud/glow.jpg rotation="0 1.5 0"radius=5.7 theta-length=38 height=1.1 position="0 '+(-0.67+heightmod)+'-0.67 0"scale=".5 .5 .5"opacity=.2></a-curvedimage></a-entity>')
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
	$('#posters').append('<a-animation easing="ease-in" attribute="position" to="0 ' + (key * 7) + ' 0" dur="1500" fill="forwards" ></a-animation>').delay(800);
}

$('#buttons').delegate('#Action','click', function(){
	navigateMovies(-6)
});
$('#buttons').delegate('#Adventure','click', function(){
	navigateMovies(-5)
});
$('#buttons').delegate('#Animation','click', function(){
	navigateMovies(-4)
});
$('#buttons').delegate('#Comedy','click', function(){
	navigateMovies(-3)
});
$('#buttons').delegate('#Crime','click', function(){
	navigateMovies(-2)
});
$('#buttons').delegate('#Documentary','click', function(){
	navigateMovies(-1)
});
$('#buttons').delegate('#Drama','click', function(){
	navigateMovies(0)
});
$('#buttons').delegate('#Family','click', function(){
	navigateMovies(1)
});
$('#buttons').delegate('#Fantasy','click', function(){
	navigateMovies(2)
});
$('#buttons').delegate('#Foreign','click', function(){
	navigateMovies(3)
});
$('#buttons').delegate('#History','click', function(){
	navigateMovies(4)
});
$('#buttons').delegate('#Horror','click', function(){
	navigateMovies(5)
});
$('#buttons').delegate('#Music','click', function(){
	navigateMovies(6)
});
$('#buttons').delegate('#Mystery','click', function(){
	navigateMovies(7)
});
$('#buttons').delegate('#Romance','click', function(){
	navigateMovies(8)
});

$('#buttons').delegate('#ScienceFiction','click', function(){
	navigateMovies(9)
});
$('#buttons').delegate('#TVMovie','click', function(){
	navigateMovies(10)
});
$('#buttons').delegate('#Thriller','click', function(){
	navigateMovies(11)
});
$('#buttons').delegate('#War','click', function(){
	navigateMovies(12)
});
$('#buttons').delegate('#Western','click', function(){
	navigateMovies(13)
});
