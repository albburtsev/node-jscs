/**
 * Model for rule
 */
function Rule(name) {
	if ( !(this instanceof Rule) ) {
		return new Rule(name);
	}

	this.name = name;
}

Rule.prototype = {
	cleanValue: function(name, value) {
		if ( name === 'example' || name === 'valid' || name === 'invalid' ) {
			value = value
				.replace(/^`?js\n/, '')
				.replace(/\n`$/, '');
		}

		return value;
	},

	set: function(name, value) {
		this[name] = (this[name] === undefined ? '' : this[name]) + this.cleanValue(name, value);
	}
};
