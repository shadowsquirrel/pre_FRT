
var picture = {};
var button = {};
var go = {};

picture.index = undefined;
picture.correctAnswer = undefined;
button.answer = undefined;


window.onload = function() {

    var node = parent.node;

    $('#go').html('START');


    button.isClicked = false;


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


    button.hide = function() {

        $('#lB, #rB').css({'transition':'0.35s', 'opacity':'0'})
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


    $('#go').click(function() {

        go.hide();

    })

    $('#lB').click(function() {

        if(!button.isClicked) {

            button.isClicked = true;

            button.answer = 0;

            go.show();

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

            go.show();

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


    button.hide();
    picture.hide();


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
        }, 250)


    })


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
        }, 500)



    })

    node.emit('HTML-requestFirstIndex');


    node.on('timeUp', function() {

        if(!button.isClicked) {

            button.isClicked = true;

            go.show();

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
            console.log('TIME UP - data to be sent to CLIENT');
            console.log(data);
            console.log('');
            console.log('');

            node.emit('HTML-timeUp', data);

        }

    })

}
