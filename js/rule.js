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
	set: function(name, value) {
		this[name] = value;
	}
};
