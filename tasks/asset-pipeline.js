/*global require,module*/
var grunt = require('grunt');

module.exports = function (grunt) {

    // need a better name for this!
    grunt.registerTask('asset_pipeline', '', function() {
        var done = this.async(),
            config = grunt.config.data,
            pipeline = config.asset_pipeline,
            targets = pipeline.defaultTargets,
            artifacts = pipeline.artifacts,
            changedFiles = grunt.config.get('git.changed');
        
        // We need a set of tasks, queued up in a suitable order
        
        // queue up each target for each artifact
        targets.forEach(function(target){
            for ( var name in artifacts ) {
                // add a task for each target/artifact combo, e.g. copy:loginJs, copy:loginCss
                if ( config[target][artifact] ) grunt.task.run(target+":"+artifact);
            }
        });
        
        done();
    });

};
