
var picture = {};
var button = {};
var go = {};
var dtd = undefined;

picture.index = undefined;
picture.correctAnswer = undefined;
button.answer = undefined;


window.onload = function() {

    var node = parent.node;

    // --------------- //

    node.emit('HTML-startSecretExpTimer');

    // -------- NO REAL USE ONLY CHECKING DTD VALUE ------- //

    node.on('requestDtd-HTML', function(msg) {

        console.log('');
        console.log('DTD RECEIVED FROM THE CLIENT: ' + msg);
        console.log('');

        dtd = msg;

    })

    node.emit('HTML-requestDtd');

    // --------------- //


    // --------------------------------------------- //
    // ---------------  NEXT BUTTON ---------------- //
    // --------------------------------------------- //

    $('#go').html('START');

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

        if(!go.switchedToNext) {

            go.switchedToNext = true;

            setTimeout(()=>{
                $('#go').html('NEXT')
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
            node.emit('startTimer');
        }, 100)



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

        $('.facePicture').css({'transition':'0.35s', 'opacity':'0'});

        console.log('');
        console.log('HIDE PICTURE');
        console.log('');

    }

    picture.show = function() {

        $('.facePicture').css({'transition':'0.2s', 'opacity':'1'});

        console.log('');
        console.log('SHOW PICTURE');
        console.log('');

    }

    // ----------------------------------------------------- //
    // -------------- MATCH / NO MATCH HELPERS ------------- //
    // ----------------------------------------------------- //

    button.isClicked = false;

    button.hide = function() {

        $('#lB, #rB, .leftButtonExplanation, .rightButtonExplanation').css({'transition':'0.35s', 'opacity':'0'})

        setTimeout(()=>{
            $('#lB, #rB').css({'transform':'scale(0)'})
        }, 400)

        console.log('');
        console.log('HIDE BUTTON');
        console.log('');

    }

    button.show = function() {

        button.isClicked = false;

        $('#lB, #rB').css({'transition':'0s', 'transform':'scale(1)'})
        setTimeout(()=>{
            $('#lB, #rB').css({'transition':'0.19s', 'opacity':'1'})
        }, 10)

        console.log('');
        console.log('SHOW BUTTON');
        console.log('');

    }


    // --------------------------------------------------------------------- //
    // --------------------------------------------------------------------- //
    // ------------- BUTTON ACTION EMITTING THE RESULT TO SERVER ----------- //
    // --------------------------------------------------------------------- //
    // --------------------------------------------------------------------- //

    $('#go').click(function() {

        go.isClicked = true;

        go.hide();

    })

    $('#lB').click(function() {

        if(!button.isClicked) {

            button.isClicked = true;

            button.answer = 0;

            setTimeout(()=>{
                go.show();
            }, 500)


            node.emit('stopTime');

            button.hide();

            picture.hide();

            var isAnswerCorrect = (button.answer === picture.correctAnswer)

            var data = {
                index: picture.index,
                answer: button.answer,
                correct: isAnswerCorrect
            }

            console.log('');
            console.log('');
            console.log('LEFT BUTTON - data to be sent to CLIENT');
            console.log(data);
            console.log('');
            console.log('');

            node.emit('HTML-diffPerson', data);

        }

    })

    $('#rB').click(function() {

        if(!button.isClicked) {

            button.isClicked = true;

            button.answer = 1;

            setTimeout(()=>{
                go.show();
            }, 500)

            node.emit('stopTime');

            button.hide();

            picture.hide();

            var isAnswerCorrect = (button.answer === picture.correctAnswer)

            var data = {
                index: picture.index,
                answer: button.answer,
                correct: isAnswerCorrect
            }

            console.log('');
            console.log('');
            console.log('RIGHT BUTTON - data to be sent to CLIENT');
            console.log(data);
            console.log('');
            console.log('');

            node.emit('HTML-samePerson', data);

        }

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


    // ----------------------------- //
    // ------- INTIAL SETUP -------- //
    // ----------------------------- //

    button.hide();
    picture.hide();


    // -------------------------------------------------------- //
    // ----------- LISTENING FOR THE NEXT PICTURE ------------- //
    // -------------------------------------------------------- //

    node.on('nextPicture-HTML', function(msg) {

        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('NEW PICTURE RECEIVED');

        console.log('INDEX: ' + msg.index);
        console.log('ANSWER: ' + msg.correctAnswer);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');

        var currentIndex = msg.index;
        var correctAnswer = msg.correctAnswer;

        // set the current picture pair index
        picture.index = currentIndex;
        picture.correctAnswer = correctAnswer;

        // initially set the answer to no answer
        button.answer = -2;

        setTimeout(()=>{
            picture.set(currentIndex);
        }, 1000)

        // related to mouse tracking
        resetSwitches();

    })


    // ---------------------------------------------------------------- //
    // ------- INITIATE THE PAGE BY REQUESTING THE FIRST PICTURE ------ //
    // ---------------------------------------------------------------- //

    node.on('firstPicture-HTML', function(msg) {

        $('.frame-A-0, .frame-B-0').css({'transition':'0.5s', 'opacity':'1'})

        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('FIRST PICTURE RECEIVED');

        console.log('INDEX: ' + msg.index);
        console.log('ANSWER: ' + msg.correctAnswer);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');

        var currentIndex = msg.index;
        var correctAnswer = msg.correctAnswer;

        // set the current picture pair index
        picture.index = currentIndex;
        picture.correctAnswer = correctAnswer;

        // initially set the answer to no answer
        button.answer = -2;

        setTimeout(()=>{
            picture.set(currentIndex);
        }, 1000)

        // related to mouse tracking
        resetSwitches();

    })

    node.emit('HTML-requestFirstIndex');


    // TIME UP SETUP CAN BE DIFFERENT THEN ANSWERING THE QUESTION WHERE
    // WE DO NOT ASK THE CONFIDENCE QUESTION
    node.on('timeUp', function() {

        if(!button.isClicked) {

            button.isClicked = true;

            // CHANGE !!!
            go.show();

            button.hide();

            // MAYBE CHANGE !!! ?
            picture.hide();

            var isAnswerCorrect = (button.answer === picture.correctAnswer)

            var data = {
                index: picture.index,
                answer: button.answer,
                correct: isAnswerCorrect
            }

            console.log('');
            console.log('');
            console.log('TIME UP - data to be sent to CLIENT');
            console.log(data);
            console.log('');
            console.log('');

            node.emit('HTML-timeUp', data);

        }

    })




    // ------------ MOUSE TRACKING ----------- //

    var x = [];
    var y = [];
    var t = [];
    var firstTime = true;
    var translated = false;
    var t0 = undefined;
    var t1 = undefined;
    var prevT = undefined;
    var dt = undefined;

    var resetSwitches = () => {

        firstTime = true;
        translated = false;
        go.isClicked = false;
        button.isClicked = false;

    }

    var getLast = (array)=>{
        return array[array.length - 1];
    }

    var getFirst = (array)=>{
        return array[0];
    }

    $('.all').mousemove(function(e) {

        if(go.isClicked && !button.isClicked) {

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

            var newX = (e.pageX - 960)/235;
            var newY = -(e.pageY - 605);

            x.push(newX);
            y.push(newY);
            t.push(t1)


            // console.log('------');
            // console.log(x);
            // console.log(y);
            // console.log(t);
            // console.log('------');


            $('#xCoor').html(getLast(x));
            $('#yCoor').html(getLast(y));
            $('#timeS').html(getLast(t));
            $('#deltaT').html(dt);

        }

        if(go.isClicked && button.isClicked) {

            if(!translated) {

                console.log('go clicked and button is clicked!');

                translated = true;
                translate();

            }

        }

    })


    var translate = function() {

        var x0 = getFirst(x);
        var y0 = getFirst(y);
        var lastX = getLast(x);
        var sign = (lastX < x0) ? -1 : 1;
        var xTemp = undefined;

        console.log('before translation 1');
        console.log('x0: ' + getFirst(x));
        console.log('xLast: ' + getLast(x));

        x = x.map(i => i - x0);
        // if(x0 < 0) {
        // } else {
        //     x = x.map(i => i + x0);
        // }

        console.log('after translation 1');
        console.log('x0: ' + getFirst(x));
        console.log('xLast: ' + getLast(x));

        // normalize the distance between the last and first to 1
        x = x.map(i => (i / Math.abs(getLast(x))));



        console.log('after translation 2');
        console.log('x0: ' + getFirst(x));
        console.log('xLast: ' + getLast(x));

        console.log('X after translations');
        console.log(x);

        console.log('Y list');
        console.log(y);

        console.log('Time list');
        console.log(t);


        console.log('EMITTING MOUSE DATA');
        let msg = {
            dataType: 'mouse',
            xCoor: x,
            yCoor: y,
            tCoor: t
        }

        node.emit('HTML-mouse', msg);

    }

}
