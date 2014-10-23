var RuleView = Backbone.View.extend({
	tagName: 'div',
	className: 'card swiper-slide',
	template: _.template($('#tpl-card').html()),

	initialize: function() {
		this.on('added', this.fitText);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	fitText: function() {
		this.$('.js-fit-text').textfill({
			minFontPixels: 10,
			maxFontPixels: 28,
			widthOnly: true
		});
	}
});
