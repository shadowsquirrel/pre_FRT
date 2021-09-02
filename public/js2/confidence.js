var updateConfidenceText = function(val) {

    var text = [
        'I have no idea',
        'A little bit of Confidence',
        'Low Confidence',
        'Some level of Confidence',
        'High Confidence',
        'I am certain!'
    ]


    $('.confidenceSliderText').css({'transition':'0.1s', 'opacity':'0'});
    setTimeout(()=>{
        $('#confidenceText').html(text[val]);
        $('.confidenceSliderText').css({'transition':'0.1s', 'opacity':'1'});
    }, 110)

}


var confidenceBar = function(e, barId) {

    var y = e;
    if(typeof(x) === 'undefined') x = 0;

    var upperBound, myTickVal, myTickText, myRange;

    var colorArrays = Array(2);
    var insideTextColor = Array(2);

    colorArrays = ['rgb(60, 60, 60)', 'rgb(210, 210, 210)'];
    upperBound = 742;
    myTickVal = [0, 1, 2, 3, 4, 5];
    myTickText = [0, 1, 2, 3, 4, 5];
    // myTickText = ['No Idea', 'Somewhat sure', 'Sure', '3', '4','Certain']
    myRange = [0, 5];
    insideTextColor = ['white', 'black'];

    axisOn = true;


    colorArrays = ['rgb(255,255,0)', 'rgb(225,247,0)', 'rgb(195,235,0)', 'rgb(165,227,0)', 'rgb(90,219,0)'];

    if(y > 0) {
        cIndex = y-1;
    } else {
        cIndex = 0;
    }


    updateConfidenceText(y);


    var mColor = colorArrays[cIndex];

    $('.confidenceSliderOKButton').css({'background-color':mColor})

    var mytextpos = 'outside';
    // mytextpos = 'inside';

    var somecolor = 'black';


    var data = [{
        x: [y],
        name: [''],
        type: 'bar',
        sort: false,
        hoverinfo: 'none',
        automargin: true,
        showlegend: false,
        cliponaxis: false,
        marker:{
            color: mColor,
        },
        text: [y],
        textfont: {
            size: '0',
            color:'transparent',
        },
        orientation: 'h',
        // textanchor: 'right',
        textposition: mytextpos,
    }];

    var ticktextcolor = 'white';

    var papercolor = 'black';

    var layout = {
        // paper_bgcolor: 'rgb(80,80,80)',
        paper_bgcolor: 'black',
        barmode: 'group',
        height: 75,
        width: 487.5,
        margin: {"t": 20, "b": 20, "l": 25, "r": 27},
        xaxis: {
            side: 'top',
            fixedrange: true,
            autorange: false,
            range: myRange,
            layer: 'below traces',
            tickfont: {
                size: 15,
                color:ticktextcolor,
            },
            tickmode: 'array',
            tickvals: myTickVal,
            ticktext: myTickText,
            tickangle: 0,
            ticks:'',
            showline: false,
            showgrid: axisOn,
            showticklabels: axisOn,
            gridcolor: "rgb(207, 202, 202)",
        },
        yaxis: {
            ticks: '',
            layer: 'below traces',
            fixedrange: true,
            showline: false,
            showgrid: false,
            showticklabels: false,
        },
    }

    Plotly.react(barId, data, layout, {displayModeBar: false});

}


confidenceSlider = document.getElementById('confidenceSlider-1');

var confidenceDecisionMade = false;

confidenceSlider.oninput = function() {

    if(!confidenceDecisionMade) {

        // get the value from the slider
        efo = parseFloat(confidenceSlider.value);

        // update bar plot
        confidenceBar(efo, 'confidenceBar-1');

    }

}

var sliderOKbuttonIsHidden = true;
$('.confidenceSlider').change(function(){

    setTimeout(()=>{

        if(sliderOKbuttonIsHidden) {
            $('.confidenceSliderOKButton').css({'transition':'0.5s', 'transform':'scale(1)'})
            sliderOKbuttonIsHidden = false;
            setTimeout(()=>{
                $('.confidenceSliderOKButton').css({'transition':'0.1s'})
            }, 500)
        }

    }, 3000)

});

$('.confidenceSliderOKButton').click(function() {

    $('.decisionWrap').css({'transition':'1s', 'opacity':'0'});

    confidenceDecisionMade = true;

    setTimeout(()=>{

        $(this).css({'transition':'0.5s', 'transform':'scale(0)'});
        $('.confidenceSliderWrapWrap').css({'transition':'1s', 'background':'transparent'});
        $('.confidenceSliderText').css({'transition':'1s', 'fill':'black',
        'font-weight':'700', 'font-size':'40px'});

        $('.decisionButtonsWrap').css({'transform':'scale(1.5)',
        'margin-top':'55px', 'margin-bottom':'55px'})

        $('.decisionWrap').appendTo('.madeDecision');
        $('.madeDecision').css({'display':'block'});

        setTimeout(()=>{

            $('.decisionWrap').css({'transition':'1s', 'opacity':'1'});
            $('.madeDecision').css({'transition':'1s', 'opacity':'1'});

            setTimeout(()=>{

                $('#showAIDecisionButton').css({'transition':'1s',
                'transform':'scale(1)', 'opacity':'1'});

            }, 1000)

        }, 1000)

    }, 1000)

})


confidenceBar(0, 'confidenceBar-1');
setTimeout(()=>{
    $('#confidenceText').html('State your Confidence Level');
}, 200)


// ----------------------------- AI CONFIDENCE ------------------------------ //
var updateConfidenceTextAI = function(val) {

    var text = [
        'I have no idea',
        'A little bit of Confidence',
        'Low Confidence',
        'Some level of Confidence',
        'High Confidence',
        'I am certain!'
    ]


    $('.confidenceSliderText-AI').css({'transition':'0.1s', 'opacity':'0'});
    setTimeout(()=>{
        $('#confidenceText-AI').html(text[val]);
        $('.confidenceSliderText-AI').css({'transition':'0.1s', 'opacity':'1'});
    }, 110)

}


var confidenceBarAI = function(e, barId) {

    var y = e;
    if(typeof(x) === 'undefined') x = 0;

    var upperBound, myTickVal, myTickText, myRange;

    var colorArrays = Array(2);
    var insideTextColor = Array(2);

    colorArrays = ['rgb(60, 60, 60)', 'rgb(210, 210, 210)'];
    upperBound = 742;
    myTickVal = [0, 1, 2, 3, 4, 5];
    myTickText = [0, 1, 2, 3, 4, 5];
    // myTickText = ['No Idea', 'Somewhat sure', 'Sure', '3', '4','Certain']
    myRange = [0, 5];
    insideTextColor = ['white', 'black'];

    axisOn = true;


    colorArrays = ['rgb(255,255,0)', 'rgb(225,247,0)', 'rgb(195,235,0)', 'rgb(165,227,0)', 'rgb(90,219,0)'];

    if(y > 0) {
        cIndex = y-1;
    } else {
        cIndex = 0;
    }


    updateConfidenceTextAI(y);


    var mColor = colorArrays[cIndex];

    var mytextpos = 'outside';
    // mytextpos = 'inside';

    var somecolor = 'black';


    var data = [{
        x: [y],
        name: [''],
        type: 'bar',
        sort: false,
        hoverinfo: 'none',
        automargin: true,
        showlegend: false,
        cliponaxis: false,
        marker:{
            color: mColor,
        },
        text: [y],
        textfont: {
            size: '0',
            color:'transparent',
        },
        orientation: 'h',
        // textanchor: 'right',
        textposition: mytextpos,
    }];

    var ticktextcolor = 'white';

    var papercolor = 'black';

    var layout = {
        // paper_bgcolor: 'rgb(80,80,80)',
        paper_bgcolor: 'black',
        barmode: 'group',
        height: 75,
        width: 487.5,
        margin: {"t": 20, "b": 20, "l": 25, "r": 27},
        xaxis: {
            side: 'top',
            fixedrange: true,
            autorange: false,
            range: myRange,
            layer: 'below traces',
            tickfont: {
                size: 15,
                color:ticktextcolor,
            },
            tickmode: 'array',
            tickvals: myTickVal,
            ticktext: myTickText,
            tickangle: 0,
            ticks:'',
            showline: false,
            showgrid: axisOn,
            showticklabels: axisOn,
            gridcolor: "rgb(207, 202, 202)",
        },
        yaxis: {
            ticks: '',
            layer: 'below traces',
            fixedrange: true,
            showline: false,
            showgrid: false,
            showticklabels: false,
        },
    }

    Plotly.react(barId, data, layout, {displayModeBar: false});

}

var randomConfidence = Math.floor(6 * Math.random());
confidenceBarAI(randomConfidence, 'confidenceBar-AI');
