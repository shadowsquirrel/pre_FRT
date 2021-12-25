let adj = {}


adj.human = ['good', 'kind', 'trustworthy', 'bad', 'cruel', 'untrustworthy'];
adj.house = ['leaky', 'roomy', 'wooden', 'furnished', 'drafty', 'thatch'];


var shuffle = function(array) {

    var currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

    }

    return array;

}

// ---------------------------- //
// ------ GENERATE INDICES ---- //
// ---------------------------- //

var trialCounter = 1;

var stateList = undefined;
var photoListTemp = [];
var photoList = undefined;
var adjList = [Array(),Array()];
var indicesGenerated = false;

var generateIndices = function() {

    if(!indicesGenerated) {

        indicesGenerated = true;

        // GENERATE STATE INDEX LIST (one time)
        stateList = shuffle(Array(30).fill(1).concat(Array(24).fill(0)))
        stateList = Array(6).fill(0).concat(stateList);


        // GENERATE PHOTO INDEX LIST (one time)
        for(var j = 0; j < 6; j++) {
            for(var k = 0; k < 5; k++) {
                photoListTemp.push(k);
            }
        }

        var temp1 = shuffle(photoListTemp);
        // console.log(temp1);
        var temp2 = [...temp1];
        var temp2 = shuffle(temp2);
        // console.log(temp2);
        photoList = [temp1, temp2];
        // console.log(photoList);

        // GENERATE ADJ INDEX LIST (one time)
        for(var i = 0; i < 5; i++) {
            adjList[0][i] = shuffle([0,1,2,3,4,5]);
            adjList[1][i] = shuffle([0,1,2,3,4,5]);
        }

        debug();


    } else {

        // console.log('indices are already generated!');

    }

}

var debug = function() {

    //debug
    console.log('--------------------------');
    console.log('');
    console.log('statelist (icon parameter)');
    console.log(stateList);
    console.log('photolist[0] (primer photo list for house icon)');
    console.log(photoList[0]);
    console.log('photolist[1] (primer photo list for person icon)');
    console.log(photoList[1]);
    console.log('adjlist[0]');
    console.log(adjList[0]);
    console.log('adjlist[1]');
    console.log(adjList[1]);
    console.log('');
    console.log('--------------------------');

}


// ------------------------------------- //
// ------ GENERATE TRIAL PARAMETERS ---- //
// ------------------------------------- //

var trial = {
    icon: undefined,
    photo: undefined,
    adj: undefined,
}



var setCurrentTrial = function() {

    console.log();
    console.log('--------------------------------------------------');
    console.log('----------- TRIAL ' + trialCounter + ' -----------');
    console.log('--------------------------------------------------');
    console.log();

    // GET THE CURRENT STATE
    var myCurrentState = stateList.shift();

    console.log('Current State: ' + myCurrentState);

    // SET CURRENT TRIAL
    trial.icon = myCurrentState ? 'person' : 'house';
    trial.photo = photoList[myCurrentState].shift();
    trial.adj = adjList[myCurrentState][trial.photo].shift();

    console.log(trial);

    debug();

    setTimeout(()=>{
        trialCounter++;
        setCurrentTrial();
    }, 100)

}

var endOfTrials = function() {

    return stateList.length === 0

}

generateIndices();
setCurrentTrial();

// ------ PSEUDO RANDOM HAND MADE ORDER ------ //

/*
stateList = [
    1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1,
    0, 0, 0, 0, 0, 0,
    1, 0, 1, 1, 0, 0,
    1, 1, 0, 1, 0, 1,
    0, 0, 1, 0, 0, 1,
    0, 1, 0, 1, 0, 1,
    1, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 1, 1
]

// there are 4 photos plus no photo
// no photo index is 0
// for either icon (house or person) we have a random list
// at each trial the first element from the relevant list is pushed
// the pushed index is used to show the relevant photo
photoList = [

    // hidden photo primer list for houses
    [
        1, 2, 3, 2, 4, 2,
        4, 2, 0, 1, 3, 0,
        3, 2, 0, 4, 4, 1,
        2, 0, 3, 4, 3, 3,
        1, 1, 0, 4, 1, 0
    ],

    // hidden photo primer list for persons
    [
        3, 4, 2, 1, 3, 2,
        1, 4, 1, 0, 3, 0,
        0, 1, 0, 3, 2, 4,
        2, 4, 1, 2, 0, 3,
        4, 0, 1, 2, 3, 4
    ]

]

// there are 6 adjectives for house and 6 for persons
// each have their own index list of lists as below
// each list (2 of them) contains 5 lists
// each list (5 of them) represents the random ordering of the indexes for adjectives
// pushed state list is used to get the relevant list of lists
// pushed photo index is then used to get the relevant list from the picked list
// the first element from this list is pushed to be used as the adj index
// adj index is then used to get the adjective from the list of adjectives defined on top
adjList = [

    // adj list for houses for each hidden photo primer
    [
        [3, 4, 5, 2, 0, 1], // 0
        [3, 1, 5, 2, 0, 4], // 1
        [0, 4, 1, 5, 3, 2], // 2
        [1, 5, 4, 0, 2, 3], // 3
        [3, 2, 1, 0, 5, 4]  // 4
    ],

    // adj list for persons for each hidden photo primer
    [
        [1, 5, 0, 2, 3, 4], // 0
        [3, 5, 1, 0, 4, 2], // 1
        [1, 3, 2, 5, 4, 0], // 2
        [5, 2, 3, 1, 4, 0], // 3
        [3, 5, 2, 1, 4, 0]  // 4
    ]

]
*/
