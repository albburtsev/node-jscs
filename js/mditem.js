/**
 * Wrapper for markdown elements
 */
function MDItem(item) {
	if ( !(this instanceof MDItem) ) {
		return new MDItem(item);
	}

	if ( typeof item !== 'object' ) {
		return;
	}

	this.data = item;
	this.type = item[0];
}

MDItem.prototype = {
	/**
	 * Returns header level or ```false``` if element not header
	 */
	isHeader: function() {
		return this.type === 'header' && this.data[1].level;
	},

	/**
	 * Returns node text
	 */
	text: function() {
		if ( this.isHeader() ) {
			return $.trim(this.data[2]);
		}
	}
};
