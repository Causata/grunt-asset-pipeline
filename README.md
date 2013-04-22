# grunt-asset-pipeline [![Build Status](https://travis-ci.org/Causata/grunt-asset-pipeline.png)](https://travis-ci.org/Causata/grunt-asset-pipeline)

> Manages a complex asset pipeline for your production pleasure

# NOT WORKING YET

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-asset-pipeline --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-asset-pipeline');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "asset_pipeline" task

Example config

    asset_pipeline : {
        
        targets : ['rev','jsmin'],
        
        options : {
            outputDir : 'build/artifacts'
        },
        
        artifacts : {
            files : {
                "theme.css" : [
                    { cwd:"sass/css/", src:"*.css", expand:true } 
                ],
                "my-component.js" : [ "my-component/src/**/*.js" ],
                "custom.js" : [
                    "my-component/src/specific-file.js",
                    "another-component/src/in-an-exact-order.js",
                    "last-bit.js"
                ],
            }
        }
    }

