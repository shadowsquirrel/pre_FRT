/**
 * # Game settings definition file
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    // Variables shared by all treatments.

    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    CONSENT: {

        EXP_TITLE: 'Identify Faces',

        EXP_PURPOSE: 'The purpose of the study is xyz.',

        EXP_DESCR: 'You will do xyz.',
        
        EXP_TIME: '12',

        EXP_MONEY: '$1.5 USD'
    },

    participationPayment: 1.5,
    bonusRate: 0.15,
    exitCode: 'XYZ123',

    treatments: {

        a: {
            description: "Batch - 1",
            dataSession:1
        },

        b: {
            description: "Batch - 2",
            dataSession:2
        },

        c: {
            description: "Batch - 3",
            dataSession:3
        }

    }


};
