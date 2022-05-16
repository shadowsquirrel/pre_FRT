/**
 * # Game setup
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * This file includes settings that are shared amongst all client types
 *
 * Setup settings are passed by reference and can be modified globally
 * by any instance executing on the server (but not by remote instances).
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = function(settings, stages) {

    var setup;
    setup = {};

    // setup.debug = true;

    // production setup is false
    setup.debug = false;

    // setup.verbosity = 1;

    // production setup is 0
    setup.verbosity = 0;

    setup.window = {

        // this is dynamic so we can leave it but for educational purposes we comment it
        // and rewrite it below for the production setup
        promptOnleave: !setup.debug,

        // production setup
        // Block right-clicking.
        // disableRightClick: true,
        // Display a message if a user tries to close the browser.
        promptOnleave: true,
        // Disable the back button.
        disableBackButton: true
    };

    // Metadata.
    // By default are as in package.json, but can be overwritten.
    //
    // setup.metadata = {
    //    name: 'another name',
    //    version: 'another version',
    //    description: 'another descr'
    // };

    // Environment variables. Can be retrieved via `node.env('foo')`,
    // or be used to conditionally execute a function:
    // `node.env('foo', function(foo) { ... })`.
    //
    // setup.env = {
    //    foo: false
    // };

    return setup;
};
