$('.DMdeny-2').hover(
    function() {
        if(!decisionMade2) {
            $(this).css({'filter':'contrast(2)'});
        }
    },
    function() {
        if(!decisionMade2) {
            $(this).css({'filter':'contrast(1)'});
        }
    }
)

$('.DMmatch-2').hover(
    function() {
        if(!decisionMade2) {
            $(this).css({'filter':'contrast(2)'});
        }
    },
    function() {
        if(!decisionMade2) {
            $(this).css({'filter':'contrast(1)'});
        }
    }
)


var decisionMade2 = false;

$('.DMdeny-2').click(function() {

    if(!decisionMade2) {

        $('.matchWrap-2').css({'transition':'0.2s', 'opacity':'0'});
        $('.denyWrap-2').css({'transition':'0.5s', 'margin-right':'-295px',
        'box-shadow': '0px 0px 0px 0px black'});

        setTimeout(()=>{
            $('.matchWrap-2').css({'display':'none'});
            $('.denyWrap-2').css({'transition':'0s', 'margin-right':'0px'});
        }, 1000)

        decisionMade2 = true;

        setTimeout(()=>{
            $('.confidenceSliderWrapWrap-2').css({'transition':'1s',
            'opacity':'1', 'transform':'scale(1)'});
        }, 1000)

    }

})

$('.DMmatch-2').click(function() {

    if(!decisionMade2) {

        $('.denyWrap-2').css({'transition':'0.2s', 'opacity':'0'});
        $('.matchWrap-2').css({'transition':'0.5s', 'margin-left':'-295px',
        'box-shadow': '0px 0px 0px 0px black'});

        setTimeout(()=>{
            $('.denyWrap-2').css({'display':'none'});
            $('.matchWrap-2').css({'transition':'0s', 'margin-left':'0px'});
        }, 1000)

        decisionMade2 = true;

        setTimeout(()=>{
            $('.confidenceSliderWrapWrap-2').css({'transition':'1s',
            'opacity':'1', 'transform':'scale(1)'});
        }, 1000)

    }

})
