module.exports = function(grunt) {

	grunt.initConfig({

		// Allows us to reference package property values
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			dist: {
				files: [
					// Make all targets in 'src' directory copy to
					// a location in 'dist' relative to own directory
					{ expand:true, cwd:'src/', src:['*.html','*.png','*.ico'], dest:'dist' },
					{ expand:true, cwd:'src/js/', src:['**'], dest:'dist/js' },
					{ expand:true, cwd:'src/img/', src:['*.svg','*.png','*.jpg','*.jpeg'], dest:'dist/img' },
					{ expand:true, cwd:'src/fonts/', src:['**'], dest:'dist/fonts' }
				]
			}
		},

		concat: {
			/*
			foundation: { files: {
				// foundation.min.js
				'dist/js/vendor/foundation/foundation.min.js':
					//@TODO Replace with module-specific concat for smaller size
					['bower_components/foundation/js/foundation.min.js']
			}},
			*/
			jquery: { files: {
				// jquery.min.js
				'dist/js/vendor/jquery/jquery.min.js':
					['bower_components/jquery/dist/jquery.min.js'],
				// jquery.min.map
				'dist/js/vendor/jquery/jquery.min.map':
					['bower_components/jquery/dist/jquery.min.map']
			}},
			waypoint: { files: {
				// jquery-waypoints.min.js
				'dist/js/vendor/jquery/plugins/jquery-waypoints.min.js':
					['bower_components/jquery-waypoints/waypoints.min.js']
			}},
			scrollit: { files: {
				// jquery-scrollIt.min.js
				'dist/js/vendor/jquery/plugins/jquery-scrollIt.min.js':
					['bower_components/ScrollIt/scrollIt.min.js']
			}}
		},

		sass: {
			options: {
				// Helps Sass task resolve Foundation dependencies
				loadPath: [
					'bower_components/foundation/scss',
					'bower_components/sass-burger'
				],
				style: 'compressed',
				quiet: true
			},
			dist: { files: {
				// startup-sass.min.css
				'dist/css/startup-sass.min.css': 'src/scss/main.scss'
			}}
		},

		watch: {
			grunt: { files: ['Gruntfile.js'] },
			copy: {
				files: ['src/**'],
				tasks: ['copy']
			},
			sass: {
				files: 'src/scss/**/*.scss',
				tasks: ['sass']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('compile', ['sass']);
	grunt.registerTask('default', ['watch']);

}