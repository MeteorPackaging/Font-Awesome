// Package metadata file for Meteor.js. Maintainer: @dandv.
'use strict';

var packageName = 'fortawesome:fontawesome';  // http://atmospherejs.com/fortawesome/fontawesome
var gitHubPath = 'FortAwesome/Font-Awesome';  // https://github.com/FortAwesome/Font-Awesome
var npmPackageName = 'font-awesome';  // https://www.npmjs.com/package/font-awesome - optional but recommended; used as fallback if GitHub fails
var where = 'client';  // where to install: 'client' or 'server'. For both, pass nothing.

/* All of the below is just to get the version number of the 3rd party library.
 * First we'll try to read it from package.json. This works when publishing or testing the package
 * but not when running an example app that uses a local copy of the package because the current 
 * directory will be that of the app, and it won't have package.json. Find the path of a file is hard:
 * http://stackoverflow.com/questions/27435797/how-do-i-obtain-the-path-of-a-file-in-a-meteor-package
 * Therefore, we'll fall back to GitHub, and then to NPMJS.
 * We also don't have the HTTP package at this stage, and if we use Package.* in the request() callback,
 * it will error that it must be run in a Fiber. So we'll use Node futures.
 */
var request = Npm.require('request');
var Future = Npm.require('fibers/future');

var fut = new Future;
var version;

try {
  var packageJson = JSON.parse(Npm.require('fs').readFileSync('Font-Awesome/package.json'));
  version = packageJson.version;
} catch (e) {
  // if the file was not found, fall back to GitHub
  console.warn('Could not find package.json to read version number from; trying GitHub...');
  var url = 'https://api.github.com/repos/' + gitHubPath + '/tags';
  request.get({
    url: url,
    headers: {
      'User-Agent': 'request'  // GitHub requires it
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var version = JSON.parse(body)[0]['name'];  // e.g. "v4.3.0"
      fut.return(version.replace(/^\D+/, ''));  // trim leading non-digits
    } else {
      // GitHub API rate limit reached? Fall back to npmjs.
      console.warn('GitHub request to', url, 'failed:\n ', response && response.statusCode, response && response.body, error || '', '\nTrying NPMJS...');
      url = 'http://registry.npmjs.org/' + npmPackageName + '/latest';
      request.get(url, function (error, response, body) {
        if (!error && response.statusCode === 200)
          fut.return(JSON.parse(body).version);
        else
          fut.throw('Could not get version information from ' + url + ' either (incorrect package name?):\n' + (response && response.statusCode || '') + (response && response.body || '') + (error || ''));
      });
    }
  });

  version = fut.wait();
}

// Now that we finally have an accurate version number...
Package.describe({
  name: packageName,
  summary: 'Font Awesome (official): 500+ scalable vector icons, customizable via CSS, Retina friendly',
  version: version,
  git: 'https://github.com/MeteorPackaging/Font-Awesome.git',
  documentation: 'README.md'
});


Package.onUse(function (api) {
  api.addFiles([
    // we bundle all font files, but the client will request only one of them via the CSS @font-face rule
    'Font-Awesome/fonts/fontawesome-webfont.eot',   // IE8 or older only understands EOT. IE9+ will read it too because it loads the first occurrence of `src`
    'Font-Awesome/fonts/fontawesome-webfont.svg',   // SVG fallback for iOS < 5 - http://caniuse.com/#feat=svg-fonts, http://stackoverflow.com/a/11002874/1269037
    'Font-Awesome/fonts/fontawesome-webfont.ttf',   // Android Browers 4.1, 4.3 - http://caniuse.com/#feat=ttf
    'Font-Awesome/fonts/fontawesome-webfont.woff',  // Most modern browsers
    'Font-Awesome/fonts/fontawesome-webfont.woff2', // Chrome 36+, Opera 23+; improves compression

    'Font-Awesome/css/font-awesome.css'
  ], where);
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);

  // TODO we should just bring in src/test.html, but how? http://stackoverflow.com/questions/27180892/pull-an-html-file-into-a-tinytest
  api.addFiles('test.js', where);
});
