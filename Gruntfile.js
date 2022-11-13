module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// copy files
		copy: {
			img: {
				files: [{ 
					cwd: 'src/img',
					src: '**/*', 
					dest: 'dist/img' ,
					expand: true
				}]
			},
			vendor: {
				files: [{ 
					cwd: 'src/vendor',
					src: '**/*', 
					dest: 'dist/vendor' ,
					expand: true
				}]
			}
		},
		// minify JS
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				output: {
					quote_style: 0
				}
			},
			build: {
				src: 'src/js/script.js',
				dest: 'dist/js/script.js'
			}
		},
		// minify CSS
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/css/style.css': 'src/css/style.css'
				}
			}
		},
		// minify JSON
		minjson: {
			compile: {
				files: {
					'dist/data/ship-builder.json': 'src/data/ship-builder.json'
					// 'dist/data/ship-builder.json': ['src/data/test1.json', 'src/data/test2.json']
				}
			}
		},
		// minify HTML
		htmlmin: {                                     // Task
			dist: {                                      // Target
				options: {                                 // Target options
					removeComments: true,
					collapseWhitespace: true
				},
				files: {                                   // Dictionary of files
					'dist/index.html': 'src/index.html'     // 'destination': 'source'
				}
			}
		},
		// Watch
		watch: {
			scripts: {
				files: ['src/js/script.js', 'src/css/style.css', 'src/data/ship-builder.json', 'src/index.html'],
				tasks: ['uglify', 'cssmin', 'minjson', 'htmlmin'],
				options: {
					/*
					livereload: {
						host: 'localhost',
						port: 9000
					}
					*/
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-minjson');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['copy:img','copy:vendor','uglify', 'cssmin', 'minjson', 'htmlmin']);

};