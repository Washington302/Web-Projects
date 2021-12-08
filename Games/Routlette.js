const row1 = [
    1,
    4,
    7,
    10,
    13,
    16,
    19,
    22,
    25,
    28,
    31,
    34
];
const row2 = [
    2,
    5,
    8,
    11,
    14,
    17,
    20,
    23,
    26,
    29,
    32,
    35
];
const row3 = [
    3,
    6,
    9,
    12,
    15,
    18,
    21,
    24,
    27,
    30,
    33,
    36
];
function Spin(selectedNums, splitOrExact, bet, odd, even, red, black, first12, second12, third12){
var hitNum = Math.Floor(Math.random()*(36 - 1) +1)
var reward = winCheck(hitNum, selectedNums, splitOrExact, bet, odd, even, red, black, first12, second12, third12)
return reward
}
function winCheck(hittingNum, selectedNums, splitOrExact, bet, odd, even, red, black, first12, second12, third12){
    var rewards = 0;
        for(var i = 0;i<=selectedNums.length;i++){
            //Single and Split Hits
            if(hittingNum == selectedNums[i]){
                if(splitOrExact[i] == 0){
                    rewards += bet[i]*17;
                }
                else if(splitOrExact[i] ==2){
                    rewards += bet[i]*8;
                }
                else{
                    rewards += bet[i]*35;
                }
            }
            //Column
            row1.forEach(element => {
                if(selectedNums[i] == element){
                    bet[i] = bet[i]*2;
                }
            });
            row2.forEach(element =>{
                if(selectedNums[i] == element){
                    bet[i] = bet[i]*2;
                }
            });
            row3.forEach(element =>{
                if(selectedNums[i] == element){
                    bet[i] = bet[i]*2;
                }
            })
            if(hittingNum % 2 ==1){
                if(even != 0){
                    rewards += even;
                }
                if(black != 0){
                    rewards += black;
                }
            }
            else{
                if(odd != 0){
                    rewards += odd;
                }
                if(red != 0){
                    rewards += red;
                }
            }
            if(first12 != 0){
                if(hittingNum <=12 && selectedNums[i] <= 12){
                    rewards += first12;
                }
            }
            else if(second12 !=0){
                if(hittingNum > 12 && hittingNum <=24){
                    if(selectedNums[i]> 12 && selectedNums[i] <=24){
                        rewards += second12;
                    }
                }
            }
            else if(third12 != 0){
                if(hittingNum >24 && selectedNums[i] > 24){
                    rewards += third12;
                }
            }
            if(hittingNum <= 18 && selectedNums[i] <= 18){
                rewards += bet[i];
            }
            else if(hittingNum >=18 && selectedNums[i] >=18){
                rewards += bet[i];
            }
        }
        return rewards;
}
