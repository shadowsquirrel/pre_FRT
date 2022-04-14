// ------------------------ //
// ------- GLOBALS -------- //
// ------------------------ //
var picture = {};
var button = {
    action: {},
    isDecisionMade: false,
};
var go = {};
var tuto = {};
var listener = {};
var timer = {};


timer.stop = false;

button.isClicked = false;

tuto.practiceStage = false;

tuto.timerIsOn = false;

window.onload = function() {

    // --------------- //

    var node = parent.node;

    box.global.NoB = 30;
    // box.updateProgressBar();

    // --------------- //

    node.emit('HTML-startSecretTutoTimer');


    // ----------------------- //
    // --------  GO  --------- //
    // ----------------------- //

    $('#go').html('START');

    go.show = function(delay) {

        myDelay = delay === undefined ? 0.2 : delay;

        myDelay = myDelay + 's';

        // show the go button
        $('.frame-C').css({'transition':'0s', 'opacity':'0',
        'z-index':'1', 'transform':'scale(1)', 'display':'block'});
        setTimeout(()=>{
            $('.frame-C').css({'transition':myDelay,
            'opacity':'1'});
        }, 10)

    }

    go.setText = function(text) {

        $('#go').html(text);

    }

    go.hide = function(delay) {

        myDelay = delay === undefined ? 0.1 : delay;

        myDelay = myDelay + 's'

        // hide the go button
        $('.frame-C').css({'transition':myDelay,
        'opacity':'0', 'z-index':'0'});
        setTimeout(()=>{
            $('.frame-C').css({'transform':'scale(0)'});
        }, 110)

    }


    // ----------------------- //
    // ------  PICTURE  ------ //
    // ----------------------- //

    // index will redefined picture.index
    // if index undefined, current picture.index definition is used
    picture.set = function(index, path) {

        picture.index = index === undefined ? picture.index : index;

        var myPath = path === undefined ? 'tuto' : path;
        var myString = 'faces/' + myPath + '/';

        var sourceLeft = myString + picture.index + 'a' + '.jpg';

        var sourceRight = myString + picture.index + 'b' + '.jpg'

        $('#lF').attr('src', sourceLeft);

        $('#rF').attr('src', sourceRight);

    }

    picture.hide = function(delay) {

        myDelay = delay === undefined ? 0.35 : delay;

        myDelay = myDelay + 's';

        $('.facePicture').css({'transition':myDelay, 'opacity':'0'});

    }

    picture.show = function(delay) {

        myDelay = delay === undefined ? 0.2 : delay;

        myDelay = myDelay + 's';

        $('.facePicture').css({'transition':myDelay, 'opacity':'1'});

    }

    picture.fastForwardActive = true;
    picture.fastForwardCounter = 0;
    picture.fastForward = function(index) {

        if(picture.fastForwardActive) {

            picture.fastForwardCounter++

            picture.show(0.1)

            picture.set(index, 'exp');

            if(index < 28) {
                index++
            } else {
                index = 1;
            }

            if(picture.fastForwardCounter > 20) {
                picture.hide(1)
                setTimeout(()=>{
                    picture.fastForwardActive = false;
                    picture.set(1);
                    $('.facePicture').css({'filter':'brightness(1) opacity(1) blur(0px) saturate(1) grayscale(0)'});
                    setTimeout(()=>{
                        picture.show(1.5);
                    }, 500)
                }, 1100)
            }

            setTimeout(()=>{
                picture.fastForward(index)
            }, 100)


        }

    }

    // ----------------------- //
    // --  DECISION BUTTON  -- //
    // ----------------------- //

    button.hide = function(side) {

        node.emit('killTutoTimer');

        if(side === -2 || side === undefined) {

            button.isDecisionMade = true;

            console.log('no button is picked, both buttons are killed');

            $('#lB, #rB, .leftButtonExplanation, .rightButtonExplanation').css({
                'transition':'0.1s',
                'opacity':'0'
            })

            setTimeout(()=>{
                $('#lB, #rB').css({'transform':'scale(0)'})
            }, 400)

        }

        if(side === 0) {

            button.isDecisionMade = true;

            console.log('left button picked, right button is killed');

            $('#rB, .rightButtonExplanation').css({
                'transition':'0.1s',
                'opacity':'0'
            })

            setTimeout(()=>{
                $('#rB').css({'transform':'scale(0)'})
            }, 400)

        }

        if(side === 1) {

            console.log('right button picked, left button is killed');

            $('#lB, .leftButtonExplanation').css({
                'transition':'0.1s',
                'opacity':'0'
            })

            setTimeout(()=>{
                $('#lB').css({'transform':'scale(0)'})
            }, 400)


        }

        console.log('');
        console.log('HIDE BUTTON');
        console.log('');



    }

    button.show = function(delay) {

        button.isDecisionMade = false;

        myDelay = delay === undefined ? 0.19 : delay;

        myDelay = myDelay + 's';

        button.isClicked = false;

        $('#lB, #rB').css({'transition':'0s', 'transform':'scale(1)'})
        setTimeout(()=>{
            $('#lB, #rB').css({'transition':myDelay, 'opacity':'1'})
        }, 10)

        console.log('');
        console.log('SHOW BUTTON');
        console.log('');

    }

    // --- ACTIONS FOR LISTENERS --- //

    button.action.b5 = (side) => {

        // notice we do not kill the listener.b5 yet

        box.updateProgressBar();

        // change this for different buttons
        button.hide(side);

        // minimize tha picture button setup
        frame.image.min();

        // initialize the confidence slider
        confidence.reset();

        // display none explanatory text and the subtmit button
        confidence.killBottom();
        frame.slider.pullBottom();

        // display flex and opacity 1 the slider section
        frame.slider.show();

        // show the next information box
        box.transition('B-5', 'B-501', 0, 0, 1, 0);

        listener.deactivateChoiceButtons = true;

        setTimeout(()=>{
            box.button.show('B-501');
        }, 4750)

    }

    button.action.b5Final = () => {

        box.updateProgressBar();

        setTimeout(()=>{

            listener.b5 = false;

            box.transition('B-504', 'B-6', 0, 0, 1, 750);

            button.hide();
            picture.hide();
            confidence.button.submit.hide();
            frame.slider.hide();

            setTimeout(()=>{
                frame.image.max();
            }, 350)

            setTimeout(()=>{
                confidence.reset();
            }, 2000)


            $('.frame-A').css({'transform':'scale(1)'})

            $('.facePicture').css({'filter': 'brightness(1) opacity(0.5) blur(10px) saturate(10) grayscale(1)'})

            setTimeout(()=>{
                picture.fastForward(1);
            }, 750)

            setTimeout(()=>{
                box.button.show('B-6');
            }, 4750)

        }, 200)

        frame.allHide();
        setTimeout(()=>{
            frame.allShow();
        }, 1000)

    }

    button.action.c1 = (side) => {

        box.updateProgressBar();

        // change this for different buttons
        button.hide(side);

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

        listener.deactivateChoiceButtons = true;
        listener.sliderChangeListens = true;

    }

    button.action.c1Final = () => {

        box.updateProgressBar();

        frame.allHide();
        setTimeout(()=>{
            frame.allShow();
        }, 1000)

        setTimeout(()=>{
            listener.c1 = false;

            box.transition('', 'C-2', 0, 0, 1, 0);

            button.hide();
            picture.hide();
            confidence.button.submit.hide();
            frame.slider.hide();

            setTimeout(()=>{
                frame.image.max();
            }, 150)

            setTimeout(()=>{
                confidence.reset();
            }, 2000)


            $('.frame-A').css({'transition':'1s', 'opacity':'0'})

            setTimeout(()=>{
                $('.frame-A').css({'transition':'0.7s', 'margin-top':'-250px'});
            }, 500)

            setTimeout(()=>{
                $('.frame-A').css({'transition':'1s', 'opacity':'1'})
            }, 500)


            go.setText('NEXT');

            // setTimeout(()=>{
            //     box.button.show('C-2');
            // }, 2750)

            go.active = false;
            $('.transitionButtonBlocker').css({'display':'block'});

            setTimeout(()=>{
                go.show(1);
            }, 500)

            setTimeout(()=>{
                box.button.show('C-2');
            }, 2750)

        }, 200)


    }

    button.action.c2 = (side) => {

        box.updateProgressBar();

        // update button choice hide the not chosen
        button.hide(side);

        // deactivate choice buttons
        listener.deactivateChoiceButtons = true;

        // stop timer
        node.emit('stopTutoTimer');
        setTimeout(()=>{
            node.emit('killTutoTimer');
        }, 250)

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

    }

    button.action.c2Final = () => {

        box.updateProgressBar();

        listener.c2 = false;

        setTimeout(()=>{

            // hide slider stuff
            button.hide();
            picture.hide();
            confidence.button.submit.hide();
            frame.slider.hide();


            setTimeout(()=>{
                frame.image.max();
            }, 500)

            setTimeout(()=>{
                $('.frame-A').css({'transition':'0.7s', 'margin-top':'-100px'});
            }, 500)

            setTimeout(()=>{
                confidence.reset();
            }, 2000)


            // show next button and the text below next button
            setTimeout(()=>{
                go.show(0.1);
                box.transition('', 'C-31', 0, 0, 1, 0);
                $('#box-C-31').css({'transition':'1s', 'opacity':'1'});
                listener.c3 = true;
            }, 1000)

        }, 200)

        frame.allHide();
        setTimeout(()=>{
            frame.allShow();
        }, 1000)

    }

    button.action.c3 = (side) => {

        box.updateProgressBar();

        // update button choice hide the not chosen
        button.hide(side);

        // deactivate choice buttons
        listener.deactivateChoiceButtons = true;

        // stop timer
        node.emit('stopTutoTimer');
        setTimeout(()=>{
            node.emit('killTutoTimer');
        }, 250)

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

    }

    button.action.c3Final = () => {

        box.updateProgressBar();

        listener.c3 = false;

        setTimeout(()=>{


            // hide slider stuff
            button.hide();
            picture.hide();
            confidence.button.submit.hide();
            frame.slider.hide();


            setTimeout(()=>{
                frame.image.max();
            }, 500)

            setTimeout(()=>{
                $('.frame-A').css({'transition':'0.7s', 'margin-top':'-100px'});
            }, 500)

            setTimeout(()=>{
                confidence.reset();
            }, 2000)




            // show next button and the text below next button
            setTimeout(()=>{
                go.show(0.1);
                box.transition('', 'C-31', 0, 0, 1, 0);
                $('#box-C-31').css({'opacity':'1'});
                listener.c4 = true;
            }, 1000)

        }, 200)

        frame.allHide();
        setTimeout(()=>{
            frame.allShow();
        }, 1000)

    }

    button.action.c4 = (side) => {

        box.updateProgressBar();

        // update button choice hide the not chosen
        button.hide(side);

        // deactivate choice buttons
        listener.deactivateChoiceButtons = true;

        // stop timer
        node.emit('stopTutoTimer');
        setTimeout(()=>{
            node.emit('killTutoTimer');
        }, 250)

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

    }

    button.action.c4Final = () => {

        box.updateProgressBar();

        listener.c4 = false;

        // hide slider stuff
        button.hide();
        picture.hide();
        confidence.button.submit.hide();
        frame.slider.hide();


        // setTimeout(()=>{
        //     frame.image.max();
        // }, 500)
        //
        // setTimeout(()=>{
        //     $('.frame-A').css({'margin-top':'-250px'});
        // }, 500)
        //
        // setTimeout(()=>{
        //     confidence.reset();
        // }, 2000)


        setTimeout(()=>{

            $('#boxbox-C').css({
                'margin-top':'150px'
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

    }

    // --- START/NEXT BUTTON --- //

    go.switchedToNext = false;
    go.active = false;
    go.simpleHide = true;

    $('#go').click(function() {

        node.emit('displayTutoTimer');
        button.isDecisionMade = false;

        if(go.active) {

            go.hide();

            if(tuto.practiceStage || !go.simpleHide) {

                if(!go.switchedToNext) {

                    go.switchedToNext = true;

                    setTimeout(()=>{
                        go.setText('NEXT')
                    }, 750)

                }

                // set to picture based on picture.index
                picture.set();

                // show the pictures & buttons
                setTimeout(()=>{
                    picture.show();
                    button.show();
                }, 100)

                // activate countdown
                if(tuto.timerIsOn) {
                    setTimeout(()=>{
                        node.emit('startTutoCounter');
                    }, 100)
                }

            }

        }

        if(listener.c1) {

            box.updateProgressBar();

            // listener.c1 = false;

            box.transition('C-1', '', 0, 0, 1, 0);

            $('.frame-A').css({'margin-top':'0px'});

            go.hide(0.1);

            picture.hide(1);

            setTimeout(()=>{
                // set to picture based on picture.index
                picture.set(3);
            }, 1100)

            // show the pictures & buttons
            setTimeout(()=>{

                picture.show(1);
                button.show(1);

                setTimeout(()=>{
                    console.log('NODE.EMIT(STARTTUTOTIMER WITH ACTIVE TIMEOUT for c1)');
                    node.emit('startTutoTimer', 'c1');
                }, 50)

            }, 1200)

        }

        if(listener.c2) {

            listener.deactivateChoiceButtons = false;

            // listener.c2 = false;
            box.updateProgressBar();

            box.transition('C-3', '', 0, 0, 1, 0);

            $('.frame-A').css({'transition':'0.7s', 'margin-top':'0px'});

            go.hide(0.1);

            // set to picture based on picture.index
            picture.set(4);

            // show the pictures & buttons
            setTimeout(()=>{

                picture.show(0.1);
                button.show(0.1);

                console.log('NODE.EMIT(STARTTUTOTIMER WITH ACTIVE TIMEOUT for c2)');
                node.emit('displayTutoTimer')
                node.emit('startTutoTimer', 'c2');

            }, 250)

        }

        if(listener.c3) {

            listener.deactivateChoiceButtons = false;

            box.updateProgressBar();
            go.hide(0.1);
            $('#box-C-31').css({'opacity':'0'});

            $('.frame-A').css({'transition':'0.7s', 'margin-top':'0px'});

            // set to picture based on picture.index
            picture.set(5);

            // show the pictures & buttons
            setTimeout(()=>{

                picture.show(0.1);
                button.show(0.1);

                console.log('NODE.EMIT(STARTTUTOTIMER WITH ACTIVE TIMEOUT for c3)');
                node.emit('startTutoTimer', 'c3');

            }, 250)

        }

        if(listener.c4) {

            listener.deactivateChoiceButtons = false;

            $('.frame-A').css({'transition':'0.7s', 'margin-top':'0px'});

            box.updateProgressBar();
            go.hide(0.1);
            $('#box-C-31').css({'opacity':'0'});
            setTimeout(()=>{
                box.transition('', 'C-31', 0, 0, 1, 0);
            }, 1000)

            // set to picture based on picture.index
            picture.set(0);

            // show the pictures & buttons
            setTimeout(()=>{

                picture.show(0.1);
                button.show(0.1);

                console.log('NODE.EMIT(STARTTUTOTIMER WITH ACTIVE TIMEOUT for c4)');
                node.emit('startTutoTimer', 'c4');

            }, 250)

        }

    })


    // --- DECISION BUTTONS --- //

    button.active = false;
    listener.deactivateChoiceButtons = false;

    $('#lB').click(function() {

        if(!listener.deactivateChoiceButtons) {

            if(button.active) {

                if(!button.isClicked) {

                    button.isClicked = true;

                    if(tuto.practiceStage) {

                        button.answer = 0;

                        go.show();

                        button.hide();

                        picture.hide();

                        picture.index++;

                    }

                }

            }

            // TO DO: REPLACE INSIDE WITH TRANSITIONING TO SLIDER
            // AND A NEW INFO BOX RELATED TO IT
            //
            if(listener.b5) {

                button.action.b5(0);

            }

            if(listener.c1) {

                button.action.c1(0);

            }

            if(listener.c2) {

                button.action.c2(0);

            }

            if(listener.c3) {

                button.action.c3(0);

            }

            if(listener.c4) {

                button.action.c4(0);

            }

        } else {

            console.log('');
            console.log('BUTTONS ARE DEACTIVATED');
            console.log('');

        }

    })

    $('#rB').click(function() {

        if(!listener.deactivateChoiceButtons) {

            if(button.active) {

                if(!button.isClicked) {

                    button.isClicked = true;

                    if(tuto.practiceStage) {

                        button.answer = 1;

                        go.show();

                        button.hide();

                        picture.hide();

                        picture.index++;

                    }

                }

            }

            if(listener.b5) {

                button.action.b5(1);

            }

            if(listener.c1) {

                button.action.c1(1);

            }

            if(listener.c2) {

                button.action.c2(1);

            }

            if(listener.c3) {

                button.action.c3(1);

            }

            if(listener.c4) {

                button.action.c4(1);

            }

        } else {
            console.log('');
            console.log('BUTTONS ARE DEACTIVATED');
            console.log('');
        }

    })


    // --- TIME UP --- //

    // TO DO: KILL THESE CALL BACKS AND REPLACE WITH ALERT
    // have a custom alert screen
    node.on('tutoTimeUp', function(key) {

        console.log('');
        console.log('TUTO TIME UP ACTIVATED');
        console.log('KEY RECEIVED: ' + key);

        // TO DO: HAVENT CHECK THIS ONE YET
        if(key === 'b5') {

            listener.b5 = false;

            button.hide();

            picture.hide();

            $('.frame-A').css({'transform':'scale(1)'})

            $('.facePicture').css({'filter': 'brightness(1) opacity(0.5) blur(10px) saturate(10) grayscale(1)'})

            setTimeout(()=>{
                picture.fastForward(1);
            }, 750)

            box.transition('B-5', 'B-6', 0, 0, 0, 750);

            setTimeout(()=>{
                box.button.show('B-6');
            }, 4750)

        }

        if(key === 'c1') {

            if(!button.isDecisionMade) {
                node.emit('timeUp-warn');
            }

        }

        if(key === 'c2') {

            if(!button.isDecisionMade) {
                node.emit('timeUp-warn');
            }

        }

        if(key === 'c3') {

            if(!button.isDecisionMade) {
                node.emit('timeUp-warn');
            }

        }

        if(key === 'c4') {

            if(!button.isDecisionMade) {
                node.emit('timeUp-warn');
            }

        }

    })


    // --- CONFIDENCE SLIDER CHANGE LISTENER --- //

    listener.sliderChangeListens = false;

    $('#confidence-slider').change(()=> {

        if(listener.sliderChangeListens) {

            if(listener.b5) {


                setTimeout(()=>{

                    box.transition('B-503', '', 0, 0, 0, 0);

                    // already in flex not sure if this is relevant
                    setTimeout(()=>{
                        $('.confidence-button-submit-container').css({
                            'display':'flex'
                        })
                        setTimeout(()=>{
                            confidence.button.submit.show();
                        }, 100)
                    }, 750)


                    setTimeout(()=> {
                        box.transition('', 'B-504', 0, 0, 1, 750);
                    }, 150)

                }, 1000)

                listener.sliderChangeListens = false;

            }

            if(listener.c1) {

                setTimeout(()=>{
                    $('.confidence-button-submit-container').css({
                        'display':'flex'
                    })
                    setTimeout(()=>{
                        confidence.button.submit.show();
                    }, 100)
                }, 750)

                listener.sliderChangeListens = false;

            }

            if(listener.c2) {

                setTimeout(()=>{
                    $('.confidence-button-submit-container').css({
                        'display':'flex'
                    })
                    setTimeout(()=>{
                        confidence.button.submit.show();
                    }, 100)
                }, 750)

                listener.sliderChangeListens = false;

            }

            if(listener.c3) {

                setTimeout(()=>{
                    $('.confidence-button-submit-container').css({
                        'display':'flex'
                    })
                    setTimeout(()=>{
                        confidence.button.submit.show();
                    }, 100)
                }, 750)

                listener.sliderChangeListens = false;

            }

            if(listener.c4) {

                setTimeout(()=>{
                    $('.confidence-button-submit-container').css({
                        'display':'flex'
                    })
                    setTimeout(()=>{
                        confidence.button.submit.show();
                    }, 100)
                }, 750)

                listener.sliderChangeListens = false;

            }

        }

    });


    // --- SUBMIT CONFIDENCE BUTTON --- //
    button.submit = () => {

        setTimeout(()=>{
            confidence.reset();
            confidence.button.submit.hide();
        }, 500)

    }

    $('.confidence-button-submit').click(() => {

        if(listener.b5) {

            button.action.b5Final();

        }

        if(listener.c1) {

            button.action.c1Final();

        }

        if(listener.c2) {

            button.action.c2Final();

        }

        if(listener.c3) {

            button.action.c3Final();

        }

        if(listener.c4) {

            button.action.c4Final();

        }

        // defult behavior for reference
        // button.submit();

    })


    // ------ DECISION BUTTON HOVERS ------ //

    $('#lB').hover(
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(0.5)'});
            $('.leftButtonExplanation').css({'transition':'0.3', 'opacity':'1'});
        },
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(1)'});
            $('.leftButtonExplanation').css({'transition':'0.3', 'opacity':'0'});
        }
    )

    $('#rB').hover(
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(0.5)'});
            $('.rightButtonExplanation').css({'transition':'0.3', 'opacity':'1'});
        },
        function() {
            $(this).css({'transition':'0.1s', 'filter':'brightness(1)'});
            $('.rightButtonExplanation').css({'transition':'0.3', 'opacity':'0'});
        }
    )


    // ---------------------------------------- //
    // ----- BUTTONS WITH EMIITERS INSIDE ----- //
    // ---------------------------------------- //

    // --- B --- //

    $('#btn-B-6').click(function() {

        box.updateProgressBar();

        // as a reminder
        button.active = false;

        box.transition('B-6', 'B-7', 0, 0, 1, 750);
        node.emit('displayTutoTimer')

        $('.facePicture').css({'filter':'brightness(1) opacity(1) blur(0px) saturate(1) grayscale(0)'})

        setTimeout(()=>{
            picture.set(1);
            setTimeout(()=>{
                picture.show(1);
            }, 750)
        }, 750)

        $('.frame-A').css({'transform':'scale(0.7)'});

        setTimeout(()=>{
            button.show(1);
        }, 500)
        setTimeout(()=>{
            node.emit('justShowTutoTimer')
        }, 150)
        setTimeout(()=>{
            box.button.show('B-7');
        }, 2750)

    });

    $('#btn-B-7').click(function() {

        box.updateProgressBar();

        console.log('NODE.EMIT(SHOWTUTOTIMER)');
        node.emit('showTutoTimer');

        // as a reminder
        button.active = false;

        box.transition('B-7', 'B-8', 0, 0, 1, 750);

        setTimeout(()=>{
            box.button.show('B-8');
        }, 2750)

    });


    listener.c1 = false;
    $('#btn-B-8').click(function() {

        box.updateProgressBar();

        console.log('NODE.EMIT(HIDETUTOTIMER)');
        node.emit('hideTutoTimer');

        box.transition('B-8', '', 0, 0, 1, 0);
        $('.frame-A').css({'margin-top':'-50px'});

        // as a reminder
        button.active = false;
        listener.deactivateChoiceButtons = false;

        button.hide();

        setTimeout(()=>{
            // close the introduction info box container
            $('#boxbox-B').css({'transition':'0.3s','margin-bottom':'-20px'});
            setTimeout(()=>{
                $('#boxbox-B').css({'display':'none'});
                $('#boxbox-C').css({'display':'block'});
                $('.frame-C').css({'transition':'0s', 'display':'block', 'opacity':'0'});
            }, 300);
        }, 500)

        $('#go').html('START');
        setTimeout(()=>{
            go.show(1);
        }, 1000)

        setTimeout(()=>{
            listener.c1 = true;
            box.transition('', 'C-1', 0, 0, 1, 0);
        }, 800)

    });

    // --- C --- //

    $('#btn-C-5').click(function() {

        box.updateProgressBar();

        $('#box-C-5').css({'transition':'0.5s', 'margin-top':'-85px'});

        box.transition('C-5', 'C-6', 1, 1, 1, 750);
        setTimeout(()=>{
            box.transition('', 'C-7', 1, 1, 1, 750);
            box.transition('', 'C-8', 1, 1, 1, 750);
        }, 100)

        $('.frame-A').css({'margin-top':'-175px'});

        setTimeout(()=>{
            box.button.show('C-7');
            box.button.show('C-8');
        }, 2750)

        // node.emit('setHeight', 700);

    });

    $('#btn-C-7').click(function() {

        box.updateProgressBar();

        box.transition('C-6', '', 0, 0, 1, 750);
        box.transition('C-7', '', 0, 0, 1, 750);
        box.transition('C-8', '', 0, 0, 1, 750);

        box.flush();

        node.emit('HTML-recordSecretTutoTimer');

        console.log('node.emit(HTML-endTuto)');
        node.emit('HTML-endTuto');

    });

    $('#btn-C-8').click(function() {

        window.location.reload(false);

    });





    // ---------------------------------- //
    // --------  INITIAL SETUP  --------- //
    // ---------------------------------- //

    button.hide();
    picture.hide();

    setTimeout(()=>{
        picture.set(1);
    }, 250)

    title.update.text('WELCOME TO THE EXPERIMENT');
    title.update.size(true);
    title.update.textColor(-6000, false, 50);

    box.transition('', 'A-1', 0, 0, 1, 750);

    setTimeout(()=>{
        box.button.show2('A-1');
    }, 2000)


}
