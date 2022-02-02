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


        // ------------------------------------ //
        // -------- SOME DEBUG METHODS -------- //
        // ------------------------------------ //

        node.game.debugConsoleActive = true;
        node.game.jumpToClient = true;

        // Enables logging to console from player.js
        node.on.data('debug', function(msg) {

            if(node.game.debugConsoleActive) {
                let player = node.game.pl.get(msg.from);

                if(node.game.jumpToClient) {
                    node.game.jumpToClient = false;
                    console.log();
                    console.log();
                    console.log('---------------------------------------------');
                    console.log();
                    console.log();
                }

                console.log('CLIENT [P' + player.count  + ']: ' + msg.data);
            }

        });

        node.game.talk = function(string) {
            if(node.game.debugConsoleActive) {
                node.game.jumpToClient = true;
                console.log('LOGIC: ' + string);
            }
        }

        node.game.space = function(number) {
            if(node.game.debugConsoleActive) {

                node.game.jumpToClient = true;

                var times = number === undefined ? 1 : number;

                for(var i = 0; i < times; i++) {
                    console.log('');
                }
            }
        }

        node.game.introFunction = function(fName) {

            if(!node.game.jumpToClient) {
                console.log();
                console.log();
                console.log('---------------------------------------------');

            }

            node.game.jumpToClient = true;

            let functionName = fName === undefined ? '' : fName;
            this.space();
            this.space();
            this.talk('------- f(): ' + functionName + ' -------- ');
            this.space();

        }


        // ------------------------- //
        // ------- MAIN DATA ------- //
        // ------------------------- //

        // photo pair index
        node.game.pairIndexList = [
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
            // 0,0,0,1,1,1,0,0,1,1 ,1 ,1 ,0 ,0, 0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1 ,0
        ]


        // photo answer list
        node.game.correctAnswerList = [
            0,0,0,1,1,1,0,0,1,1 ,1 ,1 ,0 ,0, 0 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1 ,1 ,0, 1
            // 0,1,0,1,0,1,0,1,0,1 ,0 ,1 ,0 ,1, 1, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,0
        ]


        // --------------------- //
        // -- main debug data -- //
        // --------------------- //

        node.game.pairIndexList = [
            1,2,3
        ]


        node.game.correctAnswerList = [
            0,1,0
        ]


        // --------------------------------- //
        // ----- IBT PSEUDO ORDER DATA ----- //
        // --------------------------------- //

        node.game.ibt = {}

        node.game.ibt.buttonSetupList = [
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,
        ]

        node.game.ibt.stateList = [
            0, 0, 0, 0, 0, 0,
            1, 0, 1, 0, 1, 0,
            0, 1, 0, 1, 0, 1,
            1, 0, 1, 1, 0, 0,
            1, 1, 0, 1, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 1, 0, 1, 1, 0,
            1, 1, 0, 1, 0, 1,
            1, 0, 1, 1, 0, 1,
            1, 0, 1, 0, 1, 1
        ];

        // for debug the data lists wont match this
        // and we will have errors at the end
        // node.game.ibt.stateList = [
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 1, 1, 1, 1, 1,
        //     1, 0, 1, 0, 1, 1
        // ];

        // there are 4 photos plus no photo
        // no photo index is 0
        // for either icon (house or person) we have a random list
        // at each trial the first element from the relevant list is pushed
        // the pushed index is used to show the relevant photo
        node.game.ibt.photoList = [

            // hidden photo primer list for houses
            [
                0, 2, 3, 2, 4, 2,
                4, 2, 4, 1, 3, 0,
                3, 2, 0, 1, 4, 1,
                2, 0, 3, 4, 3, 3,
                1, 1, 0, 4, 1, 0
            ],

            // hidden photo primer list for persons
            [
                0, 4, 2, 1, 3, 2,
                1, 4, 1, 0, 3, 0,
                3, 1, 0, 3, 2, 4,
                2, 4, 1, 2, 0, 3,
                4, 0, 1, 2, 3, 4
            ]

            // // debug setup will fail to cover all
            // [
            //     1, 4, 2, 1, 3, 2,
            //     1, 4, 1, 2, 3, 4,
            //     3, 1, 3, 3, 2, 4,
            //     2, 4, 1, 2, 4, 3,
            //     4, 2, 1, 2, 3, 4
            // ]

        ];

        // this will be used for the primer placement
        // for the alternative setup
        // altought there are two sets the one for house primer
        // is not really used. It is only there to make the code not crash
        node.game.ibt.primerPlacement = [

            [
                0,1,0,1,1,0,
                1,0,1,0,1,0,
                0,1,0,1,0,1,
                0,0,1,1,0,1,
                1,0,1,1,0,0
            ],

            [
                0,1,0,1,1,0,
                1,0,1,0,1,0,
                0,1,0,1,0,1,
                0,0,1,1,0,1,
                1,0,1,1,0,0
            ]

        ]

        // there are 6 adjectives for house and 6 for persons
        // each have their own index list of lists as below
        // each list (2 of them) contains 5 lists
        // each list (5 of them) represents the random ordering of the indexes for adjectives
        // pushed state list is used to get the relevant list of lists
        // pushed photo index is then used to get the relevant list from the picked list
        // the first element from this list is pushed to be used as the adj index
        // adj index is then used to get the adjective from the list of adjectives defined on top
        node.game.ibt.adjList = [

            // adj list for houses for each hidden photo primer
            [
                [3, 4, 5, 2, 0, 1], // 0
                [3, 1, 5, 2, 0, 4], // 1
                [0, 4, 1, 5, 3, 2], // 2
                [1, 5, 4, 0, 2, 3], // 3
                [3, 2, 1, 0, 5, 4]  // 4
            ],

            // adj list for persons for each hidden photo primer
            [
                [1, 5, 0, 2, 3, 4], // 0
                [3, 5, 1, 0, 4, 2], // 1
                [1, 3, 2, 5, 4, 0], // 2
                [5, 2, 3, 1, 4, 0], // 3
                [3, 5, 2, 1, 4, 0]  // 4
            ]


        ]

        // ----------------------------- //
        // -------- INITIATION -------- //
        // ----------------------------- //

        // init player button position and decision time duration
        // randomly determined for each player
        node.game.initPlayerFundamentals = function(player) {

            this.introFunction('initPlayerFundamentals');

            // check if the player is already initiated
            if(player.fundamentalsInitiated === undefined) {

                this.talk('INITIATING PLAYER\'S EXPERIMENTAL SETUP PARAMETERS');

                player.fundamentalsInitiated = true;

                // ---- determine player's dtd ---- //

                let myDtdList = J.shuffle([5000, 8000, 10000]);

                this.talk('PLAYER (' + player.id + ') SHUFFLED DTD LIST: '
                + myDtdList);

                player.dtd = myDtdList[0];

                this.talk('PLAYER (' + player.id + ') DECISION TIME ' +
                ' DURATION IS DETERMINED TO BE: ' + player.dtd);


                // ---- determine player's button position ---- //

                if(Math.random() > 0.005) {

                    player.buttonTop = true;

                } else {

                    player.buttonTop = false;

                }

                this.talk('PLAYER (' + player.id + ') IS BUTTON ON TOP -> ' +
                player.buttonTop);

            } else {

                this.talk('PLAYER ' + player.id + ' is already initiated');
                this.talk('PLAYER (' + player.id + ') DECISION TIME ' +
                ' DURATION WAS DETERMINED TO BE: ' + player.dtd);
                this.talk('PLAYER (' + player.id + ') WAS BUTTON ON TOP -> ' +
                player.buttonTop);

            }

            this.talk('SENDING FUNDAMENTAL PLAYER DATA TO CLIENT');

            let myData = {
                bp: player.buttonTop,
                dtd: player.dtd
            }

            node.say('LOGIC-init', player.id, myData);

        }


        // init player for face test: generating the shuffled index etc
        node.game.initPlayerLists = function(player) {

            this.introFunction('initPlayerList');

            if(player.listsGenerated === undefined) {

                player.listsGenerated = true;

                this.talk('INITIATING PLAYER\'S LISTS');

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

                // generate shuffled pair index for each player
                player.shuffled.pairIndexList = J.shuffle(node.game.pairIndexList);

                // Current Pair/Photo IndeX: CPX
                player.cpx = 0;

                // for notational ease
                var shuffledList = player.shuffled.pairIndexList;

                // generate the correct answer list for the shuffled list
                for(var i = 0; i < shuffledList.length; i++) {

                    var shuffledIndex = node.game.pairIndexList.indexOf(shuffledList[i]);

                    shuffledAnswers[i] = node.game.correctAnswerList[shuffledIndex];

                }

                // assign the generated shuffled answer list to the player's object
                player.shuffled.correctAnswerList = shuffledAnswers;


                var size = node.game.pairIndexList.length;

                // initiate player's given answer list initially set all to -1
                player.givenAnswerList = Array(size).fill(-1);

                player.score = undefined;

                player.ibt = {};

                player.ibt.buttonSetup = node.game.ibt.buttonSetupList.shift();

                player.ibt.primerPlacement = [[],[]];

                player.ibt.photoList = [[],[]];

                player.ibt.adjList = [
                    [
                        [],
                        [],
                        [],
                        [],
                        [],
                    ],
                    [
                        [],
                        [],
                        [],
                        [],
                        [],
                    ]
                ];

                // generate deep copy of state list
                player.ibt.stateList = [...node.game.ibt.stateList];

                player.ibt.primerPlacement[0] = [...node.game.ibt.primerPlacement[0]];
                player.ibt.primerPlacement[1] = [...node.game.ibt.primerPlacement[1]];

                // gemerate deep copy of photoList
                player.ibt.photoList[0] = [...node.game.ibt.photoList[0]];
                player.ibt.photoList[1] = [...node.game.ibt.photoList[1]];

                // generate deep copy of adjList
                for(var i = 0; i < 2; i++) {
                    for(var j = 0; j < 5; j++) {
                        player.ibt.adjList[i][j] = [...node.game.ibt.adjList[i][j]];
                    }
                }


            } else {

                this.talk('PLAYER LISTS ARE ALREADY INITIATED');

            }



            // debug
            this.talk('node.game.pairIndexList');
            console.log(node.game.pairIndexList);
            this.talk('player shuffled Index list');
            console.log(player.shuffled.pairIndexList);
            this.talk('node.game.correctAnswerList');
            console.log(node.game.correctAnswerList);
            this.talk('player shuffled correct answer list');
            console.log(player.shuffled.correctAnswerList);
            this.talk('player given answer list');
            console.log(player.givenAnswerList);
            this.talk('STARTING PLAYER PAIR INDEX: ' + player.cpx);
            this.talk('STARTING PLAYER PAIR NUMBER: ' + player.shuffled.pairIndexList[player.cpx]);
            this.talk('--- player.ibt.stateList ---')
            console.log(player.ibt.stateList);
            this.talk('--- player.ibt.photoList ---')
            console.log(player.ibt.photoList);
            this.talk('--- player.ibt.adjList ---');
            console.log(player.ibt.adjList);

        }


        // init player meta func
        node.game.initPlayer = function(player) {

            this.introFunction('initPlayer')

            node.game.initPlayerFundamentals(player);
            node.game.initPlayerLists(player);

        }


        // Listener to initiate the player parameters
        node.on.data('init-LOGIC', function(msg) {

            this.introFunction('node.on(init-LOGIC)')

            let player = node.game.pl.get(msg.from);

            node.game.initPlayer(player);

        })


        // alternative method to send the client experimental setup parameters
        node.on('get.mySetup', function(msg) {

            this.introFunction('node.on(get.mySetup)');

            let player = node.game.pl.get(msg.from);

            let info = {
                bt: player.buttonTop,
                dtd: player.dtd
            }

            this.talk('inside node.on(get.mySetup)');
            this.talk('get.setup activated by CLIENT');
            this.talk('sending button and time setups');
            console.log(info);

            return info;

        })


        // debug
        node.on.data('rnd-LOGIC', function(msg) {

            let randomNumber = Math.random();

            this.introFunction('node.on.data(rnd-LOGIC)');
            this.talk('RANDOM NUMBER IS: ' + randomNumber);

            let player = node.game.pl.get(msg.from);

            if(player.randomNumberAssigned) {

                this.talk('Random number already assigned...');

            } else {

                this.talk('Assigning the random number to player');
                player.randomNumber = randomNumber

            }

            this.talk('Sending the random number to client');

            node.say('LOGIC-rnd', player.id, randomNumber);

        })




        // ------------------------------------------- //
        // ------- TEST PHASE HELPER FUNCTIONS ------- //
        // ------------------------------------------- //

        // increments the current index AFTER receiving an answer from client
        // on the current index
        node.game.updateCurrentIndex = function(player) {

            this.introFunction('updateCurrentIndex')
            this.talk('player.cpx old: ' + player.cpx);

            player.cpx++;

            this.talk('player.cpx current (updated): ' + player.cpx);

        }


        // AFTER updateCurrenIndex checks if the current index reached the size
        // od the index list (i.e. exhausted the list)
        // returns true if this the case
        // returns false otherwise
        node.game.checkEnd = function(player) {

            this.introFunction('checkEnd');

            this.talk('Checking if photos are finished');

            var size = node.game.pairIndexList.length;

            this.talk('current index: ' + player.cpx);
            this.talk('size: ' + size);

            if(player.cpx >= size) {

                this.talk('DONE WITH FACE TEST');

                return true;

            } else {

                this.talk('CONTINUE WITH FACE TEST');

                return false;

            }

        }


        // End the test by sending finish test message to the client
        node.game.endTest = function(player) {

            this.introFunction('endTest');

            var msg = 'DONE';

            node.say('LOGIC-finishTest', player.id, msg);

        }


        // ----------------------------------------------------------- //
        // ----------------- TEST PHASE MAIN FUNCTIONS --------------- //
        // ----------------------------------------------------------- //

        // answer listener: diff person
        // 0 -> answer is DIFFERENT person
        // -record answer to player's object
        // -update the photo pair index
        // -check if the test ended
        // -if not send the next photo index and the next photo index's answer to CLIENT
        node.on.data('diffPerson-LOGIC', function(msg) {

            this.introFunction('node.on.data(diffPerson-LOGIC)')

            this.talk('CLIENT DIFF PERSON RESPONSE RECEIVED BY LOGIC');

            let player = node.game.pl.get(msg.from);

            // record player's answer for the current index
            player.givenAnswerList[player.cpx] = 0;

            // update the index (increment)
            node.game.updateCurrentIndex(player);

            // check it the test ended
            if(node.game.checkEnd(player)) {

                node.game.endTest(player);

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


        // answer listener: same person
        // 1 -> answer is SAME person
        // -record answer to player's object
        // -update the photo pair index
        // -check if the test ended
        // -if not send the next photo index and the next photo index's answer to CLIENT
        node.on.data('samePerson-LOGIC', function(msg) {

            this.introFunction('node.on.data(samePerson-LOGIC)')

            this.talk('CLIENT SAME PERSON RESPONSE RECEIVED BY LOGIC');

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


        // answer listener: same person
        // -2 -> subject FAILED TO ANSWER in time
        // -record answer to player's object
        // -update the photo pair index
        // -check if the test ended
        // -if not send the next photo index and the next photo index's answer to CLIENT
        node.on.data('noAnswer-LOGIC', function(msg) {

            this.introFunction('node.on.data(noAnswer-LOGIC)');
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


        // called by LOGIC-finishTest on CLIENT side which is triggered by the above functions
        // upon the determination that the test has ended
        node.on.data('calculateScore-LOGIC', function(msg) {

            this.introFunction('node.on.data(calculateScore-LOGIC)')

            let player = node.game.pl.get(msg.from);

            this.talk('CALCULATING THE SCORE FOR PLAYER ' + player.count);

            var size = player.shuffled.correctAnswerList.length;

            var score = 0;

            for(var i = 0; i < size; i++) {

                // debug
                this.talk('Index: ' + i);
                this.talk('Correct Answer: ' + player.shuffled.correctAnswerList[i]);
                this.talk('Given Answer: ' + player.givenAnswerList[i]);


                var correct = (player.shuffled.correctAnswerList[i] === player.givenAnswerList[i]);

                player.shuffled.correctDecisionList[i] = correct;

                if(correct) {
                    score++;
                }

            }

            player.score = score;

            // debug
            this.talk('PLAYER FINAL SCORE: ' + player.score);
            this.talk(player.shuffled.pairIndexList);
            this.talk(player.givenAnswerList);
            this.talk(player.shuffled.correctAnswerList);
            this.talk(player.shuffled.correctDecisionList);

        })


        // listens client to return client player's score calculated in logic
        node.on.data('results-LOGIC', function(msg) {

            this.introFunction('node.on.data(results-LOGIC)');

            let player = node.game.pl.get(msg.from);

            let score = player.score;

            node.say('LOGIC-results', player.id, score);

        })


        // Wait for an activation from the client side
        // the actication from the client side is also waiting an activation
        // from the html side.
        // HTML is loaded -> activates CLIENT listener -> activates this listener
        // This process also occurs upon disconnect and reconnect
        node.on.data('requestFirstIndex-LOGIC', function(msg) {

            this.introFunction('node.on.data(requestFirstIndex-LOGIC)')

            let player = node.game.pl.get(msg.from);

            if(player.cpx === 0) {
                this.talk('FIRST INDEX IS REQUESTED FROM CLIENT TO LOGIC SIDE');
            } else {
                this.talk('PLAYER RECONNECTED: LAST UNANSWERED INDEX IS REQUESTED FROM CLIENT TO LOGIC SIDE');
            }

            var currentIndex = player.shuffled.pairIndexList[player.cpx];
            var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];

            var data = {
                listIndex: player.cpx,
                index: currentIndex,
                correctAnswer: currentCorrectAnswer
            }

            this.talk('CURRENT INDEX IS: ' + currentIndex);
            this.talk('CORRECT ANSWER IS: ' + currentCorrectAnswer);

            this.talk('Data to be sent');
            console.log(data);

            node.say('LOGIC-firstPicture', player.id, data);

        })


        // ----------------------------------------------------------- //
        // -------------------- IBT MAIN FUNCTIONS ------------------- //
        // ----------------------------------------------------------- //

        node.on.data('request-IBT-trial-LOGIC', function(msg) {

            this.introFunction('node.on.data(request-IBT-trial-LOGIC)')

            let player = node.game.pl.get(msg.from);

            // every time disconnect reconnect IBT trials start over

            this.talk('=====   BEFORE THE PUSH   ====')
            console.log();
            this.talk('--- node.game.ibt.stateList ---')
            console.log(node.game.ibt.stateList);
            this.talk('--- node.game.ibt.photoList ---')
            console.log(node.game.ibt.photoList);
            this.talk('--- node.game.ibt.adjList ---');
            console.log(node.game.ibt.adjList);
            console.log();
            this.talk('--- player.ibt.stateList ---')
            console.log(player.ibt.stateList);
            this.talk('--- player.ibt.photoList ---')
            console.log(player.ibt.photoList);
            this.talk('--- player.ibt.adjList ---');
            console.log(player.ibt.adjList);
            console.log();

            var buttonSetup = player.ibt.buttonSetup;
            var trialRound = player.stage.round;
            var currentIconIndex = player.ibt.stateList.shift();
            var currentIcon = currentIconIndex ? 'person' : 'house';
            var currentPhotoPlacement = player.ibt.primerPlacement[currentIconIndex].shift();
            var currentPhotoIndex = player.ibt.photoList[currentIconIndex].shift();
            var currentAdjIndex = player.ibt.adjList[currentIconIndex][currentPhotoIndex].shift();

            // this.talk('=====  AFTER THE PUSH   ====')
            // this.space()
            // this.talk('----------- TRIAL ' + trialRound + ' ------------')
            // this.space()
            // this.talk('--- node.game.ibt.stateList ---')
            // console.log(node.game.ibt.stateList);
            // this.talk('--- node.game.ibt.photoList ---')
            // console.log(node.game.ibt.photoList);
            // this.talk('--- node.game.ibt.adjList ---');
            // console.log(node.game.ibt.adjList);
            // console.log();
            // this.talk('--- player.ibt.stateList ---')
            // console.log(player.ibt.stateList);
            // this.talk('--- player.ibt.photoList ---')
            // console.log(player.ibt.photoList);
            // this.talk('--- player.ibt.adjList ---');
            // console.log(player.ibt.adjList);
            // console.log();

            var trial = {
                buttonSetup: buttonSetup,
                round: trialRound,
                icon: currentIcon,
                placement: currentPhotoPlacement,
                photo: currentPhotoIndex,
                adj: currentAdjIndex
            }

            this.talk('TRIAL to be sent');
            console.log(trial);

            node.say('LOGIC-IBT-trial', player.id, trial);

        })


        // ---- Decision Time Duration Listener ---- //

        // can be requested at any time during the experiment
        node.on.data('requestDtd-LOGIC', function(msg) {

            this.introFunction('node.on.data(requestDtd-LOGIC)');
            this.talk('CLIENT REQUESTED DTD');

            let player = node.game.pl.get(msg.from);

            this.talk('SENDING DTD DATA TO CLIENT');

            node.say('LOGIC-requestDtd', player.id, player.dtd);

        })




        // ------------------------ //
        // ------------------------ //
        // -------  MEMORY  ------- //
        // ------------------------ //
        // ------------------------ //

        // saving time memory
        node.on.data('saveTimeMemory', function() {

            memory
            .select('dataType', '=', 'time')
            .save('timeSpent.csv', {

                header: [
                    'player',
                    'tutoTime',
                    'expTime',
                    'surveyTime',
                    'surveyTime2',
                    'ibtTime'
                ],

                flattenByGroup:'player',

                flatten:true,

                keepUpdated: true

            })

        })

        // saving experiment data
        memory.view('correct').save('decision.csv', {

            header: [
                'player',
                'index',
                'answer',
                'correct',
                'dtd',
                'bt'
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


        // saving experiment data
        memory.view('ibt_Icon').save('ibt.csv', {

            header: [
                'player',

                'ibt_Icon',
                'ibt_PhotoIndex',
                'ibt_IconIndex',
                'ibt_AdjIndex',
                'ibt_Adjective',

                'ibt_Answer',
                'ibt_isAnswerRelevant',
                'ibt_isAnswerCorrect',

                'ibt_IntroTimeDuration',
                'ibt_PrimerDisplayDuration',
                'ibt_ReactionTime'
            ],

            keepUpdated: true

        });


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
                'ladder',
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
                'dtd',
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


        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
        // ++++++++++++                                         ++++++++++++ //
        // +++++++++           DISCONNECTION LISTENER              +++++++++ //
        // ++++++                                                     ++++++ //

        node.game.disconnected = {};

        node.game.disconnected.oguzAtay = function(player) {

            node.game.space(2)
            node.game.introFunction('Oguz Atay')
            node.game.talk(' --- Player ' + player.id + ' is disconnected ---');
            node.game.talk(' --- Disconnected player\'s count is ' + player.count + ' ---');
            node.game.talk(' --- Disconnected player\'s info in logic data base ---');
            node.game.talk(' -- Is Initiated ? -- ');
            node.game.talk('Fundamentals: ' + player.fundamentalsInitiated);
            node.game.talk('Lists: ' + player.listsGenerated);
            node.game.talk(' -- Decision Duration Time -- ');
            node.game.talk(player.dtd);
            node.game.talk(' -- Button Top -- ');
            node.game.talk(player.buttonTop);
            node.game.talk(' -- Current Pair Index -- ');
            node.game.talk(player.cpx);
            node.game.talk(' -- Shuffled Pair Index List -- ');
            node.game.talk(player.shuffled.pairIndexList);
            node.game.talk(' -- Shuffled Correct Answer List -- ');
            node.game.talk(player.shuffled.correctAnswerList);
            node.game.talk(' -- Random Number -- ');
            node.game.talk(player.randomNumber);
            node.game.space(2)

        }

        node.on.pdisconnect(function(player) {

            node.game.disconnected.oguzAtay(player);

        })


        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
        // ++++++++++++                                         ++++++++++++ //
        // +++++++++           RECONNECTION INTRODUCER             +++++++++ //
        // ++++++                                                     ++++++ //


        node.game.disconnected.yusufAtilgan = function(player, reconOpts) {

            node.game.space(2);
            node.game.introFunction('Yusuf Atilgan');
            node.game.talk('Player Object');
            console.log(player);

            // test stage
            if(player.disconnectedStage.stage === 2) {
                if(player.buttonTop) {
                    reconOpts.plot.frame = 'test2.htm';
                } else {
                    reconOpts.plot.frame = 'test1.htm';
                }
            }

            // instruction stage
            if(player.disconnectedStage.stage === 3) {
                if(player.buttonTop) {
                    reconOpts.plot.frame = 'instructions_alt.htm';
                } else {
                    reconOpts.plot.frame = 'instructions.htm';
                }
            }

            // instruction stage
            if(player.disconnectedStage.stage === 4) {
                if(player.buttonTop) {
                    reconOpts.plot.frame = 'identifyFaces_alt.htm';
                } else {
                    reconOpts.plot.frame = 'identifyFaces.htm';
                }
            }

            console.log(reconOpts);

        }

        // Reconnection.
        // node.on.preconnect(function(player) {
        //     console.log('A previously disconnected player reconnected to the game: ' + p.id);
        // });

    });

    stager.extendStep('hiddenStep', {

        reconnect: function(player, reconOpts) {

            console.log();
            console.log();
            console.log(' ---------------------------------------- ');
            console.log(' ---------------------------------------- ');
            console.log(' --- INSIDE HIDDEN STEP RECONNECT OPT --- ');
            console.log(' ---------------------------------------- ');
            console.log(' ---------------------------------------- ');
            console.log();
            console.log();

            node.game.disconnected.yusufAtilgan(player, reconOpts);

        },


        init: function() {

            console.log();
            console.log();
            console.log('********************************');
            console.log('********************************');
            console.log('********   HIDDEN STEP   *******');
            console.log('********************************');
            console.log('********************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('instructions', {

        reconnect: function(player, reconOpts) {

            console.log();
            console.log();
            console.log(' ---------------------------------------- ');
            console.log(' ---------------------------------------- ');
            console.log(' -------- INSIDE RECONNECT OPT ---------- ');
            console.log(' ---------------------------------------- ');
            console.log(' ---------------------------------------- ');
            console.log();
            console.log();

            // node.game.disconnected.reIntroduce(player);

        },


        init: function() {

            console.log();
            console.log();
            console.log('********************************');
            console.log('********************************');
            console.log('*******   TINSTRUCTIONS   ******');
            console.log('********************************');
            console.log('********************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('testStep', {

        reconnect: function(player, reconOpts) {

            console.log();
            console.log();
            console.log(' ---------------------------------------- ');
            console.log(' ---------------------------------------- ');
            console.log(' --- INSIDE TEST STEP RECONNECT OPT --- ');
            console.log(' ---------------------------------------- ');
            console.log(' ---------------------------------------- ');
            console.log();
            console.log();

            // node.game.disconnected.reIntroduce(player);
            reconOpts.plot.frame = 'test2.htm';

        },

        init: function() {

            console.log();
            console.log();
            console.log('*****************************');
            console.log('*****************************');
            console.log('*******   TEST STEP   ******');
            console.log('*****************************');
            console.log('*****************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('identifyFaces', {


        init: function() {

            console.log();
            console.log();
            console.log('*****************************');
            console.log('*****************************');
            console.log('*******   TEST PHASE   ******');
            console.log('*****************************');
            console.log('*****************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('survey2', {


        init: function() {

            console.log();
            console.log();
            console.log('************************************************');
            console.log('************************************************');
            console.log('*******   SURVEY 2 - SUBJECT EXPERIENCE   ******');
            console.log('************************************************');
            console.log('************************************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('results', {


        init: function() {

            console.log();
            console.log();
            console.log('*************************************************');
            console.log('*************************************************');
            console.log('*******   TEST RESULTS DECLARATION PHASE   ******');
            console.log('*************************************************');
            console.log('*************************************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('survey1', {


        init: function() {

            console.log();
            console.log();
            console.log('***************************************************');
            console.log('***************************************************');
            console.log('*******   SURVEY 2 - SUBJECT PERSONAL INFO   ******');
            console.log('***************************************************');
            console.log('***************************************************');
            console.log();
            console.log();

        },


    })


    stager.setOnGameOver(function() {
        // Something to do.
    });

};
