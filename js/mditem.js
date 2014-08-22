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

	isParagraph: function() {
		return this.type === 'para';
	},

	/**
	 * Returns node text
	 */
	text: function(data) {
		var text = '';
		data = data || this.data;

		if ( !data ) {
			return '';
		}

		for (var i = 1, part; i < data.length; i++) {
			part = data[i];
			if ( typeof part === 'string' ) {
				text += part;
			} else if ( part instanceof Array ) {
				text += this.text(part);
			}
		}

		return text;
	}
};
