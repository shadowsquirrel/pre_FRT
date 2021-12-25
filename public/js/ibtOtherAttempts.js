// ------------ PLAYER JS ORIENTED VERSION ------------- //


// node.on('hide-photoPrimer', function() {
//
//     $(primerPhoto).css({'z-index':'0'});
//
//
//     time.hidePhoto = Date.now();
//
//     var elapsed = time.hidePhoto-time.showPhoto;
//     console.log('Time spent hide show: ' + elapsed);
//
//
//
//     // if(trial.icon === 'person') {
//     //     $('.string-p').css({'z-index':'1'});
//     // } else {
//     //     $('.string-h').css({'z-index':'1'});
//     // }
//
//
// })








// ------------------------ //
// -------- PHOTOS -------- //
// ------------------------ //

// show photo calls within
// -hide photo
// -show letter
// -dPhoto: duration of photo  - default 20
// -dIcon: duration of icon/letter - default 250
// -dAdjective: duration of adjective/max decision time
show.photo = function() {

    $(primerPhotoDiv).css({'z-index':'1'});

    setTimeout(()=>{
        hide.photo()
        show.icon();
    }, photoDuration)

}

// hide photos
// calculate/save photo display duration
// called by show.photo()
hide.photo = function() {

    setTimeout(()=>{

    $(primerPhoto).css({'z-index':'0'});

    // record hide time of the photo primer
    time.hidePhoto = Date.now();

    // calculate the total time the photo primer is shown
    var elapsed = time.hidePhoto-time.showPhoto;
    console.log('Time spent hide show: ' + elapsed);

})

}


// ------------ //
// --- ICON --- //
// ------------ //

// called by show.photo with a tiny delay
// -calls set.adjective()
// -with a small delay after calling set.adjective sets answergiven to false
// -calls hide.icons and show.adjective with delay dIcon
show.icon = function() {

    // hide icon
    // show adjective
    // start answer timer
    setTimeout(()=>{

        // hide icon
        $('.primer-string').css({'z-index':'0'});

        // show adjective
        $('.text-wrap-column').css({'z-index':'1'});

        // start answer countdown
        node.emit('start-ibt-answerCountdown');

    }, iconDuration)

}













// retreiving IBT order from CLIENT -> LOGIC
node.on('request-IBT-trial-HTML', function(msg) {

    console.log('HTML: IBT ORDER RECEIVED FROM HTML');
    console.log(msg);

    trial = msg;

    initializeParameters();

    // record show time of the photo primer
    time.showPhoto = Date.now();

    // show primer photo
    $(primerPhotoDiv).css({'z-index':'1'});

    // ~ ~ ~ ~ ~ ~ with photoDuration delay ~ ~ ~ ~ ~ ~ //
    setTimeout(()=>{

        // ----------------------------------- //

        // hide photo primer
        $(primerPhoto).css({'z-index':'0'});

        // record hide time of the photo primer
        time.hidePhoto = Date.now();

        // ----------------------------------- //

        // show icon primer

        $(iconPhotoDiv).css({'z-index':'1'});

        // ----------------------------------- //

        // ~ ~ ~ ~ ~ ~ with iconDuration delay ~ ~ ~ ~ ~ ~ //
        // hide icon
        // show adjective
        // start answer timer
        setTimeout(()=>{

            // hide icon
            $('.primer-string').css({'z-index':'0'});

            // show adjective
            $('.text-wrap-column').css({'z-index':'1'});

            // start answer countdown
            node.emit('start-ibt-answerCountdown');

        }, iconDuration)

        // ----------------------------------- //

    }, photoDuration)


    // node.emit('showHide-photoPrimer');
    // primerPhoto = '.photo-' + trial.photo;
    // $(primerPhoto).css({'z-index':'1'});

    var elapsed = time.hidePhoto-time.showPhoto;
    console.log('Time spent hide show: ' + elapsed);


})
