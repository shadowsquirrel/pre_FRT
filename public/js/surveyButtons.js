
var takeOut = (arr, elt) => {

    var someIndex;

    if(arr.includes(elt)) {
        someIndex = arr.indexOf(elt);
        arr.splice(someIndex,1);
    }

}


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
let raceDecisionList = [
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

let interactedRaceDecisionList = [
    'white2', //'White / Caucasian',
    'black2', //'Black or of African descent',
    'hispanic2', //'Hispanic or Latino',
    'middleEast2', //'Middle Eastern',
    'southAsia2', //'South Asian',
    'eastAsia2', //'East Asian',
    'southeastAsia2', //'Southeast Asian',
    'native2', //'Native American, Pacific Islander, or Indigenous Australian',
    'multi2', //'Multiracial',
]
decision.interactedRace = [];
interactedRaceIsClickedList = Array(9).fill(false);
interactedRaceDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).hover(
        function() {
            if(!interactedRaceIsClickedList[i]) {

                $(string).css({
                    'background':'black',
                    'color':'white',
                })

            }
        },
        function() {
            if(!interactedRaceIsClickedList[i]) {

                $(string).css({
                    'background':'white',
                    'color':'black',
                })

            }
        }
    )

    $(string).click(function() {

        var index = interactedRaceDecisionList.indexOf(i);

        console.log('interactedRace index: ' + index);

        if(!decision.interactedRace.includes(index)){

            interactedRaceIsClickedList[i] = true;

            console.log('adding the choice to the decision list');
            console.log(decision.interactedRace);

            decision.interactedRace.push(index);

            console.log(decision.interactedRace);

            $(string).css({
                'background':'darkgreen',
                'color':'white',
            })

        } else {

            interactedRaceIsClickedList[i] = false;

            console.log('taking the choice out of the decision list');
            console.log(decision.interactedRace);

            var myAnswerIndex = decision.interactedRace.indexOf(index);
            decision.interactedRace.splice(myAnswerIndex, 1);

            console.log('the new reduced list');
            console.log(decision.interactedRace);

            $(string).css({
                'background':'white',
                'color':'black',
            })


        }

        if(decision.interactedRace.length > 0) {
            $('.container-button-submit').css({
                'display':'flex',
            })
            setTimeout(()=>{
                $('.container-button-submit').css({
                    'transition':'0.5s',
                    'opacity':'1'
                })
            }, 150)
        } else {
            $('.container-button-submit').css({
                'transition':'0.1s',
                'opacity':'0'
            })
            setTimeout(()=>{
                $('.container-button-submit').css({
                    'display':'none',
                })
            }, 150)
        }

        //

    });

});

$('#interactRace-submit-button').click(()=>{

    question.next();

})



let studentDecisionList = [
    'yesStudent',
    'noStudent',
]

studentDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = studentDecisionList.indexOf(i);

        console.log('student index: ' + index);

        decision.student = index;

        console.log('Student decision: ' + decision.student);

        if(index === 0) {

            console.log('we have a student');
            console.log(order.active);

            var studentIndex = order.active.indexOf('student');

            console.log('education question index', studentIndex);

            var nextIndex = studentIndex + 1;

            console.log('the index after that', nextIndex);

            takeOut(order.active, 'education');
            takeOut(order.active, 'currentEducation');
            takeOut(order.active, 'eduFocus');

            order.active.splice(nextIndex, 0, 'currentEducation')

            console.log(order.active);

        } else {

            console.log('Not a student');
            console.log(order.active);

            var studentIndex = order.active.indexOf('student');

            console.log('education question index', studentIndex);

            var nextIndex = studentIndex + 1;

            console.log('the index after that', nextIndex);

            takeOut(order.active, 'education');
            takeOut(order.active, 'currentEducation');
            takeOut(order.active, 'eduFocus');

            order.active.splice(nextIndex, 0, 'education');

            console.log(order.active);

            // decision.currentEducation = -1;
        }

        question.next();

    });

});


let educationDecisionList = [
    'elementary',
    'highSchool',
    'vocational',
    'undergrad',
    'master',
    'phd'
]

educationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = educationDecisionList.indexOf(i);

        console.log('education index: ' + index);

        decision.education = index;

        console.log('education decision: ' + decision.education);

        if(index > 2) {

            console.log(order.active);

            var eduIndex = order.active.indexOf('education');

            console.log('education question index', eduIndex);

            var nextIndex = eduIndex + 1;

            console.log('the index after that', nextIndex);

            takeOut(order.active, 'eduFocus');
            order.active.splice(nextIndex, 0, 'eduFocus')

            console.log(order.active);
        } else {
            takeOut(order.active, 'eduFocus');
            decision.eduFocus = -1;
        }

        question.next();

    });

});

let currentEducationDecisionList = [
    'highSchool2',
    'vocational2',
    'undergrad2',
    'master2',
    'phd2'
]

currentEducationDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = currentEducationDecisionList.indexOf(i) + 1;

        console.log('current education index: ' + index);

        // decision.currentEducation = index;
        decision.education = index;

        console.log('education decision: ' + decision.education);

        if(index > 2) {

            console.log(order.active);

            var eduIndex = order.active.indexOf('currentEducation');

            console.log('current education question index', eduIndex);

            var nextIndex = eduIndex + 1;

            console.log('the index after that', nextIndex);

            takeOut(order.active, 'eduFocus');
            order.active.splice(nextIndex, 0, 'eduFocus');

            console.log(order.active);

        } else {
            takeOut(order.active, 'eduFocus');
            decision.eduFocus = -1;
        }

        question.next();

    });

});

let eduFocusDecisionList = [
    'natural',
    'humanities',
]

eduFocusDecisionList.forEach(i => {

    var string = '#' + i;

    $(string).click(function() {

        var index = eduFocusDecisionList.indexOf(i);

        console.log('eduFocus index: ' + index);

        decision.eduFocus = index;

        console.log('eduFOcus decision: ' + decision.eduFocus);

        question.next();

    });

});
