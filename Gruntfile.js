'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['build'],
        },

		asset_pipeline : {
	        defaultTargets : ['rev'],
	        options : {
	            outputDir : 'build/artifacts',
				copy : {},
				rev : {},
				concat : {}
	        },
	        artifacts : {
	            "separateFiles" : {
					files : [ { cwd:"test/fixtures/", src:"*.js", expand:true } ]
				},
                "custom.js" : { concat : [ "test/fixtures/**/*.js" ] },
                "negated.js" : { concat : [
                    "test/fixtures/a.js",
                    "test/fixtures/**/*.js",
                    "!test/fixtures/**/c.js"
                ]}
	        }
	    },
        
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			}
		}
		
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rm');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-jsmin-sourcemap');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'asset_pipeline', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};