// window.onload = function() {

    // setTimeout(()=>{
    //
        $('.text').css({'opacity':'1'});
    //
    //     setTimeout(()=>{
    //         $('.thankYou').css({'opacity':'1'});
    //     }, 3000)
    //
    // }, 500)

// }


var node = parent.node;

// --------------------------------------------- //

// var container = document.getElementById('node-feedback');
// node.game.myFeedback = node.widgets.append('Feedback', container, {
//     feedbackOnly: true,
//     verify: true,
//     maxWords: 500,
//     showSubmit: true,
//     mainText: 'Feedback?',
//
// });
// $('.panel-heading, .feedback-hint').css({'display':'none'})
// $('.feedback-textarea').css({
//     'margin-bottom':'20px',
// })
// $('.feedback-maintext').css({
//     'font-weight':'100',
//     'font-size':'23px',
//
// })



// ---------------------------------------------- //

var bottomDiv = document.getElementById('bottomSection');
setTimeout(()=>{
    bottomDiv.style.opacity = 1;
}, 2000)


var feedbackButton = $('#feedbackButton');



feedbackButton.click(function() {

    console.log('feedback button clicked');

    var myFeedback = $('#feedback').val();

    var div = document.getElementById('feedbackButton');
    div.innerHTML = 'SENT!';
    div.style.boxShadow = '0px 0px transparent';

    var blocker = document.getElementById('blocker')
    blocker.style.background = '#ffffff82';
    blocker.style.zIndex = 10;

    console.log(myFeedback);

    // node.emit('HTML-feedback', myFeedback);

    node.set({
        myFeedback: myFeedback
    })

})







// ------------------------------------------------ //




var exitCode = undefined;
node.on.data('HTML-exitCode', function(msg) {

    exitCode = msg.data;
    console.log(exitCode);
    $('#exitCode').html(exitCode);

})

var copyButton = document.getElementById('copyToClipboard');
copyButton.onclick = () => {


    var text = document.getElementById('copiedText');
    console.log('button is clicked');
    console.log('exit code', exitCode);

    try {
        navigator.clipboard.writeText(exitCode);
        text.style.opacity = 1;
    }
    catch (err) {
        console.log('navigator error occured', err);
    }
}

node.say('getExitCode', 'SERVER');
