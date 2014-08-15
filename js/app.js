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
			} catch(e) {
				console.log('Unexpected error', e);
				// @todo
			}
		})
		.fail(function() {
			// @todo
		});
});
