

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
