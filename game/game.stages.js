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
    .next('instructions')
    .next('identifyFaces')
    .next('survey2')
    .next('survey1')
    .next('results')
    .next('end')
    .gameover();

    // Modify the stager to skip one stage.
    stager.skip([
        'instructions',
        // 'identifyFaces',
        'survey2',
        'survey1',
        'results',
        // 'end'
    ]);


    // To skip a step within a stage use:
    // stager.skip('stageName', 'stepName');
    // Notice: here all stages have just one step.

};
