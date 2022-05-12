

// enoughTime buttons
let skill = [
    'veryBad', 'bad', 'average',
    'good', 'veryGood'
];

skill.forEach(i => {

    var string = '#2' + i;

    $(string).click(function() {

        var index = skill.indexOf(i);

        console.log('skill index: ' + index);

        decision.skill = index + 1;

        console.log('skill decision: ' + decision.skill);

        question.next();

    });

});
