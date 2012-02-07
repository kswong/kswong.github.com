// Glare Plugin

(function($) {
	$.fn.glare = function(options) {
		var opts = $.extend(true, {}, $.fn.glare.defaults, options);

		var target = this;
		var glarePos = 0;		
		var txtLength = 0;
		var midOpacity = (opts.minOpacity+opts.maxOpacity)/2;
		var glareChars = new Array();
		var updateHandle = 0;

		target.find(".glare").each(function() {
			var ele = $(this);
			var txt = ele.text();
			var code = "";
			txtLength += txt.length;

			var i = 0;
			for (i = 0; i < txt.length; ++i) {
				code += "<span class='glareChar'>" + txt.charAt(i) + "</span>";
			}

			ele.html(code);
		});

		var i = 0;
		target.find(".glareChar").each(function() {
			glareChars.push($(this).css("opacity", opts.minOpacity));
		});

		function glare(){
			glareChars[glarePos].css("opacity", midOpacity);

			if (glarePos-1 >= 0) {
				glareChars[glarePos-1].css("opacity", opts.minOpacity);
			}

			glarePos++;

			if (glarePos >= txtLength) {
				glareChars[txtLength-1].css("opacity", opts.minOpacity);
				glarePos = 0;
				clearInterval(updateHandle);
				return;
			}

			glareChars[glarePos].css("opacity", opts.maxOpacity);

			if (glarePos+1 < txtLength) {
				glareChars[glarePos+1].css("opacity", midOpacity)
			}

		}

		setInterval(function() {
			if (updateHandle != 0) {
				clearInterval(updateHandle);
			}
			updateHandle = setInterval(glare, opts.interval); 
		}, opts.repeatDelay+opts.interval*txtLength);
		
		return this;
	}

	$.fn.glare.defaults  = {
		interval: 100,
		repeatDelay: 5000,
		minOpacity: 0.7,
		maxOpacity: 1.0,
	}
})(jQuery);
