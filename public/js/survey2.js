window.onload = function() {

    var node = parent.node;

    node.emit('HTML-startSecretSurvey2Timer');

    // retreiving dtd for memory purposes
    // node.on('requestDtd-HTML', function(msg) {
    //
    //     console.log('HTML: DTD RECEIVED FROM HTML ' + msg);
    //
    //     decision.dtd = msg;
    //
    // })
    //
    // node.emit('HTML-requestDtd');

    decision.dtd = 6;

    // INTRO ANIMATION
    setTimeout(()=>{
        $('.frame-C').css({'opacity':'1'});
    }, 1000)
    setTimeout(()=>{
        $('.frame-C').css({'opacity':'0'});
        setTimeout(()=>{
            $('.frame-A, .frame-B').css({'opacity':'1'});
            setTimeout(()=>{
                $('.frame-C').css({'display':'none'});
            }, 300)
        }, 750)
    }, 5000)

    experiment.generate();

    // ----------------------- //
    // ---- SAVE DECISION ---- //
    // ----------------------- //

    decision.save = function() {

        node.emit('HTML-recordSecretSurvey2Timer');

        console.log('decision of the player');
        console.log(decision);

        // $('.all').css({'transition':'0.5s', 'opacity':'0'});

        // send the decision to client to save
        node.emit('HTML-survey2Results', decision);

    }


}
