
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

    console.log('');
    console.log('active question is: ' + question.active);

    // here age is arbitrary it can also be empty string
    question.switch('age', question.active);

}

question.next = function() {

    if(order.index < order.active.length - 1) {

        order.index++;

        // progressBar.numberUpdate();
        progressBar.update();

        question.previous = question.active;
        question.active = order.active[order.index];

        console.log('');
        console.log('active question is: ' + question.active);
        console.log('order.index: ' + order.index);

        question.switch(question.previous, question.active);


    } else {

        console.log('');
        console.log('');
        console.log('No more question to ask -> order.index: ' + order.index);
        console.log('');
        console.log('decisions made:')
        console.log(decision);;
        console.log('');

        decision.save();

    }

}

question.switch = function(class1, class2) {

    class1 = '.' + class1;
    class2 = '.' + class2;

    // hide and show question with 1000ms delay
    question.transition();

    // while question div is hidden change the question
    setTimeout(()=>{
        $(class1).css({'display':'none'});
        if(class2 === '.ladder') {
            $(class2).css({'display':'flex', 'opacity':'0'});
        } else {
            $(class2).css({'display':'block', 'opacity':'0'});
        }
        setTimeout(()=>{
            $(class2).css({'transition':'0.2s', 'opacity':'1'});
        }, 50)
    }, 210)

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

    progressBar.numberUpdate();

    var totalSize = order.active.length;
    var currentSize = order.index + 1;

    var pp = ( currentSize / totalSize ) * 100;

    pp = pp + '%';

    $('.progress-bar').css({'width':pp});

}

progressBar.show = function() {

    setTimeout(()=>{
        $('.questionIndexText').css({'opacity':'1'});
        $('.container').css({'transition':'1s', 'opacity':'1'});
    }, 500)

}

progressBar.numberUpdate = function() {

    $('#questionIndex').css({'transition':'0.25s', 'opacity':'0'})
    setTimeout(()=>{
        $('#questionIndex').html(order.index + 1)
        setTimeout(()=>{
            $('#questionIndex').css({'transition':'0.25s', 'opacity':'1'})
        }, 10)
    }, 260)


}


// -------------------- //
// ---- EXPERIMENT ---- //
// -------------------- //

experiment.generate = function() {

    console.log('generating survey');
    console.log('');

    order.index = 0;

    order.active = [
        'enoughTime',
        'imageSize',
        'buttonPlacement',
    ];

    $('#numOfQuestion').html(order.active.length);

    // progressBar.numberUpdate();
    progressBar.update();
    progressBar.show();

    console.log('order index: ' + order.index);
    console.log('for question order: ' + order.active);

    question.first();

}
