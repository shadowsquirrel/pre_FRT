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

        node.game.showMemory = (key) => {
            let test1 = memory.select('dataType', '=', key).fetch();
            // this.talk(test1);
            console.log(test1);
        }

        node.on.data('showMemory', (msg) => {
            node.game.showMemory(msg.data);
        })

        // some short cuts
        var can = {
            talk: node.game.talk,
            space: node.game.space,
            intro: node.game.introFunction,
        }

        // ------------------------- //
        // ------- MAIN DATA ------- //
        // ------------------------- //

        node.game.pairs = {
            list: undefined,
            helper: {},
        };

        var pairs = node.game.pairs;
        var helper = node.game.pairs.helper;

        // race: 0 white, 1 black
        // gender: 0 woman, 1 man
        // correctAnswer: 0 Not a match, 1 match
        // answerGiven: 0 Not a match, 1 match
        // isGivenAnswerCorrect: 0 not correct, 1 correct
        pairs.list = [
            // black women - false negative (i.e. match)
            {id:1, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:2, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:3, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:4, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:5, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:6, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:7, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:8, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:9, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:10, race:1, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            // black women - false positive (i.e. not a match)
            {id:11, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:12, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:13, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:14, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:15, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:16, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:17, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:18, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:19, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:20, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:21, race:1, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},

            // black men - false negative (i.e. match)
            {id:22, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:23, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:25, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:26, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:27, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:28, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:29, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:30, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:31, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            // black men - false positive (i.e. not a match)
            {id:33, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:34, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:35, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:36, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:37, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:38, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:39, race:1, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},

            // white women - false negative (i.e. match)
            {id:40, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:41, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:42, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:43, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:44, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:45, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:46, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:47, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:48, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:49, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:50, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:51, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:52, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:53, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:54, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:55, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:56, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:57, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:58, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:59, race:0, gender:0, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            // white women - false positive (i.e. not a match)
            {id:60, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:61, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:62, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:63, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:64, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:65, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:66, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:67, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:68, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:69, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:70, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:96, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:97, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:98, race:0, gender:0, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},

            // white men - false negative (i.e. match)
            {id:71, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:72, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:73, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:74, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:75, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:76, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:77, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:78, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:79, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:80, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:81, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:82, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:83, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            // white men - false positive (i.e. not a match)
            {id:84, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:85, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:86, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:87, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:88, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:89, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:90, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:91, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:92, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:93, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:94, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:95, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},

            // famous pairs
            {id:101, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:102, race:0, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:104, race:1, gender:1, correctAnswer:1, type:'False Negative', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},
            {id:105, race:0, gender:1, correctAnswer:0, type:'False Positive', answerGiven: undefined, isGivenAnswerCorrect: undefined, confidence: undefined},

        ]


        helper.getPairById = (id) => {

            var list = pairs.list;

            for(var i = 0; i < list.length; i++) {
                if(list[i].id === id) {
                    return list[i];
                }
            }

        }

        helper.getPairByIdGivenPlayer = (id, player) => {

            var list = player.pairList;

            for(var i = 0; i < list.length; i++) {
                if(list[i].id === id) {
                    return list[i];
                }
            }

        }

        // checks whether a given answer is correct
        // and updates the respective isGivenAnswerCorrect attribute of the pair object
        helper.isCorrect = (myPair) => {

            var verdict;

            // var myPair = helper.getPairByIdGivenPlayer(id);

            if(myPair.answerGiven === undefined) {
                node.game.talk('No answer is given for the pair coded as -1')
                myPair.isGivenAnswerCorrect = -1;
                // console.table(myPair);
                return false
            } else {
                node.game.talk('Answer is given checking if correct')
                verdict = (myPair.answerGiven === myPair.correctAnswer) ? 1 : 0;
                myPair.isGivenAnswerCorrect = verdict;
                // console.table(myPair)
                return true;
            }

        }

        helper.calculateScore = (player) => {

            var myPairList = player.pairList;
            var score = 0;

            myPairList.forEach((myPair) => {
                if(myPair.answerGiven === undefined) {
                    can.talk('Warning answer is not given for pair ', myPair.id)
                } else {
                    if(myPair.isGivenAnswerCorrect === undefined) {
                        can.talk('Warning answer is not checked!')
                        helper.isCorrect(myPair)
                    }
                    if(myPair.isGivenAnswerCorrect === 1) {
                        score++;
                    }
                }
            })

            return score;

        }

        // use the node.game.pairIndexList to fetch the pair object in that order
        // from the node.game.pairs.list pair database
        helper.generatePlayerPairList = (pairIndexList) => {

            var myPairList = [];

            var pairIdList = pairIndexList;

            pairIdList.forEach((id) => {
                myPairList.push(helper.getPairById(id));
            })

            return myPairList;

        }


        helper.injectPair = (list, injectionIndex, elementToInject) => {

            list.splice(injectionIndex, 0, elementToInject);

        }


        helper.injectFamousPairs = (playerPairList) => {

            var injectIndex, injectedId;

            var injectionIndexList = [0,8,18,29];
            // debug to be taken out
            // var injectionIndexList = [0,1,2,3];
            var injectedEltIdList = J.shuffle([101, 102, 104, 105]);

            injectionIndexList.forEach((element, index) => {

                injectIndex = element;
                injectedId = injectedEltIdList[index];

                helper.injectPair(playerPairList, injectIndex, injectedId);

            })

        }


        helper.forceDebugData = (player, debugList) => {
            player.pairIndexList = debugList;
        }


        helper.forceDebugDurationData = (player, durationObj) => {

            player.time.tutorial = durationObj.tutorial;
            player.time.experiment = durationObj.experiment;
            player.time.survey1 = durationObj.survey1;
            player.time.survey2 = durationObj.survey2;

            can.talk('WARNING! player time object is forced to be as below');
            console.table(player.time);

        }


        helper.setDataSession = (sessionNumber) => {
            node.game.dataSession = sessionNumber;
        }


        // -------------------------------------- //
        // ----- SESSION SPECIFIC MAIN DATA ----- //
        // -------------------------------------- //


        // debug
        node.game.dataSession = 1;
        node.game.space(2);
        node.game.talk('NODE.GAME.TREATMENTNAME: ' + node.game.settings.treatmentName);
        node.game.talk('node.game.settings.dataSession: ' + node.game.settings.dataSession);
        node.game.space(2);

        helper.setDataSession(node.game.settings.dataSession);


        // ---- SESSION 1 ---- //
        //
        // total 32
        //
        if(node.game.dataSession === 1) {

            node.game.talk('DATA SESSION - 1');

            node.game.pairIndexList = [
                1,4,7,10,11,16,20,26,28,31,35,39,40,43,46,49,52,55,58,61,64,67,70,98,73,76,79,82,85,88,91,94
            ]

        }

        // ---- SESSION 2 ---- //
        //
        // total 32
        //
        if(node.game.dataSession === 2) {

            node.game.talk('DATA SESSION - 2');

            node.game.pairIndexList = [
                2,5,8,13,14,17,21,23,25,30, 36,38,  41,44,47,50,53,56,59, 62,65,68,96,  71,74,77,80,83, 86,89,92,95
            ]

        }

        // ---- SESSION 3 ---- //
        //
        // total 32
        //
        if(node.game.dataSession === 3) {

            node.game.talk('DATA SESSION - 3');

            node.game.pairIndexList = [
                3,6,9,12,16,18,19,22,27,29,33,34,37,42,45,48,51,54,57,60,63,66,69,97,72,75,78,81,84,87,90,93
            ]

        }


        node.game.space(2)
        node.game.talk('-- node.game.pairIndexList --');
        console.log(node.game.pairIndexList);
        node.game.talk('Total number of pairs: ' + node.game.totalNumberOfPairs);
        node.game.space(2)


        // ----------------------------- //
        // -------- INITIATION -------- //
        // ----------------------------- //


        // init player for face test: generating the shuffled index etc
        node.game.initPlayerLists = function(player) {

            this.introFunction('initPlayerList');

            if(player.listsGenerated === undefined) {

                player.listsGenerated = true;

                player.pairIndexList = J.shuffle(node.game.pairIndexList);
                can.talk('player pair Index List');
                can.talk(player.pairIndexList);
                helper.injectFamousPairs(player.pairIndexList)
                can.talk('player pair Index List after famous injection');
                can.talk(player.pairIndexList);

                // debug forcing pairs list
                //
                // can.space(2);
                // can.talk(' -------------------------------------------- ');
                // can.space(1);
                // can.talk('WARNING! overriding generated data with debug data')
                // helper.forceDebugData(player, [1,20]);
                // can.talk('debug  player.pairIndexList:');
                // can.talk(player.pairIndexList);
                // can.space(1);
                // can.talk(' -------------------------------------------- ');
                // can.space(2);

                // Important !!!
                // node.game.pairIndexList needs to be fully constructed before
                // generating player's pairList object
                player.pairList = helper.generatePlayerPairList(player.pairIndexList);

                can.talk('player pairList object is generated!');
                // console.log(player.pairList);
                console.table(player.pairList);

                // Current Pair/Photo IndeX: CPX
                player.cpx = 0;

                // initiate score
                player.score = undefined;

                // initiate time object
                player.time = {
                    tutorial: undefined,
                    experiment: undefined,
                    survey1: undefined,
                    survey2: undefined,
                }

                player.payment = {
                    isStoredInMemory: false,
                    base: undefined,
                    bonus: undefined,
                    total: undefined,
                }

            } else {

                this.talk('PLAYER LISTS ARE ALREADY INITIATED');

            }


        }


        // init player meta func
        node.game.initPlayer = function(player) {

            this.introFunction('initPlayer')
            node.game.initPlayerLists(player);

            // if needed additional initiation function can be added here

        }

        // for debug purposes to select a data session prior the experiment
        node.game.reInitPlayer = (player, session) => {

            helper.setDataSession(session);
            // node.game.dataSession = session;

            if(node.game.dataSession === 1) {

                node.game.talk('DATA SESSION - 1');

                node.game.pairIndexList = [
                    1,4,7,10,11,16,20,26,28,31,35,39,40,43,46,49,52,55,58,61,64,67,70,98,73,76,79,82,85,88,91,94
                ]

            }

            if(node.game.dataSession === 2) {

                node.game.talk('DATA SESSION - 2');

                node.game.pairIndexList = [
                    2,5,8,13,14,17,21,23,25,30, 36,38,  41,44,47,50,53,56,59, 62,65,68,96,  71,74,77,80,83, 86,89,92,95
                ]

            }

            if(node.game.dataSession === 3) {

                node.game.talk('DATA SESSION - 3');

                node.game.pairIndexList = [
                    3,6,9,12,16,18,19,22,27,29,33,34,37,42,45,48,51,54,57,60,63,66,69,97,72,75,78,81,84,87,90,93
                ]

            }

            player.listsGenerated = undefined;
            node.game.initPlayerLists(player);

        }


        node.on.data('pickSession-LOGIC', function(msg) {

            this.introFunction('node.on.data(pickSession-LOGIC)');

            let player = node.game.pl.get(msg.from);

            var mySession = msg.data;
            this.talk('Session picked: ' + mySession)

            node.game.reInitPlayer(player, mySession);

        })


        // Listener to initiate the player parameters
        node.on.data('init-LOGIC', function(msg) {

            this.introFunction('node.on.data(init-LOGIC)');

            let player = node.game.pl.get(msg.from);

            node.game.initPlayer(player);

        })



        // ------------------------------------------- //
        // ------- TEST PHASE HELPER FUNCTIONS ------- //
        // ------------------------------------------- //

        // increments the current index AFTER receiving an answer from client
        // on the current index
        node.game.updateCurrentIndex = function(player) {

            player.cpx++;

        }

        // gets the index of the photo pair and the correct answer for the pair
        // sends these as a data object to player through LOGIC-nextPicture
        node.game.nextPicture = function(player) {

            can.talk('NEXT picture to be sent')
            can.talk('index/counter -> ' + player.cpx);
            // console.table(player.pairList[player.cpx-1])
            console.table(player.pairList[player.cpx])


            var data = {
                listIndex: player.cpx,
                pairList: player.pairList
            }

            node.game.talk('');
            node.game.talk('SENDING data to player.js')
            node.game.talk('');
            node.say('LOGIC-nextPicture', player.id, data);

            // var currentIndex = player.shuffled.pairIndexList[player.cpx];
            // var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];
            //
            // var data = {
            //     total: player.shuffled.pairIndexList.length,
            //     listIndex: player.cpx,
            //     index: currentIndex,
            //     correctAnswer: currentCorrectAnswer
            // }
            //
            // node.say('LOGIC-nextPicture', player.id, data);

        }

        // AFTER updateCurrenIndex checks if the current index reached the size
        // od the index list (i.e. exhausted the list)
        // returns true if this the case
        // returns false otherwise
        node.game.checkEnd = function(player) {

            this.introFunction('checkEnd');

            this.talk('Checking if photos are finished');

            // var size = node.game.pairIndexList.length;
            var size = player.pairList.length;

            this.talk('current index: ' + player.cpx);
            this.talk('list length: ' + player.pairList.length);

            if(player.cpx < player.pairList.length) {

                this.talk('CONTINUE WITH FACE TEST');

                return false;

            } else {

                this.talk('DONE WITH FACE TEST');

                return true;

            }

            // if(player.cpx >= player.pairList.length) {
            //
            //     this.talk('DONE WITH FACE TEST');
            //
            //     return true;
            //
            // } else {
            //
            //     this.talk('CONTINUE WITH FACE TEST');
            //
            //     return false;
            //
            // }

        }


        // End the test by sending finish test message to the client
        node.game.endTest = function(player) {

            this.introFunction('endTest');

            var msg = 'DONE';

            node.say('LOGIC-finishTest', player.id, msg);

        }


        // ----------------------------------------------------------- //
        // -----------------        LISTENERS          --------------- //
        // ----------------------------------------------------------- //

        node.game.totalNumberOfPairs = node.game.pairIndexList.length;

        node.on.data('requestTotalNumberOfPairs', (msg) => {

            let player = node.game.pl.get(msg.from);

            var total = node.game.totalNumberOfPairs + 4;

            node.say('totalNumberOfPairs', player.id, total);

        })


        node.on.data('updatePlayerTime', (msg) => {

            this.introFunction('node.on.data(updatePlayerTime)');
            this.talk(' -- Time data received for ' + msg.data.section + ' section -- ')
            console.table(msg.data);

            // get player
            let player = node.game.pl.get(msg.from);

            var section = msg.data.section;

            player.time[section] = msg.data.duration;

            console.table(player.time);

        })


        node.on.data('CLIENT-answer-LOGIC', (msg) => {

            this.introFunction('node.on.data(CLIENT-answer-LOGIC)');
            this.talk('Answer given is : ' + msg.data);

            // get player
            let player = node.game.pl.get(msg.from);

            var myPair = player.pairList[player.cpx];

            // record player's answer for the current index
            myPair.answerGiven = msg.data.answer;
            myPair.confidence = msg.data.confidence;

            if(helper.isCorrect(myPair)) {
                can.talk('ANSWER IS CORRECT');
                console.table(myPair);
            } else {
                can.talk('ANSWER IS WRONG');
                console.table(myPair);
            }

            // record player's answer for the current index
            // player.givenAnswerList[player.cpx] = msg.data;

            // update the index (increment)
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

            this.talk('Calculating the score for player ' + player.count);

            player.score = helper.calculateScore(player);

            this.talk('Player final score -> ' + player.score);

            can.space(2);
            console.table(player.pairList);
            can.space(2);

            // var size = player.shuffled.correctAnswerList.length;

            // var score = 0;
            //
            // for(var i = 0; i < size; i++) {
            //
            //     // debug
            //     this.talk('Index: ' + i);
            //     this.talk('Correct Answer: ' + player.shuffled.correctAnswerList[i]);
            //     this.talk('Given Answer: ' + player.givenAnswerList[i]);
            //
            //
            //     var correct = (player.shuffled.correctAnswerList[i] === player.givenAnswerList[i]);
            //
            //     player.shuffled.correctDecisionList[i] = correct;
            //
            //     if(correct) {
            //         score++;
            //     }
            //
            // }
            //
            // player.score = score;
            //
            // // debug
            // this.talk('PLAYER FINAL SCORE: ' + player.score);
            // this.talk(player.shuffled.pairIndexList);
            // this.talk(player.givenAnswerList);
            // this.talk(player.shuffled.correctAnswerList);
            // this.talk(player.shuffled.correctDecisionList);

        })


        // listens client to return client player's score calculated in logic
        node.on.data('results-LOGIC', function(msg) {

            this.introFunction('node.on.data(results-LOGIC)');

            let player = node.game.pl.get(msg.from);

            // WARNING - UNCOMMENT THIS FOR THE FULL GAME !!!
            // helper.forceDebugDurationData(player, {
            //     tutorial: 30000,
            //     experiment: 90000,
            //     survey1: 12000,
            //     survey2: 6000
            // })

            var pPay = node.game.settings.participationPayment;
            var bRate = node.game.settings.bonusRate;
            var bPay = bRate * player.score;
            var tPay = pPay + bPay;

            can.talk('participation payment: ' + pPay);
            can.talk('bonus rate: ' + bRate);
            can.talk('bonus payment: ' + bPay);
            can.talk('total payment: ' + tPay);

            var data = {
                score: player.score,
                total: player.pairList.length,
                pPay: pPay,
                bRate: bRate,
                bPay: bPay,
                tPay: tPay,
                tutoTime: player.time.tutorial,
                expTime: player.time.experiment,
                s1Time: player.time.survey1,
                s2Time: player.time.survey2
            };

            node.say('LOGIC-results', player.id, data);

            player.payment.base = pPay;
            player.payment.bonus = bPay;
            player.payment.total = tPay;

        })

        // listens client to return player's payment results
        node.on.data('calculateBonus-LOGIC', function(msg) {

            this.introFunction('node.on.data(calculateBonus-LOGIC)');

            let player = node.game.pl.get(msg.from);

            can.talk('player s payment');
            console.table(player.payment);

            node.say('LOGIC-calculateBonus', player.id, player.payment);

        })

        node.on.data('isBonusStored', function(msg) {

            this.introFunction('node.on.data(isBonusStored)');

            let player = node.game.pl.get(msg.from);
            can.talk('current player pay object');
            console.table(player.payment);

            player.payment.isStoredInMemory = true;

            can.talk('bonus is stored, boolean is updated');
            console.table(player.payment);


        })


        // sends exit code to html upon request
        node.on.data('getExitCode', function(msg) {

            let player = node.game.pl.get(msg.from);

            node.say('HTML-exitCode', player.id, node.game.settings.exitCode);

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

            var data = {
                listIndex: player.cpx,
                pairList: player.pairList
            }

            can.talk('first/next picture to be sent')
            can.talk('index/counter must be 0 if no reconnection -> ' + data.listIndex)
            // console.table(data.pairList)

            node.game.talk('');
            node.game.talk('SENDING data to player.js')
            node.game.talk('');
            node.say('LOGIC-firstPicture', player.id, data);



            // var currentIndex = player.shuffled.pairIndexList[player.cpx];
            // var currentCorrectAnswer = player.shuffled.correctAnswerList[player.cpx];
            //
            // var data = {
            //     total: player.shuffled.pairIndexList.length,
            //     listIndex: player.cpx,
            //     index: currentIndex,
            //     correctAnswer: currentCorrectAnswer
            // }
            //
            // this.talk('CURRENT INDEX IS: ' + currentIndex);
            // this.talk('CORRECT ANSWER IS: ' + currentCorrectAnswer);
            //
            // this.talk('Data to be sent');
            // console.log(data);
            //
            // node.say('LOGIC-firstPicture', player.id, data);

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
        memory.view('pairIndex').save('decision.csv', {

            header: [
                'player',
                'treatment',
                'pairIndex',
                'pairRace',
                'pairGender',
                'pairType',
                'answer',
                'correct',
                'confidence',
                'xCoor',
                'yCoor',
                'tCoor',
                'responseTime',
                'velocity',
                'totalResponseTime',
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

        // saving bonus payment data
        memory.view('playerBonus').save('playerBonus.csv', {

            header: [
                'player',
                'playerBonus'
            ],

            keepUpdated: true

        })

        // saving subject survey data
        memory.view('gender').save('survey.csv', {

            header: [
                'player',
                'gender',
                'age',
                'race',
                'interactedRace',
                'student',
                'education',
                'eduFocus',
                'location',
            ],

            keepUpdated: true

        })

        // saving subject experiment experience survey data
        memory.view('buttonPlacement').save('survey2.csv', {

            header: [
                'player',
                'buttonPlacement',
                'enoughTime',
                'imageSize',
            ],

            keepUpdated: true

        })

        // Feedback.
        memory.view('myFeedback').save('myFeedback.csv', {
            header: ['player', 'myFeedback' ],
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
            node.game.talk(' -- Current Pair Index -- ');
            node.game.talk(player.cpx);
            node.game.talk('-- node.game.settings.dataSession --');
            node.game.talk(node.game.settings.dataSession);
            node.game.space(1)
            console.table(player.pairList);
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

            node.game.space(2);
            node.game.talk('NODE.GAME.TREATMENTNAME: ' + node.game.settings.treatmentName);
            node.game.talk('node.game.settings.dataSession: ' + node.game.settings.dataSession);
            node.game.space(2);

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


    stager.extendStep('consent', {

        reconnect: function(player, reconOpts) {

            node.game.disconnected.yusufAtilgan(player, reconOpts);

        },


        init: function() {

            console.log();
            console.log();
            console.log('********************************');
            console.log('********************************');
            console.log('*******    CONSENT PAGE   ******');
            console.log('********************************');
            console.log('********************************');
            console.log();
            console.log();

        },


    });


    stager.extendStep('pickSession', {

        reconnect: function(player, reconOpts) {

            node.game.disconnected.yusufAtilgan(player, reconOpts);

        },


        init: function() {

            console.log();
            console.log();
            console.log('********************************');
            console.log('********************************');
            console.log('*******    PICK SESSION   ******');
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
        can.talk('THE GAME HAS ENDED!')
    });

};
