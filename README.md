# grunt-asset-pipeline [![Build Status](https://travis-ci.org/Causata/grunt-asset-pipeline.png)](https://travis-ci.org/Causata/grunt-asset-pipeline)

> Manages a complex asset pipeline for your production pleasure

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
        
        targets : ['rev'],
        
        options : {
            minify : false
        },
        
        artifacts : [
            {
                
            }
        ]
        
        
        
        // All of the CSS files in this directory would be managed separately 
        themeCss : { files: [ { dest:"build/output/sass/", src:"*.css", cwd:"sass/css/", expand:true } ] },
        extAll412 : { files : { "build/output/shared.js" : [
            "shared/tools/extjs-4.1.2/ext-all.js",
            "shared/src/components/GlobalNavigation/src/extjs/model/*.js",
            "shared/src/components/ext-4.1.2/model/*.js",
            "shared/src/components/GlobalNavigation/src/extjs/store/*.js",
            "shared/src/components/ext-4.1.2/store/*.js",
            "shared/src/components/ext-4.1.2/view/global/Navigation.js",
            "shared/src/components/ext-4.1.2/view/**/*.js",
            "shared/src/components/ext-4.1.2/controller/*.js",
            "shared/src/components/Instrumentation/src/extjs/model/*.js",
            "shared/src/components/Instrumentation/src/extjs/store/*.js",
            "shared/src/components/Instrumentation/src/extjs/view/*.js",
            "shared/src/components/Instrumentation/src/extjs/controller/*.js",
            //"shared/src/components/**/src/extjs/**/*.js",
            "!shared/src/components/ext-4.1.2/tests/**/*",
            "!shared/src/components/Notifications/**",
            //"!shared/src/components/GlobalNavigation/**"
				
        ]}},
        extAll407 : { files : { "build/output/ext-all-4.0.7.js" : ["shared/tools/extjs-4.0.7/ext-all.js"] } },

        loginJs : { files: { "build/output/login.js" : [
        "login/src/app/view/**/*.js",
        "login/src/**/*.js"
        ]}},
        loginCss : { files: { "build/output/login.css" : ["login/src/**/*.css"] } },
			
        // ${home/lib} ${home/model} ${home/store}  ${home/view} ${home/controller} ${home/components}
        homeJs : { files: { "build/output/home.js" : [
        //        "shared/src/components/ext-4.1.2/model/NavItem.js",
        //		"shared/src/components/GlobalNavigation/src/extjs/model/*.js",
        "home/src/app/model/*.js",
        //		"shared/src/components/GlobalNavigation/src/extjs/store/Applications.js",
        //		"shared/src/components/GlobalNavigation/src/extjs/store/CurrentUsers.js",
        //        "shared/src/components/ext-4.1.2/store/Navigation.js",
        "home/src/app/store/*.js",
        //        "shared/src/components/ApplicationError/src/extjs/view/Dialog.js",
        //        "shared/src/components/ext-4.1.2/view/HoverMenu.js",
        //       "shared/src/components/ext-4.1.2/view/global/Navigation.js",
        //       "home/src/components/PageContent/src/*.js",
        //        "home/src/components/ChangePassword/src/*.js",
        "home/src/app/view/**/*.js",
        //        "shared/src/components/ext-4.1.2/controller/Error.js",
        //      "shared/src/components/ext-4.1.2/controller/Navigation.js",
        //        "shared/src/components/Instrumentation/**/*.js",
        "home/src/**/*.js",
        "!home/src/pages/account.js",
        ]}},
        homeCss : { files: { "build/output/home.css" : [
        "home/src/resources/css/*.css",
        "shared/src/components/ApplicationError/resources/css/Error.css",
        "shared/src/components/GlobalNavigation/resources/css/*.css",
        "home/src/components/PageContent/resources/css/PageContent.css",
        "home/src/components/ChangePassword/resources/css/ChangePassword.css"
        ]}}
    }

