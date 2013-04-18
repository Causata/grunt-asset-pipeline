/*global require,module*/
var grunt = require('grunt');

module.exports = function (grunt) {

    // need a better name for this!
    grunt.registerTask('asset_pipeline', '', function() {
        var done = this.async(),
            config = grunt.config.data,
            targets = config.splice_artifact_targets.targets
            artifacts = grunt.config.get('git.changed.artifacts');
        
        // queue up each target for each artifact
        targets.forEach(function(target){
            artifacts.forEach(function(artifact){
                // add a task for each target/artifact combo, e.g. copy:loginJs, copy:loginCss
                if ( config[target][artifact] ) grunt.task.run(target+":"+artifact);
            });
        });
        
        done();
    });

};
