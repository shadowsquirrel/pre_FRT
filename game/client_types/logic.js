/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2021 Can Celebi <cnelebi@gmail.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

const ngc = require('nodegame-client');
const J = ngc.JSUS;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    let node = gameRoom.node;
    let channel = gameRoom.channel;
    let memory = node.game.memory;

    // Make the logic independent from players position in the game.
    stager.setDefaultStepRule(ngc.stepRules.SOLO);

    // Must implement the stages here.

    stager.setOnInit(function() {


        // Decision Time Duration
        node.game.dtd = undefined;

        node.game.dtdList = J.shuffle([5000, 8000, 10000]);

        console.log('SHUFFLED DTDLIST: ' + node.game.dtdList);

        node.game.dtd = node.game.dtdList[0];

        console.log('DECISION TIME DURATION IS DETERMINED TO BE: ' +
        node.game.dtd);

        node.on.data('dtd-LOGIC', function(msg) {

            console.log('INSIDE DTD-LOGIC');

            let player = node.game.pl.get(msg.from);

            node.say('LOGIC-dtd', player.id, node.game.dtd)

        })

        node.on.data('requestDtd-LOGIC', function(msg) {

            console.log('LOGIC: CLIENT REQUESTED DTD');

            let player = node.game.pl.get(msg.from);

            node.say('LOGIC-requestDtd', player.id, node.game.dtd);

        })

        //-------- SOME DEBUG METHODS --------//

        // Identifies the player in the console
        node.game.showPlayer = function(player) {
            console.log();
            console.log('Player ' + player.count);
        };

        // Enables logging to console from player.js
        node.on.data('debug', function(msg) {
            let player = node.game.pl.get(msg.from);
            node.game.showPlayer(player);
            console.log(msg.data);
        });


        // -------------- //


        node.game.pairIndexList = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
            // 0,0,0,1,1,1,0,0,1,1 ,1 ,1 ,0 ,0, 0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1 ,0
        ]

        node.game.correctAnswerList = [
            0,0,0,1,1,1,0,0,1,1 ,1 ,1 ,0 ,0, 0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1 ,0, 1
            // 0,1,0,1,0,1,0,1,0,1 ,0 ,1 ,0 ,1, 1, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,0
        ]


        // for a quick debug
        // node.game.pairIndexList = [
        //     1,2,3
        // ]
        //
        // node.game.correctAnswerList = [
        //     0,1,0
        // ]

        // -------------- //


        node.game.initPlayer = function() {

            node.game.pl.each(function(player) {

                console.log('PLAYER DATA IS INITIATED');

                player.shuffled = {
                    correctAnswerList: undefined,
                    pairIndexList: undefined,
                    correctDecisionList: [],
                };

                player.unshuffled = {
                    pairIndexList: [],
                    givenAnswerList: [],
                    correctDecisionList: []
                }

                var shuffledAnswers = [];

                player.shuffled.pairIndexList = J.shuffle(node.game.pairIndexList);

                player.cpx = 0;

                console.log();
                console.log('STARTING PLAYER PAIR INDEX: ' + player.cpx);
                console.log('STARTING PLAYER PAIR NUMBER: ' + player.shuffled.pairIndexList[player.cpx]);
                console.log();

                var shuffledList = player.shuffled.pairIndexList;

                for(var i = 0; i < shuffledList.length; i++) {

                    var shuffledIndex = node.game.pairIndexList.indexOf(shuffledList[i]);

                    shuffledAnswers[i] = node.game.correctAnswerList[shuffledIndex];

                }


                player.shuffled.correctAnswerList = shuffledAnswers;


                var size = node.game.pairIndexList.length;

                player.givenAnswerList = Array(size).fill(-1);

                player.score = undefined;


                console.log();
                console.log('node.game.pairIndexList');
                console.log(node.game.pairIndexList);
                console.log();
                console.log('player shuffled Index list');
                console.log(player.shuffled.pairIndexList);
                console.log();
                console.log();
                console.log('node.game.correctAnswerList');
                console.log(node.game.correctAnswerList);
                console.log();
                console.log('player shuffled correct answer list');
                console.log(player.shuffled.correctAnswerList);
                console.log();
                console.log();
                console.log('player given answer list');
                console.log(player.givenAnswerList);

            })

        }


        // -------------- //


        node.game.reIntroducePlayer = function(player) {


            console.log('INSIDE REINTRODUCTION OF THE PLAYER');

            // player.cpx = player.cpxid();
            // player.count = player.cid();

        }


        // -------------- //


        node.game.updateCurrentIndex = function(player) {

            console.log('PLAYER INDEX UPDATE INITIATED');

            console.log('PLAYER INDEX BEFORE UPDATE: ' + player.cpx);

            player.cpx++;

            console.log('PLAYER INDEX AFTER UPDATE: ' + player.cpx);

        }


        // -------------- //


        node.game.checkEnd = function(player) {

            console.log('Checking if photos are finished');

            var size = node.game.pairIndexList.length;

            console.log('current index: ' + player.cpx);
            console.log('size: ' + size);

            if(player.cpx >= size) {

                console.log('DONE WITH FACE TEST');

                return true;

            } else {

                console.log('CONTINUE WITH FACE TEST');

                return false;

            }

        }


        // -------------- //


        node.on.data('diffPerson-LOGIC', function(msg) {

            console.log('CLIENT DIFF PERSON RESPONSE RECEIVED BY LOGIC');

            let player = node.game.pl.get(msg.from);

            player.givenAnswerList[player.cpx] = 0;

            node.game.updateCurrentIndex(player);

            if(node.game.checkEnd(player)) {

                var msg = 'DONE';

                node.say('LOGIC-finishTest', player.id, msg);

            } else {

                var currentIndex = player.shuffled.pairIndexList[player.cpx];
                var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];

                var data = {
                    index: currentIndex,
                    correctAnswer: currentCorrectAnswer
                }

                node.say('LOGIC-nextPicture', player.id, data);

            }

        })

        node.on.data('samePerson-LOGIC', function(msg) {

            console.log('CLIENT SAME PERSON RESPONSE RECEIVED BY LOGIC');

            let player = node.game.pl.get(msg.from);

            player.givenAnswerList[player.cpx] = 1;

            node.game.updateCurrentIndex(player);

            if(node.game.checkEnd(player)) {

                var msg = 'DONE';

                node.say('LOGIC-finishTest', player.id, msg);

            } else {

                var currentIndex = player.shuffled.pairIndexList[player.cpx];
                var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];

                var data = {
                    index: currentIndex,
                    correctAnswer: currentCorrectAnswer
                }

                node.say('LOGIC-nextPicture', player.id, data);

            }

        })

        node.on.data('noAnswer-LOGIC', function(msg) {

            console.log('CLIENT NO ANSWER RESPONSE RECEIVED BY LOGIC');

            let player = node.game.pl.get(msg.from);

            player.givenAnswerList[player.cpx] = -2;

            node.game.updateCurrentIndex(player);

            if(node.game.checkEnd(player)) {

                var msg = 'DONE';

                node.say('LOGIC-finishTest', player.id, msg);

            } else {

                var currentIndex = player.shuffled.pairIndexList[player.cpx];
                var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];

                var data = {
                    index: currentIndex,
                    correctAnswer: currentCorrectAnswer
                }

                node.say('LOGIC-nextPicture', player.id, data);

            }

        })


        // -------------- //

        // called by LOGIC-finishTest on client side
        node.on.data('calculateScore-LOGIC', function(msg) {

            let player = node.game.pl.get(msg.from);

            console.log('CALCULATING THE SCORE FOR PLAYER ' + player.count);

            var size = player.shuffled.correctAnswerList.length;

            var score = 0;

            for(var i = 0; i < size; i++) {

                console.log('Index: ' + i);

                console.log('Correct Answer: ' + player.shuffled.correctAnswerList[i]);

                console.log('Given Answer: ' + player.givenAnswerList[i]);

                var correct = (player.shuffled.correctAnswerList[i] === player.givenAnswerList[i]);

                player.shuffled.correctDecisionList[i] = correct;

                if(correct) {
                    score++;
                }

            }

            player.score = score;

            console.log('PLAYER FINAL SCORE: ' + player.score);

            console.log(player.shuffled.pairIndexList);
            console.log(player.givenAnswerList);
            console.log(player.shuffled.correctAnswerList);
            console.log(player.shuffled.correctDecisionList);

        })

        // listens client to return client player's score calculated in logic
        node.on.data('results-LOGIC', function(msg) {

            let player = node.game.pl.get(msg.from);

            let score = player.score;

            node.say('LOGIC-results', player.id, score);

        })


        // -------------- //


        node.on.data('requestFirstIndex-LOGIC', function(msg) {

            // initializing the player
            node.game.initPlayer();

            let player = node.game.pl.get(msg.from);

            console.log('FIRST INDEX IS REQUESTED FROM CLIENT TO LOGIC SIDE');

            var currentIndex = player.shuffled.pairIndexList[player.cpx];
            var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];

            var data = {
                index: currentIndex,
                correctAnswer: currentCorrectAnswer
            }

            console.log('FIRST INDEX IS: ' + currentIndex);
            console.log('CORRECT ANSWER IS: ' + currentCorrectAnswer);

            console.log('Data to be sent');
            console.log(data);

            node.say('LOGIC-firstPicture', player.id, data);

        })


        // -------  MEMORY  ------- //

        // saving time spent on different stages
        memory
        .select('dataType', '=', 'time')
        .save('timeSpent.csv', {

            header: [
                'player',
                'tutoTime',
                'expTime',
                'surveyTime',
                'surveyTime2'
            ],

            flattenByGroup:'player',

            flatten:true,

            keepUpdated: true

        })

        // saving experiment data
        memory.view('correct').save('decision.csv', {

            header: [
                'player',
                'index',
                'answer',
                'correct',
                'dtd'
            ],

            keepUpdated: true

        });

        // saving score data
        memory.view('score').save('testScore.csv', {

            header: [
                'player',
                'score'
            ],

            keepUpdated: true

        })

        // saving subject survey data
        memory.view('age').save('survey.csv', {

            header: [
                'player',
                'gender',
                'age',
                'education',
                'employment',
                'location',
                'race',
                'knowledgeAI',
                'supportAI',
                'ladder'
            ],

            keepUpdated: true

        })

        // saving subject experiment experience survey data
        memory.view('needMoreTime').save('survey2.csv', {

            header: [
                'player',
                'tutorial',
                'enoughTime',
                'needMoreTime',
                'decisionScreen',
                'imageSize',
                'buttonPlacement',
                'numOfImages_tired',
                'numOfImages_bored',
                'dtd'
            ],

            keepUpdated: true

        })

        // Feedback.
        memory.view('feedback').save('feedback.csv', {
            header: [ 'time', 'timestamp', 'player', 'feedback' ],
            keepUpdated: true
        });

        // Email.
        memory.view('email').save('email.csv', {
            header: [ 'timestamp', 'player', 'email' ],
            keepUpdated: true
        });

        // -------------- //


    });


    stager.extendStep('identifyFaces', {

        reconnect: function(player, reconOpts) {

            console.log();
            console.log();
            console.log('*****************************');
            console.log('*****************************');
            console.log('* RECONNECTION IS ATTEMPTED *');
            console.log('*****************************');
            console.log('*****************************');
            console.log();
            console.log();

            console.log('DO WE STILL HAVE THE PLAYER INFO STORED IN THE LOGIC?');
            console.log(player);

            // reconOpts.cb: function(reconOpts) {
            //     console.log('INSIDE RECONNECT CALL BACK FUNCTION');
            //     node.game.counter = reconOpts.counter;
            // };
        },

    init: function() {

        console.log();
        console.log();
        console.log('****************************');
        console.log('****************************');
        console.log('******* IDENTIFY FACE ******');
        console.log('****************************');
        console.log('****************************');
        console.log();
        console.log();

    },

    cb: function() {

        // force disconnect player indexed 0
        // node.game.forceDisconnect(0);

    },


    })

    stager.setOnGameOver(function() {
        // Something to do.
    });

};
