// Final
var movieTrailers =[];
var movies = [];

// var posterHeight = 0;
// document.onkeydown = checkKeycode;
// function checkKeycode(e) {
// 	console.log(e);
// 	if (e.code == "ArrowUp"){
// 		$('#posters').append('<a-animation begin="click" easing="ease-in" attribute="position" from="0 0 0" to="0 -13 0" dur="1500" fill="forwards" ></a-animation>');
// 		console.log($('#poster').attr('position'));

// 	}
// }

/**************************************************************************************************************
						Get movie trailers from traileraddict(movie titles sourced in movielist.js)
						**************************************************************************************************************/
// $.getJSON('http://api.traileraddict.com/?film=curious-case-benjamin-button&count=3' + '&callback=?', function(data){
// 	alert(data.contents);
// });

$.ajax({
	method: 'GET',
	dataType: 'xml',
	url: 'http://crossorigin.me/http://api.traileraddict.com/?film=the-martian&count=3',
	success: function(data){
		movieTrailers.push(xmlToJson(data));
	}
});


/*************************************************************************************************************
						Get movie info from omdb(movie titles sourced in movielist.js)
						**************************************************************************************************************/
						var itemsProcessed = 0;

						movieList.forEach(function(string){
							var title = string.split(" ").join("+");
							$.ajax({
								method: 'GET',
								url: "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json",
								success: function(data){
									if (data.Response == "True"){
										movies.push(data);
									}
									itemsProcessed++;
									if(itemsProcessed === movieList.length) {
										placePosters();
										placePosters('Drama');
										placePosters('Action');
										placePosters('Comedy');
										placePosters('Sci-Fi');
										placePosters('Western');
										$('#featurediv').append('<a-animation easing="ease-in" attribute="position" from="0 38 0" to="0 18 0" dur="3500" fill="forwards" ></a-animation>');
										$('#Dramadiv').append('<a-animation easing="ease-in" attribute="position" from="0 32 0" to="0 12 0" dur="3000" fill="forwards" ></a-animation>');
										$('#Actiondiv').append('<a-animation easing="ease-in" attribute="position" from="0 26 0" to="0 6 0" dur="2500" fill="forwards" ></a-animation>');
										$('#Comedydiv').append('<a-animation easing="ease-in" attribute="position" from="0 20 0" to="0 0 0" dur="2000" fill="forwards" ></a-animation>');
										$('#Sci-Fidiv').append('<a-animation easing="ease-in" attribute="position" from="0 14 0" to="0 -6 0" dur="1500" fill="forwards" ></a-animation>');
										$('#Westerndiv').append('<a-animation easing="ease-in" attribute="position" from="0 8 0" to="0 -12 0" dur="1000" fill="forwards" ></a-animation>');

									}
			// postPoster();
		},
		error: function(error){
			console.log(error);
		}
	});
						});

// poster = 0;
// // Appends movie posters to page
// var placePosters = function(){
// 	var posterRotation = 0;
// 	for(var j = 1; j <= 3; j++){
// 		posterHeight += 1;
// 		for(var i = 0; i <= 17; i++){
// 			var posterURL = 'http://crossorigin.me/' + movies[poster].Poster;
// 			$('#posters' + j).append("<a-curvedimage src=" + posterURL + " radius='10' theta-length='20' height='6' rotation='0 " + posterRotation +  " 0'</a-curvedimage>");
// 			posterRotation += 20;
// 			poster++
// 		}
// 	}
// };
//NEW PLACE POSTERS FUNCTION ********************************************************************************************************************************************

function clearSpace(){
	$('#posters').text('');
}

// Appends movie posters to page based on genre
var placePosters = function(genre){
	// clearSpace();
	var posterRotation = 0;
	console.log(genre);
	if(genre == undefined){
		$('#posters').append("<a-entity id='featurediv'></a-entity>")
		for(var i = 0; i <= 17; i++){
			var posterURL = 'http://crossorigin.me/' + movies[i].Poster;
			$('#featurediv').append("<a-curvedimage class='poster' src=" + posterURL + " radius='10' theta-length='20' height='6' rotation='0 " + posterRotation + " 0'</a-curvedimage>");
			posterRotation += 20;
		}

	}
	else{
		var counter = 0;
		$('#posters').append("<a-entity id='" + genre + "div'></a-entity>")
		for(var j = 0; j < movies.length; j++){
			var posterURL = 'http://crossorigin.me/' + movies[j].Poster;
			var splitGenre = movies[j].Genre.split(',');
			for(var k=0; k < splitGenre.length; k++){
				if(splitGenre[k] == genre  && counter <= 17){
					$("#"+genre+"div").append("<a-curvedimage class='poster' src=" + posterURL + " radius='10' theta-length='20' height='6' rotation='0 " + posterRotation + " 0'</a-curvedimage>")
					posterRotation += 20;
					counter++;
				}
			}
		}
	}
}

function navigateMovies(key){
$('#posters').append('<a-animation easing="ease-in" attribute="position" to="0 ' + key * 6 + ' 0" dur="1500" fill="forwards" ></a-animation>');

}

			// for(var tj = 0; j < movies.length; j++){
			// 	var posterURL = movies[j].Poster;
			// 	var splitGenre = movies[j].Genre.split(',');
			// 	for(var k=0; k < splitGenre.length; k++){
			// 		if(splitGenre[k] == genre  && counter <= 17){
			// 			$("#posters").append("<a-curvedimage class='poster' src=" + posterURL + " radius='10' theta-length='20' height='6' rotation='0 " + posterRotation + " 0'</a-curvedimage>")
			// 			posterRotation += 20;
			// 			counter++;
			// 		}
			// 	}
			// }



			document.querySelector('#drama').addEventListener('click', function(){
				// placePosters('Drama');
				navigateMovies(-2)
				console.log('DRAMA CLICKED');
			});
			document.querySelector('#action').addEventListener('click', function(){
				// placePosters('Action');
				navigateMovies(-1)
				console.log('ACTION CLICKED');
			});
			document.querySelector('#comedy').addEventListener('click', function(){
				// placePosters('Comedy');
				navigateMovies(0)
				console.log('Comedy CLICKED');
			});

//****************************************************************************************************************************************************************




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

// Changes XML to JSON. Used above to convert xml from trailer api to json
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
