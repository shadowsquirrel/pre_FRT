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
            var myLength = val + 'px!important';
            myframe.style.paddingRight = myLength;
        };

        // W.setRightPadding(125);

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

            this.talk('TUTORIAL TIMER STARTS');

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

            this.talk('SUBJECT SURVEY TIMER STARTS')

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

            this.talk('EXPERIENCE SURVEY 2 TIMER STARTS')

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

        // ------------------------------------------------------ //
        // ------------------- TIMERS FOR IBT ------------------- //
        // ------------------------------------------------------ //










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

        // receives the next picture from LOGIC and sends it to HTML
        node.on.data('LOGIC-nextPicture', function(msg) {

            node.game.talk('inside LOGIC-nextPicture')

            node.game.talk('INDEX RECEIVED: ' + msg.data)

            var myData = msg.data;

            node.emit('nextPicture-HTML', myData);

        })

        // receives the first picture from LOGIC and sends it to HTML
        node.on.data('LOGIC-firstPicture', function(msg) {

            if(msg.data.listIndex > 0) {

                node.game.talk(' --- PLAYER DISCONNECTED AND RECONNECTED, REQUESTING THE LAST PICTURE ---')

            } else {

                node.game.talk(' --- PLAYER REQUESTING FIRST PICTURE ---')

            }

            node.game.talk('PLAYER PAIR INDEX LIST INDEX: ' + msg.data.listIndex)
            node.game.talk('INDEX RECEIVED: ' + msg.data.index)



            var myData = msg.data;

            node.emit('firstPicture-HTML', myData);

        })

        // receives for the IBT trial paremeters from LOGIC
        node.on.data('LOGIC-IBT-trial', function(msg) {

            node.game.talk('Trial ICON: ' + msg.data.icon);
            node.game.talk('Trial PHOTO INDEX: ' + msg.data.photo);
            node.game.talk('Trial ADJ INDEX: ' + msg.data.adj)

            var myData = msg.data;

            node.emit('request-IBT-trial-HTML', myData);

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

            node.game.talk('DTD RECEIVED FROM LOGIC ' + msg.data)

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

        // html triggers this listener
        // this listener triggers logic listener
        // logic listener the above LOGIC-firstPicture listener
        // this process occurs the first time the subject starts the test
        // OR when the subject reconnects to continue from  the last picture unanswered
        node.on('HTML-requestFirstIndex', function() {

            this.talk('FIRST INDEX REQUEST RECEIVED FROM HTML TO CLIENT SIDE')

            node.say('requestFirstIndex-LOGIC', 'SERVER');

        })



        // ----------------- IBT request trial --------------------- //

        node.on('HTML-request-IBT-trial', function(msg) {

            node.say('request-IBT-trial-LOGIC', 'SERVER');

        })

        // ---------------- IBT decision listener and recorder ------------ //

        node.on('HTML-IBT-decisionMade', function(msg) {

            var data = msg;

            this.talk('');
            this.talk('');
            this.talk('');
            this.talk('-----------------  IBT Decision Data  -----------------');
            this.talk('');
            this.talk('');
            this.talk('answer: ' + data.answer);
            this.talk('adjective: ' + data.adjective);
            this.talk('');
            this.talk('--     --     --    --     --     --    --     --     --');
            this.talk('');
            this.talk('given Answer: ' + data.givenAnswer);
            this.talk('is answer relevant: ' + data.isAnswerRelevant);
            this.talk('is answer correct: ' + data.isAnswerCorrect);
            this.talk('');
            this.talk('--     --     --    --     --     --    --     --     --');
            this.talk('');
            this.talk('intro time duration: ' + data.introTimeDuration);
            this.talk('primer display duration: ' + data.primeDisplayDuration);
            this.talk('reaction time: ' + data.reactionTime)
            this.talk('');
            this.talk('');
            this.talk('');


            node.done({

                ibt_Icon: data.icon,
                ibt_PhotoIndex: data.photoIndex,
                ibt_IconIndex: data.iconIndex,
                ibt_AdjIndex: data.adjIndex,
                ibt_Adjective: data.adjective,

                ibt_Answer: data.givenAnswer,
                ibt_isAnswerRelevant: data.isAnswerRelevant,
                ibt_isAnswerCorrect: data.isAnswerCorrect,

                ibt_IntroTimeDuration: data.introTimeDuration,
                ibt_PrimerDisplayDuration: data.primeDisplayDuration,
                ibt_ReactionTime: data.reactionTime

            })

        })


        // ------------------------------------------------ //

        // activates logic listener to active client LOGIC-result
        // to record result data into memory upon request from HTML side
        // notice that the score is calculated in the LOGIC and sent back here
        // -to be displayed in the HTML
        // -to be recorded in the memory by triggering the respective memory listener
        node.on('HTML-results', function() {

            node.say('results-LOGIC', 'SERVER');

        })


        // ----------------- survey 1 --------------------- //

        node.on('HTML-surveyResults', function(msg) {

            this.talk('SURVEY RESULTS RECEIVED')
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


        // ----------------- survey 2 --------------------- //

        node.on('HTML-survey2Results', function(msg) {

            this.talk('SURVEY 2 RESULTS RECEIVED')
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




        // -------- dtd requester for any stage ------- //

        // request decision time duration upon request by html
        // use at will for memory recording at different stages
        node.on('HTML-requestDtd', function() {

            this.talk('HTML REQUESTED DTD');
            this.talk('PASSING THE REQUEST TO LOGIC');

            node.say('requestDtd-LOGIC', 'SERVER');

        })




        // ---------------------------------- //
        // -------- HTML --> CLIENT --------- //
        // ---------------------------------- //


        // -------------- ENDERS ---------------- //

        node.on('HTML-endTuto', function() {

            node.game.talk('CLIENT SIDE: DONE WITH TUTO');

            node.done();

        })

        node.on('HTML-endResults', function() {

            node.game.talk('CLIENT SIDE: DONE WITH RESULTS');

            node.done();

        })


        // ------- BUTTON POSITION & DTD INITIATER ------- //

        node.game.buttonTop = undefined;

        node.game.dtd = undefined;

        node.on.data('LOGIC-init', function(msg) {

            this.talk('inside LOGIC-init')
            this.talk('BUTTON POSITION AND DTD RECEIVED')
            this.talk('BUTTON TOP: ' + msg.data.bp);
            this.talk('DTD: ' + msg.data.dtd);

            node.game.buttonTop = msg.data.bp;
            node.game.dtd = msg.data.dtd;

            this.talk('node.game.buttonTop: ' + node.game.buttonTop);
            this.talk('node.game.dtd: ' + node.game.dtd);
            this.talk('-------------')

        })

        node.say('init-LOGIC', 'SERVER');

        // Alternative method to retrieve the data
        node.get('mySetup', function(myInfo) {

            this.talk('inside node.get')
            this.talk('button top: ' + myInfo.bt);
            this.talk('dtd: ' + myInfo.dtd)

            if(node.game.buttonTop === undefined) {
                this.talk('redefining buttonTop');
                node.game.buttonTop = myInfo.bt;
                this.talk('buttonTop: ' + node.game.buttonTop);
            } else {
                this.talk('buttonTop is already defined -> ' + node.game.buttonTop);
            }

            if(node.game.dtd === undefined) {
                this.talk('redefining dtd');
                node.game.dtd = myInfo.dtd;
                this.talk('dtd: ' + node.game.dtd);
            } else {
                this.talk('dtd is already defined -> ' + node.game.dtd);
            }

        })


        // -- test -- //

        node.on.data('LOGIC-rnd', function(msg) {
            this.talk('RND NUMBER -> ' + msg.data);
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

    stager.extendStep('IBT', {
        // frame: 'ibt.htm',
        frame: 'ibt_alt.htm',
        cb: function() {
            this.talk('--------- IMPLICIT BIAS TEST ----------')
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
