module.exports = function(grunt) {
	'use strict';

	require('matchdep')
		.filterDev('grunt-*')
		.forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		jsSource: 'js/*.js',
		cssSource: 'css/**/*.styl',

		banner: 
			'/**\n' +
			' * jscs-config-generator\n' +
			' * @author Alexander Burtsev, http://burtsev.me, <%= grunt.template.today("yyyy") %>\n' +
			' * @license MIT\n' +
			' */\n',

		stylus: {
			options: {
				banner: '<%= banner %>'
			},
			app: {
				files: {
					'dist/app.css': 'css/app.styl'
				}
			}
		},

		jshint: {
			options: {
				newcap: false,
				globals: {
					jQuery: true
				}
			},
			app: ['<%= jsSource %>']
		},

		jscs: {
			options: {
				config: '.jscs.json'
			},
			app: ['<%= jsSource %>']
		},

		uglify: {
			options: {
				banner: '<%= banner %>(function() {',
				footer: '})();'
			},
			app: {
				files: {
					'dist/app.min.js': [
						'<%= jsSource %>'
					]
				}
			}
		},

		concat: {
			options: {
				separator: '\n;'
			},
			js: {
				src: [
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/bootstrap/dist/js/bootstrap.min.js',
					'bower_components/markdown/lib/markdown.js',
					'dist/app.min.js'
				],
				dest: 'dist/build.js'
			},
			css: {
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.min.css',
					'dist/app.css'
				],
				dest: 'dist/build.css'
			}
		},

		watch: {
			js: {
				files: ['<%= jsSource %>'],
				tasks: ['jshint', 'jscs', 'uglify', 'concat:js', 'notify']
			},
			css: {
				files: ['<%= cssSource %>'],
				tasks: ['stylus', 'concat:css', 'notify']
			}
		},

		notify: {
			build_ready: {
				options: {
					title: 'JSCS web view',
					message: 'Build is ready!'
				}
			}
		}
	});

	grunt.registerTask('default', [
		'stylus',
		'jshint',
		'jscs',
		'uglify',
		'concat',
		'notify',
		'watch'
	]);
};