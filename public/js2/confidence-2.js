var updateConfidenceText2 = function(val) {

    var text = [
        'I have no idea',
        'A little bit of Confidence',
        'Low Confidence',
        'Some level of Confidence',
        'High Confidence',
        'I am certain!'
    ]


    $('.confidenceSliderText-2').css({'transition':'0.1s', 'opacity':'0'});
    setTimeout(()=>{
        $('#confidenceText-2').html(text[val]);
        $('.confidenceSliderText-2').css({'transition':'0.1s', 'opacity':'1'});
    }, 110)

}


var confidenceBar2 = function(e, barId) {

    var y = e;
    if(typeof(x) === 'undefined') x = 0;

    var upperBound, myTickVal, myTickText, myRange;

    var colorArrays = Array(2);
    var insideTextColor = Array(2);

    colorArrays = ['rgb(60, 60, 60)', 'rgb(210, 210, 210)'];
    upperBound = 742;
    myTickVal = [0, 1, 2, 3, 4, 5];
    myTickText = [0, 1, 2, 3, 4, 5];
    myRange = [0, 5];
    insideTextColor = ['white', 'black'];

    axisOn = true;


    colorArrays = ['rgb(255,255,0)', 'rgb(225,247,0)', 'rgb(195,235,0)', 'rgb(165,227,0)', 'rgb(90,219,0)'];

    if(y > 0) {
        cIndex = y-1;
    } else {
        cIndex = 0;
    }


    updateConfidenceText2(y);


    var mColor = colorArrays[cIndex];

    $('.confidenceSliderOKButton-2').css({'background-color':mColor})

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


confidenceSlider2 = document.getElementById('confidenceSlider-2');

confidenceSlider2.oninput = function() {

    // get the value from the slider
    efo = parseFloat(confidenceSlider2.value);

    // update bar plot
    confidenceBar2(efo, 'confidenceBar-2');

}

var sliderOKbuttonIsHidden2 = true;
$('.confidenceSlider-2').change(function(){

    setTimeout(()=>{

        if(sliderOKbuttonIsHidden2) {
            $('.finalSubmitButtonWrap').css({'transition':'0.5s',
            'transform':'scale(1)', 'opacity':'1'})
            sliderOKbuttonIsHidden2 = false;
        }

    }, 3000)

});




confidenceBar2(0, 'confidenceBar-2');
setTimeout(()=>{
    $('#confidenceText-2').html('State your Confidence Level');
}, 200)
