'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        asset_pipeline : {

            targets : ['rev','jsmin'],

            options : {
                outputDir : 'build/artifacts'
            },

            artifacts : {
                files : {
                    "all.css" : [ "test/fixtures/*.css" ],
                    "custom.js" : [
                        "test/fixtures/some.js",
                        "test/fixtures/other.js",
                        "test/fixtures/later.js"
                    ],
                }
            }
        },
        
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-git-changedfiles');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['asset_pipeline', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};