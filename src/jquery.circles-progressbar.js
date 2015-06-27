(function ( $ ) {
	$.fn.circlesProgress = function ( options ) {
		var plugin = this;
		plugin.settings = {};

		var percentToDegree = function (percent) {
			return Math.round(3.6*percent);
		};

		plugin.init = function () {
			plugin.settings = $.extend({
				size:50,
				progress:0,
				initialProgress:0,
				attachedElement:plugin,
				svgElement: $('<svg><path class="cpb-border"></path><path class="cpb-loader"></path></svg>'),
				innerColor:'#000',
				outerColor:'#F00',
				innerOpacity:1,
				outerOpacity:1,
				borderSize:10,
				debug:true,
				alpha:0,
				deltaT:5,
				animate:true,
				currentAlpha:0,
			},options);

			plugin.settings.alpha = percentToDegree(plugin.settings.progress);
			plugin.settings.currentAlpha = percentToDegree(plugin.settings.initialProgress);

			plugin.buildElements();
			plugin.animate();
		};

		plugin.buildElements = function () {
			plugin.settings.svgElement.css({
				'display':'block',
				'height':plugin.settings.size,
				'width':plugin.settings.size,
				'transition':'all 1s linear'
			});

			plugin.settings.attachedElement.html(plugin.settings.svgElement.attr({
				'height':plugin.settings.size,
				'width':plugin.settings.size,
				'viewbox':'0 0 '+plugin.settings.size+' '+plugin.settings.size
			}));

			plugin.settings.border = plugin.settings.svgElement.find('.cpb-border').attr({
				'transform':'translate('+plugin.settings.size/2+', '+plugin.settings.size/2+')'
			});

			plugin.settings.loader = plugin.settings.svgElement.find('.cpb-loader').attr({
				'transform':'translate('+plugin.settings.size/2+', '+plugin.settings.size/2+') scale('+(1-((plugin.settings.borderSize*2)/plugin.settings.size))+')'
			});

			plugin.settings.loader.css({
				'fill':plugin.settings.innerColor,
				'fill-opacity': plugin.settings.innerOpacity
			});
			plugin.settings.border.css({
				'fill':plugin.settings.outerColor,
				'fill-opacity':plugin.settings.outerOpacity
			});
		};

		plugin.animate = function () {
			// console.log(plugin.settings.alpha);
			if(!plugin.settings.animate) { //disable animation
				plugin.settings.currentAlpha = plugin.settings.alpha;
			}

			if(plugin.settings.currentAlpha > plugin.settings.alpha) { //calculate angle
				plugin.settings.currentAlpha--;
			} else if (plugin.settings.currentAlpha < plugin.settings.alpha) {
				plugin.settings.currentAlpha++;
			}

			// console.log(plugin.settings.currentAlpha);
			if(plugin.settings.currentAlpha == 360) {
				plugin.settings.currentAlpha = 359.99;
			}

			var r = ( plugin.settings.currentAlpha * Math.PI / 180 );
			var x = Math.sin( r ) * (plugin.settings.size / 2);
			var y = Math.cos( r ) * - (plugin.settings.size / 2);
			var mid = ( plugin.settings.currentAlpha > 180 ) ? 1 : 0;
			var anim = 'M 0 0 v -'+(plugin.settings.size/2)+' A '+(plugin.settings.size/2)+' '+(plugin.settings.size/2)+' 1 '+ mid +' 1 '+  x  +' '+  y  +' z';

			plugin.settings.loader.attr('d',anim);
			plugin.settings.border.attr('d',anim);

			if(plugin.settings.currentAlpha != plugin.settings.alpha && plugin.settings.currentAlpha != 359.99) {
				setTimeout(plugin.animate,plugin.settings.deltaT);
			}
		};

		plugin.update = function (options) {
			plugin.settings = $.extend(plugin.settings,options);
			plugin.settings.alpha = percentToDegree(plugin.settings.progress);
			plugin.buildElements();
			plugin.animate();
		};

		plugin.init();
		// console.log(plugin);
		return plugin;
	};
})(jQuery);