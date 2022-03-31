var confidence = {
    text:{},
    bar:{},
    listener:{
        button:{},
    },
    data: {},
    button:{
        submit: {}
    }
}

var data = {}

// TEXT
///////.
confidence.text.update = (confidenceValue) => {

    var confidenceTextList = [
        'I have no Confidence',
        'A little bit of Confidence',
        'Low Confidence',
        'Some level of Confidence',
        'High Confidence',
        'I am certain!'
    ]

    // alternative
    var confidenceTextList = [
        'I have no confidence.',
        'I have a little bit of confidence.',
        'I have a relatively low level of confidence.',
        'I have some level of confidence.',
        'I am highly confident.',
        'I am certain.'
    ]

    var newText = confidenceTextList[confidenceValue];

    confidence.text.hide()
    setTimeout(()=>{
        confidence.text.set(newText);
        confidence.text.show();
    }, 110)

}
confidence.text.set = (val, id) => {

    if(id != undefined) {
        id = '#' + id;
    } else {
        id = '#confidence-text';
    }

    $(id).html(val);

}
confidence.text.hide = (id) => {

    if(id != undefined) {
        id = '#' + id;
    } else {
        id = '#confidence-text';
    }

    $(id).css({'transition':'0.1s', 'opacity':'0'});

}
confidence.text.show = (id) => {

    if(id != undefined) {
        id = '#' + id;
    } else {
        id = '#confidence-text';
    }

    $(id).css({'transition':'0.1s', 'opacity':'1'});

}

// BAR
//////.
confidence.bar.set = (val, id, opt) => {

    val = val === undefined ? 0 : val;
    id = id === undefined ? 'confidence-bar' : id;


    var data = [{
        x: [val],

        marker:{
            color: '#36353c',
        },
        text: [val],
        textfont: {
            // size: '50',
            // for now hide the text, we will show it for display
            size: '0',
            color:'transparent',
        },
        orientation: 'h',
        // textanchor: 'right',
        insidetextanchor: 'middle',
        textposition: 'inside',// auto?, outside, inside

        // standart setup
        name: [''],
        type: 'bar',
        sort: false,
        hoverinfo: 'none',
        automargin: true,
        showlegend: false,
        cliponaxis: false,
    }];


    var layout = {

        barmode: 'group',

        // BACKGROUND COLOR
        paper_bgcolor: 'transparent',

        // DIMENSIONS
        height: 200,
        width: 800,
        margin: {"t": 50, "b": 50, "l": 50, "r": 50},

        // RELEVANT AXIS - X
        xaxis: {
            side: 'top',
            layer: 'below traces',

            // RANGE
            fixedrange: true,
            autorange: false,
            range: [0,5],

            // TICKS
            tickfont: {
                size: 30,
                color:'black',
            },
            showticklabels: true,
            tickmode: 'array',
            tickvals: [0, 1, 2, 3, 4, 5],
            ticktext: [0, 1, 2, 3, 4, 5],
            tickangle: 0,
            ticks:'',

            // LINE
            showline: false,

            // GRID
            showgrid: true,
            gridcolor: "rgb(207, 202, 202)",
        },
        // IRRELVANT AXIS - Y
        yaxis: {
            ticks: '',
            layer: 'below traces',
            fixedrange: true,
            showline: false,
            showgrid: false,
            showticklabels: false,
        },
    }

    Plotly.react(id, data, layout, {displayModeBar: false});

}

// SLIDER -> not used in tutorial
/////////.
confidence.listener.slider =  document.getElementById('confidence-slider');
confidence.listener.slider.oninput = () => {

    // THIS IS UNNECESSARY FOR THE TUTORIAL
    var newValue = confidence.listener.slider.value;
    confidence.bar.set(newValue, 'confidence-bar');
    // confidence.text.update(newValue);
    confidence.data.update(newValue);

    // debug
    console.log('confidence is picked to be: ' + confidence.listener.slider.value);

}

// UPDATE DATA
//////////////.
confidence.data.update = (newData) => {

    data.confidence = newData;

}

// SUBMIT BUTTON
////////////////.
confidence.listener.button.submitHidden = true;
confidence.button.submit.show = () => {

    if(confidence.listener.button.submitHidden) {

        $('.confidence-button-submit-container').css({
            'transition':'0s',
            'transform':'scale(1)'
        })
        setTimeout(()=>{
            $('.confidence-button-submit-container').css({
                'transition':'0.2s',
                'opacity':'1'
            })
        }, 200)

        confidence.listener.button.submitHidden = false;

    }

}

confidence.button.submit.hide = () => {

    confidence.listener.button.submitHidden = true;

    $('.confidence-button-submit-container').css({
        'opacity':'0',
        'transform':'scale(0)'
    })

}

// redefined in main instruction js
// $('#confidence-slider').change(confidence.button.submit.show);

// HOVER OVER SLIDER ANIMATION
//////////////////////////////.
confidence.hoverActivated = false;
$('.confidence-slider-bar-container').hover(
    function() {

        // if(!confidence.hoverActivated) {
        //
        //     confidence.hoverActivated = true;
        //     $('.confidence-slider-range-text-container').css({'transition':'0.6s', 'opacity':'1'});
        //     $('.confidence-text-container-bottom').css({'transition':'0.6s', 'opacity':'0'});
        //     setTimeout(()=>{
        //         $('.confidence-text-container-bottom').css({'display':'none'});
        //     }, 750)
        //
        // }
    }

);

// SHOW / HIDE MAIN
///////////////////.
// see instruction additional helper .js

// RESET
////////.
confidence.reset = () => {

    // hide confidence button
    confidence.button.submit.hide();

    // confidence slider parameter reset
    $('#confidence-slider').val(0);
    confidence.bar.set(0, 'confidence-bar');

}

// TUTORIAL HELPERS
///////////////////-

confidence.killBottom = () => {

    $('.confidence-text-container-bottom, .confidence-button-submit-container').css({
        'display':'none'
    })

}
