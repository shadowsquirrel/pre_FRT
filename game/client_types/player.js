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

            node.game.visualTimer.show();

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
                    node.emit('stolenTimerWarn');

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

            var playerData = {
                section: 'tutorial',
                duration: timeSpent,
            }

            node.say('updatePlayerTime', 'SERVER', playerData);

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

            var playerData = {
                section: 'experiment',
                duration: timeSpent,
            }

            node.say('updatePlayerTime', 'SERVER', playerData);

            node.set({
                dataType:'time',
                expTime:timeSpent,
            })

        })


        // ------------------------------------------------------ //
        // ------------ RECORDING TIME SPENT ON FIRST SURVEY ---------- //
        // ------------------------------------------------------ //

        // 10 minutes length -> long enough to be used in any section
        node.game.secretFirstSurveyTimer = node.timer.create({

            milliseconds: 6000000,

            update: 1000,

        })
        node.game.secretFirstSurveyTimer.start();

        node.on('HTML-startSecretFirstSurveyTimer', function() {

            this.talk('SUBJECT FIRST SURVEY TIMER STARTS')

            node.game.secretFirstSurveyTimer.restart();

        })

        node.on('HTML-recordSecretFirstSurveyTimer', function() {

            var data = {};

            var timeLeft = node.game.secretFirstSurveyTimer.timeLeft;

            var timeSpent = 6000000 - timeLeft;

            var timeSpent = Math.ceil(timeSpent / 1000);

            node.game.talk('RECORD FIRST SURVEY TIME triggered from the html side. ' +
            'TIME LEFT: ' + timeLeft + ' TIME SPENT: ' + timeSpent);

            var playerData = {
                section: 'firstSurvey',
                duration: timeSpent,
            }

            node.say('updatePlayerTime', 'SERVER', playerData);

            node.set({
                dataType:'time',
                firstSurveyTime:timeSpent,
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

            var playerData = {
                section: 'survey1',
                duration: timeSpent,
            }

            node.say('updatePlayerTime', 'SERVER', playerData);

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

            var playerData = {
                section: 'survey2',
                duration: timeSpent,
            }

            node.say('updatePlayerTime', 'SERVER', playerData);

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

                    node.emit('timeUp');
                    setTimeout(()=>{
                        node.game.visualTimer.hide();
                    }, 2000)

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

            node.game.talk('');
            node.game.talk('inside LOGIC-firstPicture')
            node.game.talk('');
            node.game.talk('Data RECEIVED')
            node.game.talk('index: ' + msg.data.listIndex);
            node.game.talk('id: ' + msg.data.pairList[msg.data.listIndex].id);
            node.game.talk('race: ' + msg.data.pairList[msg.data.listIndex].race);
            node.game.talk('gender: ' + msg.data.pairList[msg.data.listIndex].gender);
            node.game.talk('correct answer: ' + msg.data.pairList[msg.data.listIndex].correctAnswer);
            node.game.talk('type: ' + msg.data.pairList[msg.data.listIndex].type);
            node.game.talk('answerGiven: ' + msg.data.pairList[msg.data.listIndex].answerGiven);
            node.game.talk('isGivenAnswerCorrect: ' + msg.data.pairList[msg.data.listIndex].isGivenAnswerCorrect);
            node.game.talk('confidence: ' + msg.data.pairList[msg.data.listIndex].confidence);
            node.game.talk('');

            if(msg.data.listIndex > 0) {

                node.game.talk(' --- PLAYER DISCONNECTED AND RECONNECTED, REQUESTING THE LAST PICTURE ---')

            } else {

                node.game.talk(' --- PLAYER REQUESTING FIRST PICTURE ---')

            }

            var myData = msg.data;

            node.game.talk('');
            node.game.talk('SENDING data to browser')
            node.game.talk('');
            node.emit('firstPicture-HTML', myData);

        })

        // receives the next picture from LOGIC and sends it to HTML
        node.on.data('LOGIC-nextPicture', function(msg) {

            node.game.talk('');
            node.game.talk('inside LOGIC-nextPicture')
            node.game.talk('');
            node.game.talk('Data RECEIVED')
            node.game.talk('index: ' + msg.data.listIndex);
            node.game.talk('id: ' + msg.data.pairList[msg.data.listIndex].id);
            node.game.talk('race: ' + msg.data.pairList[msg.data.listIndex].race);
            node.game.talk('gender: ' + msg.data.pairList[msg.data.listIndex].gender);
            node.game.talk('correct answer: ' + msg.data.pairList[msg.data.listIndex].correctAnswer);
            node.game.talk('type: ' + msg.data.pairList[msg.data.listIndex].type);
            node.game.talk('answerGiven: ' + msg.data.pairList[msg.data.listIndex].answerGiven);
            node.game.talk('isGivenAnswerCorrect: ' + msg.data.pairList[msg.data.listIndex].isGivenAnswerCorrect);
            node.game.talk('confidence: ' + msg.data.pairList[msg.data.listIndex].confidence);
            node.game.talk('');

            var myData = msg.data;

            node.game.talk('');
            node.game.talk('SENDING data to browser')
            node.game.talk('');
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

            let score = msg.data.score;

            node.game.talk('');
            node.game.talk('Payment data received from LOGIC');
            node.game.talk('base payment: ' + msg.data.pPay);
            node.game.talk('bonus payment: ' + msg.data.bPay);
            node.game.talk('total payment: ' + msg.data.tPay);
            node.game.talk('tutorial time: ' + msg.data.tutoTime);
            node.game.talk('experiment time: ' + msg.data.expTime);
            node.game.talk('survey 0 time: ' + msg.data.s0Time);
            node.game.talk('survey 1 time: ' + msg.data.s1Time);
            node.game.talk('surve 2 time: ' + msg.data.s2Time);
            node.game.talk('');

            node.emit('results-HTML', msg.data);

            node.game.talk('SCORE IS BEING RECORDED TO THE MEMORY')
            node.set({
                score: score
            })

            // node.set({
            //     playerBonus: msg.data.bPay
            // })

        })


        node.on.data('LOGIC-calculateBonus', function(msg) {

            node.game.talk('Payment data is received');
            node.game.talk('base pay ' + msg.data.base);
            node.game.talk('bonus pay ' + msg.data.bonus);
            node.game.talk('total pay ' + msg.data.total);
            node.game.talk('Is already stored in the memory ' + msg.data.isStoredInMemory)

            if(!msg.data.isStoredInMemory) {
                node.say('isBonusStored', 'SERVER');
                node.set({
                    playerBonus: msg.data.bonus
                })
            } else {
                node.game.talk('WARNING! player bonus is already calculated and stored!')
            }


        })


        node.on.data('totalNumberOfPairs', (msg) => {
            let total = msg.data;
            node.emit('totalNumberOfPairs', total);
        })


        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //
        // -------------------                          --------------------- //
        // -------------------      HTML --> LOGIC      --------------------- //
        // -------------------                          --------------------- //
        // ------------------------------------------------------------------ //
        // ------------------------------------------------------------------ //

        node.on('askTotalNumberOfPairs', () => {

            node.say('requestTotalNumberOfPairs', 'SERVER');

        })

        node.game.clone = (arr) => {

            var x = JSON.stringify(arr);
            var y = JSON.parse(x);

            return y;

        }

        node.game.someList = [];

        node.on('HTML-answer-CLIENT', (data) => {

            this.talk('');
            this.talk('Receiving Data from Browser');
            this.talk('');
            this.talk('-------------')
            this.talk('DATA RECEIVED')
            this.talk('id: ' + data.index)
            this.talk('race: ' + data.pairObject.race)
            this.talk('gender: ' + data.pairObject.gender)
            this.talk('type: ' + data.pairObject.type)
            this.talk('answer: ' + data.answer)
            this.talk('confidence: ' + data.confidence)
            this.talk('is correct? ' + data.isCorrect)
            // this.talk(data.xCoor)
            // this.talk(data.yCoor)
            // this.talk(data.tCoor)
            this.talk('response time: ' + data.responseTime);
            this.talk('total response time (alternative to reponse time): ' + data.totalResponseTime);
            this.talk('------------')
            this.talk('')

            var xList = node.game.clone(data.xCoor);
            var yList = node.game.clone(data.yCoor);
            var tList = node.game.clone(data.tCoor);
            var vList = node.game.clone(data.velocity);

            // node.game.someList.push(xList[10])
            // node.game.someList.push(xList[11])
            // node.game.someList.push(xList[23])
            //
            // this.talk('HTML-answer-CLIENT')
            // this.talk(node.game.someList);

            node.set({
                dataType: 'evaluation',
                pairIndex:data.index,
                pairRace: data.pairObject.race,
                pairGender: data.pairObject.gender,
                pairType: data.pairObject.type,
                answer:data.answer,
                confidence:data.confidence,
                correct:data.isCorrect,
                xCoor: xList,
                yCoor: yList,
                tCoor: tList,
                responseTime: data.responseTime,
                velocity: vList,
                totalResponseTime: data.totalResponseTime,
            })

            node.say('CLIENT-answer-LOGIC', 'SERVER', data);

            // node.game.showMemo('evaluation')

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

        // activates logic listener that calculates the score and reports back
        // to the player where the player listens for a different request for calculated bonus
        // receiving the bonus it node.set the data into the memory
        node.on('HTML-calculateBonus', function() {
            node.say('calculateBonus-LOGIC', 'SERVER');
        })


        // ----------------- survey 1 --------------------- //

        node.on('HTML-firstSurveyResult', function(msg) {

            node.say('LOGIC-firstSurveyResult', 'SERVER', msg);
            node.done();

        })

        node.on('HTML-askSkill', function(msg) {
            node.say('PLAYER-askSkill', 'SERVER');
        })

        node.on.data('LOGIC-getSkill', function(msg) {
            var data = msg.data;
            node.emit('HTML-getSkill', data);
        })

        node.on('HTML-surveyResults', function(msg) {

            this.talk('SURVEY RESULTS RECEIVED')
            this.talk(msg.age);
            this.talk(msg.gender);
            this.talk(msg.student)
            this.talk(msg.education);
            this.talk(msg.eduFocus);
            this.talk(msg.race);
            this.talk(msg.interactedRace);
            this.talk(msg.location);
            this.talk(msg.selfReportedSkill)
            this.talk('----------------')

            node.done({
                gender: msg.gender,
                age: msg.age,
                race: msg.race,
                interactedRace: msg.interactedRace,
                student: msg.student,
                education: msg.education,
                eduFocus: msg.eduFocus,
                location:msg.location,
                skill: msg.selfReportedSkill,
            })

        })


        // ----------------- survey 2 --------------------- //

        node.on('HTML-survey2Results', function(msg) {

            this.talk('SURVEY 2 RESULTS RECEIVED')

            this.talk('enought time ' + msg.enoughTime);
            this.talk('image size ' + msg.imageSize);
            this.talk('button placement ' + msg.buttonPlacement);

            this.talk('----------------')

            node.done({
                enoughTime:msg.enoughTime,
                imageSize:msg.imageSize,
                buttonPlacement:msg.buttonPlacement,
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

    stager.extendStep('consent', {

        // frame: 'consent.htm',
        widget: 'Consent',


    });

    stager.extendStep('pickSession', {

        frame: 'pickSession.htm',

    });

    stager.extendStep('firstSurvey', {

        frame: 'firstSurvey.htm',

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

        // frame: 'newEnd.htm',
        frame: 'simpleEnd.htm',

        // widget: {
        //     name: 'EndScreen',
        //     showEmailForm: false,
        //     showTotalWin: false,
        // }

    });

};
