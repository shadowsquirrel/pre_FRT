


// -------------------------------------- //
// --- generic choice button function --- //
// -------------------------------------- //

box.updateProgressBar();

// update button choice hide the not chosen
button.hide(side);

// deactivate choice buttons
listener.deactivateChoiceButtons = true;

// stop timer
node.emit('stopTutoTimer');

// minimize tha picture button setup
frame.image.min();

// initialize the confidence slider
confidence.reset();

// display none explanatory text and the subtmit button
confidence.killBottom();
frame.slider.pullBottom();

// display flex and opacity 1 the slider section
frame.slider.show();

// activate slider listener
listener.sliderChangeListens = true;

// add here move the slider indicator animation



// -------------------------------------- //
// -------------------------------------- //
// -------------------------------------- //

// --- generic slider change listener function

setTimeout(()=>{
    $('.confidence-button-submit-container').css({
        'display':'flex'
    })
    setTimeout(()=>{
        confidence.button.submit.show();
    }, 100)
}, 1500)

listener.sliderChangeListens = false;




// --- generic submit button action

box.updateProgressBar();

listener.c1 = false;

// hide slider stuff
button.hide();
picture.hide();
confidence.button.submit.hide();
frame.slider.hide();


setTimeout(()=>{
    frame.image.max();
}, 500)

setTimeout(()=>{
    $('.frame-A').css({'margin-top':'-250px'});
}, 500)

setTimeout(()=>{
    confidence.reset();
}, 2000)


// show next button and the text below next button
setTimeout(()=>{
    go.show(0.1);
    box.transition('', 'C-31', 0, 0, 1, 0);
    listener.c3 = true;
}, 2000)



// ----------- C4 TRANSITION ACTION TO THE END OF THE TUTORIAL ------------ //

setTimeout(()=>{

    $('#boxbox-C').css({
        'margin-top':'-100px'
    })
    $('.frame-A, .frame-B').css({'transition':'0.2s', 'opacity':'0'})
    setTimeout(()=>{
        $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
    }, 1000)

    setTimeout(()=>{

        box.transition('', 'C-4', 0, 0, 1, 0);
        // $('.frame-A').css({'margin-top':'-100px'});
        setTimeout(()=>{
            box.button.show('C-4');
        }, 1750)

    }, 1500)

}, 150)
