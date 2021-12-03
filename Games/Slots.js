var reward = 0;
const returnRewards = {
    slot1: '1000',
    slot2: '2000',
    slot3: '5000',
    slot4: '8000',
    slot5: '10000',
    slot6: '20000',
    slot7: '50000'
}
const Icons = {
    slot1: 'grape',
    slot2: 'strawberry',
    slot3: 'pie',
    slot4: 'lemon',
    slot5: 'chest',
    slot6: 'bar',
    slot7: 'seven'
}
let selectedIcons = [];
var slot = 0;
for(var i = 0; i<=2;i++){
    slot = Math.random(1,7)
    selectedIcons.push(Icons[slot])
    slot++;
}
function Spin(){
    slot = 0;
    for(var i = 0; i<=2;i++){
        slot = Math.random(1,7)
        selectedIcons.push(Icons[slot])
    }
    return winLose(slot)
}
function winLose(slot){
    if(selectedIcons[0] == selectedIcons[1] && selectedIcons[0] == selectedIcons[2]){
        return returnRewards[slot]
    }
    else{
        return 0;
    }
}