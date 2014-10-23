jQuery(function($) {
	'use strict';

	$.ajaxSetup({
		cache: false,
		dataType: 'text'
	});

	var readmeURL = 'src/README.md';

	$.get(readmeURL)
		.done(function(data) {
			try {
				var tree = markdown.parse(data),
					rules = Iterator(tree).rules;

				new AppView(rules);
			} catch(e) {
				console.log('Unexpected error', e);
				// @todo
			}
		})
		.fail(function() {
			// @todo
		});

	var AppView = Backbone.View.extend({
		el: $('.js-app'),

		initialize: function(rules) {
			this._rules = this.$('.js-rules');
			this._swiper = this.$('.js-swiper');

			this.list = new RuleList();
			this.listenTo(this.list, 'add', this.addRule);
			this.list.add(rules);

			this.initSwiper();
		},

		initSwiper: function() {
			new Swiper(this._swiper.get(0), {
				mode: 'horizontal',
				calculateHeight: true,
				simulateTouch: false,
				keyboardControl: true,
				loop: false,
				onFirstInit: this.fitSwiperHeight.bind(this),
				onSlideChangeEnd: this.fitSwiperHeight.bind(this)
			});
		},

		addRule: function(model) {
			var view = new RuleView({ model: model });
			this._rules.append(view.render().el);
			view.trigger('added');
		},

		fitSwiperHeight: function(swiper) {
			var _slide = $(swiper.activeSlide()),
				height;

			_slide.css('height', 'auto');
			height = _slide.height();
			this._rules.css('height', height);
		}
	});
});
