window.onload = function() {

    var node = parent.node;

    node.emit('HTML-startSecretSurvey2Timer');

    // retreiving dtd for memory purposes
    node.on('requestDtd-HTML', function(msg) {

        console.log('HTML: DTD RECEIVED FROM HTML ' + msg);

        decision.dtd = msg;

    })

    node.emit('HTML-requestDtd');

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
