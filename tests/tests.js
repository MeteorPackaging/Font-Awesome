/* global
  document: false,
  HTTP: false,
  Tinytest: false
*/
'use strict';

var fontAssets = [
  'fontawesome-webfont.eot',
  'fontawesome-webfont.svg',
  'fontawesome-webfont.ttf',
  'fontawesome-webfont.woff',
  'fontawesome-webfont.woff2',
  'FontAwesome.otf',
];

// Check that the font files are downloadable. Meteor places assets at /packages/<packageName>/.
fontAssets.forEach(function (filename) {
    Tinytest.addAsync(filename + ' font is shipped', function (test, done) {
      var path = '/packages/fortawesome_fontawesome/upstream/fonts/' + filename;
      HTTP.get(path, function callback(error, result) {
        if (error) {
          test.fail({message: 'Font failed to load'});
        }
        else {
          var errStr = filename + ' font could not be downloaded';
          console.dir(result);
          test.isTrue(result.content.length > 1000, errStr);
        }
        done();
      });
    });
  })
;


// Visual check.
// Fonts are set by font-awesome.css in @font-face { src: url('../fonts/...') }.
// TODO How does Meteor find those occurrences in the source and resolve them
//      to /packages/<packageName>/fonts/... ?
Tinytest.addAsync('Visual check', function (test, done) {
  var iconsDropZone = document.createElement('div');
  document.body.appendChild(iconsDropZone);


  // TODO ideally we'd get src/test.html straight from this repo, but no idea
  //      how to do this from TinyTest
  HTTP.get('http://rawgit.com/FortAwesome/Font-Awesome/master/src/test.html', function callback(error, result) {
    if (error) {
      test.fail('Error getting the icons. Do we have an Internet connection to rawgit.com?');
    } else {
      // [^] matches across newlines. Exclude the Stacked Icons section and below, because they transclude some other HTML.
      iconsDropZone.innerHTML = result.content.match(/<section[^]+(?=<h3>Stacked)/);
      test.ok({message: 'Test passed if the icons look OK.'});
    }

    done();
  });

});
