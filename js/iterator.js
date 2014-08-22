/**
 * Iterates markdown tree, not recursive traverse
 */
function Iterator(tree) {
	if ( !(this instanceof Iterator) ) {
		return new Iterator(tree);
	}

	this.tree = tree || [];
	this.rules = [];
	this.idx = -1;

	this.start();
}

Iterator.prototype = {
	STATE_START: 'start',
	STATE_RULES: 'rules',
	STATE_DONE: 'done',

	RULE_STATE_START: 'start',
	RULE_STATE_EXAMPLE: 'example',
	RULE_STATE_VALID: 'valid',
	RULE_STATE_INVALID: 'invalid',

	start: function() {
		var item, rule,
			state = this.STATE_START,
			ruleState = this.RULE_STATE_START;

		while ( (item = this.next()) && state !== this.STATE_DONE ) {
			switch (state) {
				case this.STATE_START:
					state = (item.isHeader() === 2 && item.text() === 'Rules' && this.STATE_RULES) || state;
					break;

				case this.STATE_RULES:
					state = (item.isHeader() === 2 && this.STATE_DONE) || state;

					if ( item.isHeader() === 3 ) {
						rule = Rule(item.text());
						ruleState = this.RULE_STATE_START;
						this.rules.push(rule);

					} else if ( item.isHeader() === 4 && item.text() === 'Example' ) {
						ruleState = this.RULE_STATE_EXAMPLE;

					} else if ( item.isHeader() === 5 && item.text() === 'Valid' ) {
						ruleState = this.RULE_STATE_VALID;

					} else if ( item.isHeader() === 5 && item.text() === 'Invalid' ) {
						ruleState = this.RULE_STATE_INVALID;

					} else if ( item.isParagraph() ) {
						this.setRuleProperty(ruleState, item, rule);
					}

					break;

				default:
					// It's impossible, new state
					break;
			}
		}
	},



	setRuleProperty: function(ruleState, item, rule) {
		var value = item.text(),
			name;

		switch (ruleState) {
			case this.RULE_STATE_START:
				// @todo
				break;

			case this.RULE_STATE_EXAMPLE:
				name = this.RULE_STATE_EXAMPLE;
				break;

			case this.RULE_STATE_VALID:
				name = this.RULE_STATE_VALID;
				break;

			case this.RULE_STATE_INVALID:
				name = this.RULE_STATE_INVALID;
				break;
		}

		if ( name ) {
			rule.set(name, value);
		}
	},

	next: function() {
		this.idx++;
		var item = this.tree[this.idx];
		return item ? MDItem(item) : false;
	}
};
