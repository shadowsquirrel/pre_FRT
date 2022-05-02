var node = parent.node;

var container = document.getElementById('frame-0');
node.game.myFeedback = node.widgets.append('Feedback', container, {
    feedbackOnly: true,
    verify: true,
    maxWords: 200,
    showSubmit: true,
});

node.on.data('HTML-exitCode', function(msg) {
    var exitCode = msg.data;
    console.log(exitCode);
    $('#exitCode').html(exitCode);
})

node.say('getExitCode', 'SERVER');
