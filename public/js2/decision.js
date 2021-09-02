$('.DMdeny').hover(
    function() {
        if(!decisionMade) {
            $(this).css({'filter':'contrast(2)'});
        }
    },
    function() {
        if(!decisionMade) {
            $(this).css({'filter':'contrast(1)'});
        }
    }
)

$('.DMmatch').hover(
    function() {
        if(!decisionMade) {
            $(this).css({'filter':'contrast(2)'});
        }
    },
    function() {
        if(!decisionMade) {
            $(this).css({'filter':'contrast(1)'});
        }
    }
)


var decisionMade = false;

$('.DMdeny').click(function() {

    if(!decisionMade) {

        $('.matchWrap').css({'transition':'0.2s', 'opacity':'0'});
        $('.denyWrap').css({'transition':'0.5s', 'margin-right':'-295px',
        'box-shadow': '0px 0px 0px 0px black'});

        setTimeout(()=>{
            $('.matchWrap').css({'display':'none'});
            $('.denyWrap').css({'transition':'0s', 'margin-right':'0px'});
        }, 1000)

        decisionMade = true;

        setTimeout(()=>{
            $('.confidenceSliderWrapWrap').css({'transition':'1s',
            'opacity':'1', 'transform':'scale(1)'});
        }, 1000)

    }

})

$('.DMmatch').click(function() {

    if(!decisionMade) {

        $('.denyWrap').css({'transition':'0.2s', 'opacity':'0'});
        $('.matchWrap').css({'transition':'0.5s', 'margin-left':'-295px',
        'box-shadow': '0px 0px 0px 0px black'});

        setTimeout(()=>{
            $('.denyWrap').css({'display':'none'});
            $('.matchWrap').css({'transition':'0s', 'margin-left':'0px'});
        }, 1000)

        decisionMade = true;

        setTimeout(()=>{
            $('.confidenceSliderWrapWrap').css({'transition':'1s',
            'opacity':'1', 'transform':'scale(1)'});
        }, 1000)

    }

})
