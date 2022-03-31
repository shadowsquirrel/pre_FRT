box.updateProgressBar();

// change this for different buttons
button.hide(0);

frame.image.min();

confidence.reset();

confidence.killBottom();

frame.slider.pullBottom();

box.transition('B-5', 'B-501', 0, 0, 1, 750);

frame.slider.show();




box.transition('', 'B-501', 0, 0, 1, 750);

setTimeout(()=>{
    box.button.show('B-501');
}, 4750)
