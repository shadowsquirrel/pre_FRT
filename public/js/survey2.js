window.onload = function() {

    var node = parent.node;

    node.emit('HTML-startSecretSurvey2Timer');

    decision.dtd = 6;

    // INTRO ANIMATION
    setTimeout(()=>{
        $('.frame-C').css({'transition':'0.5s', 'opacity':'1'});
    }, 0)
    setTimeout(()=>{
        $('.frame-C').css({'transition':'0.5s', 'opacity':'0'});
        setTimeout(()=>{
            $('.frame-A, .frame-B').css({'transition':'0.5s', 'opacity':'1'});
            setTimeout(()=>{
                $('.frame-C').css({'display':'none'});
            }, 550)
        }, 500)
    }, 2000)

    experiment.generate();

    // ----------------------- //
    // ---- SAVE DECISION ---- //
    // ----------------------- //

    decision.save = function() {

        node.emit('HTML-recordSecretSurvey2Timer');

        console.log('decision of the player');
        console.log(decision);

        // send the decision to client to save
        node.emit('HTML-survey2Results', decision);

    }


}
