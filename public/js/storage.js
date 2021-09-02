node.game.cidl = [];

node.game.cidlConstructed = false;

node.game.constructCidl = function() {

    if(!node.game.cidlConstructed) {

        node.game.cidlConstructed = true;

        node.game.pl.each(function(player) {

            node.game.cidl.push({
                id: player.id,
                count: player.count,
                cpx: player.cpx,
                score: player.score
            });

            // defining player.cid()
            player.cid = function() {

                var id = player.id;
                var list = node.game.cidl;

                for(var i = 0; i < list.length; i++) {

                    var cidlPlayer = list[i];

                    if(cidlPlayer.id === player.id) {
                        return cidlPlayer.count;
                    }

                }

                console.log('Player with id ' + id + ' not found in cidl');
                console.log(cidl);

            }

            // defining player.cpxid()
            player.cpxid = function() {

                var id = player.id;
                var list = node.game.cidl;

                for(var i = 0; i < list.length; i++) {

                    var cidlPlayer = list[i];

                    if(cidlPlayer.id === player.id) {
                        return cidlPlayer.cpx;
                    }

                }

                console.log('Player with id ' + id + ' not found in cidl');
                console.log(cidl);

            }

        })

    } else {

        console.log();
        console.log('CIDL already constructed!');
        console.log();

    }

    console.log();
    console.log('--------- CIDL ---------');
    console.log();
    console.log(node.game.cidl);
    console.log();
    console.log('------------------------');

}

node.game.updateCpx = function(player, index) {

    var id = player.id;
    var list = node.game.cidl;

    var myIndex = index === undefined ? player.cpx : index;

    for(var i = 0; i < list.length; i++) {

        var cidlPlayer = list[i];

        if(cidlPlayer.id === player.id) {
            cidlPlayer.cpx = myIndex;
        }

    }


}

// -------------- //
