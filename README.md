[Font Awesome](http://fontawesome.io/) packaged for [Meteor.js](http://meteor.com).

Please note that starting with Meteor 1.3, you should be using npm packages directly.

Wrapper packages such as this one are now obsolete.

# Usage

Just run `meteor add fortawesome:fontawesome` in your project, then use the standard Font Awesome markup:

    <i class="fa fa-home"></i> Home


# Issues

If you encounter an issue while using this package, please CC @dandv when you file it in this repo.


# Building

1. `npm install` (or just `yarn`)
2. Edit `autopublish.json` and update the version number.
3. `node_modules/.bin/gulp getUpstream`
4. `node_modules/.bin/gulp updateVersion`

Now you can commit the updated `package.js` and `autopublish.json` (even though the latter is no longer useful after the [decommission of autopublish](https://github.com/MeteorPackaging/autopublish.meteor.com/issues/27)).

To test Font Awesome interactively, run

    node_modules/.bin/gulp test


# DONE

* No need for CSS override files - Meteor will automatically "convert relative URLs to absolute URLs when merging CSS files" [since v0.8.1](https://github.com/meteor/meteor/blob/b96c5d7962a9e59b9efaeb93eb81020e0548e378/History.md#v081) so CSS `@font-face src url('../fonts/...')` will be resolved to the correct `/packages/.../fonts/...` path
* Tests that fonts are downloadable: EOT, SVG, TTF, WOFF, WOFF2
* Visual check


# TODO

* [Read the `src/test.html` file into the test directly](http://stackoverflow.com/questions/27180892/pull-an-html-file-into-a-tinytest) instead of via rawgit - how to do this with TinyTest?
