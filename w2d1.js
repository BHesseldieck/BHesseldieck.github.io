// $('#images').css({
//   margin: '10px',
//   display: 'inline-block'
// });
//
// $('#images').append('<img id="pic1"/>');
// $('#pic1').attr('src', 'http://3.bp.blogspot.com/-z1oZDC8p66g/VgbNBhHdqnI/AAAAAAAAAI0/IopHfLMPlKM/s1600/cubicle%2Bwatermelon.jpg').css('height', '250px');
//
// $('#images').append('<img id="pic2"/>');
// $('#pic2').attr('src', 'https://s-media-cache-ak0.pinimg.com/236x/1d/99/96/1d9996fe2783842e35ac5fb6def35052.jpg').css('height', '250px');
//
// $('#images').append('<img id="pic3"/>');
// $('#pic3').attr('src', 'http://i0.wp.com/pueblopulp.com/wp-content/uploads/2014/08/melon_80pound.jpg').css('height', '250px');
//
// $('#images').append('<img id="pic4"/>');
// $('#pic4').attr('src', 'http://3.bp.blogspot.com/-e-QaFCsprVs/Tp-PqWn08MI/AAAAAAAALig/09fU8htXlD8/s1600/03.jpg').css('height', '250px');
//
// $('#images').append('<img id="pic5"/>');
// $('#pic5').attr('src', 'http://images.visitbeijing.com.cn/20140107/Img214953074.jpg').css('height', '250px');
//
$('#reasonList').slideUp(1);
$('button').click(function(){
	$('#reasonList').slideToggle(1000);
});


var user_input = prompt("Do you like watermelons? y/n").toLowerCase();
while(!(user_input === "y" || user_input === "n")){
alert("Sorry that was not an option. Please try again.");
user_input = prompt("You like watermelons? y/n").toLowerCase();
}
if (user_input === "y") {
alert("Great but it's offseason so wait til later to eat.");

		var radius = prompt("How big of a watermelon would you want to eat? 1, 5, or 10?").toLowerCase();
 		radius = parseInt(radius, 10);
 		console.log(radius)
 		watermelonSize = 2 * Math.PI * radius;
			if (radius === 1 ) {
				alert("Small of Radius: " + watermelonSize );
 				console.log(watermelonSize);
 			}
 			else if (radius === 5 || radius === "5" ) {
 				alert("Big one of Radius: " + watermelonSize );
 				console.log(watermelonSize);
 			}
 			else if (radius === 10 || radius === "10" ) {
 				alert("Big one of Radius: " + watermelonSize );
 				console.log(watermelonSize);
 			}

 			else {
 				alert("I understand nothing you type.");
 				console.log(watermelonSize);
 			}

} else {
alert("Please get off this page!");
}
