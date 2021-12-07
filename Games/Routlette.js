const row1 = {
    1: 1,
    2: 4,
    3: 7,
    4: 10,
    5: 13,
    6: 16,
    7: 19,
    8: 22,
    9: 25,
    10: 28,
    11: 31,
    12: 34
};
const row2 = {
    1: 2,
    2: 5,
    3: 8,
    4: 11,
    5: 14,
    6: 17,
    7: 20,
    8: 23,
    9: 26,
    10: 29,
    11: 32,
    12: 35
};
const row3 = {
    1: 3,
    2: 6,
    3: 9,
    4: 12,
    5: 15,
    6: 18,
    7: 21,
    8: 24,
    9: 27,
    10: 30,
    11: 33,
    12: 36
};
function Spin(selectedNums, splitOrExact, bet, odd, even, red, black, first12, second12, third12){
var hitNum = Math.random(1,36)
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