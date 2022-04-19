
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
// let raceDecisionList = [
//     'alaska', 'asian', 'black', 'pacific', 'white'
// ];
let raceDecisionList: [
    'white', //'White / Caucasian',
    'black', //'Black or of African descent',
    'hispanic', //'Hispanic or Latino',
    'middleEast', //'Middle Eastern',
    'southAsia', //'South Asian',
    'eastAsia', //'East Asian',
    'southeastAsia', //'Southeast Asian',
    'native', //'Native American, Pacific Islander, or Indigenous Australian',
    'multi', //'Multiracial',
    ]

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
