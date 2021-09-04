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


        // node.game.pairIndexList = [
        //     1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24
        //     // 0,0,0,1,1,1,0,0,1,1 ,1 ,1 ,1 ,1, 0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1
        // ]
        //
        // node.game.correctAnswerList = [
        //     0,0,0,1,1,1,0,0,1,1 ,1 ,1 ,1 ,1, 0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1
        //     // 0,1,0,1,0,1,0,1,0,1 ,0 ,1 ,0 ,1, 1, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,0
        // ]


        // for a quick debug
        node.game.pairIndexList = [
            1,2,3
        ]

        node.game.correctAnswerList = [
            0,1,0
        ]

        // -------------- //


        node.game.initPlayer = function() {

            node.game.pl.each(function(player) {

                console.log('PLAYER DATA IS INITIATED');

                player.shuffled = {
                    correctAnswerList: undefined,
                    pairIndexList: undefined
                };

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

            if(player.cpx === size) {

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

                node.say('LOGIC-nextPicture', player.id, currentIndex);

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

                node.say('LOGIC-nextPicture', player.id, currentIndex);

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

                node.say('LOGIC-nextPicture', player.id, currentIndex);

            }

        })


        // -------------- //


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

                if(correct) {
                    score++;
                }

            }

            player.score = score;

            console.log('PLAYER FINAL SCORE: ' + player.score);

        })


        // -------------- //


        node.on.data('requestFirstIndex-LOGIC', function(msg) {

            // initializing the player
            node.game.initPlayer();

            let player = node.game.pl.get(msg.from);

            console.log('FIRST INDEX IS REQUESTED FROM CLIENT TO LOGIC SIDE');

            var currentIndex = player.shuffled.pairIndexList[player.cpx];

            console.log('FIRST INDEX IS: ' + currentIndex);

            node.say('LOGIC-firstPicture', player.id, currentIndex);

        })



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
