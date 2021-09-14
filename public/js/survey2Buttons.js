
// tutorial buttons
let tutorialDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

tutorialDecisionList.forEach(i => {

    var string = '#1' + i;

    $(string).click(function() {

        var index = tutorialDecisionList.indexOf(i);

        console.log('tutorial index: ' + index);

        decision.tutorial = index + 1;

        console.log('tutorial decision: ' + decision.tutorial);

        question.next();

    });

});

// enoughTime buttons
let enoughTimeDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

enoughTimeDecisionList.forEach(i => {

    var string = '#2' + i;

    $(string).click(function() {

        var index = enoughTimeDecisionList.indexOf(i);

        console.log('enoughTime index: ' + index);

        decision.enoughTime = index + 1;

        console.log('enoughTime decision: ' + decision.enoughTime);

        question.next();

    });

});


// needMoreTime buttons
let needMoreTimeDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

needMoreTimeDecisionList.forEach(i => {

    var string = '#3' + i;

    $(string).click(function() {

        var index = needMoreTimeDecisionList.indexOf(i);

        console.log('needMoreTime index: ' + index);

        decision.needMoreTime = index + 1;

        console.log('needMoreTime decision: ' + decision.needMoreTime);

        question.next();

    });

});


// needMoreTime buttons
let decisionScreenDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

decisionScreenDecisionList.forEach(i => {

    var string = '#4' + i;

    $(string).click(function() {

        var index = decisionScreenDecisionList.indexOf(i);

        console.log('decisionScreen index: ' + index);

        decision.decisionScreen = index + 1;

        console.log('decisionScreen decision: ' + decision.decisionScreen);

        question.next();

    });

});


// imageSize buttons
let imageSizeDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

imageSizeDecisionList.forEach(i => {

    var string = '#5' + i;

    $(string).click(function() {

        var index = imageSizeDecisionList.indexOf(i);

        console.log('imageSize index: ' + index);

        decision.imageSize = index + 1;

        console.log('imageSize decision: ' + decision.imageSize);

        question.next();

    });

});


// buttonPlacement buttons
let buttonPlacementDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

buttonPlacementDecisionList.forEach(i => {

    var string = '#6' + i;

    $(string).click(function() {

        var index = buttonPlacementDecisionList.indexOf(i);

        console.log('buttonPlacement index: ' + index);

        decision.buttonPlacement = index + 1;

        console.log('buttonPlacement decision: ' + decision.buttonPlacement);

        question.next();

    });

});


// numOfImages_tired buttons
let numOfImages_tiredDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

numOfImages_tiredDecisionList.forEach(i => {

    var string = '#7' + i;

    $(string).click(function() {

        var index = numOfImages_tiredDecisionList.indexOf(i);

        console.log('numOfImages_tired index: ' + index);

        decision.numOfImages_tired = index + 1;

        console.log('numOfImages_tired decision: ' + decision.numOfImages_tired);

        question.next();

    });

});


// numOfImages_bored buttons
let numOfImages_boredDecisionList = [
    'stronglyDisagree', 'somewhatDisagree', 'neitherNor',
    'somewhatAgree', 'stronglyAgree'
];

numOfImages_boredDecisionList.forEach(i => {

    var string = '#8' + i;

    $(string).click(function() {

        var index = numOfImages_boredDecisionList.indexOf(i);

        console.log('numOfImages_bored index: ' + index);

        decision.numOfImages_bored = index + 1;

        console.log('numOfImages_bored decision: ' + decision.numOfImages_bored);

        question.next();

    });

});
