# Twig Boilerplate

Twig Boilerplate as starting point for projects or prototypes.

<hr>

## Quick start

After you have installed all the dependecis on your machine you can start using the boilerplate:

1. Install all php dependencies (all dependencies are stored in the [composer.json](composer.json) file)<br> ``php composer install``
2. Install all js dependencies (all dependencies are stored in the [package.json](package.json) file)<br> ``npm install``
3. Run the gulp task <br> for development: ``gulp watch``<br> for production: ``gulp build``

<hr>

## Features

### Templating
* Twig Templating Engine
* YAML data parser


### Automated Taks

The following tasks are per default aviable (all tasks are defined in the file [gulpfile.js](gulpfile.js)):

##### Sass/CSS
* Compiles the Sass files to CSS ([gulp-sass](https://www.npmjs.com/package/gulp-sass))
* Adds vendor prefixes to all CSS, so there is no need to write -webkit- or -moz- etc. ([gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer))
* Combines all the mediaqueries in one place in the CSS file ([gulp-combnie-mq](https://www.npmjs.com/package/gulp-combine-mq))

##### JavaScript
* Modernizr: Add modernizr tests in the gulpfile to get the javascript and CSS classes ([gulp-modernizr](https://www.npmjs.com/package/gulp-modernizr))
* Detects errors in your JavaScript fiels ([gulp-jshint](https://www.npmjs.com/package/gulp-jshint))
* Concatenates all your JS-files
* Minify and uglify files ([gulp-uglify](https://www.npmjs.com/package/gulp-uglify))

##### Others
* YAML to JSON: build json files form your yaml files ([gulp-yaml](https://www.npmjs.com/package/gulp-yaml))
* Livereload on gulp watch ([gulp-livereload](https://www.npmjs.com/package/gulp-livereload))
* Adds file version extension to CSS and JS on gulp build ([gulp-html-replace](https://www.npmjs.com/package/gulp-html-replace))

<hr>

## How to use
You can use the following tasks in your console:

``gulp dev``<br>

``gulp watch``

``gulp build``

``gulp watchbuild``

##### dev / watch:
This tasks are just for development and is much faster than the build tasks. It includes the basic tasks such as Sass compilation, JS concatenating, yaml to json.
When you run the watch tasks it will also automatically run these tasks when files are editet (Sass, JS, YAML). It will also reload your Browser 
 
##### build / watchbuild:
This task will prepare your files for production. **Always run the "build"-task before you deploy something!** In addition to the dev task it adds the vendor prefixes, combines the mediaqueries, minifies your files, adds the version number, uglify the js files and removes the livereload (just in build, not in watchbuild).

<hr>

## Important

* Run ``gulp build`` before uploading live data
* Default settings are for Twig. If you need it for Fluid, you need to make changes on the [gulpfile](gulpfile.js).

