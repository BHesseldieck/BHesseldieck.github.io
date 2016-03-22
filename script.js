// Final
var movieTrailers =[];
var movies = [];
// $.ajax({
// 	method: 'GET',
// 	dataType: 'xml',
// 	url: 'http://api.traileraddict.com/?film=curious-case-benjamin-button&count=3',
// 	success: function(data){
// 		movieTrailers.push(data);  
// 		console.log(data)
// 	}
// });
// console.log(movieTrailers);


movieList.forEach(function(string){
	var title = string.split(" ").join("+");
	$.ajax({
		method: 'GET',
		url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json",
		success: function(data){
			if (data.Response == "True"){
				movies.push(data);
			}
			// postPoster();
		},
		error: function(error){
			console.log(error);
		}
	});
})

window.setTimeout(function(){




	var posterRotation = 0;
	for(var i = 0; i <= 8; i++){
		var posterURL = movies[i].Poster;
		$('a-scene').append("<a-curvedimage src=" + posterURL + " radius='5' theta-length='40' height='6' rotation='0 " + posterRotation + " 0'</a-curvedimage>");
		posterRotation += 40;
	}










}, 4000);
// 


// var filterByGenre = function(genre){
// 	$('#movieSection').replaceWith('<div id="movieSection"></div>');
// 	$('#store').append('<div id="movieSection"></div>')
// 	movies.forEach(function(item, i, arr){
// 		$('#movieSection').append('<div id=movie' + i + ' class="col-md-3"></div');
// 		$('#movie' + i).append("<div class='name'>" + item.Title + "</div>");
// 		$('#movie' + i).append('<div class="category">' + item.Genre + '</div>');
// 		$('#movie' + i).append("<div class='movie_img'><img src=" + item.Poster + "></div>")
// 		//$('#movie' + i).append('<div class="awards">' + item.Awards('<br>') + '</div>');
// 		$('#movie' + i).append("<div class='year'>" + item.Year + "</div>");
// 		$('#movie' + i).append("<div class='actors'>" + item.Actors + "</div>");
// 		$('#movie' + i).append("<div id='plot' class='hidden'>" + item.Plot + "</div>");
// 	});
// }

// $('#allproducts').click(function(){
// 	filterByGenre();
// });

// $('#drama').click(function(){
// 	filterByGenre('Drama');
// });