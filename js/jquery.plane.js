// Flying planes Plugin

(function($) {
	$.fn.plane = function(options) {
		var opts = $.extend({}, $.fn.plane.defaults, options);
		var deltaPx = Math.ceil(opts.speed*opts.interval/1000);	
		var target = this;
		var width = $(document).width();
		var height = $(document).height();
		var plane = $(opts.planeDiv).clone().addClass("flyingPlane");

		function randPlane(target) {
			var h = Math.floor((height-opts.planeHeight)/opts.planeHeight);
			target.css({"top": Math.floor(Math.random()*h) * opts.planeHeight ,
				 	   "left": Math.floor(-Math.random()*(width-opts.planeWidth)*opts.planeNum)
				 	  });					  
			return target;
		};
		
		for (i = 0; i < opts.planeNum; ++i) {
			randPlane(plane.clone().attr("id", "planeDiv"+i)).appendTo(target);
		}
		$(".flyingPlane").css("display", "block");

		function animate(){
			var curPlane, planeLeft;			
			for (i = 0; i < opts.planeNum; ++i) {
				curPlane = $("#planeDiv"+i);
				planeLeft = curPlane.position().left;

				curPlane.css("left", 
							 function(index, value) {
								 return parseInt(value) + deltaPx;
      						 });
				if (planeLeft > width) {
					randPlane(curPlane);
				}
			}
		}
		setInterval(animate, opts.interval);
		
		return this;
	}

	$.fn.plane.defaults  = {
		planeDiv: ".plane",
		speed: 500,
		interval: 100,
		planeNum: 5,
		planeWidth: 100,
		planeHeight: 42,
		opacity: .5
	}
})(jQuery);
