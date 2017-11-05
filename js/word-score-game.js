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

/**
 * Start the game
 */
function startGame() {
    addNumbersFromBag();
    displayHand();

};

/**
 * Pick letters from the bag
 */
function addNumbersFromBag() {
    console.log("your hand has:" + YOUR_HAND.length);
    var totalNumberOfCards = YOUR_HAND.length + BAG_OF_LETTERS.length;
    if (totalNumberOfCards >= 7) {
        for (var i = YOUR_HAND.length; i < 7; i++) {
            YOUR_HAND[i] = getAvailableLetter();
        }
    } else {
        for (var i = YOUR_HAND.length; i < totalNumberOfCards; i++) {
            YOUR_HAND[i] = getAvailableLetter();
        }
    }
}

/**
 * Display letters in hand
 */
function displayHand() {
    console.log("your hand has:" + YOUR_HAND.length);
    console.log("No. of letters in the bag: " + BAG_OF_LETTERS.length);
    $("#letters-you-have-box").empty();
    for (var i = 0; i < YOUR_HAND.length; i++) {
        console.log("#letter-" + (i + 1) + " set to " + YOUR_HAND[i].letter);
        $('#letters-you-have-box').append("<div class='tile-piece'><p class='letter' id='#letter->" + (i + 1) + "'>"
            + YOUR_HAND[i].letter + "</p><p class='point' id='#points-" + (i + 1) + "'>" + YOUR_HAND[i].pointsWhenLettersUsed + "</p>")
    }
}


/**
 * Get available letters
 * @returns {*}
 */
function getAvailableLetter() {
    var randomIndex = Math.floor(Math.random() * BAG_OF_LETTERS.length);
    var randomLetter = BAG_OF_LETTERS.splice(randomIndex, 1);
    console.log(randomLetter[0]);
    return randomLetter[0];
}


/**
 * Machine finds words to use, called when the button is clicked
 */
function findWordToUse() {

    if (YOUR_HAND.length === 0) {
        alert("No cards in your hand");
    } else {
        $("#candidate-words").empty();
        var group = new Array();
        // Get all combinations of words by using cards in hand
        getAllGroup(YOUR_HAND, 0, group);
        var allCandidateWords = new Array();
        for (var i = 0; i < group.length; i++) {
            if (isThisAWord(group[i].word)) {
                allCandidateWords.push(group[i]);
            }
        }
        // If no words can be found in the given letters
        if (allCandidateWords.length === 0) {
            alert("No words can be found");
        } else {
            allCandidateWords = removeDuplicateWords(allCandidateWords);
            //console.log(allCandidateWords);
            //console.log(getHighestPointWord(allCandidateWords));
            var highestPointWords = getHighestPointWord(allCandidateWords);
            var highestPoint = highestPointWords[0].score;
            $('#highest-score').html("All candidate words with the highest score " + highestPoint + ":");
            $.each(highestPointWords, function (i, val) {
                $('#candidate-words').append('<button class="candidate-word btn btn-info" value="' + val.word + '">' + val.word + '</button>');
            })

            // Click button to select one candidate word from the list
            $(".candidate-word").click(function () {
                //console.log(this.value);
                if (haveLettersForWord(this.value)) {
                    successfullyAddedWord(this.value);
                }
                $("#candidate-words").empty();
                $("#highest-score").empty();
            });
        }
    }


}

/**
 * Get all possible combinations of letters
 * @param data
 * @param index
 * @param group
 * @returns {*}
 */
function getAllGroup(data, index, group) {
    var temp = new Array();
    //temp.push(data[index].letter);
    temp.push({word: data[index].letter, score: data[index].pointsWhenLettersUsed});
    for (var i = 0; i < group.length; i++) {
        temp.push({
            word: group[i].word + data[index].letter,
            score: group[i].score + data[index].pointsWhenLettersUsed
        });
    }
    group.push.apply(group, temp);

    if (index + 1 >= data.length) return group;
    else return getAllGroup(data, index + 1, group);
}


/**
 * Remove duplicate words in the lists
 * @param wordList
 * @returns {*}
 */
function removeDuplicateWords(wordList) {
    for (var i = 0; i < wordList.length - 1; i++) {
        var temp = wordList[i];
        for (var j = i + 1; j < wordList.length; j++) {
            if (temp.word == wordList[j].word && temp.score == wordList[j].score) {
                wordList.splice(j, 1);
                j--;
            }
        }
    }
    //console.log(wordList);
    return wordList;
}


/**
 * Get the word with the highest score from candidate words
 * @param wordList
 * @returns {Array}
 */
function getHighestPointWord(wordList) {
    // Ascending sort of scores
    wordList = wordList.sort(function (obj1, obj2) {
        return obj1.score - obj2.score
    });
    //console.log(wordList);
    var maxScore = wordList[wordList.length - 1].score;
    //console.log(maxScore);
    var res = [];
    for (var i = wordList.length - 1; i >= 0; i--) {
        if (wordList[i].score == maxScore) {
            res.push(wordList[i]);
        } else
            break;
    }
    return res;
}

/**
 * User input a word and check
 */
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

/**
 * Successfully added a word
 * @param foundWord
 */
function successfullyAddedWord(foundWord) {
    $("#word-history-list").append("<li>" + foundWord + "</li>");
    //clearClasses();
    takeOutUsedLetters();
    addNumbersFromBag();
    displayHand();
    $("#human-word-input").val('');

}

/**
 * Add up to the total score
 * @param letterToAddToScore
 */
function addToScore(letterToAddToScore) {
    SCORE = SCORE + letterToAddToScore.pointsWhenLettersUsed;
    console.log(letterToAddToScore.pointsWhenLettersUsed + "<-Points added for " + letterToAddToScore.letter);
    $("#score-number").html(SCORE);
}


/**
 * Remove the letters that are used
 */
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

/**
 * Check if the letters in the proposed word are in the cards in hand
 * @param aProposedWord
 * @returns {boolean}
 */
function haveLettersForWord(aProposedWord) {
    //You could code the _ logic could go in this function
    var wordAsArray = aProposedWord.toUpperCase().split("");
    for (var i = 0; i < wordAsArray.length; i++) {
        var foundLetter = false;
        console.log(wordAsArray[i] + "<-For match");
        for (var ii = 0; ii < YOUR_HAND.length; ii++) {
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

/**
 * Rest the used status of words
 */
function resetHand() {
    for (var ii = 0; ii < YOUR_HAND.length; ii++) {
        YOUR_HAND[i].used = false;
    }
}

/**
 * Check if the given word is a word in list. _ logic is written here.
 * @param aProposedWord
 * @returns {boolean}
 */
function isThisAWord(aProposedWord) {
    // If there is "_" in the word
    if (aProposedWord.indexOf("_") > -1) {
        console.log("There is _ in the word");
        // Function isRegexMatch(word) is added in the wordList.js to check word with "_" by using regular expression
        if (Word_List.isRegexMatch(aProposedWord)) {
            return true;
        }
    } else {
        if (Word_List.isInList(aProposedWord)) {
            return true;
        }
    }
    return false;

}

/**
 * Retire hand
 */
function retireHand() {
    //Loose all the points in your hand
    //clearClasses();
    YOUR_HAND = new Array();
    addNumbersFromBag();
    displayHand();
    // Check whether the game is finished
    if (isGameFinished()) {
        endGame();
    }
}

// function clearClasses() {
//     for (var ii = 0; ii < YOUR_HAND.length; ii++) {
//         $("#letter-" + (ii + 1)).removeClass("letter-" + YOUR_HAND[ii].letter);
//         $("#points-" + (ii + 1)).removeClass("points-" + YOUR_HAND[ii].pointsWhenLettersUsed);
//     }
// }

/**
 * Check whether all the cards are used up
 * @returns {boolean}
 */
function isGameFinished() {
    if (YOUR_HAND.length + BAG_OF_LETTERS.length == 0) {
        return true;
    } else
        return false;
}

/**
 * End the game and show the game over container, can restart the game by clicking the btn
 */
function endGame() {
    alert("Game over");
    $("#mainContainer").hide();
    var html = "<h1>Game Over</h1>" + "<h3>Your total score: " + $("#score-number").html() + "</h3><button class='btn btn-primary' id='play-again'>Play Again</button>";
    $("#game-over").html(html);
    $("#game-over").show();
    $("#play-again").click(function () {
        window.location.reload();
    })
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