var BAG_OF_LETTERS = [
    new Letter('_', 2, 0),
    new Letter('_', 2, 0),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('A', 9, 1),
    new Letter('B', 2, 3),
    new Letter('B', 2, 3),
    new Letter('C', 2, 3),
    new Letter('C', 2, 3),
    new Letter('D', 4, 2),
    new Letter('D', 4, 2),
    new Letter('D', 4, 2),
    new Letter('D', 4, 2),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('E', 12, 1),
    new Letter('F', 2, 4),
    new Letter('F', 2, 4),
    new Letter('G', 3, 2),
    new Letter('G', 3, 2),
    new Letter('G', 3, 2),
    new Letter('H', 2, 4),
    new Letter('H', 2, 4),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('I', 9, 1),
    new Letter('J', 1, 8),
    new Letter('K', 1, 5),
    new Letter('L', 4, 1),
    new Letter('L', 4, 1),
    new Letter('L', 4, 1),
    new Letter('L', 4, 1),
    new Letter('M', 2, 3),
    new Letter('M', 2, 3),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('N', 6, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('O', 8, 1),
    new Letter('P', 2, 3),
    new Letter('P', 2, 3),
    new Letter('Q', 1, 10),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('R', 6, 1),
    new Letter('S', 4, 1),
    new Letter('S', 4, 1),
    new Letter('S', 4, 1),
    new Letter('S', 4, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('T', 6, 1),
    new Letter('U', 4, 1),
    new Letter('U', 4, 1),
    new Letter('U', 4, 1),
    new Letter('U', 4, 1),
    new Letter('V', 2, 4),
    new Letter('V', 2, 4),
    new Letter('W', 2, 4),
    new Letter('W', 2, 4),
    new Letter('X', 1, 8),
    new Letter('Y', 2, 4),
    new Letter('Y', 2, 4),
    new Letter('Z', 1, 10),
];

var YOUR_HAND = new Array();
var SCORE = 0;

function startGame() {
    addNumbersFromBag();
    displayHand();

};


function addNumbersFromBag() {
    console.log("your hand has:" + YOUR_HAND.length);
    for (var i = YOUR_HAND.length; i < 7; i++) {
        YOUR_HAND[i] = getAvailableLetter();
    }

}


function displayHand() {
    console.log("your hand has:" + YOUR_HAND.length);
    for (var i = 0; i < YOUR_HAND.length; i++) {

        console.log("#letter-" + (i + 1) + " set to " + YOUR_HAND[i].letter);
        $("#letter-" + (i + 1)).addClass("letter-" + YOUR_HAND[i].letter);
        $("#points-" + (i + 1)).addClass("points-" + YOUR_HAND[i].pointsWhenLettersUsed);


        $("#letter-" + (i + 1)).html(YOUR_HAND[i].letter);

        $("#points-" + (i + 1)).html(YOUR_HAND[i].pointsWhenLettersUsed);
    }

}


function getAvailableLetter() {
    var randomIndex = Math.floor(Math.random() * BAG_OF_LETTERS.length);
    var randomLetter = BAG_OF_LETTERS.splice(randomIndex, 1);
    console.log(randomLetter[0]);
    return randomLetter[0];
}


function findWordToUse() {
    //TODO Your job starts here.
    //alert("Your code needs to go here");
    $("#candidate-words").empty();

    var group = new Array();
    getAllGroup(YOUR_HAND, 0, group);
    //console.log(group);
    var allCandidateWords = new Array();
    for(var i=0; i < group.length; i++) {
        if(isThisAWord(group[i].word)) {
                allCandidateWords.push(group[i]);
        }
    }
    allCandidateWords = removeDuplicateWords(allCandidateWords);
    //console.log(allCandidateWords);
    //console.log(getHighestPointWord(allCandidateWords));
    var highestPointWords = getHighestPointWord(allCandidateWords);
    var highestPoint = highestPointWords[0].score;
    $('#highest-score').html("Highest score of all possible words:" + highestPoint);
    $.each(highestPointWords, function(i, val) {
        $('#candidate-words').append('<button class="candidate-word" value="' + val.word + '">'+val.word+ '</button>');
    })

    // Click button to select one candidate word from the list
    $(".candidate-word").click(function() {
        //console.log(this.value);
        if (haveLettersForWord(this.value)) {
            successfullyAddedWord(this.value);
        }
        $("#candidate-words").empty();
        $("#highest-score").empty();
    });
}


//get all possible combinations of words
function getAllGroup(data, index, group) {
    var temp = new Array();
    //temp.push(data[index].letter);
    temp.push({word: data[index].letter, score: data[index].pointsWhenLettersUsed});
    for(var i = 0; i < group.length; i++) {
        temp.push({word: group[i].word + data[index].letter, score: group[i].score + data[index].pointsWhenLettersUsed});
    }
    group.push.apply(group, temp);

    if(index + 1 >= data.length) return group;
    else return getAllGroup(data, index + 1, group);
}


// Remove duplicate words
function removeDuplicateWords(wordList) {
    for(var i=0; i < wordList.length-1;i++){
        var temp = wordList[i];
        for(var j=i+1;j < wordList.length; j++){
            if(temp.word == wordList[j].word && temp.score == wordList[j].score){
                wordList.splice(j,1);
                j--;
            }
        }
    }
    console.log(wordList);
    return wordList;
}



function getHighestPointWord(wordList) {
    // Ascending sort of scores
    wordList = wordList.sort(function(obj1,obj2) { return obj1.score - obj2.score});
    //console.log(wordList);
    var maxScore = wordList[wordList.length-1].score;
    //console.log(maxScore);
    var res = [];
    for (var i = wordList.length-1 ; i >= 0 ; i--) {
        if(wordList[i].score == maxScore) {
            res.push(wordList[i]);
        } else
            break;
    }
    return res;
}

function humanFindWordToUse() {

    var humanFoundWord = $("#human-word-input").val();
    console.log("Checking human word of:" + humanFoundWord);
    if (isThisAWord(humanFoundWord)) {
        if (haveLettersForWord(humanFoundWord)) {
            successfullyAddedWord(humanFoundWord);
        } else {
            alert(humanFoundWord + " - Do not have the letters for this word");
        }
    } else {
        alert(humanFoundWord + " is not a valid word.");
    }

}


function successfullyAddedWord(foundWord) {
    $("#word-history-list").append("<li>" + foundWord + "</li>");
    clearClasses();
    takeOutUsedLetters();
    addNumbersFromBag();
    displayHand();
    $("#human-word-input").val('');

}

function addToScore(letterToAddToScore) {
    SCORE = SCORE + letterToAddToScore.pointsWhenLettersUsed;
    console.log(letterToAddToScore.pointsWhenLettersUsed + "<-Points added for " + letterToAddToScore.letter);
    $("#score-number").html(SCORE);
}


function takeOutUsedLetters() {

    for (var ii = 0; ii < YOUR_HAND.length; ii++) {
        if (YOUR_HAND[ii].used) {
            addToScore(YOUR_HAND[ii]);
            YOUR_HAND.splice(ii, 1);
            ii = ii - 1;
        } else {
            console.log(YOUR_HAND[ii].letter + "<- Not Used");
        }
    }

}

function haveLettersForWord(aProposedWord) {
    //You could code the _ logic could go in this function
    var wordAsArray = aProposedWord.toUpperCase().split("");
    for (var i = 0; i < wordAsArray.length; i++) {
        var foundLetter = false;
        console.log(wordAsArray[i] + "<-For match");
        for (ii = 0; ii < YOUR_HAND.length; ii++) {
            console.log("              " + YOUR_HAND[ii].letter + "<-Checking");
            if (YOUR_HAND[ii].letter == wordAsArray [i]) {
                if (!YOUR_HAND[ii].used && !foundLetter) {
                    console.log("     " + YOUR_HAND[ii].letter + "<-Found");
                    YOUR_HAND[ii].used = true;
                    foundLetter = true;
                }
            }
        }


        if (!foundLetter) {
            resetHand();
            return false;
        }
    }

    return true;
}


function resetHand() {

    for (var ii = 0; ii < YOUR_HAND.length; ii++) {
        YOUR_HAND[i].used = false;
    }
}

function isThisAWord(aProposedWord) {
    if (Word_List.isInList(aProposedWord)) {
        return true;
    }
    return false;
}

function retireHand() {
    //Loose all the points in your hand
    clearClasses();
    YOUR_HAND = new Array();
    addNumbersFromBag();
    displayHand();
}

function clearClasses() {
    for (var ii = 0; ii < YOUR_HAND.length; ii++) {
        $("#letter-" + (ii + 1)).removeClass("letter-" + YOUR_HAND[ii].letter);
        $("#points-" + (ii + 1)).removeClass("points-" + YOUR_HAND[ii].pointsWhenLettersUsed);
    }
}

$(document).ready(function () {
    startGame();

    $("#find-word-button").click(function () {
        findWordToUse();
    });
    $("#human-find-word-button").click(function () {
        humanFindWordToUse();
    });
    $("#retire-hand-button").click(function () {
        retireHand();
    });
    $('#human-word-input').keypress(function (event) {
        if (event.which == 13) {
            humanFindWordToUse();
        }
    });
});