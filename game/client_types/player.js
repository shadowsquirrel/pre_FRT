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

        W.setHeight = function(val) {
            var myframe = W.gid('ng_mainframe');
            var myHeight = val + 'px';
            myframe.style.minHeight = myHeight;
        };

        node.on('setHeight', function(val) {
            W.setHeight(val);
        });


        // for debug
        this.talk = function(msg){
            node.say('debug', 'SERVER', msg);
        };

        // No need to show the wait for other players screen in single-player
        // games.
        W.init({ waitScreen: false });

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

            this.talk('CLIENT: TUTORIAL TIMER STARTS');

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

        // ------------------------------------------------------ //
        // ------------ RECORDING TIME SPENT ON SURVEY ---------- //
        // ------------------------------------------------------ //

        // 10 minutes length -> long enough to be used in any section
        node.game.secretSurveyTimer = node.timer.create({

            milliseconds: 6000000,

            update: 1000,

        })
        node.game.secretSurveyTimer.start();

        node.on('HTML-startSecretSurveyTimer', function() {

            this.talk('CLIENT: SUBJECT SURVEY TIMER STARTS')

            node.game.secretSurveyTimer.restart();

        })

        node.on('HTML-recordSecretSurveyTimer', function() {

            var data = {};

            var timeLeft = node.game.secretSurveyTimer.timeLeft;

            var timeSpent = 6000000 - timeLeft;

            var timeSpent = Math.ceil(timeSpent / 1000);

            node.game.talk('RECORD SURVEY TIME triggered from the html side. ' +
            'TIME LEFT: ' + timeLeft + ' TIME SPENT: ' + timeSpent);

            node.set({
                dataType:'time',
                surveyTime:timeSpent,
            })

        })

        // ------------------------------------------------------ //
        // ------------ RECORDING TIME SPENT ON SURVEY 2 -------- //
        // ------------------------------------------------------ //

        // 10 minutes length -> long enough to be used in any section
        node.game.secretSurvey2Timer = node.timer.create({

            milliseconds: 6000000,

            update: 1000,

        })
        node.game.secretSurvey2Timer.start();

        node.on('HTML-startSecretSurvey2Timer', function() {

            this.talk('CLIENT: EXPERIENCE SURVEY 2 TIMER STARTS')

            node.game.secretSurvey2Timer.restart();

        })

        node.on('HTML-recordSecretSurvey2Timer', function() {

            var data = {};

            var timeLeft = node.game.secretSurvey2Timer.timeLeft;

            var timeSpent = 6000000 - timeLeft;

            var timeSpent = Math.ceil(timeSpent / 1000);

            node.game.talk('RECORD SURVEY 2 TIME triggered from the html side. ' +
            'TIME LEFT: ' + timeLeft + ' TIME SPENT: ' + timeSpent);

            node.set({
                dataType:'time',
                surveyTime2:timeSpent,
            })

        })

        // -------------------------------------- //
        // -------------------------------------- //
        // -------------------------------------- //

        node.on('startTimer', function() {

            node.game.visualTimer.show();

            node.game.visualTimer.restart({

                milliseconds: node.game.dtd,

                timeup: function() {

                    node.game.visualTimer.hide();

                    node.emit('timeUp');

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

        // asks for the next picture from LOGIC
        node.on.data('LOGIC-nextPicture', function(msg) {

            node.game.talk('inside LOGIC-nextPicture')

            node.game.talk('INDEX RECEIVED: ' + msg.data)

            var myData = msg.data;

            node.emit('nextPicture-HTML', myData);

        })

        // asks for the first picture from LOGIC
        node.on.data('LOGIC-firstPicture', function(msg) {

            node.game.talk('inside LOGIC-firstPicture')

            node.game.talk('INDEX RECEIVED: ' + msg.data.index)

            var myData = msg.data;

            node.emit('firstPicture-HTML', myData);

        })

        // called by logic by either:
        // - diffperson-LOGIC
        // - samePerson-LOGIC
        // - noAnswer-LOGIC
        // when there are no more facial image pairs to ask
        // also triggers LOGIC side calculate score to calculate score in LOGIC side
        node.on.data('LOGIC-finishTest', function() {

            node.game.talk('CLIENT SIDE: DONE WITH FACE TEST');

            node.say('calculateScore-LOGIC', 'SERVER');

            node.emit('HTML-recordSecretExpTimer');

            node.done();

        })

        // the calculator score from the experiment is requested from LOGIC
        // at any time by CLIENT upon reqiest to be saved to memory or for something else
        node.on.data('LOGIC-results', function(msg) {

            let score = msg.data;

            node.emit('results-HTML', score);

            node.set({
                score: score
            })

        })

        node.on.data('LOGIC-requestDtd', function(msg) {

            node.game.talk('CLIENT: DTD RECEIVED FROM LOGIC ' + msg.data)

            node.emit('requestDtd-HTML', msg.data)

        })


        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      HTML --> LOGIC      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        // ---- decision listener and recorder ---- //

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
                dtd:node.game.dtd,
                bt:node.game.buttonTop
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
                dtd:node.game.dtd,
                bt:node.game.buttonTop
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
                dtd:node.game.dtd,
                bt:node.game.buttonTop
            })

            node.say('noAnswer-LOGIC', 'SERVER');

        })


        // ---- first index listener and requester ---- //

        node.on('HTML-requestFirstIndex', function() {

            this.talk('FIRST INDEX REQUEST RECEIVED FROM HTML TO CLIENT SIDE')

            node.say('requestFirstIndex-LOGIC', 'SERVER');

        })

        // activates logic listener to active client LOGIC-result
        // to record result data into memory upon request from HTML side
        node.on('HTML-results', function() {

            node.say('results-LOGIC', 'SERVER');

        })

        // survey 1
        node.on('HTML-surveyResults', function(msg) {

            this.talk('CLIENT: SURVEY RESULTS RECEIVED')
            this.talk(msg.age);
            this.talk(msg.education);
            this.talk(msg.employment);
            this.talk(msg.gender);
            this.talk(msg.location);
            this.talk(msg.race);
            this.talk(msg.knowledgeAI);
            this.talk(msg.supportAI);
            this.talk(msg.ladder)
            this.talk('----------------')

            node.done({
                dataType:'survey',
                age:msg.age,
                education:msg.education,
                employment:msg.employment,
                gender:msg.gender,
                location:msg.location,
                race:msg.race,
                knowledgeAI:msg.knowledgeAI,
                supportAI:msg.supportAI,
                ladder:msg.ladder
            })

        })

        // survey 2
        node.on('HTML-survey2Results', function(msg) {

            this.talk('CLIENT: SURVEY 2 RESULTS RECEIVED')
            this.talk('tutorial ' + msg.tutorial);
            this.talk('enought time ' + msg.enoughTime);
            this.talk('need more time ' + msg.needMoreTime);
            this.talk('decision screen ' + msg.decisionScreen);
            this.talk('image size ' + msg.imageSize);
            this.talk('button placement ' + msg.buttonPlacement);
            this.talk('num of images tired ' + msg.numOfImages_tired);
            this.talk('num of images bored ' + msg.numOfImages_bored);
            this.talk('display time duration ' + msg.dtd)
            this.talk('----------------')

            node.done({
                tutorial:msg.tutorial,
                enoughTime:msg.enoughTime,
                needMoreTime:msg.needMoreTime,
                decisionScreen:msg.decisionScreen,
                imageSize:msg.imageSize,
                buttonPlacement:msg.buttonPlacement,
                numOfImages_tired:msg.numOfImages_tired,
                numOfImages_bored:msg.numOfImages_bored,
                dtd:msg.dtd
            })

        })

        // request decision time duration upon request by html
        // use at will for memory recording at different stages
        node.on('HTML-requestDtd', function() {

            this.talk('CLIENT: HTML REQUESTED DTD')

            node.say('requestDtd-LOGIC', 'SERVER');

        })


        // ---------------------------------- //
        // -------- HTML --> CLIENT --------- //
        // ---------------------------------- //

        node.on('HTML-endTuto', function() {

            node.game.talk('CLIENT SIDE: DONE WITH TUTO');

            node.done();

        })

        node.on('HTML-endResults', function() {

            node.game.talk('CLIENT SIDE: DONE WITH RESULTS');

            node.done();

        })


        // ------- BUTTON POSITION & DTD ------- //

        node.game.buttonTop = undefined;

        node.game.dtd = undefined;

        node.on.data('LOGIC-init', function(msg) {

            this.talk('CLIENT: inside LOGIC-init')
            this.talk('CLIENT: BUTTON POSITION AND DTD RECEIVED')
            this.talk('BUTTON TOP: ' + msg.data.bp);
            this.talk('DTD: ' + msg.data.dtd);

            node.game.buttonTop = msg.data.bp;
            node.game.dtd = msg.data.dtd;

            this.talk('node.game.buttonTop: ' + node.game.buttonTop);
            this.talk('node.game.dtd: ' + node.game.dtd);
            this.talk('-------------')

        })

        node.say('init-LOGIC', 'SERVER');


        // -- test -- //

        node.on.data('LOGIC-rnd', function(msg) {
            this.talk('CLIENT: RND NUMBER -> ' + msg.data);
        })
        node.say('rnd-LOGIC', 'SERVER');

        // --      -- //


    });

    // -------- TESTING STAGE --------- //

    stager.extendStep('hiddenStep', {
        frame: 'hiddenStep.htm',
        cb: function() {
            node.done();
        },
    });

    stager.extendStep('testStep', {

        frame: function() {

            if(!node.game.buttonTop) {
                return 'test1.htm';
            } else {
                return 'test2.htm';
            }

        },

        cb: function() {
            this.talk('------- TEST STEP ---------')
            this.talk('node.game.buttonTop: ' + node.game.buttonTop);
            this.talk('node.game.dtd: ' + node.game.dtd);
            this.talk('---------------------------')
            node.done();
        }

    });

    stager.extendStep('instructions', {

        frame: function() {
            if(node.game.buttonTop) {
                return 'instructions_alt.htm';
            } else {
                return 'instructions.htm';
            }
        },

        cb: function() {
            this.talk('------- INSTRUCTION ---------')
            this.talk('node.game.buttonTop: ' + node.game.buttonTop);
            this.talk('node.game.dtd: ' + node.game.dtd);
            this.talk('---------------------------')
        }

    });

    stager.extendStep('identifyFaces', {

        frame: function() {
            if(node.game.buttonTop) {
                return 'identifyFaces_alt.htm';
            } else {
                return 'identifyFaces.htm';
            }
        },

        cb: function() {
            this.talk('---------- IDENTIFY FACES ----------');
            this.talk('node.game.buttonTop: ' + node.game.buttonTop);
            this.talk('node.game.dtd: ' + node.game.dtd);
            this.talk('---------------------------')
        },


    });

    stager.extendStep('survey2', {
        frame: 'survey2.htm',
        cb: function() {
            this.talk('--------- EXPERIENCE SURVEY ----------')
        }
    });

    stager.extendStep('results', {
        frame: 'resultScreen.htm',
        cb: function() {
            this.talk('------------- RESULT SCREEN --------------')
        }
    });

    stager.extendStep('survey1', {
        frame: 'survey1.htm',
        cb: function() {
            this.talk('--------------- SUBJECT SURVEY ----------------')
        },
        done: function() {

            node.say('showMemory', 'SERVER');
            node.say('saveTimeMemory', 'SERVER');

        }
    });

    stager.extendStep('end', {
        frame:'simpleEnd.htm',
        // widget: 'EndScreen',
        // init: function() {
        //     node.game.visualTimer.destroy();
        //     node.game.doneButton.destroy();
        // }
    });

};
