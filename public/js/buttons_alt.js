var helper = {
    slider: {},
    timer: {
        mutate: {},
    },
};

// --------------------------------------- //
// ------------ A INFO BUTTONS ----------- //
// --------------------------------------- //

$('#btn-A-1').click(function() {

    box.transition('A-1', 'A-3', 0, 1, 1, 750);

    box.updateProgressBar();

    box.active.sparkle = false;

    setTimeout(()=>{
        box.button.show('A-3');
    }, 2000)

});

var transitionToMainSection = function() {

    setTimeout(()=>{
        box.flush();
        title.hide();
    }, 100);

    // close the introduction info box container
    $('#boxbox-A').css({'transition':'0.3s','margin-bottom':'-20px'});
    setTimeout(()=>{
        $('#boxbox-A').css({'display':'none'});
        $('#boxbox-B').css({'display':'block'});
        $('.frame-A').css({'display':'block'});
    }, 300);

    setTimeout(()=>{
        $('.frame-A').css({'transition':'1s', 'opacity':'1'});
    }, 1000)

    setTimeout(()=>{
        picture.set(1);
        setTimeout(()=>{
            picture.show(1);
        }, 250)
    }, 1500)

    setTimeout(()=>{
        box.transition('', 'B-1', 0, 0, 1, 750);
    }, 1000)

    setTimeout(()=>{
        box.button.show('B-1');
    }, 3750)

}

$('#btn-A-3').click(function() {

    box.transition('A-3', '', 0, 0, 1, 0);

    box.updateProgressBar();

    transitionToMainSection();

});



// --------------------------------------- //
// ------------ B INFO BUTTONS ----------- //
// --------------------------------------- //

$('#btn-B-1').click(function() {

    box.updateProgressBar();

    box.transition('B-1', 'B-2', 0, 0, 1, 750);

    picture.hide();
    setTimeout(()=>{
        picture.set(2);
        setTimeout(()=>{
            picture.show(0.7);
        }, 250)
    }, 450)

    setTimeout(()=>{
        box.button.show('B-2');
    }, 2750)

});

$('#btn-B-2').click(function() {

    box.updateProgressBar();

    button.active = false;

    box.transition('B-2', 'B-3', 0, 0, 1, 750);

    $('.frame-A').css({'transition':'0.7s', 'transform-origin':'bottom',
    'transform':'scale(0.7)'});
    $('.frame-B').css({'transition':'0.7s', 'transform-origin':'top',
    'transform':'scale(0.7)'});

    $('.frame-B').css({'transition':'0s', 'margin-bottom':'-150px', 'display':'block'});

    setTimeout(()=>{
        $('.frame-B-0').css({'transition':'0.5s', 'opacity':'1'});
        $('#rB').css({'transition':'0s', 'transform':'scale(1)'});
        setTimeout(()=>{
            $('#rB').css({'transition':'1s', 'opacity':'1'});
        }, 750)
    }, 400)


    setTimeout(()=>{
        box.button.show('B-3');
    }, 2750)

});

$('#btn-B-3').click(function() {

    box.updateProgressBar();

    button.active = false;

    box.transition('B-3', 'B-4', 0, 0, 1, 750);

    $('#lB').css({'transition':'0s', 'transform':'scale(1)'});
    setTimeout(()=>{
        $('#lB').css({'transition':'1s', 'opacity':'1'});
    }, 750)

    setTimeout(()=>{
        box.button.show('B-4');
    }, 2750)

});


listener.b5 = false;

$('#btn-B-4').click(function() {

    box.updateProgressBar();

    // as a reminder
    button.active = false;

    listener.b5 = true;

    box.transition('B-4', 'B-5', 0, 0, 1, 750);

});


helper.slider.div =  document.getElementById('confidence-slider');
helper.slider.animateSpeed = 0.5;
helper.slider.counter = 0;
helper.slider.cycle = 4;
helper.slider.animate = (val, direction) => {

    helper.slider.counter++;

    if(helper.slider.counter < ( (10 * helper.slider.cycle) + 2) ) {

        setTimeout(()=>{

            helper.slider.div.value = val;
            confidence.bar.set(val, 'confidence-bar');

            if(direction === 'right') {

                if(val < 5) {
                    val++;
                    helper.slider.animate(val, 'right');
                    return;
                }

                if(val > 4) {
                    val--;
                    helper.slider.animate(val, 'left');
                    return;
                }

            }

            if(direction === 'left') {

                if(val < 5 && val > 0) {
                    val--;
                    helper.slider.animate(val, 'left');
                    return;
                }

                if(val === 0) {
                    val++;
                    helper.slider.animate(val, 'right');
                    return;
                }

            }


        }, (helper.slider.animateSpeed * 100) );

    }

}


$('#btn-B-501').click(function() {

    box.updateProgressBar();

    // as a reminder
    button.active = false;


    $('.confidence-slider-range-text-container').css({
        'transition':'0.3s',
        'opacity':'1'
    })

    helper.slider.animateSpeed = 1;
    helper.slider.counter = 0;
    helper.slider.cycle = 0.3;
    helper.slider.animate(JSON.parse(helper.slider.div.value), 'right');

    box.transition('B-501', 'B-502', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show('B-502');
    }, 2750)

});

$('#btn-B-502').click(function() {

    box.updateProgressBar();

    box.transition('B-502', 'B-503', 0, 0, 1, 750);

    // activate slider listener
    listener.sliderChangeListens = true;

});




listener.c2 = false;
// to be used during the practice rounds
listener.c3 = false;
listener.c4 = false;
listener.c5 = false;

$('#btn-C-2').click(function() {

    box.updateProgressBar();

    box.transition('C-2', 'C-201', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show('C-201');
    }, 2750)

});

$('#btn-C-201').click(function() {

    box.updateProgressBar();

    box.transition('C-201', 'C-202', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show('C-202');
    }, 2250)

});

// activates listener.c2
$('#btn-C-202').click(function() {

    $('.frame-A').css({'transition':'1s', 'margin-top':'-100px'});

    listener.deactivateChoiceButtons = false;

    box.updateProgressBar();

    listener.c2 = true;

    $('.transitionButtonBlocker').css({'display':'none'});

    box.transition('C-202', 'C-3', 0, 0, 1, 250);

});

$('#btn-C-4').click(function() {

    box.updateProgressBar();

    box.transition('C-4', 'C-5', 1, 1, 1, 750);

    setTimeout(()=>{
        box.button.show('C-5');
    }, 2750)

});

$('#btn-C-5').click(function() {

    box.updateProgressBar();

    box.transition('C-5', 'C-599', 1, 1, 1, 750);

    setTimeout(()=>{
        box.button.show('C-599');
    }, 2750)

});
