
var data = {
    pairObject: undefined,
    index: undefined,
    answer: undefined,
    isCorrect: undefined,
    // mouse tracking
    xCoor: undefined,
    yCoor: undefined,
    tCoor: undefined,
    // confidence
    confidence: undefined
}
var picture = {};
var button = {};
var go = {};
var progress = {};
var transitionTo = {};
var timer = {};
var help = {};
var helper = {
    timer: {
        mutate: {},
    },
};

picture.index = undefined;
picture.correctAnswer = undefined;
button.answer = undefined;


// ------  MOUSE TRACKING GLOBALS ----- //

var x = [];
var y = [];
var t = [];
var firstTime = true;
var translated = false;
var t0 = undefined;
var t1 = undefined;
var prevT = undefined;
var dt = undefined;

// ------------------------------------ //


// window.onload = function() {

    var node = parent.node;

    // --------------- //

    node.emit('HTML-startSecretExpTimer');

    // --------------- //

    help.clone = (arr) => {

        var x = JSON.stringify(arr);
        var y = JSON.parse(x);

        return y;

    }

    // --------------------------------------------- //
    // -------------  GO / NEXT BUTTON ------------- //
    // --------------------------------------------- //

    $('#goText').html('START');

    go.isClicked = false;

    go.show = function() {

        // show the go button
        $('.frame-C').css({'transition':'0s',
        'z-index':'1', 'transform':'scale(1)'});
        setTimeout(()=>{
            $('.frame-C').css({'transition':'0.2s',
            'opacity':'1'});
        }, 10)

    }

    go.switchedToNext = false;

    go.hide = function() {

        progress.hide();

        if(!go.switchedToNext) {

            go.switchedToNext = true;

            setTimeout(()=>{
                $('#goText').html('NEXT')
            }, 750)

        }

        // hide the go button
        $('.frame-C').css({'transition':'0.1s',
        'opacity':'0', 'z-index':'0'});
        setTimeout(()=>{
            $('.frame-C').css({'transform':'scale(0)'});
        }, 110)

        // show the pictures
        setTimeout(()=>{
            picture.show();
        }, 100)

        // show the buttons
        setTimeout(()=>{
            button.show();
            // node.emit('startTimer');
        }, 100)

    }


    // ---------------------------------------------------- //
    // ----------------  PROGRESS CIRCLE ------------------ //
    // ---------------------------------------------------- //

    progress.show = () => {

        $('.progress-main-container').css({
            'transition':'1s',
            'opacity':'1'
        });

    }

    progress.hide = () => {

        $('.progress-main-container').css({
            'transition':'0.1s',
            'opacity':'0'
        });

    }

    progress.update = (listIndex, total) => {

        var index = listIndex;

        console.log('progress.update index received:', index);

        index++;

        console.log(index);

        $('#progress-number').html(index + '/' + total);

    }


    // ---------------------------------------------------- //
    // ------------------      TIMER      ----------------- //
    // ---------------------------------------------------- //

    timer.activeTimeout = undefined;

    timer.warnMainTimeout = undefined;
    timer.warnTimeout = undefined;
    timer.warnTimeoutSide = undefined

    timer.initiate = () => {

        timer.timerContainer = document.getElementById('myTimer');
        node.game.visualTimer = node.widgets.append('VisualTimer', timer.timerContainer);

        timer.reformat();
        node.game.visualTimer.hide();

        helper.timer.mutate.activate();

    }

    timer.reformat = () => {

        var div = document.getElementById('myTimer')
        var timerText = div.children[0].children[0];
        timerText.style.display = 'none';

    }

    timer.hide = () => {

        $('.timer-container').css({
            'opacity':'0'
        })

    }

    timer.show = () => {

        $('.timer-container').css({
            'opacity':'1'
        })

    }

    timer.start = () => {

        timer.show();

        node.game.visualTimer.show();

        node.game.visualTimer.restart({

            milliseconds: 6000,

            timeup: function() {
                console.log('TIME UP TIME UP TIME UP TIME UP');
            }

        })

        timer.warnMainTimeout = setTimeout(()=>{
            timer.warn(5);
        }, 6000)

        timer.activeTimeout = setTimeout(()=>{
            timer.timeUp();
        }, 12000)

    }

    timer.stop = () => {

        node.game.visualTimer.gameTimer.pause();
        node.game.visualTimer.hide();
        clearTimeout(timer.activeTimeout);

        timer.killWarn();

    }

    timer.timeUp = () => {

        // console.log('no answer is given proceeding the with timer.timeup function');

        if(!button.isClicked) {

            console.log('no answer is given');

            // for labeling/understanding the binary code
            var noAnswer = -2;
            var timeIsUp = true;

            button.answer = noAnswer;
            button.click(timeIsUp);

        }

    }

    timer.warn = (times) => {

        if(times > 0) {

            times--;

            $('.myTimer').css({
                'transition':'0.65s',
                'color':'red',
                'transform':'scale(1.2)'
            })

            timer.warnTimeoutSide = setTimeout(()=>{
                $('.myTimer').css({
                    'transition':'0.65s',
                    'color':'black',
                    'transform':'scale(1)'
                })
            }, 650)

            timer.warnTimeout = setTimeout(()=>{
                timer.warn(times);
            }, 1200)

        } else {

            $('.myTimer').css({
                'transition':'0.6s',
                'color':'black',
                'transform':'scale(1)'
            })

            // console.log('asdasd');

        }

    }

    timer.killWarn = () => {

        clearTimeout(timer.warnTimeout);
        clearTimeout(timer.warnTimeoutSide);
        clearTimeout(timer.warnMainTimeout);

    }


    // ---------------------------------------------------- //
    // -----------------  TIMER MUTATION  ----------------- //
    // ---------------------------------------------------- //

    helper.timer.mutate.initiateParam = () => {

        helper.timer.mutate.target = document.getElementById('myTimer').children[0].children[1].children[0];
        helper.timer.mutate.config = { attributes: true, childList: true, subtree: true };

        // console.log('target found');
        // console.log(helper.timer.mutate.target);

    }

    helper.timer.mutate.mutate = (mutationsList, observer) => {

        // console.log('observation process begun');
        // console.log(mutationsList);

        var mutation, addedDiv, addedText;

        // Use traditional 'for loops' for IE 11
        for(var i = 0; i < mutationsList.length; i++) {

            mutation = mutationsList[i];

            if (mutation.type === 'childList') {

                // console.log('mutation detected');
                addedDiv = mutation.addedNodes;
                addedText = addedDiv[0].data.charAt(4);
                // console.log(addedDiv);
                // console.log(addedText);
                // console.log(typeof(addedText));
                addedDiv[0].data = addedText;

            }

        }

    }

    helper.timer.mutate.observer = new MutationObserver(helper.timer.mutate.mutate);

    helper.timer.mutate.activate = () => {

        // console.log('activation begun');
        helper.timer.mutate.initiateParam();
        helper.timer.mutate.observer.observe(helper.timer.mutate.target, helper.timer.mutate.config);

    }


    // ---------------------------------------------------- //
    // ----------------  PICTURE HELPERS ------------------ //
    // ---------------------------------------------------- //

    picture.set = function(index) {

        var myString = 'faces/exp/';

        var sourceLeft = myString + index + 'a' + '.jpg';

        var sourceRight = myString + index + 'b' + '.jpg'

        $('#lF').attr('src', sourceLeft);

        $('#rF').attr('src', sourceRight);

    }

    picture.hide = function() {

        $('.facePicture').css({
            'transition':'0.1s',
            'opacity':'0'
        });

        console.log('');
        console.log('HIDE PICTURE');
        console.log('');

    }

    picture.show = function() {

        $('.facePicture').css({
            'transition':'0.1s',
            'opacity':'1'
        });

        console.log('');
        console.log('SHOW PICTURE');
        console.log('');

    }

    picture.min = () => {

        $('.step-1').css({
            'transition':'0s',
            'transform-origin':'top',
            'transform':'scale(0.4)',
            'margin-bottom':'-50%',
            'margin-top':'10%',
        })

    }

    picture.max = () => {

        $('.step-1').css({
            'transition':'0s',
            'transform':'scale(1)',
            'margin-bottom':'0'
        })

    }


    // ---------------------------------------------------- //
    // -------------  TRANSITION BETWEEN STEPS ------------ //
    // ---------------------------------------------------- //

    transitionTo.step2 = () => {

        $('.step-1, .step-2').css({
            'transition':'0.2s',
            'opacity':'0'
        })

        setTimeout(()=>{

            picture.min();
            $('.step-2').css({
                'display':'flex'
            });

            setTimeout(()=>{
                $('.step-1, .step-2').css({
                    'transition':'0.5s',
                    'opacity':'1'
                })
            }, 100)

        }, 350)

    }

    transitionTo.next = (currentIndex, questionCounter, total) => {

        // hide step 2
        confidence.hide(0.1);

        // hide buttons
        button.hide();

        // hide picture
        picture.hide();

        // show next button
        setTimeout(()=>{
            go.show();
        }, 1000)


        // hide step-1 again
        $('.step-1').css({
            'transition':'0.1s',
            'opacity':'0',
        });

        // kill step 2
        setTimeout(()=>{
            $('.step-2').css({
                'display':'none'
            })
            picture.max();
            $('.step-1').css({
                'transition':'0.1s',
                'margin-top':'0px',
            });
        }, 350)

        // set the new picture
        setTimeout(()=>{
            picture.set(currentIndex);
            progress.update(questionCounter, total);
        }, 500)


        setTimeout(()=>{

            progress.show();

            $('.step-1').css({
                'transition':'0.3s',
                'opacity':'1'
            });
        }, 1000)

    }


    // ----------------------------------------------------- //
    // -------------- MATCH / NO MATCH HELPERS ------------- //
    // ----------------------------------------------------- //

    button.isClicked = false;

    button.hide = function(side) {

        if(side === -2 || side === undefined) {

            $('#lB, #rB, .leftButtonExplanation, .rightButtonExplanation').css({
                'transition':'0.1s',
                'opacity':'0'
            })

            setTimeout(()=>{
                $('#lB, #rB').css({'transform':'scale(0)'})
            }, 400)

        }

        if(side === 0) {

            console.log('left button picked, right button is killed');

            $('#rB, .rightButtonExplanation').css({
                'transition':'0.1s',
                'opacity':'0'
            })

            setTimeout(()=>{
                $('#rB').css({'transform':'scale(0)'})
            }, 400)

        }

        if(side === 1) {

            console.log('right button picked, left button is killed');

            $('#lB, .leftButtonExplanation').css({
                'transition':'0.1s',
                'opacity':'0'
            })

            setTimeout(()=>{
                $('#lB').css({'transform':'scale(0)'})
            }, 400)


        }

        console.log('');
        console.log('HIDE BUTTON');
        console.log('');

    }

    button.show = function() {

        button.isClicked = false;

        $('#lB, #rB').css({'transition':'0s', 'transform':'scale(1)'})
        setTimeout(()=>{
            $('#lB, #rB').css({
                'transition':'0.1s',
                'opacity':'1'
            })
        }, 10)

        console.log('');
        console.log('SHOW BUTTON');
        console.log('');

    }

    button.click = (isTimeUp) => {

        isTimeUp = isTimeUp === undefined ? false : isTimeUp;

        timer.getFinalTime();

        timer.stopLoopRecordLast();

        if(!button.isClicked) {

            // disable button
            button.isClicked = true;

            // stop server timer
            // node.emit('stopTime');
            timer.stop();

            // hide unpicked button or buttons
            button.hide(button.answer);

            // transform recorded mouse data
            var mouseData = translate();

            // update data - if no answer given then code -2
            data.index = picture.index;
            data.answer = button.answer;
            data.isCorrect = (data.answer === picture.correctAnswer);

            // update mouse tracking data
            data.xCoor = mouseData.xCoor;
            data.yCoor = mouseData.yCoor;
            data.tCoor = mouseData.tCoor;
            data.responseTime = mouseData.responseTime;
            data.totalResponseTime = timer.totalResponseTime;
            data.velocity = mouseData.velocity;

            // send decision data to client.js
            if(isTimeUp) {

                data.confidence = -1; // -1 when no answer is given no conf is asked
                var cloneData = help.clone(data);
                console.log(data);
                node.emit('HTML-answer-CLIENT', cloneData);

            } else {

                transitionTo.step2();

            }

        }

    }

    button.submit = () => {

        // debug
        console.log('');
        console.log('---- DATA SENT TO CLIENT.JS ----');
        console.log('');
        console.log(data);
        console.log('');
        console.log('--------------------------------');
        console.log('');

        $('.step-1, .step-2').css({
            'transition':'0.1s',
            'opacity':'0'
        })

        button.hide(0.2);

        setTimeout(()=>{
            confidence.reset();
            confidence.button.submit.hide();
        }, 1000)

        var cloneData = help.clone(data);
        node.emit('HTML-answer-CLIENT', cloneData);

    }

    $('.confidence-button-submit').click(button.submit)


    // --------------------------------------------------------------------- //
    // --------------------------------------------------------------------- //
    // -------------     NEXT & SAME / DIFFERENT BUTTONS         ----------- //
    // --------------------------------------------------------------------- //
    // --------------------------------------------------------------------- //

    $('#go').click(function(e) {

        go.isClicked = true;

        go.hide();

        timer.start();

        timer.getfirstTime();

        // -------------------------- //
        if(firstTime) {

            firstTime = false;

            console.log('START AUTO RECORDING');
            console.log('e.pageX', e.pageX);
            console.log('e.pageY', e.pageY);


            var area = $('.all');
            var offset = area.offset();
            area.height();
            area.width();

            var rawX = e.pageX;
            var rawY = e.pageY;
            var newX = rawX - (offset.left + ((area.width() + 11)/2));
            var newY = (offset.top + area.height() - 1) - rawY;
            t0 = e.timeStamp;

            x.push(newX);
            y.push(newY);
            t.push(0)
            timer.startLoopRecordLast(newX, newY, 0);

        }

    })

    $('#lB').click(function() {

        // for labeling/understanding the binary code
        var differentPerson = 0;
        button.answer = differentPerson;
        button.click();

    })

    $('#rB').click(function() {

        // for labeling/understanding the binary code
        var samePerson = 1;
        button.answer = samePerson;
        button.click();

    })


    // ---------------------------------------------- //
    // ------- MATCH/NO MATCH BUTTONS HOVERS -------- //
    // ---------------------------------------------- //

    $('#lB').hover(
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(0.5)'});
            $('.leftButtonExplanation').css({'transition':'0.3', 'opacity':'1'});
        },
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(1)'});
            $('.leftButtonExplanation').css({'transition':'0.3', 'opacity':'0'});
        }
    )

    $('#rB').hover(
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(0.5)'});
            $('.rightButtonExplanation').css({'transition':'0.3', 'opacity':'1'});
        },
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(1)'});
            $('.rightButtonExplanation').css({'transition':'0.3', 'opacity':'0'});
        }
    )


    // -------------------------------------------------------- //
    // ----------- LISTENING FOR THE NEXT PICTURE ------------- //
    // -------------------------------------------------------- //

    node.on('nextPicture-HTML', function(msg) {

        console.log('');
        console.log('');
        console.log('NEXT PICTURE DATA RECEIVED!');
        console.log('');
        console.log('pair list index', msg.listIndex);
        console.log('total number of pairs', msg.pairList.length);
        console.log('');
        console.log('ALL PAIRS')
        console.table(msg.pairList);
        console.log('');
        console.log('ACTIVE PAIR');
        console.table(msg.pairList[msg.listIndex]);
        console.log('');
        console.log('');

        data.pairObject = msg.pairList[msg.listIndex];

        var currentIndex = msg.pairList[msg.listIndex].id;
        var correctAnswer = msg.pairList[msg.listIndex].correctAnswer;
        var currentNumber = msg.listIndex;
        var totalNumber = msg.pairList.length;

        // set the current picture pair index
        picture.index = currentIndex;
        picture.correctAnswer = correctAnswer;

        // initially set the answer to no answer
        button.answer = -2;

        // reset parameters related to mouse tracking
        resetSwitches();

        transitionTo.next(currentIndex, currentNumber, totalNumber);

    })


    // ---------------------------------------------------------------- //
    // ------- INITIATE THE PAGE BY REQUESTING THE FIRST PICTURE ------ //
    // ---------------------------------------------------------------- //

    node.on('firstPicture-HTML', function(msg) {

        $('.frame-A-0, .frame-B-0').css({'transition':'0.5s', 'opacity':'1'})

        console.log('');
        console.log('');
        console.log('FIRST PICTURE DATA RECEIVED!');
        console.log('');
        console.log('active pair list index', msg.listIndex);
        console.log('total number of pairs', msg.pairList.length);
        console.log('');
        console.log('ALL PAIRS')
        console.table(msg.pairList);
        console.log('');
        console.log('ACTIVE PAIR');
        console.table(msg.pairList[msg.listIndex]);
        console.log('');
        console.log('');


        data.pairObject = msg.pairList[msg.listIndex];

        var currentIndex = msg.pairList[msg.listIndex].id;
        var correctAnswer = msg.pairList[msg.listIndex].correctAnswer;

        var currentNumber = msg.listIndex;
        var totalNumber = msg.pairList.length;

        // set the current picture pair index
        picture.index = currentIndex;
        picture.correctAnswer = correctAnswer;

        // initially set the answer to no answer
        button.answer = -2;

        // set the first picture
        picture.set(currentIndex);

        // reset parameters related to mouse tracking
        resetSwitches();

        progress.update(currentNumber, totalNumber);
        setTimeout(()=>{
            progress.show();
        }, 200)

    })

    node.emit('HTML-requestFirstIndex');


    // ----------------------------- //
    // ------- INTIAL SETUP -------- //
    // ----------------------------- //

    button.hide();
    picture.hide();
    confidence.reset();

    // destroy the timer in the header that is used in the tutorial
    node.game.visualTimer.destroy();

    // construct and initiate the new timer
    timer.initiate();

    // ---------------------------------------- //
    // --- Additional Response Time Measure --- //
    // ---------------------------------------- //

    timer.firstTime = undefined;

    timer.getfirstTime = () => {

        timer.firstTime = new Date();

        console.log('First time is recorded', timer.firstTime);

    }

    timer.finalTime = undefined;

    timer.totalResponseTime = undefined;

    timer.getFinalTime = () => {

        timer.finalTime = new Date();

        console.log('Final time is recorded', timer.finalTime);

        timer.totalResponseTime = timer.finalTime - timer.firstTime;

        console.log('Response time is calculated', timer.totalResponseTime);

    }

    // --------------------------------------- //
    // ------------ MOUSE TRACKING ----------- //
    // --------------------------------------- //



    var resetSwitches = () => {

        firstTime = true;
        translated = false;
        go.isClicked = false;
        button.isClicked = false;
        x = [];
        y = [];
        t = [];

        timer.myVelocityList = [];

    }

    var getLast = (array)=>{
        return array[array.length - 1];
    }

    var getFirst = (array)=>{
        return array[0];
    }



    $('.all').mousemove(function(e) {

        if(go.isClicked && !button.isClicked) {

            // kill timeout loop
            timer.stopLoopRecordLast();

            if(firstTime) {
                console.log('START RECORDING');
                t0 = e.timeStamp;
                firstTime = false;
            }

            if(t.length != 0) {
                prevT = getLast(t);
            } else {
                prevT = 0;
            }

            t1 = e.timeStamp - t0;
            dt = t1 - prevT;

            // console.log('e.timeStamp', e.timeStamp);
            // console.log('t0', t0);
            // console.log('t1', t1);


            var area = $('.all');
            var offset = area.offset();
            area.height();
            area.width();

            var rawX = e.pageX;
            var rawY = e.pageY;
            var newX = rawX - (offset.left + ((area.width() + 11)/2));
            var newY = (offset.top + area.height() - 1) - rawY;

            x.push(newX);
            y.push(newY);
            t.push(t1)

            $('#xCoor').html(getLast(x));
            $('#yCoor').html(getLast(y));
            $('#timeS').html(getLast(t));
            $('#deltaT').html(dt);

            var myLastX = newX;
            var myLastY = newY;
            var myLastTime = t1;
            // console.log('my last time', myLastTime);

            // start timeout loop
            // if no move in the next 500ms push newX and newY from the lat entry
            // again with t1 + 500 as the new time
            timer.startLoopRecordLast(myLastX, myLastY, myLastTime);

        }

    })

    var translate = function() {

        var responseTime = getLast(t) - getFirst(t);

        var velocityList = timer.generateVelocityList();

        let mtData = {
            xCoor: x,
            yCoor: y,
            tCoor: t,
            responseTime: responseTime,
            velocity: velocityList,
        }

        return mtData;

    }

    timer.loopTimeout = undefined;

    timer.loopTimeInterval = 100;

    timer.startLoopRecordLast = (myX, myY, myT) => {

        timer.loopTimeout = setTimeout(()=> {

            // console.log('');
            // console.log('-----------');
            // console.log('LOOP RECORD');
            // console.log('-----------');
            // console.log('');
            //
            // console.log(myT);
            // console.log(typeof myT);

            var newTime = myT + timer.loopTimeInterval;

            // console.log('new time', newTime);
            // console.log('new X', myX);
            // console.log('newY', myY);

            x.push(myX);
            y.push(myY);
            t.push(newTime);

            timer.startLoopRecordLast(myX, myY, newTime)

        }, timer.loopTimeInterval)

    }

    timer.stopLoopRecordLast = () => {

        // console.log('');
        // console.log('******     *****');
        // console.log('STOP LOOP RECORD');
        // console.log('******     *****');
        // console.log('');

        clearTimeout(timer.loopTimeout);

    }

    timer.myVelocityList = [];

    timer.generateVelocityList = () => {

        x.forEach((elt,index)=> {
            if(index === 0) {
                timer.myVelocityList.push(0);
            } else {
                var currentVelocity = timer.calculateVelocity(index);
                timer.myVelocityList.push(currentVelocity);
            }
        })

        return timer.myVelocityList;

    }

    var some = {};

    timer.calculateVelocity = (index) => {

        some.x0 = x[index-1];
        some.y0 = y[index-1];
        some.t0 = t[index-1];
        some.x1 = x[index];
        some.y1 = y[index];
        some.t1 = t[index];

        some.dx = Math.abs(some.x0 - some.x1);
        some.dy = Math.abs(some.y0 - some.y1);
        some.dt = Math.abs(some.t0 - some.t1);
        some.dt = some.dt / 1000;

        some.distance = Math.sqrt((some.dx ** 2) + (some.dy ** 2));

        some.velocity = some.distance / some.dt;

        // console.table(some)

        return some.velocity;

    }


    // -------- SKIP -------- //

    $('#skipTuto').click(function() {
        node.done();
    })



// }
