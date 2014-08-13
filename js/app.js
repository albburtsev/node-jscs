jQuery(function($) {
	'use strict';

	$.ajaxSetup({
		cache: false,
		dataType: 'text'
	});

	var readmeURL = 'src/README.md';

	/**
	 * Iterate markdown tree, not recursive traverse
	 */
	function Iterator(tree) {
		if ( !(this instanceof Iterator) ) {
			return new Iterator(tree);
		}

		this.tree = tree || [];
		this.idx = -1;

		this.start();
	}

	Iterator.prototype = {
		start: function() {
			var item;

			while ( (item = this.next()) ) {
				console.log(item);
			}
		},

		next: function() {
			this.idx++;
			return this.tree[this.idx];
		}
	};

	$.get(readmeURL)
		.done(function(data) {
			try {
				var tree = markdown.parse(data),
					slides = Iterator(tree).slides;

			} catch(e) {
				// @todo
			}
		})
		.fail(function() {
			// @todo
		});
});