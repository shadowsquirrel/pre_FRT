var node = parent.node;
var W = parent.W;
W.adjustFrameHeight();

var button = {
    s1: {},
    s2: {},
    s3: {},
}

var decision = {

}

button.s1.div = W.gid('session-1');
button.s2.div = W.gid('session-2');
button.s3.div = W.gid('session-3');

button.s1.div.onclick = function() {

    decision.session = 1;

    node.say('pickSession-LOGIC', 'SERVER', decision.session);

    node.done();

}

button.s2.div.onclick = function() {

    decision.session = 2;

    node.say('pickSession-LOGIC', 'SERVER', decision.session);

    node.done();

}

button.s3.div.onclick = function() {

    decision.session = 3;

    node.say('pickSession-LOGIC', 'SERVER', decision.session);

    node.done();

}
