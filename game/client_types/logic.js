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
            1,2,3,4,5,6
        ]


        node.game.correctAnswerList = [
            0,1,0,1,0,1,0
        ]




        // ----------------------------- //
        // -------- INITIATION -------- //
        // ----------------------------- //


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

                // Notice that for each subject another random list is generated but only once
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

        }


        // init player meta func
        node.game.initPlayer = function(player) {

            this.introFunction('initPlayer')
            node.game.initPlayerLists(player);

            // if needed additional initiation function can be added here

        }


        // Listener to initiate the player parameters
        node.on.data('init-LOGIC', function(msg) {

            this.introFunction('node.on(init-LOGIC)')

            let player = node.game.pl.get(msg.from);

            node.game.initPlayer(player);

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

        // gets the index of the photo pair and the correct answer for the pair
        // sends these as a data object to player through LOGIC-nextPicture
        node.game.nextPicture = function(player) {

            var currentIndex = player.shuffled.pairIndexList[player.cpx];
            var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];

            var data = {
                index: currentIndex,
                correctAnswer: currentCorrectAnswer
            }

            node.say('LOGIC-nextPicture', player.id, data);

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

                node.game.nextPicture(player);

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

            // check it the test ended
            if(node.game.checkEnd(player)) {

                node.game.endTest(player);

            } else { // else go to the next picture

                node.game.nextPicture(player);

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
            this.talk('CLIENT NO ANSWER RESPONSE RECEIVED BY LOGIC');

            let player = node.game.pl.get(msg.from);

            player.givenAnswerList[player.cpx] = -2;

            node.game.updateCurrentIndex(player);

            // check it the test ended
            if(node.game.checkEnd(player)) {

                node.game.endTest(player);

            } else {

                node.game.nextPicture(player);

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
                    'surveyTime2'
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
                // add a response time variable too
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


        node.on.data('mouseData', function() {

            this.introFunction('node.on.data(mouseData, ...)')

            memory
            .select('dataType', '=', 'mouse')
            .save('mouse.csv', {

                header: [
                    'player',
                    'xCoor',
                    'yCoor',
                    'tCoor'
                ],

                flattenByGroup:'player',

                flatten:true,

                keepUpdated: true

            })

            let test1 = memory.select('dataType', '=', 'mouse').fetch();
            // this.talk(test1);
            console.log(test1);

        })

        // did not work
        // memory.view('xCoor').save('mouse.csv', {
        //
        //     header: [
        //         'player',
        //         'xCoor',
        //         'yCoor',
        //         'tCoor'
        //     ],
        //
        //     flattenByGroup:'player',
        //
        //     flatten:true,
        //
        //     keepUpdated: true
        //
        // })


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

            node.game.talk('We can change anything we want through the reconOpts below')
            node.game.talk('e.g. recontsOpts.plot.frame = xx.htm given ' + player.disconnectedStage.stage
            + 'for the stage disconnected')
            console.log(reconOpts);

            // test stage
            // if(player.disconnectedStage.stage === 2) {
            //     if(player.buttonTop) {
            //         reconOpts.plot.frame = 'test2.htm';
            //     } else {
            //         reconOpts.plot.frame = 'test1.htm';
            //     }
            // }

        }

        // Reconnection.
        node.on.preconnect(function(player, reconOpts) {

            node.game.space(2);
            node.game.introFunction('reconnect')
            console.log('A previously disconnected player reconnected to the game: ' + player.id);

            node.game.disconnected.yusufAtilgan(player, reconOpts);

        });

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
            console.log('*******    INSTRUCTIONS   ******');
            console.log('********************************');
            console.log('********************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('identifyFaces', {

        reconnect: function(player, reconOpts) {

            node.game.disconnected.yusufAtilgan(player, reconOpts);

        },


        init: function() {


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
