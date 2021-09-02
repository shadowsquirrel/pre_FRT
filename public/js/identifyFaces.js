
var picture = {};
var button = {};


window.onload = function() {

    var node = parent.node;


    button.isClicked = false;


    picture.set = function(index) {

        var myString = 'faces/exp/';

        var sourceLeft = myString + index + 'a' + '.jpg';

        var sourceRight = myString + index + 'b' + '.jpg'

        $('#lF').attr('src', sourceLeft);

        $('#rF').attr('src', sourceRight);

    }

    picture.hide = function() {

        $('.innerWrap').css({'transition':'0.35s', 'opacity':'0'});

        console.log('');
        console.log('HIDE PICTURE');
        console.log('');

    }

    picture.show = function() {

        $('.innerWrap').css({'transition':'0.35s', 'opacity':'1'});

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
            $('#lB, #rB').css({'transition':'0.35s', 'opacity':'1'})
        }, 100)

        console.log('');
        console.log('SHOW BUTTON');
        console.log('');

    }


    $('#lB').click(function() {

        if(!button.isClicked) {

            button.isClicked = true;

            node.emit('stopTime');

            button.hide();

            picture.hide();

            node.emit('HTML-diffPerson');

        }

    })

    $('#rB').click(function() {

        if(!button.isClicked) {

            button.isClicked = true;

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
        }, 500)


        setTimeout(()=>{
            picture.show();
        }, 1000)

        setTimeout(()=>{

            button.show();

            node.emit('startTimer');

        }, 1500)



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


        setTimeout(()=>{
            picture.show();
        }, 1000)

        setTimeout(()=>{

            button.show();

            node.emit('startTimer');

        }, 1500)



    })

    node.emit('HTML-requestFirstIndex');


    node.on('timeUp', function() {

        if(!button.isClicked) {

            button.isClicked = true;

            button.hide();

            picture.hide();

            node.emit('HTML-timeUp');

        }

    })

}
