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
	start: function() {
		var item, rule,
			state = 'start'; // 'rules', 'done'

		while ( (item = this.next()) && state !== 'done' ) {
			switch (state) {
				case 'start':
					state = (item.isHeader() === 2 && item.text() === 'Rules' && 'rules') || state;
					break;

				case 'rules':
					state = (item.isHeader() === 2 && 'done') || state;

					if ( item.isHeader() === 3 ) {
						rule = Rule(item.text());
						this.rules.push(rule);
						console.log(rule);
					}

					break;

				default:
					// It's impossible, new state
					break;
			}
		}
	},

	next: function() {
		this.idx++;
		var item = this.tree[this.idx];
		return item ? MDItem(item) : false;
	}
};
