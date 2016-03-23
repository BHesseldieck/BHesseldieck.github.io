// Final
var movieTrailers =[];
var movies = [];

var keystate = [];
var posterHeight = 0;
document.addEventListener("keydown", function(evt) {
    keystate[evt.keyCode] = true;
  });
if (keystate[38]){
	posterHeight += 6;
	console.log('pressed 30')
	placePosters();
}

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
			}
			// postPoster();
		},
		error: function(error){
			console.log(error);
		}
	});
});

// Appends movie posters to page
var placePosters = function(){
	var posterRotation = 0;
	for(var i = 0; i <= 17; i++){
		var posterURL = 'http://crossorigin.me/' + movies[i].Poster;
		$('#posters').append("<a-curvedimage src=" + posterURL + " radius='10' theta-length='20' height='6' rotation='0 " + posterRotation + " " + posterHeight + "'</a-curvedimage>");
		posterRotation += 20;
	}
};
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