
var data = {
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
var transitionTo = {};

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
            'transition':'0.5s',
            'transform-origin':'top',
            'transform':'scale(0.4)',
            'margin-bottom':'-50%'
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

        picture.min();

        confidence.show();

    }

    transitionTo.next = (currentIndex) => {

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
        }, 350)

        // set the new picture
        setTimeout(()=>{
            picture.set(currentIndex);
        }, 500)


        setTimeout(()=>{
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
                'opacity':'1'})
        }, 10)

        console.log('');
        console.log('SHOW BUTTON');
        console.log('');

    }

    button.click = (isTimeUp) => {

        isTimeUp = isTimeUp === undefined ? false : isTimeUp;

        if(!button.isClicked) {

            // disable button
            button.isClicked = true;

            // stop server timer
            node.emit('stopTime');

            // hide unpicked button or buttons
            button.hide(button.answer);

            // hide pictures
            // picture.hide();

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

            // send decision data to client.js
            if(isTimeUp) {
                node.emit('HTML-answer-CLIENT', data);
                data.confidence = -1; // -1 when no answer is given no conf is asked
            } else {

                // hide decision screen and show confidence screen
                // $('.step-1').css({
                //     'transition':'0.1s',
                //     'opacity':'0'
                // });
                // setTimeout(()=>{
                //     $('.step-1').css({
                //         'display':'none'
                //     });
                //     confidence.show();
                // }, 150)
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

        node.emit('HTML-answer-CLIENT', data);

    }

    $('.confidence-button-submit').click(button.submit)


    // --------------------------------------------------------------------- //
    // --------------------------------------------------------------------- //
    // -------------     NEXT & SAME / DIFFERENT BUTTONS         ----------- //
    // --------------------------------------------------------------------- //
    // --------------------------------------------------------------------- //

    $('#go').click(function() {

        go.isClicked = true;

        go.hide();

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

    // TIME UP SETUP CAN BE DIFFERENT THEN ANSWERING THE QUESTION WHERE
    // WE DO NOT ASK THE CONFIDENCE QUESTION
    node.on('timeUp', function() {

        // for labeling/understanding the binary code
        var noAnswer = -2;
        var timeIsUp = true;

        button.answer = noAnswer;
        button.click(timeIsUp);

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

        var currentIndex = msg.index;
        var correctAnswer = msg.correctAnswer;

        // set the current picture pair index
        picture.index = currentIndex;
        picture.correctAnswer = correctAnswer;

        // initially set the answer to no answer
        button.answer = -2;

        // related to mouse tracking
        resetSwitches();

        // ---- //

        // // hide confidence screen
        // confidence.hide();
        //
        // // show next button
        // go.show();
        //
        // // show step-1 again
        // $('.step-1').css({
        //     'transition':'0s',
        //     'opacity':'0',
        //     'display':'block'
        // });
        // setTimeout(()=>{
        //     $('.step-1').css({
        //         'transition':'0.1s',
        //         'opacity':'1'
        //     });
        // }, 250)

        transitionTo.next(currentIndex);

        // ---- //

        // // set the new picture
        // setTimeout(()=>{
        //     picture.set(currentIndex);
        // }, 500)


        // debug
        console.log('');
        console.log('NEW PICTURE RECEIVED');

        console.log('INDEX: ' + msg.index);
        console.log('ANSWER: ' + msg.correctAnswer);
        console.log('');


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

        // set the first picture
        picture.set(currentIndex);

        // related to mouse tracking
        resetSwitches();

    })

    node.emit('HTML-requestFirstIndex');



    // ----------------------------- //
    // ------- INTIAL SETUP -------- //
    // ----------------------------- //

    button.hide();
    picture.hide();
    confidence.reset();


    // ------------ MOUSE TRACKING ----------- //

    // TO DO: CREATE OBJECT AND ORGANIZE EVERYTHING WITHIN

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


            var area = $('.all');
            area.offset();
            area.height();
            area.width();

            // var newX = (e.pageX - 960)/235;
            // var newY = -(e.pageY - 605);

            var newX = e.pageX;
            var newY = e.pageY;

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

        // if(go.isClicked && button.isClicked) {
        //
        //     if(!translated) {
        //
        //         console.log('go clicked and button is clicked!');
        //
        //         translated = true;
        //         translate();
        //
        //     }
        //
        // }

    })

    // TO DO: READ PAPS TO DETERMINE THE BEST WAY TO TRANSLATE
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

        console.log('after translation 1');
        console.log('x0: ' + getFirst(x));
        console.log('xLast: ' + getLast(x));

        // normalize the distance between the last and first to 1
        x = x.map(i => (i / Math.abs(lastX)));



        console.log('after translation 2');
        console.log('x0: ' + getFirst(x));
        console.log('xLast: ' + getLast(x));

        console.log('X after translations');
        console.log(x);

        console.log('Y list');
        console.log(y);

        console.log('Time list');
        console.log(t);

        let mtData = {
            dataType: 'mouse',
            xCoor: x,
            yCoor: y,
            tCoor: t
        }

        // node.emit('HTML-mouse', msg);

        return mtData;

    }

}
