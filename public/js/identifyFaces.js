
var picture = {};
var button = {};
var go = {};


window.onload = function() {

    var node = parent.node;


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

    go.hide = function() {

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

            go.show();

            node.emit('stopTime');

            button.hide();

            picture.hide();

            node.emit('HTML-diffPerson');

        }

    })

    $('#rB').click(function() {

        if(!button.isClicked) {

            button.isClicked = true;

            go.show();

            node.emit('stopTime');

            button.hide();

            picture.hide();

            node.emit('HTML-samePerson');

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

        console.log('INDEX: ' + msg);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');

        var currentIndex = msg;

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

        console.log('INDEX: ' + msg);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');

        var currentIndex = msg;

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

            node.emit('HTML-timeUp');

        }

    })

}
