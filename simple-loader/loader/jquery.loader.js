$.widget("bao.load", {

	options : {
		height : 100,
		width : 100,
		backgroundOpacity : '0.5',
		loaderURL : './loader/load.gif'
	},

	_create : function() {
		var bindTo = this.element;
		var loaderContainer = '<div class="loader">' + '<img src="'
				+ this.options.loaderURL + '"' + 'class="img-load" />'
				+ '</div>';
		bindTo.append(loaderContainer);
		this._update();
	},

	_setOption : function(key, value) {
		this.options[key] = value;
		this._update();
	},

	_update : function() {
		var elem = this.element, top = 0, left = 0;
		if (elem.css('position') == 'absolute') {
			top = 0;
			left = 0;
		} else {
			top = elem.offset().top;
			left = elem.offset().left;
		}
		elem.find(".loader").css(
				{
					'background-color' : 'rgba(128, 128, 128, '
							+ this.options.backgroundOpacity + ')',
					opacity : 0.5,
					top : top,
					left : left,
					width : elem.outerWidth(),
					height : elem.outerHeight(),
				});
		elem.find(".img-load").css(
				{
					top : (elem.find(".loader").height() / 2)
							- (this.options['height'] / 2),
					left : (elem.find(".loader").width() / 2)
							- (this.options['width'] / 2),
					width : this.options['width'] + 'px',
					height : this.options['height'] + 'px',

				});
	},

	_destroy : function() {
		this.element.find(".loader").remove();
	}

});
