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
			this.list = new RuleList();
			this.listenTo(this.list, 'add', this.addRule);
			this.list.add(rules);

			// Inits swiper
			var mySwiper = new Swiper('.swiper-container', {
				mode: 'horizontal',
				calculateHeight: true,
				simulateTouch: false,
				keyboardControl: true,
				loop: false
			});
		},

		addRule: function(model) {
			var view = new RuleView({ model: model });
			this.$el.append(view.render().el);
		}
	});
});
