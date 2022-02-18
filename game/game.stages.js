/**
 * # Game stages definition file
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {

    // hidden step is used to determine player related variables
    // these variables are then used to determine the respective html file for the client to load
    // For reconnecting players this may potentially be an issue
    // potentially we may need to define more hidden steps between every step

    stager
    .next('hiddenStep')
    // .next('testStep')
    .next('instructions')
    .next('identifyFaces')
    .next('survey2')
    .repeat('IBT', 60)
    .next('results')
    .next('survey1')
    .next('end')
    .gameover();

    // Modify the stager to skip one stage.
    stager.skip('hiddenStep');
    stager.skip('testStep');
    stager.skip('instructions');
    stager.skip('identifyFaces');
    stager.skip('survey2');
    // stager.skip('IBT');
    // stager.skip('results');
    // stager.skip('survey1');
    // stager.skip('end');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.

};
