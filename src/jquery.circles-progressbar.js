(function ( $ ) {
	$.fn.circlesProgress = function ( options ) {
		var plugin = this;
		plugin.settings = {};

		var percentToDegree = function (percent) {
			return Math.round(3.6*percent);
		};

		var degreeToPercent = function (degree) {
			return Math.round(degree/3.6);
		};

		plugin.init = function () {
			plugin.settings = $.extend({
				size:50,
				progress:0,
				initialProgress:0,
				attachedElement:plugin,
				enableTextIndicator: false,
				svgElement: $('<svg><path class="cpb-border"></path><path class="cpb-loader"></path></svg>'),
				textElement: $('<div class="cpb-text-indicator" style="margin:0px;z-index:10;position:absolute;vertical-align:middle;top:0;left:0;text-align:center;"></div>'),
				textElementClass: 'cpb-text',
				diplayPercentSign: false,
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
			//Set CSS of SVG Element
			plugin.settings.svgElement.css({
				'display':'block',
				'height':plugin.settings.size,
				'width':plugin.settings.size,
				'transition':'all 1s linear'
			});

			//Set position to relative on the attachedElement
			plugin.settings.attachedElement.css('position','relative');

			//Set Attributes of SVG Element
			plugin.settings.attachedElement.html(plugin.settings.svgElement.attr({
				'height':plugin.settings.size,
				'width':plugin.settings.size,
				'viewbox':'0 0 '+plugin.settings.size+' '+plugin.settings.size
			}));

			//Set Attributes of Border Path Element
			plugin.settings.border = plugin.settings.svgElement.find('.cpb-border').attr({
				'transform':'translate('+plugin.settings.size/2+', '+plugin.settings.size/2+')'
			});

			//Set Attributes of Loader Path Element
			plugin.settings.loader = plugin.settings.svgElement.find('.cpb-loader').attr({
				'transform':'translate('+plugin.settings.size/2+', '+plugin.settings.size/2+') scale('+(1-((plugin.settings.borderSize*2)/plugin.settings.size))+')'
			});

			//Set CSS of Loader Path Element
			plugin.settings.loader.css({
				'fill':plugin.settings.innerColor,
				'fill-opacity': plugin.settings.innerOpacity
			});

			//Set CSS of Border Path Element
			plugin.settings.border.css({
				'fill':plugin.settings.outerColor,
				'fill-opacity':plugin.settings.outerOpacity
			});

			//Append Textindicator element if need
			if(plugin.settings.enableTextIndicator) {
				plugin.settings.attachedElement.append(plugin.settings.textElement);
			}
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

			//Display text if needed
			if(plugin.settings.enableTextIndicator) {
				plugin.settings.textElement.css({
					height:plugin.settings.size+'px',
					width:plugin.settings.size+'px',
					'line-height':plugin.settings.size+'px',
				});
				plugin.settings.textElement.addClass(plugin.settings.textElementClass);
				var text = degreeToPercent(plugin.settings.currentAlpha)+(plugin.settings.diplayPercentSign ? '%' : '');
				plugin.settings.textElement.html(text);
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