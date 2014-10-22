var RuleModel = Backbone.Model.extend({
	defaults: {
		name: '',
		description: '',
		idx: 0,
		valid: '',
		invalid: '',
		values: []
	},

	initialize: function() {
		// @todo
	}
});
