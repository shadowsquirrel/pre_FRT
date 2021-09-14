// --------------------------------------- //
// ------------ A INFO BUTTONS ----------- //
// --------------------------------------- //

$('#btn-A-1').click(function() {

    box.transition('A-1', 'A-2', 0, 1, 1, 750);

    // title.update.textColor(-6000, false, 50);

    setTimeout(()=>{
        box.button.show('A-2');
    }, 2000)

});

$('#btn-A-2').click(function() {

    box.transition('A-2', 'A-3', 1, 1, 1, 750);

    // title.update.textColor(-6000, false, 50);

    setTimeout(()=>{
        box.button.show('A-3');
    }, 2000)

});

$('#btn-A-3').click(function() {

    box.transition('A-3', 'A-6', 1, 1, 1, 750);

    // title.update.textColor(-6000, false, 50);

    setTimeout(()=>{
        box.button.show('A-6');
    }, 2000)

});

$('#btn-A-6').click(function() {

    box.transition('A-6', '', 0, 0, 1, 0);

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
        // show new title and a segue info box
        box.transition('', 'B-1', 0, 0, 1, 750);
    }, 1000)

    setTimeout(()=>{
        box.button.show('B-1');
    }, 3750)


});


// --------------------------------------- //
// ------------ B INFO BUTTONS ----------- //
// --------------------------------------- //

$('#btn-B-1').click(function() {

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

    button.active = false;

    box.transition('B-2', 'B-3', 0, 0, 1, 750);

    $('.frame-A').css({'transition':'0.7s', 'transform-origin':'top',
    'transform':'scale(0.7)'});
    $('.frame-B').css({'transition':'0.7s', 'transform-origin':'top',
    'transform':'scale(0.7)'});

    $('.frame-B').css({'transition':'0s', 'margin-bottom':'-150px', 'display':'block'});
    setTimeout(()=>{
        $('.frame-B').css({'transition':'0.5s', 'margin-bottom':'-40px',
        'margin-top':'-125px'});
        setTimeout(()=>{
            $('.frame-B-0').css({'transition':'0.5s', 'opacity':'1'});
            $('#rB').css({'transition':'0s', 'transform':'scale(1)'});
            setTimeout(()=>{
                $('#rB').css({'transition':'1s', 'opacity':'1'});
            }, 750)
        }, 300)
    }, 100)

    setTimeout(()=>{
        box.button.show('B-3');
    }, 2750)

});

$('#btn-B-3').click(function() {

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

    // as a reminder
    button.active = false;

    listener.b5 = true;

    box.transition('B-4', 'B-5', 0, 0, 1, 750);

});

$('#btn-B-6').click(function() {

    // as a reminder
    button.active = false;

    box.transition('B-6', 'B-7', 0, 0, 1, 750);

    $('.facePicture').css({'filter':'brightness(1) opacity(1) blur(0px) saturate(1) grayscale(0)'})

    setTimeout(()=>{
        picture.set(0);
        setTimeout(()=>{
            picture.show(1);
        }, 750)
    }, 750)

    $('.frame-A').css({'transform':'scale(0.7)'});

    setTimeout(()=>{
        button.show(1);
    }, 500)
    setTimeout(()=>{
        box.button.show('B-7');
    }, 2750)

});




listener.c2 = false;

$('#btn-C-2').click(function() {

    box.transition('C-2', 'C-201', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show('C-201');
    }, 2750)

});

$('#btn-C-201').click(function() {

    listener.c2 = true;

    box.transition('C-201', 'C-3', 0, 0, 1, 750);

});

$('#btn-C-4').click(function() {

    box.transition('C-4', 'C-5', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show('C-5');
    }, 2750)

});
