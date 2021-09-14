
// gender buttons
let genderDecisionList = ['female', 'male', 'diverse'];

genderDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = genderDecisionList.indexOf(i);

        console.log('gender index: ' + index);

        decision.gender = index;

        console.log('gender decision: ' + decision.gender);

        question.next();

    });

});


// education buttons
let educationDecisionList = [
    'primarySchool', 'highSchool', 'someCollegeClasses', 'associatedDegree',
    'bachelor', 'master', 'professional', 'phd'
];

educationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = educationDecisionList.indexOf(i);

        console.log('education index: ' + index);

        decision.education = index;

        console.log('education decision: ' + decision.education);

        question.next();

    });

});


// age buttons
let ageDecisionList = [
    '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75plus'
];

ageDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = ageDecisionList.indexOf(i);

        console.log('age index: ' + index);

        decision.age = index;

        console.log('age decision: ' + decision.age);

        question.next();

    });

});


// employment buttons
let employmentDecisionList = [
    'student', 'fullTimeEmployed', 'partTimeEmployed', 'selfEmployed',
    'lookingForJobs', 'notLookingForJobs', 'retired', 'homemaker', 'unableToWork'
];

employmentDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = employmentDecisionList.indexOf(i);

        console.log('employment index: ' + index);

        decision.employment = index;

        console.log('employment decision: ' + decision.employment);

        question.next();

    });

});


// location buttons
let locationDecisionList = [
    'urban', 'suburban', 'rural', 'remote'
];

locationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = locationDecisionList.indexOf(i);

        console.log('location index: ' + index);

        decision.location = index;

        console.log('location decision: ' + decision.location);

        question.next();

    });

});


// race buttons
let raceDecisionList = [
    'alaska', 'asian', 'black', 'pacific', 'white'
];

raceDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = raceDecisionList.indexOf(i);

        console.log('race index: ' + index);

        decision.race = index;

        console.log('race decision: ' + decision.race);

        question.next();

    });

});


// AI knowledge buttons
let knowledgeAIDecisionList = [
    'veryLow', 'low', 'moderate', 'high', 'veryHigh'
];

knowledgeAIDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = knowledgeAIDecisionList.indexOf(i);

        console.log('knowledgeAI index: ' + index);

        decision.knowledgeAI = index;

        console.log('knowledgeAI decision: ' + decision.knowledgeAI);

        question.next();

    });

});


// AI support buttons
let supportAIDecisionList = [
    'stronglySupport', 'somewhatSupport', 'neitherNor', 'somewhatOppose',
    'stronglyOppose'
];

supportAIDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = supportAIDecisionList.indexOf(i);

        index = 5 - index;

        console.log('supportAI index: ' + index);

        decision.supportAI = index;

        console.log('supportAI decision: ' + decision.supportAI);

        question.next();

    });

});

// -------------------------------------- //

let ladder = {};

ladder.someLadderClicked = false;
ladder.cursorOn = true;

// ------ 10 ------ //

ladder.tenClicked = false;

$('.ten').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerTen').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.tenClicked) {

            $('.innerTen').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.ten').click(function() {

    if(!ladder.someLadderClicked || ladder.tenClicked) {

        ladder.tenClicked = 1 - ladder.tenClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 10;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})

// ------ 9 ------ //

ladder.nineClicked = false;

$('.nine').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerNine').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.nineClicked) {

            $('.innerNine').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.nine').click(function() {

    if(!ladder.someLadderClicked || ladder.nineClicked) {

        ladder.nineClicked = 1 - ladder.nineClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 9;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})

// ------ 8 ------ //

ladder.eightClicked = false;

$('.eight').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerEight').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.eightClicked) {

            $('.innerEight').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.eight').click(function() {

    if(!ladder.someLadderClicked || ladder.eightClicked) {

        ladder.eightClicked = 1 - ladder.eightClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 8;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 7 ------ //

ladder.sevenClicked = false;

$('.seven').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerSeven').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.sevenClicked) {

            $('.innerSeven').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.seven').click(function() {

    if(!ladder.someLadderClicked || ladder.sevenClicked) {

        ladder.sevenClicked = 1 - ladder.sevenClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 7;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 6 ------ //

ladder.sixClicked = false;

$('.six').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerSix').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.sixClicked) {

            $('.innerSix').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.six').click(function() {

    if(!ladder.someLadderClicked || ladder.sixClicked) {

        ladder.sixClicked = 1 - ladder.sixClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 6;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 5 ------ //

ladder.fiveClicked = false;

$('.five').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerFive').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.fiveClicked) {

            $('.innerFive').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.five').click(function() {

    if(!ladder.someLadderClicked || ladder.fiveClicked) {

        ladder.fiveClicked = 1 - ladder.fiveClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 5;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton6, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 4 ------ //

ladder.fourClicked = false;

$('.four').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerFour').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.fourClicked) {

            $('.innerFour').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.four').click(function() {

    if(!ladder.someLadderClicked || ladder.fourClicked) {

        ladder.fourClicked = 1 - ladder.fourClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 4;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton3, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 3 ------ //

ladder.threeClicked = false;

$('.three').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerThree').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.threeClicked) {

            $('.innerThree').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.three').click(function() {

    if(!ladder.someLadderClicked || ladder.threeClicked) {

        ladder.threeClicked = 1 - ladder.threeClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 3;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton2, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 2 ------ //

ladder.twoClicked = false;

$('.two').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerTwo').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.twoClicked) {

            $('.innerTwo').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.two').click(function() {

    if(!ladder.someLadderClicked || ladder.twoClicked) {

        ladder.twoClicked = 1 - ladder.twoClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 2;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton1').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


// ------ 1 ------ //

ladder.oneClicked = false;

$('.one').hover(
    function() {

        if(!ladder.someLadderClicked) {

            $('.innerOne').css({'transition':'0.1s', 'opacity':'1'});

        }

    },
    function() {

        if(!ladder.oneClicked) {

            $('.innerOne').css({'transition':'0.1s', 'opacity':'0'});

        }

    }
)

$('.one').click(function() {

    if(!ladder.someLadderClicked || ladder.oneClicked) {

        ladder.oneClicked = 1 - ladder.oneClicked;
        ladder.someLadderClicked = 1 - ladder.someLadderClicked;
        ladder.cursorOn = 1 - ladder.cursorOn;

        decision.ladder = 1;

        console.log('ladder decision: ' + decision.ladder);

        if(!ladder.cursorOn) {
            $('.lButton10, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2').css({'cursor':'default'})
            $('.finalLadderButtonWrap').css({'transform':'scale(1)'});
        } else {
            $('.lButton10, .lButton9, .lButton9, .lButton8, .lButton7, .lButton6, .lButton5, .lButton4, .lButton3, .lButton2, .lButton1').css({'cursor':'pointer'})
            $('.finalLadderButtonWrap').css({'transform':'scale(0)'});
        }

    }

})


$('#ladderButton').click(function() {

    console.log('final ladder decision: ' + decision.ladder);

    question.next();

})
