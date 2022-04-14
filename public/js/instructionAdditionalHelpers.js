var frame = {
    image: {},
    slider: {}
}

frame.image.min = () => {

    $('.frame-image').css({
        'transition':'0.5s',
        'transform-origin':'top',
        'transform':'scale(0.4)',
        'margin-bottom':'-240px'
    })

}
frame.image.max = () => {

    $('.frame-image').css({
        'transition':'0s',
        'transform':'scale(1)',
        'margin-bottom':'0'
    })

}
frame.slider.show = () => {

    $('.frame-slider').css({
        'display':'flex'
    });
    setTimeout(()=>{
        $('.frame-slider').css({
            'transition':'0.1s',
            'opacity':'1'
        })
    }, 50);

}
frame.slider.hide = () => {

    $('.frame-slider').css({
        'transition':'0.1s',
        'opacity':'0'
    })
    setTimeout(()=>{
        $('.frame-slider').css({
            'display':'none'
        });
    }, 150);

}

frame.slider.pullBottom = () => {

    $('.frame-slider').css({
        'transition':'0.1s',
        'margin-bottom':'-145px'
    })

}

frame.allHide = () => {
    $('.all').css({
        'transition':'0.1s',
        'opacity':'0'
    })
}
frame.allShow = () => {
    $('.all').css({
        'transition':'0.2s',
        'opacity':'1'
    })
}
