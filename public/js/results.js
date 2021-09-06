

window.onload = function() {

    var node = parent.node;

    node.on('results-HTML', function(msg) {

        $('#score').html(msg);

        setTimeout(()=>{
            $('.text').css({'opacity':'1'});
        }, 500)

    })

    node.emit('HTML-results');

}
