[Font Awesome](http://fontawesome.io/) packaged for [Meteor.js](http://meteor.com).

# Usage

Just run `meteor add fortawesome:fontawesome` in your project, then use the standard Font Awesome markup:

    <i class="fa fa-home"></i> Home


# Issues

If you encounter an issue while using this package, please CC @dandv when you file it in this repo.


# Building

The package is driven by the `scripts` section in [package.json](package.json). To see the available scripts, run

    npm run

For example, to test Font Awesome interactively, run

    npm run test

You'll see the Tinytest UI at http://localhost:3000.

For CI, run

    npm run testci


# DONE

* No need for CSS override files - Meteor will automatically "convert relative URLs to absolute URLs when merging CSS files" [since v0.8.1](https://github.com/meteor/meteor/blob/b96c5d7962a9e59b9efaeb93eb81020e0548e378/History.md#v081) so CSS `@font-face src url('../fonts/...')` will be resolved to the correct `/packages/.../fonts/...` path
* Tests that fonts are downloadable: EOT, SVG, TTF, WOFF, WOFF2
* Visual check


# TODO

* [Read the `src/test.html` file into the test directly](http://stackoverflow.com/questions/27180892/pull-an-html-file-into-a-tinytest) instead of via rawgit - how to do this with TinyTest?
