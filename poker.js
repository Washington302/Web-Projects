var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
var myDeck = makeDeck();

function makeDeck()
{
	let deck = new Array();

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
    shuffle(deck);
    shuffle(deck);
	return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (let i = 0; i < 1000; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

function startingHand(){
    let hand = [myDeck[myDeck.length], myDeck[myDeck.length - 1], myDeck[myDeck.length - 2], myDeck[myDeck.length - 3], myDeck[myDeck.length - 4]]
    myDeck.pop();
    myDeck.pop();
    myDeck.pop();
    myDeck.pop();
    myDeck.pop();
    return hand;
}

function replaceCards(hand, toReplace){
    for(let i = 0; i < hand.length; i++){
        toReplace.forEach(c => {
            if(hand[i] == c){
                hand[i] = myDeck[myDeck.length];
                myDeck.pop();
            }
        });
    }
    return hand;
}

function checkForWin(player1, player2){
    let p1Score = getHandScore(player1);
    let p2Score = getHandScore(player2);

    //check if either player has a better hand
    if(p1Score[0] > p2Score[0]){
        return 1;
    }else if(p1Score[0] < p2Score[0]){
        return 2;
    }
    //check if the high card is higher for either player
    if(p1Score[1] > p2Score[1]){
        return 1;
    }else if(p1Score[1] < p2Score[1]){
        return 2;
    }
    //check if the kicker is higher for either player
    if(p1Score[2] > p2Score[2]){
        return 1;
    }else if(p1Score[2] < p2Score[2]){
        return 2;
    }
    //check if the third highest is higher for either player
    if(p1Score[3] > p2Score[3]){
        return 1;
    }else if(p1Score[3] < p2Score[3]){
        return 2;
    }else{
        //if it is a tie down to the third card then just return that it's a tie (I cannot be bothered to go farther than this)
        return 0;
    }
}

function getHandScore(hand){
    if(checkForRFlush(hand)) {return getRFlush(hand);}
    if(checkForSFlush(hand)) {return getSFlush(hand);}
    if(checkFor4OfAKind(hand)) {return get4OfAKind(hand);}
    if(checkForFullHouse(hand)) {return getFullHouse(hand);}
    if(checkForFlush(hand)) {return getFlush(hand);}
    if(checkForStraight(hand)) {return getStraight(hand);}
    if(checkFor3OfAKind(hand)) {return get3OfAKind(hand);}
    if(checkFor2Pair(hand)) {return get2Pair(hand);}
    if(checkForPair(hand)) {return getPair(hand);}
    else {return getHigh(hand);}
}



function getRFlush (hand){
    sortHand(hand);
    return [9, hand[0].Value, hand[1].Value, hand[2].Value];
}

function getSFlush(hand){
    sortHand(hand);
    return [8, hand[0].Value, hand[1].Value, hand[2].Value];
}

function get4OfAKind(hand){
    //variables
    let temp = get3OfAKind(hand);
    let high;
    high = temp[1];
    return [6, high, -1, -1];
}

function getFullHouse(hand){
    let temp = get3OfAKind(hand);
    let temp2 = get2Pair(hand);
    let high;
    let kicker;
    high = temp[1];
    if(temp[1] == temp2[1]){
        kicker = temp2[2];
    }else{
        kicker = temp2[1];
    }
    return [6, high, kicker, -1];
}

function getFlush(hand){
    //order the hand high to low
    sortHand(hand);
    return [5, hand[0].Value, hand[1].Value, hand[2].Value];
}

function getStraight(hand){
    return [4, hand[0].Value, hand[1].Value, hand[2].Value];
}

function get3OfAKind(hand){
    //make variables
    let high;
    let kicker;
    let secondKicker;
    //order the hand high to low
    sortHand(hand);
    for(let i = 0; i < hand.length; i++){
        for(let j = 0; j < hand.length; j++){
            if(i != j){
                if(hand[i].Value == hand[j].Value){
                    for(let k = 0; k < hand.length; k++){
                        if(i != k && j != k){
                            if(hand[i].Value == hand[k].Value){
                                high = hand[i];
                            }
                        }
                    }
                }
            }
        }
    }
    if(hand[0].Value != high.Value){
        kicker = hand[0];
        if(hand[1].Value != high.Value){
            secondKicker = hand[1];
        }else{
            secondKicker = hand[4];
        }
    }else{
        kicker = hand[3];
        secondKicker = hand[4];
    }
    return [3, high, kicker, secondKicker];
}

function get2Pair(hand){
    let firstPair;
    let SecondPair;
    let kicker;

    //sort the hand highest to lowest
    sortHand(hand);
    //get the first pair
    firstPair = getPair(hand);

    //find the second pair
    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < hand.length; j++) {
            if (i != j) {
                if (hand[i].Value == hand[j].Value && hand[i].Value != firstPair[1]) {
                    secondPair = hand[i];
                }
            }
        }
    }

    //find the kicker
    hand.forEach(card => {
        if (card.Value != firstPair[1] && card.Value != secondPair.Value) {
            kicker = card;
        }
    });

    if(kicker == null){
        if(firstPair[1] > secondPair.Value) {
            return [2, firstPair[1], secondPair.Value, -1];
        }else{
            return [2, secondPair.Value, firstPair[1], -1];
        }
    }else{
        if(firstPair[1] > secondPair.Value) {
            return [2, firstPair[1], secondPair.Value, kicker.Value];
        }else{
            return [2, secondPair.Value, firstPair[1], kicker.Value];
        }
    }
}

function getPair(hand){

    //declare variables
    pair;
    kicker;
    third;

    //sort the hand highest to lowest
    sortHand(hand);
    //find the pair
    for(let i = 0; i < hand.length; i++){
        for(let j = 0; j < hand.length; j++){
            if(i != j){
                if(hand[i].Value == hand[j].Value){
                    pair = hand[i];
                }
            }
        }
    }

    //find the kicker and third highest
    if(pair.Value != hand[0].Value){
        kicker = hand[0];
        if(pair.Value != hand[1].Value) {
            third = hand[1];
        }
        else{
            third = hand[2];
        }
    }else{
        kicker = hand[2];
        third = hand[3];
    }

    return [1,pair.Value,kicker.Value,third.Value];
}

function getHigh(hand){
    sortHand(hand);
    return [0, hand[0].Value, hand[1].Value, hand[2].Value];
}

//CHECK FOR WIN CONDITION
function checkForRFlush(hand){
    return checkForSFlush(hand) && hand[1].Value == 14;
}

function checkForSFlush(hand){
    return checkForStraight(hand) && checkForFlush(hand);
}

function checkFor4OfAKind(hand){
    for(let i = 0; i < hand.length; i++){
        for(let j = 0; j < hand.length; j++){
            if(i != j){
                if(hand[i].Value == hand[j].Value){
                    for(let k = 0; k < hand.length; k++){
                        if(i != k && j != k){
                            if(hand[i].Value == hand[k].Value){
                                for(let o = 0; o < hand.length; o++){
                                    if(o != i && o != j && o != k){
                                        if(hand[i].Value == hand[o].Value){
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function checkForFullHouse(hand){
    if(checkFor3OfAKind(hand)){
        return checkFor2Pair(hand);
    }
    return false;
}

function checkForFlush(hand){
    hand.forEach(c => {
        if(!hand[0].Suit == c.Suit){
            return false;
        }
    });
    return true;
}

function checkForStraight(hand){
    sortHand(hand);

    if(hand[0].Value == 15 && hand[1].Value == 5){
        return (hand[2].Value == 4 && hand[3].Value == 3 && hand[4].Value == 2);
    }else{
        for(let i = 0; i < hand.length - 1; i++){
            if((hand[i].Value - 1) != hand[i + 1].Value){
                return false;
            }
        }
        return true;
    }
}

function checkFor3OfAKind(hand){
    for(let i = 0; i < hand.length; i++){
        for(let j = 0; j < hand.length; j++){
            if(i != j){
                if(hand[i].Value == hand[j].Value){
                    for(let k = 0; k < hand.length; k++){
                        if(i != k && j != k){
                            if(hand[i].Value == hand[k].Value){
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function checkFor2Pair(hand){
    let temp = -1;
    for(let i = 0; i < hand.length; i++){
        for(let j = 0; j < hand.length; j++){
            if(i != j){
                if(hand[i].Value == hand[j].Value){
                    temp = hand[i].Value;
                }
            }
        }
    }
    if(temp != -1) {
        for (let i = 0; i < hand.length; i++) {
            for (let j = 0; j < hand.length; j++) {
                if (i != j) {
                    if (hand[i].Value == hand[j].Value && hand[i].Value != temp) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function checkForPair(hand){
    for(let i = 0; i < hand.length; i++){
        for(let j = 0; j < hand.length; j++){
            if(i != j){
                if(hand[i].Value == hand[j].Value){
                    return true;
                }
            }
        }
    }
    return false;
}
function sortHand(hand){
    //make temp variables
    let tempA;
    let tempB;

    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < hand.length; j++) {
            //set the temp variables to the locations in the array
            tempA = hand[i];
            tempB = hand[j];
            //compare the values to see if A is greater than B
            if(tempA[3] > tempB[3]){
                //if A > B then swap them in the array
                hand[j] = tempA;
                hand[i] = tempB;
            }
        }
    }
}