Package.describe({
  name: 'fortawesome:fontawesome',
  summary: 'Font Awesome (official): 500+ scalable vector icons, customizable via CSS, Retina friendly',
  version: '4.5.0',
  git: 'https://github.com/MeteorPackaging/Font-Awesome.git',
  documentation: 'README.md'
});


Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.addAssets([
    // we bundle all font files, but the client will request only one of them via the CSS @font-face rule
    'upstream/fonts/fontawesome-webfont.eot',   // IE8 or older only understands EOT. IE9+ will read it too because it loads the first occurrence of `src`
    'upstream/fonts/fontawesome-webfont.svg',   // SVG fallback for iOS < 5 - http://caniuse.com/#feat=svg-fonts, http://stackoverflow.com/a/11002874/1269037
    'upstream/fonts/fontawesome-webfont.ttf',   // Android Browers 4.1, 4.3 - http://caniuse.com/#feat=ttf
    'upstream/fonts/fontawesome-webfont.woff',  // Most modern browsers
    'upstream/fonts/fontawesome-webfont.woff2', // Chrome 36+, Opera 23+; improves compression
    'upstream/fonts/FontAwesome.otf',
  ], 'client');

  api.addFiles([
    'upstream/css/font-awesome.css'
  ], 'client');
});


Package.onTest(function(api) {
  api.use('fortawesome:fontawesome');

  api.use([
    'http',
    'tinytest',
    'test-helpers'
  ], ['client']);

  api.add_files([
    'tests/tests.js',
  ], ['client']);
});
