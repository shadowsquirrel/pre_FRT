var scanDown = function(mt) {

    var nextMt = mt + 1;

    mt = mt + 'px'

    $('.scanLine1, .scanLine2').css({'transition':'0.1s', 'margin-top':mt});

    if(nextMt < 250) {

        setTimeout(()=>{
            scanDown(nextMt)
        }, 10)

    } else {

        activateRotation = false;
        reverseRotate();

        setTimeout(()=>{


        }, 100)

        setTimeout(()=>{

            scanUp(nextMt);

        }, 100)

    }

}

var scanUp = function(mt) {

    var nextMt = mt - 1;

    mt = mt + 'px'

    $('.scanLine1, .scanLine2').css({'transition':'0.1s', 'margin-top':mt});

    if(nextMt > 20) {

        setTimeout(()=>{

            scanUp(nextMt);

        }, 10)

    } else {

        setTimeout(()=>{

            endScan();

        }, 100)

    }

}

var startScan = function() {

    activateRotation = true;
    activateRotation2 = true;

    $('.scanLine1, .scanLine2').css({'transition':'1s', 'opacity':'1'});

    setTimeout(()=>{

        scanDown(20);

        rotate();
        animateCircuit(0);

    }, 1000)

}

var endScan = function() {

    $('.scanLine1, .scanLine2').css({'transition':'1s', 'opacity':'0'});

    activateRotation2 = false;
    animateCircuitActive = false;

    revealResult();
    setTimeout(()=>{
        $('.ConfidenceWrap-AI').css({'transition':'1s', 'opacity':'1'});
    }, 1500)

    setTimeout(()=>{
        $('.decisionWrap-2').css({'display':'block'});
        setTimeout(()=>{
            $('.decisionWrap-2').css({'transition':'1s',
            'transform':'scale(1)', 'opacity':'1'});
        }, 100)
    }, 4000)

}


var revealResult = function() {

    $('.someGear').css({'transition':'2s', 'transform':'rotateY(90deg)',
    'opacity':'0'});

    setTimeout(()=>{

        if(Math.random() > 0.5) {
            $('.AImatch').css({'transition':'1s', 'opacity':'1'});
            $('.AIdeny').css({'transition':'0s', 'opacity':'0'});
        } else {
            $('.AIdeny').css({'transition':'1s', 'opacity':'1'});
            $('.AImatch').css({'transition':'0s', 'opacity':'0'});
        }

    }, 1000)

}

animateCircuitActive = true;

var animateCircuit = function(deg) {

    if(animateCircuitActive) {

        var nextDeg = deg + 1;

        deg = 'hue-rotate(' + deg + 'deg) grayscale(0) drop-shadow(0px 7px 3px black)';

        // console.log(deg);

        $('.AIbackground').css({'transition':'0.1s', 'opacity':'0.8', 'filter':deg});

        setTimeout(()=>{
            animateCircuit(nextDeg) ;
        }, 10)

    } else {
        $('.AIbackground').css({'transition':'1s', 'opacity':'1',
        'filter':'grayscale(1) drop-shadow(0px 7px 3px black)'})
    }

}




$('#showAIDecisionButton').click(function() {

    $(this).css({'transform':'scale(0)', 'opacity':'0'});
    $('.AIWrap').css({'transition':'1s', 'opacity':'1'});

    setTimeout(()=>{
        startScan();
    }, 1000)

})
