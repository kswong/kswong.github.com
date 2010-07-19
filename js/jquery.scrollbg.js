// Scrolling Background Plugin

(function($) {
	$.fn.scrollBg = function(options) {
		var opts = $.extend({}, $.fn.scrollBg.defaults, options);
		var deltaPx = Math.ceil(opts.speed*opts.interval/1000);
		var current = 0;		
		var target = this;

		this.css("background-repeat","repeat");

		function scroll(){
			current -= deltaPx;
			if (current <= -opts.imageHeight){
				current += opts.imageHeight;
			}
			target.css("background-position","0 "+current+"px");		
		}

		setInterval(scroll, opts.interval);
		
		return this;
	}

	$.fn.scrollBg.defaults  = {
		speed: 20,
		interval: 100,
		imageHeight: 0
	}
})(jQuery);
