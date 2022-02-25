// ------------------------ //
// ------- GLOBALS -------- //
// ------------------------ //
var picture = {};
var button = {};
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

    box.global.NoB = 23;
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

    // picture.set is modified now picture.set2 is not used
    // picture.set2 = function(index) {
    //
    //     picture.index = index === undefined ? picture.index : index;
    //
    //     var myString = 'faces/exp/';
    //
    //     var sourceLeft = myString + index + 'a' + '.jpg';
    //
    //     var sourceRight = myString + index + 'b' + '.jpg'
    //
    //     $('#lF').attr('src', sourceLeft);
    //
    //     $('#rF').attr('src', sourceRight);
    //
    // }

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

    button.hide = function() {

        $('#lB, #rB').css({'transition':'0.35s', 'opacity':'0'})
        setTimeout(()=>{
            $('#lB, #rB').css({'transform':'scale(0)'})
        }, 400)

        console.log('');
        console.log('HIDE BUTTON');
        console.log('');

    }

    button.show = function(delay) {

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


    go.switchedToNext = false;
    go.active = false;
    go.simpleHide = true;

    $('#go').click(function() {

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

            // listener.c2 = false;
            box.updateProgressBar();

            box.transition('C-3', '', 0, 0, 1, 0);

            $('.frame-A').css({'margin-top':'0px'});

            go.hide(0.1);

            // set to picture based on picture.index
            picture.set(4);


            // show the pictures & buttons
            setTimeout(()=>{

                picture.show(0.1);
                button.show(0.1);

                console.log('NODE.EMIT(STARTTUTOTIMER WITH ACTIVE TIMEOUT for c2)');
                node.emit('startTutoTimer', 'c2');

            }, 150)

        }

        if(listener.c3) {

            box.updateProgressBar();
            go.hide(0.1);
            $('#box-C-31').css({'opacity':'0'});

            // set to picture based on picture.index
            picture.set(5);

            // show the pictures & buttons
            setTimeout(()=>{

                picture.show(0.1);
                button.show(0.1);

                console.log('NODE.EMIT(STARTTUTOTIMER WITH ACTIVE TIMEOUT for c3)');
                node.emit('startTutoTimer', 'c3');

            }, 150)

        }

        if(listener.c4) {

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

            }, 150)

        }



    })



    button.active = false;

    $('#lB').click(function() {

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

        if(listener.b5) {

            box.updateProgressBar();

            listener.b5 = false;

            // console.log('node.emit(stopTutoTimer) b5');
            // node.emit('stopTutoTimer');


            button.hide();
            picture.hide();

            $('.frame-A').css({'transform':'scale(1)'})

            $('.facePicture').css({'filter': 'brightness(1) opacity(0.5) blur(10px) saturate(10) grayscale(1)'})

            setTimeout(()=>{
                picture.fastForward(1);
            }, 750)

            box.transition('B-5', 'B-6', 0, 0, 1, 750);

            setTimeout(()=>{
                box.button.show('B-6');
            }, 4750)

        }

        if(listener.c1) {

            listener.c1 = false;

            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c1');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            box.transition('', 'C-2', 0, 0, 1, 0);
            $('.frame-A').css({'margin-top':'-100px'});

            go.setText('NEXT');

            setTimeout(()=>{
                box.button.show('C-2');
            }, 2750)

            go.active = false;
            $('.transitionButtonBlocker').css({'display':'block'});

            setTimeout(()=>{
                go.show(1);
            }, 2000)

        }

        if(listener.c2) {

            listener.c2 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c2');
            node.emit('stopTutoTimer');

            // button.hide(1);
            // picture.hide(1);
            //
            // $('.frame-A').css({'opacity':'0'})
            // setTimeout(()=>{
            //     $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
            // }, 1000)
            //
            // setTimeout(()=>{
            //
            //     box.transition('', 'C-4', 0, 0, 1, 0);
            //     $('.frame-A').css({'margin-top':'-100px'});
            //     setTimeout(()=>{
            //         box.button.show('C-4');
            //     }, 1750)
            //
            // }, 1500)

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{
                go.show(0.1);
                box.transition('', 'C-31', 0, 0, 1, 0);
                listener.c3 = true;
            }, 150)

        }

        if(listener.c3) {

            listener.c3 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c3');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{
                go.show(0.1);
                $('#box-C-31').css({'opacity':'1'});
                listener.c4 = true;
            }, 150)

        }

        if(listener.c4) {

            listener.c4 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c4');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{

                $('.frame-A').css({'opacity':'0'})
                setTimeout(()=>{
                    $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
                }, 1000)

                setTimeout(()=>{

                    box.transition('', 'C-4', 0, 0, 1, 0);
                    $('.frame-A').css({'margin-top':'-100px'});
                    setTimeout(()=>{
                        box.button.show('C-4');
                    }, 1750)

                }, 1500)

            }, 150)

        }

    })

    $('#rB').click(function() {

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

            box.updateProgressBar();

            listener.b5 = false;

            // console.log('node.emit(stopTutoTimer) b5');
            // node.emit('stopTutoTimer');
            // timer.stop = true;

            button.hide();

            picture.hide();

            $('.frame-A').css({'transform':'scale(1)'})

            $('.facePicture').css({'filter': 'brightness(1) opacity(0.5) blur(10px) saturate(10) grayscale(1)'})

            setTimeout(()=>{
                picture.fastForward(1);
            }, 750)

            box.transition('B-5', 'B-6', 0, 0, 1, 750);

            setTimeout(()=>{
                box.button.show('B-6');
            }, 4750)

        }

        if(listener.c1) {

            listener.c1 = false;

            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c1');
            node.emit('stopTutoTimer');
            // timer.stop = true;

            button.hide(0.1);
            picture.hide(0.1);

            box.transition('', 'C-2', 0, 0, 1, 0);
            $('.frame-A').css({'margin-top':'-100px'});

            go.setText('NEXT');

            setTimeout(()=>{
                box.button.show('C-2');
            }, 2750)

            go.active = false;
            $('.transitionButtonBlocker').css({'display':'block'});
            setTimeout(()=>{
                go.show(1);
            }, 2000)

        }

        if(listener.c2) {

            listener.c2 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c2');
            node.emit('stopTutoTimer');

            // button.hide(1);
            // picture.hide(1);
            //
            // $('.frame-A').css({'opacity':'0'})
            // setTimeout(()=>{
            //     $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
            // }, 1000)
            //
            // setTimeout(()=>{
            //
            //     box.transition('', 'C-4', 0, 0, 1, 0);
            //     $('.frame-A').css({'margin-top':'-100px'});
            //     setTimeout(()=>{
            //         box.button.show('C-4');
            //     }, 1750)
            //
            // }, 1500)

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{
                go.show(0.1);
                box.transition('', 'C-31', 0, 0, 1, 0);
                listener.c3 = true;
            }, 150)

        }

        if(listener.c3) {

            listener.c3 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c3');
            node.emit('stopTutoTimer');

            button.hide(0.3);
            picture.hide(0.3);

            setTimeout(()=>{
                go.show(0.2);
                $('#box-C-31').css({'opacity':'1'});
                listener.c4 = true;
            }, 350)

        }

        if(listener.c4) {

            listener.c4 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c4');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{

                $('.frame-A').css({'opacity':'0'})
                setTimeout(()=>{
                    $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
                }, 1000)

                setTimeout(()=>{

                    box.transition('', 'C-4', 0, 0, 1, 0);
                    $('.frame-A').css({'margin-top':'-100px'});
                    setTimeout(()=>{
                        box.button.show('C-4');
                    }, 1750)

                }, 1500)

            }, 150)

        }

    })

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

    // ------------- //

    node.on('tutoTimeUp', function(key) {

        console.log('');
        console.log('TUTO TIME UP ACTIVATED');
        console.log('KEY RECEIVED: ' + key);

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

            box.updateProgressBar();

            listener.c1 = false;

            button.hide(0.1);

            picture.hide(0.1);

            box.transition('', 'C-2', 0, 0, 0, 0);
            $('.frame-A').css({'margin-top':'-100px'});

            go.setText('NEXT');

            setTimeout(()=>{
                box.button.show('C-2');
            }, 2750)

            go.active = false;
            $('.transitionButtonBlocker').css({'display':'block'});
            setTimeout(()=>{
                go.show(1);
            }, 2000)

        }

        if(key === 'c2') {

            listener.c2 = false;
            box.updateProgressBar();

            // button.hide(1);
            // picture.hide(1);
            //
            // $('.frame-A').css({'opacity':'0'})
            // setTimeout(()=>{
            //     $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
            // }, 1000)
            //
            // setTimeout(()=>{
            //
            //     box.transition('', 'C-4', 0, 0, 0, 0);
            //     $('.frame-A').css({'margin-top':'-100px'});
            //
            //     setTimeout(()=>{
            //         box.button.show('C-4');
            //     }, 2750)
            //
            // }, 2000)

            console.log('node.emit(stopTutoTimer) c2');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{
                go.show(0.1);
                box.transition('', 'C-31', 0, 0, 1, 0);
                listener.c3 = true;
            }, 150)

        }

        if(key === 'c3') {

            listener.c3 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c3');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{
                go.show(0.1);
                $('#box-C-31').css({'opacity':'1'});
                listener.c4 = true;
            }, 150)

        }

        if(key === 'c4') {

            listener.c4 = false;
            box.updateProgressBar();

            console.log('node.emit(stopTutoTimer) c4');
            node.emit('stopTutoTimer');

            button.hide(0.1);
            picture.hide(0.1);

            setTimeout(()=>{

                $('.frame-A').css({'opacity':'0'})
                setTimeout(()=>{
                    $('.frame-A').css({'transform':'scale(0)', 'margin-bottom':'-345px'})
                }, 1000)

                setTimeout(()=>{

                    box.transition('', 'C-4', 0, 0, 1, 0);
                    $('.frame-A').css({'margin-top':'-100px'});
                    setTimeout(()=>{
                        box.button.show('C-4');
                    }, 1750)

                }, 1500)

            }, 150)

        }

    })



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
