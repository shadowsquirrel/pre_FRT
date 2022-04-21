
// -------------------- //
// ------ GLOBALS ----- //
// -------------------- //

let main = {};
let question = {};
let experiment = {};
let decision = {};
let order = {};
let progressBar = {};


// --------------------- //
// ------- MAIN -------- //
// --------------------- //

// helper to name.set(): transition between different names
main.transition = function() {

    $('.all').css({'transition':'0.5s', 'opacity':'0'});
    setTimeout(()=>{
        $('.all').css({'transition':'1s', 'opacity':'1'});
    }, 1000)

}


// ------------------ //
// ---- QUESTION ---- //
// ------------------ //

question.previous = undefined;
question.active = undefined;

question.first = function() {

    question.active = order.active[order.index];

    // here age is arbitrary it can also be empty string
    question.switch('age', question.active);

}

var backDiv = document.getElementById('backButton');

question.next = function() {

    if(order.index < order.active.length - 1) {

        order.index++;

        question.numberUpdate();
        progressBar.update();

        question.previous = question.active;
        question.active = order.active[order.index];

        question.switch(question.previous, question.active);

        if(order.index === 1) {
            // show back button
            backDiv.style.opacity = 1;
            backDiv.style.transform = 'scale(1)';
        }

    } else {

        decision.save();

    }

}

question.back = () => {

    if(order.index > 0) {

        order.index--;

        question.numberUpdate();
        progressBar.update();

        question.previous = question.active;
        question.active = order.active[order.index];

        question.switch(question.previous, question.active);

        if(order.index === 0) {
            // hide back button
            backDiv.style.opacity = 0;
            backDiv.style.transform = 'scale(0)';
        }

    } else {
        console.log('We are at the first question no place to be back');
    }

}

backDiv.onclick = question.back;

question.switch = function(class1, class2) {

    class1 = '.' + class1;
    class2 = '.' + class2;

    // hide and show question with 1000ms delay
    question.transition();

    // while question div is hidden change the question
    setTimeout(()=>{
        $(class1).css({'display':'none'});
        $(class2).css({'display':'block', 'opacity':'0'});
        setTimeout(()=>{
            $(class2).css({'transition':'0.2s', 'opacity':'1'});
        }, 50)
    }, 210)

}

question.numberUpdate = function() {

    $('#questionIndex').css({'transition':'0.25s', 'opacity':'0'})
    setTimeout(()=>{
        $('#questionIndex').html(order.index + 1)
        setTimeout(()=>{
            $('#questionIndex').css({'transition':'0.25s', 'opacity':'1'})
        }, 10)
    }, 260)

}

// helper to question.switch(): transition between different questions
question.transition = function() {

    $('.frame-B-0-0').css({'transition':'0.2s', 'opacity':'0'});
    setTimeout(()=>{
        $('.frame-B-0-0').css({'transition':'0.25s', 'opacity':'1'});
    }, 250)

}


// ---------------------- //
// ---- PROGRESS BAR ---- //
// ---------------------- //

progressBar.update = function() {

    var totalSize = order.active.length;
    var currentSize = order.index + 1;

    var pp = ( currentSize / totalSize ) * 100;

    pp = pp + '%';

    $('.progress-bar').css({'width':pp});

    $('#numOfQuestion').html(order.active.length);

}

// -------------------- //
// ---- EXPERIMENT ---- //
// -------------------- //

experiment.generate = function() {

    console.log('generating survey');
    console.log('');

    order.index = 0;

    order.active = [
        'student',
        // 'education',
        'gender',
        'age',
        'race',
        'interactedRace',
        'location',
    ];

    $('#numOfQuestion').html(order.active.length);

    question.numberUpdate();
    progressBar.update();
    setTimeout(()=>{
        $('.questionIndexText').css({'opacity':'1'});
        $('.container').css({'transition':'1s', 'opacity':'1'});
    }, 500)

    console.log('order index: ' + order.index);
    console.log('for question order: ' + order.active);

    question.first();

}
