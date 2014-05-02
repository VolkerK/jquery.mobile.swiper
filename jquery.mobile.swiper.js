/*
 * jquery.mobile.swiper v1.1
 *
 * Copyright (c) 2012-2014, Abas Software AG, Volker Krebs, Stefan Gebhardt
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * 
 * This widget is applied to all data-role="page" but only when a data-swipeleft or
 * data-swiperight is also present.
 * 
 * data-swiperight and data-swipeleft are elements that can be put into changePage as a parameter.
**/
(function ($, window, undefined) {
	$.widget("mobile.swiper", $.mobile.widget, {
		options:{
			swipeleft:null,
			swiperight:null
		},
		_init: function () {
			//console.log(this.options.swipeleft);
			//console.log(this.options.swiperight);
			if (this.options.swipeleft !== null) {
				this.element.on('swipeleft', $.proxy(this.swipeleft, this));
			}
			if (this.options.swiperight !== null) {
				this.element.on('swiperight', $.proxy(this.swiperight, this));
			}
		},
		swipeleft: function () {
			// when the toPage begins with #, we have a locale anchor. Reload is not needed.
			// otherwise we should reload, because we have a dynamic webapp
			var reloadPage = !(this.options.swipeleft.slice(0,1) == '#');
			//console.log("swipe left to " + this.options.swipeleft + " (reload=" + reloadPage + ")");
			$.mobile.pageContainer.pagecontainer("change", this.options.swipeleft, { 
				transition: "slide",
				reload: reloadPage,
				allowSamePageTransition: true,
				changeHash: false //avoid adding to history stack
			} );
		},
		swiperight: function () {
			// when the toPage begins with #, we have a locale anchor. Reload is not needed.
			// otherwise we should reload, because we have a dynamic webapp
			var reloadPage = !(this.options.swiperight.slice(0,1) == '#');
			//console.log("swipe right to " + this.options.swiperight + " (reload=" + reloadPage + ")");
			$.mobile.pageContainer.pagecontainer("change", this.options.swiperight, { 
				transition: "slide",
				reverse: true,
				reload: reloadPage,
				allowSamePageTransition: true,
				changeHash: false //avoid adding to history stack
			} );
		}
	});

	$(document).on("pageinit", function (event) {
		var page = $(event.target);
		var swleft = page.data('swipeleft');
		var swright = page.data('swiperight');
		if (swleft !== undefined || swright !== undefined) {
			//apply our widget if swipeleft or swiperight is defined.
			page.swiper();
		}
	});
})(jQuery, this);
