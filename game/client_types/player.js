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
        // this.doneButton = node.widgets.append('DoneButton', header);
        // this.doneButton.hide();

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

        this.showMemo = (key) => {
            node.say('showMemory', 'SERVER', key);
        }

        // No need to show the wait for other players screen in single-player
        // games.
        W.init({ waitScreen: false });


        // ------- TIME UP WARN ------ //
        node.game.warn5 = function() {

            var delay = 700;
            var myNgHeader = document.getElementById('ng_header');
            var myNgTimer = document.getElementsByClassName('no-panel-heading')[0]

            // general setup for animation
            myNgHeader.style.transition = '0.75s';
            myNgHeader.style.transformOrigin = 'right top';
            myNgTimer.style.transition = '0.75s';

            // start the animation
            myNgTimer.style.backgroundColor = 'red';
            myNgHeader.style.backgroundColor = 'red';
            myNgHeader.style.transform = 'scale(1.05)';
            // myNgHeader.style.boxShadow = 'red 0px 0px 20px 20px';
            // myNgHeader.style.border = '1px solid red';

            setTimeout(()=>{
                myNgTimer.style.backgroundColor = 'transparent';
                myNgHeader.style.backgroundColor = 'transparent';
                myNgHeader.style.transform = 'scale(1)';
                // myNgHeader.style.boxShadow = 'transparent 0px 0px 20px 20px';
                // myNgHeader.style.border = '1px solid transparent';
            }, delay)

            setTimeout(()=>{
                myNgTimer.style.backgroundColor = 'red';
                myNgHeader.style.backgroundColor = 'red';
                myNgHeader.style.transform = 'scale(1.05)';
                // myNgHeader.style.boxShadow = 'red 0px 0px 20px 20px';
                // myNgHeader.style.border = '1px solid red';
            }, 2 * delay)

            setTimeout(()=>{
                myNgTimer.style.backgroundColor = 'transparent';
                myNgHeader.style.backgroundColor = 'transparent';
                myNgHeader.style.transform = 'scale(1)';
                // myNgHeader.style.boxShadow = 'transparent 0px 0px 20px 20px';
                // myNgHeader.style.border = '1px solid transparent';
            }, 3 * delay)

            setTimeout(()=>{
                myNgTimer.style.backgroundColor = 'red';
                myNgHeader.style.backgroundColor = 'red';
                myNgHeader.style.transform = 'scale(1.05)';
                // myNgHeader.style.boxShadow = 'red 0px 0px 20px 20px';
                // myNgHeader.style.border = '1px solid red';
            }, 4 * delay)

            setTimeout(()=>{
                myNgTimer.style.backgroundColor = 'transparent';
                myNgHeader.style.backgroundColor = 'transparent';
                myNgHeader.style.transform = 'scale(1)';
                // myNgHeader.style.boxShadow = 'transparent 0px 0px 20px 20px';
                // myNgHeader.style.border = '1px solid transparent';
            }, 5 * delay)


        }

        node.on('timeUp-warn', function() {
            node.game.warn5();
        })

        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ---------------------------  TIMERS  ----------------------------- //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //
        // -   - -   - -   - -   - -   - -   - -   - -   - -   - -   - -   -  //
        // ------------------------------------------------------------------ //

        // ------- DECISION DURATION TIME ------ //

        node.game.dtd = 6000;

        // ------------------------------------------------ //
        // ------ TUTORIAL SHOW HIDE START STOP TIMER------ //
        // ------------------------------------------------ //

        node.on('justShowTutoTimer', function() {

            // node.game.visualTimer.gameTimer = 11;
            node.game.visualTimer.show();

            // node.game.visualTimer.restart({
            //
            //     milliseconds: node.game.dtd,
            //
            //     timeup: function(msg) {
            //
            //         console.log('do nothing just show');
            //
            //     }
            //
            // })

            node.game.visualTimer.startWaiting({
                milliseconds:node.game.dtd,
            });

        })

        node.on('showTutoTimer', function() {

            node.game.visualTimer.show();

            node.game.visualTimer.restart({

                milliseconds: node.game.dtd,

                timeup: function(msg) {

                    console.log('do nothing just show');
                    node.game.warn5();

                }

            })

        })

        node.on('hideTutoTimer', function() {

            node.game.visualTimer.hide();
            var myNgHeader = document.getElementById('ng_header');
            myNgHeader.style.display = 'none';

        })

        node.on('displayTutoTimer', function() {
            var myNgHeader = document.getElementById('ng_header');
            myNgHeader.style.display = 'flex';
        })

        node.on('killTutoTimer', function() {
            var myNgHeader = document.getElementById('ng_header');
            myNgHeader.style.display = 'none';
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


                    node.game.warn5();
                    node.emit('tutoTimeUp', myKey)


                    // this will be added to other ones perhaps
                    // node.game.visualTimer.hide();

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

        // receives the next picture from LOGIC and sends it to HTML
        node.on.data('LOGIC-nextPicture', function(msg) {

            node.game.talk('inside LOGIC-nextPicture')

            node.game.talk('INDEX RECEIVED: ' + msg.data)

            var myData = msg.data;

            node.emit('nextPicture-HTML', myData);

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






        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      HTML --> LOGIC      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        node.on('HTML-answer-CLIENT', (data) => {

            this.talk('DATA RECEIVED')
            this.talk(data.index)
            this.talk(data.answer)
            this.talk(data.isCorrect)
            this.talk(data.xCoor)
            this.talk(data.yCoor)
            this.talk(data.tCoor)
            this.talk('------------')

            node.set({
                pairIndex:data.index,
                answer:data.answer,
                confidence:data.confidence,
                correct:data.isCorrect,
                xCoor: data.xCoor,
                yCoor: data.yCoor,
                tCoor: data.tCoor,
                responseTime: data.responseTime,
            })

            node.say('CLIENT-answer-LOGIC', 'SERVER', data.answer);

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


        // ------- INITIATE PLAYER LIST IN LOGIC ------- //

        node.say('init-LOGIC', 'SERVER');





    });



    stager.extendStep('instructions', {

        frame: 'instructions_alt.htm',

    });

    stager.extendStep('identifyFaces', {

        frame: 'identifyFaces_alt.htm',

    });

    stager.extendStep('survey2', {

        frame: 'survey2.htm',

    });

    stager.extendStep('results', {

        frame: 'resultScreen.htm',

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
