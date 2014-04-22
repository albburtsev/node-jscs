module.exports = function(grunt) {
	'use strict';

	require('matchdep')
		.filterDev('grunt-*')
		.forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		jsSource: 'js/src/*.js',
		cssSource: 'css/styl/*.styl',

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
					'css/app.css': 'css/app.styl'
				}
			}
		},

		jshint: {
			options: {
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
				banner: '<%= banner %>'
			},
			app: {
				files: {
					'js/app.min.js': [
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
					'js/app.min.js'
				],
				dest: 'js/build.js'
			},
			css: {
				src: [
					'bower_components/bootstrap/dist/css/bootstrap.min.css',
					'css/app.css'
				],
				dest: 'css/build.css'
			}
		},

		watch: {
			js: {
				files: ['<%= jsSource %>'],
				tasks: ['jshint', 'jscs', 'uglify', 'concat:js']
			},
			css: {
				files: ['<%= cssSource %>'],
				tasks: ['stylus', 'concat:css']
			}
		}
	});

	grunt.registerTask('default', [
		'stylus',
		'jshint',
		'jscs',
		'uglify',
		'concat',
		'watch'
	]);
};