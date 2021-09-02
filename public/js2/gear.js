
var activateRotation = true;
var activateRotation2 = true;

var rotate = function(rotList) {

    var delay = 0.001;

    var delayTimeout = delay * 1000;

    delay = delay + 's';

    var g1 = $('.myGear1');
    var g2 = $('.myGear2');
    var g3 = $('.myGear3');
    var g4 = $('.myGear4');
    var g5 = $('.myGear5');
    var g6 = $('.myGear6');
    var g7 = $('.myGear7');
    var g8 = $('.myGear8');
    var g9 = $('.myGear9');


    if(activateRotation) {

        if(rotList === undefined) {

            var g1Rot = 0;
            var g2Rot = 0;
            var g3Rot = 0;
            var g4Rot = 0;
            var g7Rot = 0;
            var g9Rot = 0;

        } else {

            g1Rot = rotList[0];
            g2Rot = rotList[1];
            g3Rot = rotList[2];
            g4Rot = rotList[3];
            g7Rot = rotList[4];
            g9Rot = rotList[5];

        }

        g1Rot++
        g2Rot--
        g3Rot--
        g4Rot++
        g7Rot++
        g9Rot--

        var newRotList = [g1Rot, g2Rot, g3Rot, g4Rot, g7Rot, g9Rot];

        g1Rot = 'rotate(' + g1Rot + 'deg)';
        g2Rot = 'rotate(' + g2Rot + 'deg)';
        g3Rot = 'rotate(' + g3Rot + 'deg)';
        g4Rot = 'rotate(' + g4Rot + 'deg)';
        g7Rot = 'rotate(' + g7Rot + 'deg)';
        g9Rot = 'rotate(' + g9Rot + 'deg)';


        // console.log(g1Rot);

        $(g1).css({'transition':delay, 'transform': g1Rot});
        $(g2).css({'transition':delay, 'transform': g2Rot});
        $(g3).css({'transition':delay, 'transform': g3Rot});
        $(g4).css({'transition':delay, 'transform': g4Rot});
        $(g7).css({'transition':delay, 'transform': g7Rot});
        $(g9).css({'transition':delay, 'transform': g9Rot});


        setTimeout(()=>{
            rotate(newRotList);
        }, delayTimeout)

    }

}

var reverseRotate = function(rotList) {

    var delay = 0.001;

    var delayTimeout = delay * 1000;

    delay = delay + 's';

    var g1 = $('.myGear1');
    var g2 = $('.myGear2');
    var g3 = $('.myGear3');
    var g4 = $('.myGear4');
    var g5 = $('.myGear5');
    var g6 = $('.myGear6');
    var g7 = $('.myGear7');
    var g8 = $('.myGear8');
    var g9 = $('.myGear9');


    if(activateRotation2) {

        if(rotList === undefined) {

            var g1Rot = 0;
            var g2Rot = 0;
            var g3Rot = 0;
            var g4Rot = 0;
            var g7Rot = 0;
            var g9Rot = 0;

        } else {

            g1Rot = rotList[0];
            g2Rot = rotList[1];
            g3Rot = rotList[2];
            g4Rot = rotList[3];
            g7Rot = rotList[4];
            g9Rot = rotList[5];

        }

        g1Rot--
        g2Rot++
        g3Rot++
        g4Rot--
        g7Rot--
        g9Rot++

        var newRotList = [g1Rot, g2Rot, g3Rot, g4Rot, g7Rot, g9Rot];

        g1Rot = 'rotate(' + g1Rot + 'deg)';
        g2Rot = 'rotate(' + g2Rot + 'deg)';
        g3Rot = 'rotate(' + g3Rot + 'deg)';
        g4Rot = 'rotate(' + g4Rot + 'deg)';
        g7Rot = 'rotate(' + g7Rot + 'deg)';
        g9Rot = 'rotate(' + g9Rot + 'deg)';


        // console.log(g1Rot);

        $(g1).css({'transition':delay, 'transform': g1Rot});
        $(g2).css({'transition':delay, 'transform': g2Rot});
        $(g3).css({'transition':delay, 'transform': g3Rot});
        $(g4).css({'transition':delay, 'transform': g4Rot});
        $(g7).css({'transition':delay, 'transform': g7Rot});
        $(g9).css({'transition':delay, 'transform': g9Rot});


        setTimeout(()=>{
            reverseRotate(newRotList);
        }, delayTimeout)

    }

}
// rotate();
