// Main script

jQuery(document).ready(function($) {
	$.getJSON('http://query.yahooapis.com/v1/public/yql?callback=?', {format: 'json', q: 'select * from weather.forecast where location in ("CHXX0049") and u="c"'},
		function(data) {
 			var pattern = /(storm|rain|shower)/i;
			var weather = data.query.results.channel.item.condition.text;
			var result = weather.match(pattern);
			
			if (result != null) {
				$('body').addClass("rain").scrollBg({imageSize: {x: 108, y: 108}, speed: {x:10, y: 20}});
			} else {
				$('body').scrollBg({imageSize: {x: 300, y: 300}, speed: {y: -15}});
			}
		}
	);
	
	$('#planeBg').height($(document).height()).plane();
	$('#sitename').glare();
});

