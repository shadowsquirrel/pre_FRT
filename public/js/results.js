
window.onload = function() {

    var node = parent.node;

    node.on('results-HTML', function(msg) {

        $('#score').html(msg);

        var cents = msg * 10;
        var euros = cents / 100;

        $('#payment').html(euros);

        setTimeout(()=>{
            $('.text').css({'opacity':'1'});
        }, 500)

        setTimeout(()=>{
            $('.buttonWrap, .okInstruction').css({'opacity':'1'});
        }, 3000)

    })

    node.emit('HTML-results');

    $('#doneWithResults').click(function() {

        node.emit('HTML-endResults');

    })

}
