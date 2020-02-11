
export function getSeconds(time){
    let secondString = "";
    var seconds = ((parseInt(time) % 60000) / 1000).toFixed(0);
    secondString = seconds;
    return secondString;
}

export function getMinutes(time){
    var minutes = Math.floor(time / 60000);
    return minutes;
}