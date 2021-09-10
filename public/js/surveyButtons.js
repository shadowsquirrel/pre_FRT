
// gender buttons
let genderDecisionList = ['female', 'male', 'lgbtqi'];

genderDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.gender = i;

        console.log('gender decision: ' + decision.gender);

        question.next();

    });

});


// education buttons
let educationDecisionList = [
    'primarySchool', 'highSchool', 'bachelor', 'master', 'phd'
];

educationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.education = i;

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

        decision.age = i;

        console.log('age decision: ' + decision.age);

        question.next();

    });

});


// employment buttons
let employmentDecisionList = [
    'student', 'fullTimeEmployed', 'partTimeEmployed', 'selfEmployed',
    'lookingForJobs', 'notLookingForJobs', 'retired'
];

employmentDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.employment = i;

        console.log('employment decision: ' + decision.employment);

        question.next();

    });

});


// employment buttons
let locationDecisionList = [
    'urban', 'suburban', 'rural', 'remote'
];

locationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        decision.location = i;

        console.log('location decision: ' + decision.location);

        question.next();

    });

});
