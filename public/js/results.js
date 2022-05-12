
// window.onload = function() {

    var node = parent.node;
    var W = parent.W;
    W.adjustFrameHeight();

    $('.buttonWrap, .okInstruction').css({'transition':'0s', 'transform':'scale(0)'});

    var s2m = (s) => {

        console.log('seconds received ', s);

        var m = s / 60;
        m = shorten(m, 2);

        console.log('minutes returned ', m);

        return m;

    }

    var shorten = (number, precision) => {
        if(number != undefined) {
            return parseFloat((number).toFixed(precision));
        } else {
            return 'N/A';
        }
    }

    node.on('results-HTML', function(msg) {

        console.log('data received from PLAYER.JS');
        console.table(msg);

        $('#score').html(msg.score);
        $('#total').html(msg.total);
        $('#base').html(msg.pPay);
        $('#payment').html(msg.bPay);
        $('#correct').html(msg.score);
        $('#rate').html(msg.bRate);
        $('#totalPay').html(msg.tPay);

        var tutoTime = s2m(msg.tutoTime);
        var expTime = s2m(msg.expTime);
        var s0Time = s2m(msg.s0Time);
        var s1Time = s2m(msg.s1Time);
        var s2Time = s2m(msg.s2Time);
        var sTotalTime = s0Time + s1Time + s2Time;
        var totalTime = tutoTime + expTime + sTotalTime;

        $('#tutoTime').html(tutoTime);
        $('#expTime').html(expTime);
        $('#s1s2Time').html(sTotalTime);
        $('#s0Time').html(s0Time);
        $('#s1Time').html(s1Time);
        $('#s2Time').html(s2Time);
        $('#totalTime').html(totalTime);

        var hourlyWage = shorten(((msg.tPay / totalTime) * 60), 1);

        $('#hourlyWage').html(hourlyWage);


        setTimeout(()=>{
            $('.text').css({'opacity':'1'});
        }, 500)

        setTimeout(()=>{
            $('.buttonWrap, .okInstruction').css({'transform':'scale(1)', 'opacity':'0'});
        }, 1000)
        setTimeout(()=>{
            $('.buttonWrap, .okInstruction').css({'transition':'2s', 'opacity':'1'});
            W.adjustFrameHeight();
        }, 3000)

    })

    node.emit('HTML-results');

    node.emit('HTML-calculateBonus');

    $('#doneWithResults').click(function() {

        node.emit('HTML-endResults');

    })


    $('.textPayment').hover(
        function() {
            $('.hiddenPaymentContainer').css({'transform':'scaleY(1)'});
        },
        function() {
            $('.hiddenPaymentContainer').css({'transform':'scaleY(0)'});
        }
    )

    $('.textTime').hover(
        function() {
            $('.hiddenTimeSpentContainer').css({'transform':'scaleY(1)'});
        },
        function() {
            $('.hiddenTimeSpentContainer').css({'transform':'scaleY(0)'});
        }
    )

// }
