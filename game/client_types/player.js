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

        // ------------ //

        node.game.dtd = undefined;

        node.on.data('LOGIC-dtd', function(msg) {

            node.game.dtd = msg.data;

            node.game.talk('CLIENT: DTD RECEIVED FROM LOGIC: ' + node.game.dtd);

        })

        node.say('dtd-LOGIC', 'SERVER');

        // ------------ //

        node.on('showTutoTimer', function() {

            node.game.visualTimer.show();

            node.game.visualTimer.restart({

                milliseconds: node.game.dtd,

                timeup: function(msg) {

                    console.log('do nothing just show');

                }

            })

        })

        node.on('hideTutoTimer', function() {

            node.game.visualTimer.hide();

        })

        node.on('stopTutoTimer', function() {

            node.game.visualTimer.gameTimer.pause();

            node.game.visualTimer.hide();

        })

        node.on('startTutoTimer', function(msg) {

            console.log('tutoTimer message: ' + msg);

            var myKey = msg;

            node.game.visualTimer.show();

            node.game.visualTimer.restart({

                milliseconds: node.game.dtd,

                timeup: function() {

                    node.game.visualTimer.hide();

                    node.emit('tutoTimeUp', myKey)

                }

            })

        })

        // ------------------------------------------------------ //
        // ------------ RECORDING TIME SPENT ON TUTO ------------ //
        // ------------------------------------------------------ //

        // 10 minutes length -> long enough to be used in any section
        node.game.secretTutoTimer = node.timer.create({

            milliseconds: 600000,

            update: 1000,

        })
        node.game.secretTutoTimer.start();

        node.on('HTML-startSecretTutoTimer', function() {

            node.game.secretTutoTimer.restart();

        })

        node.on('HTML-recordSecretTutoTimer', function() {

            var data = {};

            var timeLeft = node.game.secretTutoTimer.timeLeft;

            var timeSpent = 600000 - timeLeft;

            var timeSpent = Math.ceil(timeSpent / 1000);

            node.game.talk('RECORD TUTO TIME triggered from the html side. ' +
            'TIME LEFT: ' + timeLeft + ' TIME SPENT: ' + timeSpent);

            node.set({
                dataType:'time',
                tutoTime:timeSpent,
            })

        })

        // ------------------------------------------------------ //
        // ------------ RECORDING TIME SPENT ON EXP ------------- //
        // ------------------------------------------------------ //

        // 10 minutes length -> long enough to be used in any section
        node.game.secretExpTimer = node.timer.create({

            milliseconds: 6000000,

            update: 1000,

        })
        node.game.secretExpTimer.start();

        node.on('HTML-startSecretExpTimer', function() {

            node.game.secretExpTimer.restart();

        })

        node.on('HTML-recordSecretExpTimer', function() {

            var data = {};

            var timeLeft = node.game.secretExpTimer.timeLeft;

            var timeSpent = 6000000 - timeLeft;

            var timeSpent = Math.ceil(timeSpent / 1000);

            node.game.talk('RECORD EXP TIME triggered from the html side. ' +
            'TIME LEFT: ' + timeLeft + ' TIME SPENT: ' + timeSpent);

            node.set({
                dataType:'time',
                expTime:timeSpent,
            })

        })

        // -------------- //

        node.on('startTimer', function() {

            node.game.visualTimer.show();

            node.game.visualTimer.restart({

                milliseconds: node.game.dtd,

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

            // node.say('saveToCSV-LOGIC', 'SERVER');

            node.emit('HTML-recordSecretExpTimer');

            node.done();

        })


        node.on.data('LOGIC-results', function(msg) {

            let score = msg.data;

            node.emit('results-HTML', score);

        })


        node.on.data('LOGIC-requestDtd', function(msg) {

            node.game.talk('CLIENT: LOGIC-REQUESTDTD MSG RECEIVED: ' + msg.data)

            node.emit('requestDtd-HTML', msg.data)

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
                dataType:'decision',
                index:msg.index,
                answer:msg.answer,
                correct:msg.correct,
                dtd:node.game.dtd
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
                dataType:'decision',
                index:msg.index,
                answer:msg.answer,
                correct:msg.correct,
                dtd:node.game.dtd
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
                dataType:'decision',
                index:msg.index,
                answer:msg.answer,
                correct:msg.correct,
                dtd:node.game.dtd
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

        // ----------------- //

        node.on('HTML-endTuto', function() {

            node.game.talk('CLIENT SIDE: DONE WITH TUTO');

            node.done();

        })

        // ----------------- //

        node.on('HTML-requestDtd', function() {

            node.say('requestDtd-LOGIC', 'SERVER');

        })

    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm',
        cb: function() {
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
