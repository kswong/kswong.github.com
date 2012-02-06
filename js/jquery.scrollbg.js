// Scrolling Background Plugin

(function($) {
	$.fn.scrollBg = function(options) {
		var opts = $.extend(true, {}, $.fn.scrollBg.defaults, options);
		var deltaX = Math.ceil(opts.speed.x*opts.interval/1000);
		var deltaY = Math.ceil(opts.speed.y*opts.interval/1000);
		var currentX = 0, currentY = 0;		
		var target = this;

		this.css("background-repeat","repeat");

		function scroll(){
			currentX += deltaX;
			currentY += deltaY;
			if (currentX <= -opts.imageSize.x || currentX >= opts.imageSize.x){
				currentX += opts.imageSize.x;
				currentX %= opts.imageSize.x;
			}
			if (currentY <= -opts.imageSize.y || currentY >= opts.imageSize.y){
				currentY += opts.imageSize.y;
				currentY %= opts.imageSize.y;
			}
			target.css("background-position",currentX+"px "+currentY+"px");		
		}

		setInterval(scroll, opts.interval);
		
		return this;
	}

	$.fn.scrollBg.defaults  = {
		speed: {x: 0, y: 0},
		interval: 250,
		imageSize: {x: 0, y: 0}
	}
})(jQuery);
