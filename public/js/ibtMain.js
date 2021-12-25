window.onload = function() {

    var node = parent.node;

    var show = {}
    var hide = {}
    var set = {}

    var answer = {
        leftRepresents: undefined, // 'YES' or 'NO'
        rightRepresents: undefined, // 'YES' or 'NO'
        given: undefined, // 'YES' or 'NO'
        correct: undefined, // 1 for correct, 0 for incorrect
        relevant: undefined, // 1 for relevant, 0 for irrelevant
    }

    let time = {

        startIntro: undefined,
        endIntro:undefined,
        introDuration: function() {
            return (time.endIntro - time.startIntro);
        },

        startTrial:undefined,
        endTrial:undefined,


        showPhoto:undefined,
        hidePhoto:undefined,

        photoDisplayDuration: function() {
            return (time.hidePhoto - time.showPhoto);
        },


        showAdjective:undefined,
        hideAdjective:undefined,

        reactionTime: function() {
            return (time.hideAdjective - time.showAdjective);
        },

    }



    // ------------------------------- //
    // ------ DISPLAY DURATIONS ------ //
    // ------------------------------- //

    // intro duration also serves as the waiting time between trials
    var introDuration = 2500;

    // duration of the primer photo being displayed
    var photoDuration = 20;

    // duration of the icon being displayed
    var iconDuration = 250;

    // max time to answer
    var adjDuration = 1000;
    adjDuration = 750;


    // debug
    // introDuration = 3000
    // photoDuration = 3000;
    // iconDuration = 3000;
    // adjDuration = 10000;



    // ------------------------------ //
    // --------- PARAMETERS --------- //
    // ------------------------------ //

    var keystrokeOn = undefined;

    var answerGiven = undefined;

    // ---- //

    var primerPhotoDiv = undefined;

    var iconPhotoDiv = undefined;

    var adjectiveList = undefined;
    var adjective = undefined;
    var adj = {};
    adj.human = ['good', 'kind', 'trustworthy', 'bad', 'cruel', 'untrustworthy'];
    adj.house = ['leaky', 'roomy', 'wooden', 'furnished', 'drafty', 'thatch'];



    // --------------------------------------- //
    // ------------- INITIALIZIER ------------ //
    // --------------------------------------- //
    //
    // initialize all sorts of parameters before starting the trial
    // we hope this will save us computational time
    //
    var initializeParameters = function() {

        keystrokeOn = false;

        answerGiven = false;

        // ----- intro initializer ----- //

        $('#trialNumber').html(trial.round);

        time.startIntro = Date.now();

        progressBarAction(0);

        setTimeout(()=>{
            $('.trialIntroText, #trialNumber').css({'opacity':'1'});
        }, 100)

        // ------------------------------ //

        // setup the button text
        setButtons();



        primerPhotoDiv = '.photo-' + trial.photo;

        iconPhotoDiv = trial.icon === 'person' ? '.string-p' : '.string-h';

        adjectiveList = trial.icon === 'person' ? adj.human : adj.house;
        adjective = adjectiveList[trial.adj];
        $('#adj').html(adjective);


        // debug
        // console.log('');
        // console.log('---- PARAMETERS INITIALIZED ----');
        // console.log('primerPhotoDiv: ' + primerPhotoDiv);
        // console.log('iconPhotoDiv: ' + iconPhotoDiv);
        // console.log('adjectiveList: ' + adjectiveList);
        // console.log('adjective: ' + adjective);
        // console.log('');


    }



    // ------------------------------------------------------------------ //
    // ------------- PRIMARY LISTENER TO ACTIVATE THE TRIAL  ------------ //
    // ------------------------------------------------------------------ //
    //
    // retreiving IBT order from CLIENT -> LOGIC
    node.on('request-IBT-trial-HTML', function(msg) {

        trial = msg;

        // ----- debug photo indicator ---- //
        $('#xxx').html(trial.photo);
        if(trial.photo === 0) {
            $('#xxx').css({'color':'red'});
        }

        console.log('---- TRIAL DATA RECEIVED ----');
        console.log(trial);

        initializeParameters();

        // ~ ~ ~ ~ ~ ~ with introDuration delay ~ ~ ~ ~ ~ ~ //
        //
        setTimeout(()=>{

            // record intro end time of the trial
            time.endIntro = Date.now();

            // record show time of the photo primer
            time.showPhoto = Date.now();

            // show primer photo
            if(trial.icon === 'person') {
                $(primerPhotoDiv).css({'z-index':'1'});
            }


            // ~ ~ ~ ~ ~ ~ with photoDuration delay ~ ~ ~ ~ ~ ~ //
            //
            setTimeout(()=>{

                // ----------------------------------- //

                // hide photo primer
                $(primerPhotoDiv).css({'z-index':'0'});

                // record hide time of the photo primer
                time.hidePhoto = Date.now();

                // ----------------------------------- //

                // show icon primer
                $(iconPhotoDiv).css({'z-index':'1'});

                // ----------------------------------- //


                // ~ ~ ~ ~ ~ ~ with iconDuration delay ~ ~ ~ ~ ~ ~ //
                //
                // hide icon
                // show adjective
                // start answer timer
                //
                setTimeout(()=>{

                    // hide icon
                    $('.primer-string').css({'z-index':'0'});

                    // show adjective
                    $('.text-wrap-column').css({'z-index':'1'});

                    // start answer display counter
                    time.showAdjective = Date.now();

                    // turn on keystroke listeners
                    keystrokeOn = true;

                    // start answer countdown
                    startCountDown();

                }, iconDuration)

                // ----------------------------------- //

            }, photoDuration)

        }, introDuration)

    })

    // trigger CLIENT listener to receive the trial parameters and
    // start the curren trial
    node.emit('HTML-request-IBT-trial');



    // ------------------------------------------------------------- //
    // -------------------- HELPER FUNCTIONS ----------------------- //
    // ------------------------------------------------------------- //
    //
    // starts the countdown for the answer period
    var startCountDown = function() {

        setTimeout(()=>{

            if(!answerGiven) {

                // debug
                // console.log('TIME IS UP! -> NO ANSWER IS GIVEN');

                // stop time answer display
                time.hideAdjective = Date.now();

                var data = {

                    icon: trial.icon,
                    photoIndex: trial.photo,
                    iconIndex: trial.icon === 'person' ? 1 : 0,
                    adjIndex: trial.adj,
                    adjective: adjective,

                    // TO DO
                    givenAnswer: 'NO ANSWER',
                    isAnswerRelevant: (trial.icon === 'person'),
                    isAnswerCorrect: 0,

                    introTimeDuration: time.introDuration(),
                    primeDisplayDuration: time.photoDisplayDuration(),
                    reactionTime: time.reactionTime()

                }

                node.emit('HTML-IBT-decisionMade', data)

                // debug
                // console.log(data);

            }

        }, adjDuration)

    }

    // progress bar animation for the intro
    var progressBarAction = function(increment) {

        if(increment <= 100) {

            var pp = increment;
            pp = pp + '%';
            $('.progress-bar').css({'width':pp});

            increment = increment + 25;

            setTimeout(()=>{
                progressBarAction(increment);
            }, 20)

        } else {

            setTimeout(()=>{
                $('.introToTrial').css({'transition':'0.3s', 'opacity':'0'});
            }, 750)

        }

    }

    // sets the buttons YES and NO placement based on the data given
    var setButtons = function() {

        var setup = trial.buttonSetup;

        // setup 0 -> left-Z-NO | right-M-YES
        if(setup === 0) {

            $('#Z, #fakeZ').html('NO');
            $('#M, #fakeM').html('YES');

            answer.leftRepresents = 'NO';
            answer.rightRepresents = 'YES';

        }

        // setup 1 -> left-Z-YES | right-M-NO
        if(setup === 1) {

            $('#Z, #fakeZ').html('YES');
            $('#M, #fakeM').html('NO');

            answer.leftRepresents = 'YES';
            answer.rightRepresents = 'NO';

        }

    }

    // checks the theoretical relevance and if relevant, correctness of the answer
    var setAnswerValidity = function() {

        answer.relevant = (trial.icon === 'person');

        if(answer.relevant) {
            answer.correct = (answer.given === 'YES');
        } else {
            answer.correct = 'whoCares?';
        }

    }

    // ------------------------------------------ //
    // ---------- KEYSTROKE LISTENERS ----------- //
    // ------------------------------------------ //
    //
    $(document).keypress(function(e) {

        if(e.which === 122 || e.which === 90) {

            if(keystrokeOn) {

                keystrokeOn = false;

                // stop time answer display
                time.hideAdjective = Date.now();

                // console.log('-------- Z ---------');
                // console.log('-------- Z ---------');
                // console.log('-------- Z ---------');

                answerGiven = true;

                answer.given = answer.leftRepresents;

                if(answer.leftRepresents === 'NO') {
                    $('.leftButton').css({'background':'red'});
                } else {
                    $('.leftButton').css({'background':'green'});
                }

                setAnswerValidity();

                var data = {

                    icon: trial.icon,
                    photoIndex: trial.photo,
                    iconIndex: trial.icon === 'person' ? 1 : 0,
                    adjIndex: trial.adj,
                    adjective: adjective,
                    answer: 'Z',

                    // TO DO
                    givenAnswer: answer.given,
                    isAnswerRelevant: answer.relevant,
                    isAnswerCorrect: answer.correct,

                    introTimeDuration: time.introDuration(),
                    primeDisplayDuration: time.photoDisplayDuration(),
                    reactionTime: time.reactionTime()

                }

                node.emit('HTML-IBT-decisionMade', data);


            } else {

                // console.log('keystroke is OFF -> Z');

            }


            if(answer.leftRepresents === 'NO') {
                $('.fakeLeftButton').css({'background':'red'});
            } else {
                $('.fakeLeftButton').css({'background':'green'});
            }
            setTimeout(()=>{
                $('.fakeLeftButton').css({'background':'white'});
            }, 200)

        }



        if(e.which === 109 || e.which === 77) {

            if(keystrokeOn) {

                keystrokeOn = false;

                // stop time answer display
                time.hideAdjective = Date.now();

                // console.log('--------- M ----------');
                // console.log('--------- M ----------');
                // console.log('--------- M ----------');

                answerGiven = true;

                answer.given = answer.rightRepresents;

                if(answer.rightRepresents === 'NO') {
                    $('.rightButton').css({'background':'red'});
                } else {
                    $('.rightButton').css({'background':'green'});
                }

                setAnswerValidity();

                var data = {

                    icon: trial.icon,
                    photoIndex: trial.photo,
                    iconIndex: trial.icon === 'person' ? 1 : 0,
                    adjIndex: trial.adj,
                    adjective: adjective,
                    answer: 'M',

                    // TO DO
                    givenAnswer: answer.given,
                    isAnswerRelevant: answer.relevant,
                    isAnswerCorrect: answer.correct,

                    introTimeDuration: time.introDuration(),
                    primeDisplayDuration: time.photoDisplayDuration(),
                    reactionTime: time.reactionTime()

                }

                node.emit('HTML-IBT-decisionMade', data);

            } else {

                // console.log('keystroke is OFF -> M');

            }


            if(answer.rightRepresents === 'NO') {
                $('.fakeRightButton').css({'background':'red'});
            } else {
                $('.fakeRightButton').css({'background':'green'});
            }
            setTimeout(()=>{
                $('.fakeRightButton').css({'background':'white'});
            }, 200)


        }


    });



    // ------------------------------------------------------------- //
    // ---------------- DEBUG ACTIAVATOR OF THE TRIAL -------------- //
    // ------------------------------------------------------------- //
    //
    var debugStart = function() {

        console.log('HTML: IBT ORDER RECEIVED FROM HTML');

        // debug data
        trial = {
            round: 15,
            icon: 'person',
            photo: 3,
            adj: 5
        };

        console.log('---- TRIAL DATA RECEIVED ----');
        console.log(trial);

        initializeParameters();

        setTimeout(()=>{

            time.endIntro = Date.now();
            console.log('intro duration: ' + time.introDuration());

            // record show time of the photo primer
            time.showPhoto = Date.now();
            console.log('time.showPhoto: ' + time.showPhoto);

            // show primer photo
            $(primerPhotoDiv).css({'z-index':'1'});


            // ~ ~ ~ ~ ~ ~ with photoDuration delay ~ ~ ~ ~ ~ ~ //

            setTimeout(()=>{

                // ----------------------------------- //

                // hide photo primer
                $(primerPhotoDiv).css({'z-index':'0'});

                // record hide time of the photo primer
                time.hidePhoto = Date.now();
                console.log('time.hidePhoto: ' + time.hidePhoto);
                console.log('photo display duration: ' + time.photoDisplayDuration());

                // ----------------------------------- //

                // show icon primer
                $(iconPhotoDiv).css({'z-index':'1'});

                // ----------------------------------- //


                // ~ ~ ~ ~ ~ ~ with iconDuration delay ~ ~ ~ ~ ~ ~ //
                //
                // hide icon
                // show adjective
                // start answer timer
                //
                setTimeout(()=>{

                    // hide icon
                    $('.primer-string').css({'z-index':'0'});

                    // show adjective
                    $('.text-wrap-column').css({'z-index':'1'});

                    // start answer display counter
                    time.showAdjective = Date.now();
                    console.log('time.showAdjective: ' + time.showAdjective);

                    // start answer countdown
                    startCountDown();

                    // turn on keystroke listeners
                    keystrokeOn = true;

                }, iconDuration)


                // ----------------------------------- //

            }, photoDuration)

        }, introDuration)

    }


    // debugStart();



}
