/**
 * # Player type implementation of the game stages
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    // Make the player step through the steps without waiting for other players.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    stager.setOnInit(function() {

        // Initialize the client.

        var header;

        // Setup page: header + frame.
        header = W.generateHeader();
        W.generateFrame();

        // Add widgets.
        this.visualTimer = node.widgets.append('VisualTimer', header, {
            hidden: true // Initially hidden.
        });
        this.doneButton = node.widgets.append('DoneButton', header);
        this.doneButton.hide();

        W.setRightPadding = function(val) {
            var myframe = W.gid('ng_mainframe');
            var myLength = val + 'px';
            myframe.style.paddingRight = myLength;
        };

        W.setRightPadding(125);

        W.setHeaderPosition('right');


        // for debug
        this.talk = function(msg){
            node.say('debug', 'SERVER', msg);
        };

        // No need to show the wait for other players screen in single-player
        // games.
        W.init({ waitScreen: false });


        node.on('startTimer', function() {

            node.game.visualTimer.show();

            node.game.visualTimer.restart({

                milliseconds: 5000,

                timeup: function() {

                    node.game.visualTimer.hide();

                    node.emit('timeUp')

                }

            })

        })

        node.on('stopTime', function() {

            node.game.visualTimer.gameTimer.pause();

            node.game.visualTimer.hide();

        })

        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // --------------------------  HIGHWAY  ----------------------------- //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //


        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      LOGIC --> HTML      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        node.on.data('LOGIC-nextPicture', function(msg) {

            node.game.talk('inside LOGIC-nextPicture')

            node.game.talk('INDEX RECEIVED: ' + msg.data)

            var myData = msg.data;

            node.emit('nextPicture-HTML', myData);

        })


        node.on.data('LOGIC-firstPicture', function(msg) {

            node.game.talk('inside LOGIC-firstPicture')

            node.game.talk('INDEX RECEIVED: ' + msg.data)

            var myData = msg.data;

            node.emit('firstPicture-HTML', myData);

        })


        node.on.data('LOGIC-finishTest', function() {

            node.game.talk('CLIENT SIDE: DONE WITH FACE TEST');

            node.say('calculateScore-LOGIC', 'SERVER');

            node.done();

        })

        node.on.data('LOGIC-results', function(msg) {

            let score = msg.data;

            node.emit('results-HTML', score);

        })



        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      HTML --> LOGIC      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        node.on('HTML-samePerson', function(msg) {

            this.talk('HTML SAME PERSON RESPONSE RECEIVED BY CLIENT')

            this.talk('MESSAGE RECEIVED')
            this.talk(msg.index)
            this.talk(msg.answer)
            this.talk(msg.correct)
            this.talk('------------')

            node.set({
                index:msg.index,
                answer:msg.answer,
                correct:msg.correct
            })

            node.say('samePerson-LOGIC', 'SERVER');



        })

        node.on('HTML-diffPerson', function(msg) {

            this.talk('HTML DIFF PERSON RESPONSE RECEIVED BY CLIENT')

            this.talk('MESSAGE RECEIVED')
            this.talk(msg.index)
            this.talk(msg.answer)
            this.talk(msg.correct)
            this.talk('------------')

            node.set({
                index:msg.index,
                answer:msg.answer,
                correct:msg.correct
            })

            node.say('diffPerson-LOGIC', 'SERVER');

        })

        node.on('HTML-timeUp', function(msg) {

            this.talk('TIME IS UP')

            this.talk('MESSAGE RECEIVED')
            this.talk(msg.index)
            this.talk(msg.answer)
            this.talk(msg.correct)
            this.talk('------------')

            node.set({
                index:msg.index,
                answer:msg.answer,
                correct:msg.correct
            })

            node.say('noAnswer-LOGIC', 'SERVER');

        })

        node.on('HTML-requestFirstIndex', function() {

            this.talk('FIRST INDEX REQUEST RECEIVED FROM HTML TO CLIENT SIDE')

            node.say('requestFirstIndex-LOGIC', 'SERVER');

        })

        node.on('HTML-results', function() {

            node.say('results-LOGIC', 'SERVER');

        })

    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm',
        cb: function() {
            var s;
            // Note: we need to specify node.game.settings,
            // and not simply settings, because this code is
            // executed on the client.
            s = node.game.settings;
            // Replace variables in the instructions.
            W.setInnerHTML('coins', s.COINS);
            W.setInnerHTML('rounds', s.ROUNDS);
            W.setInnerHTML('exchange-rate', (s.COINS * s.EXCHANGE_RATE));
        }
    });

    stager.extendStep('quiz', {
        cb: function() {
            // Modify CSS rules on the fly.
            W.cssRule('.choicetable-left, .choicetable-right ' +
                      '{ width: 200px !important; }');

            W.cssRule('table.choicetable td { text-align: left !important; ' +
                      'font-weight: normal; padding-left: 10px; }');
        },

        // Make a widget step.
        widget: {
            name: 'ChoiceManager',
            id: 'quiz',
            options: {
                mainText: 'Answer the following questions to check ' +
                          'your understanding of the game.',
                forms: [
                    {
                        name: 'ChoiceTable',
                        id: 'howmany',
                        mainText: 'How many players are there in this game? ',
                        choices: [ 1, 2, 3 ],
                        correctChoice: 0
                    },
                    {
                        name: 'ChoiceTable',
                        id: 'coins',
                        mainText: 'How many coins can you win in each round?',
                        choices: [
                            settings.COINS,
                            settings.COINS + 100,
                            settings.COINS + 25,
                            'Not known'
                        ],
                        correctChoice: 0
                    }
                ],
                // Settings here apply to all forms.
                formsOptions: {
                    shuffleChoices: true
                }
            }
        }
    });

    stager.extendStep('identifyFaces', {

        frame: 'identifyFaces.htm',

        init: function() {

        },

        cb: function() {

        },

        done: function() {

        },

    });

    stager.extendStep('results', {
        frame: 'resultScreen.htm',
        cb: function() {
            node.game.talk('--------- RESULTS ---------')
        }
    });

    stager.extendStep('end', {
        widget: 'EndScreen',
        init: function() {
            node.game.visualTimer.destroy();
            node.game.doneButton.destroy();
        }
    });
};
