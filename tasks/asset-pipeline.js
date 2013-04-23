/*global require,module*/
var grunt = require('grunt');

module.exports = function (grunt) {

    // need a better name for this!
    grunt.registerTask('asset_pipeline', '', function() {
        var done = this.async(),
            config = grunt.config.data.asset_pipeline,
			defaultTargets = config.defaultTargets,
			artifacts = config.artifacts,
			_ = grunt.util._,
			changedFiles = grunt.config.get('git.changed'),
			usingChangedFiles = !!changedFiles;
		
        var defaults = {
			copy : function(){ return {}; },
			rev : function(pathName,fileName,task,lastTask){
			    var conf = {files:{}},
                src = 'build/asset_pipeline/${pathName}/rev/**/*'.replace("${pathName}",pathName);
                return { files: [ { src:[src] } ] };
			},
			asset_pipeline_rev_copy : function(){ return {}; },
			concat : function(){ return {}; },
            uglify : function(pathName,fileName,task,lastTask){
                var conf = {
                        files:{},
                        options: {
                            sourceMap: 'build/asset_pipeline/'+pathName+'/sourcemaps/map.js'
                        }
                    },
                    dest = "build/asset_pipeline/${pathName}/${task}/${fileName}".replace("${pathName}",pathName).replace("${task}",task).replace("${fileName}",fileName),
                    src = "build/asset_pipeline/${pathName}/${lastTask}/*".replace("${pathName}",pathName).replace("${lastTask}",lastTask);
                conf.files[dest] = [src];
                return conf;
            }
		};
		
		// Gather up the input files and package them up
		for ( var name in artifacts ){
			var escaped = name.replace("-","_").replace(".","_").replace("/","_");
			var group = artifacts[name];
			var conf = {};
			var lastTarget = "concat";
			
			if ( group.concat ){
				// listed files are concatenated into one
				conf.files = {};
				conf.files["build/asset_pipeline/"+escaped+"/concat/"+name] = group.concat;
			} else {
				// listed files are included in bulk
				conf.files = group.files;
				conf.files.forEach(function(file){ file.dest = "build/asset_pipeline/"+escaped+"/concat/" + (file.dest || ''); })
			}
			
			// If we're using grunt-git-changedfiles to reduce work required
			if ( usingChangedFiles ) {
				var foundMatch = false;
				grunt.util.recurse( config[name], function(pattern){
					if ( typeof pattern == "string" ) {
 	                   changedFiles.forEach(function(file){
	                         // Test which artifacts this file belongs to
	                         if ( grunt.file.match( pattern, file ).length > 0 ) foundMatch = true;
	                    }, function(){
	                        // this skips subsequent disk access if we've already got this artifact listed 
	                        return foundMatch;
	                    });
					}
                });
				if ( !foundMatch ) continue; // no match so skip this artifact
			}
			
			// Clean up previous builds
			grunt.config.set( 'clean.asset_pipeline_'+escaped, {src:["build/asset_pipeline/"+escaped]} );
			grunt.task.run('clean:asset_pipeline_'+escaped);
            
			// Register the initial concat task with Grunt
			grunt.config.set('concat.asset_pipeline_'+escaped, _.clone(conf,true) );
			grunt.task.run('concat:asset_pipeline_'+escaped);
			
			// Now add the intermediate targets based on special rules
			// e.g. since Rev doesn't allow you to specify an output dir we have to hack around that 
			var targets = _.clone(group.targets || defaultTargets || []),
				revIndex = targets.indexOf('rev');
			
			if ( revIndex > -1 ) {
				targets.splice( revIndex, 0, { target:'copy', config: { files: [ { dest:"build/asset_pipeline/"+escaped+"/rev/", src:"**/*", cwd:"build/asset_pipeline/"+escaped+"/${lastTarget}/", expand:true }]}} );
			}
            
			// Register the array of tasks with Grunt
			targets.forEach(function(target){
				if ( target instanceof Object ){
                    if ( target.target == 'copy' ) target.config.files[0].cwd = target.config.files[0].cwd.replace("${lastTarget}",lastTarget);
					var rand = Math.round(Math.random()*999999999);
					grunt.config.set( target.target+'.r'+rand, _.clone(target.config,true) );
					grunt.task.run( target.target+':r'+rand);
					return;
				}
                
                // allow overriding of configuration
				conf = {};
				_.extend(
                    conf, 
                    _.clone(defaults[target]( escaped, name, target, lastTarget ),true), 
                    _.clone(grunt.config.data[target],true),
                    _.clone(config.options[target],true)
                );
				
                //conf.files[0].src[0] = conf.files[0].src[0].replace("${name}",escaped);
				console.log( target.replace(":",".")+'.asset_pipeline_'+escaped,name,conf)
				grunt.config.set( target.replace(":",".")+'.asset_pipeline_'+escaped, _.clone(conf,true) );
				grunt.task.run( target+':asset_pipeline_'+escaped);
				lastTarget = target;
			});
		}
		
        done();
    });

};
