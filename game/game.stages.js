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

    stager
    .next('hiddenStep')
    .next('testStep')
    .next('instructions')
    .next('identifyFaces')
    .next('survey2')
    .next('results')
    .next('survey1')
    .next('end')
    .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('hiddenStep');
    stager.skip('testStep');
    // stager.skip('instructions');
    // stager.skip('identifyFaces');
    // stager.skip('survey2');
    // stager.skip('results');
    // stager.skip('survey1');
    // stager.skip('end');

    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.

};
