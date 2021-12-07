var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
var myDeck = makeDeck();

let dealer;

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

function InIt(){
    //add the starting cards to the dealers hand
    dealer.push(deck[deck.length]);
    deck.pop();
    dealer.push(deck[deck.length]);
    deck.pop();
}

function hit(playerHand){
    playerHand.push(deck[deck.length]);
    deck.pop();
    if(getTotal(playerHand) >= 22) {findAce(playerHand);}
    return playerHand;
}

function dealerTurn(){
    let quit = (getTotal(dealer.getHand()) > 17);
    while(!quit)
    {
        dealer.addToHand(myDeck.drawCard());

        let currentTotal = getTotal(dealer.getHand());
        if(currentTotal > 21) {
            if(!findAce(dealer.getHand())) {
                quit = true;
            }
            currentTotal = getTotal(dealer.getHand());
        }
        if(currentTotal >= 17) {quit = true;}
    }
}

//find the total of a players hand
function getTotal(hand){
    let total = 0;
    hand.forEach(element => {
        if(element.Value === "K" || element.Value === "Q" || element.Value === "J"){
            total += 10;
        }
        if(element.Value === "A"){
            total += 11;
        }
        else if(element.Value === "D"){
            total += 1;
        }
        else {
            total += element.Value;
        }
    });
    return total;
}

//check to see if there is an Ace in the players hand, if there is replaced it with a Dead Ace (worth 1 instead of 11)
function findAce(hand){
    hand.forEach(element => {
        if(element.Value === "A"){
            element.Value = "D";
            return true;
        }
    });
    return false;
}

//Takes in a player's hand and a dealer's hand and compares them to see if the player wins
function findWinners(player){
    //possible outcome
        // 1 - Player win
        // 2 - Player lose/dealer win
        // 3 - Player blackjack (1.5* bet winnings)
        // 4 - Draw (money pushback)

    //temp data
    let playerHand = getTotal(player);
    let dealerHand = getTotal(dealer);

    //check is player is over 21
    if(playerHand >= 22){
        //you can instantly leave since nothing else matters at this point
        console.log("Player Bust");
        //return player lose
        return 2;
    }

    //check if player has a nat 21/blackjack
    if((player.size() == 2 && playerHand == 21) && (dealer.getHandSize() != 2 || dealerHand != 21)){
        console.log("Player Blackjack");
        //return Player win 1.5*
        return 3;
    }

    //check if dealer has a nat 21/blackjack
    if((dealer.getHandSize() == 2 && dealerHand == 21) && (player.size() != 2 || playerHand != 21)){
        console.log("Dealer Blackjack");
        //return playerLose
        return 2;
    }

    //check if tie
    if(playerHand == dealerHand){
        //at this point you can leave since it is a draw
        console.log("Draw");
        //return money pushed back
        return 4;
    }

    //check if the dealer is over 21 if he is and the player isnt player wins
    if(dealerHand >= 22 && playerHand <= 21){
        console.log("Dealer Bust");
        //return player win
        return 1;
    }

    //check is player had is greater than the dealers and less than 21
    if(playerHand > dealerHand){
        console.log("Player Wins");
        //return player win
        return 1;
    }else{
        console.log("Dealer Wins");
        //return player lose
        return 2;
    }
}