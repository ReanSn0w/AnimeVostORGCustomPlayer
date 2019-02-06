var player
var cleanId

function PlayerjsEvents(event,id,info){
    if(event=="stop"){
        player.api("next");
        player.api("play");
    }
    if(event=="pause"){
        stateSaver();
    }
 }

 function loadState() {
    var cookie = localStorage.getItem(cleanId);
    if (cookie == undefined) {
        stateSaver().then();
        return
    }

    var num = cookie["num"];
    var second = cookie["second"];

    player.api(find, num);
    player.api(seek, second);
    stateSaver().then();
 }

async function stateSaver() {
    for (i=true; i; i=true) {
        //Подготовка объекта для cookie
        var obj = {
            num: player.api("playlist_id"),
            second: player.api("second"),
        };
        localStorage.setItem(cleanId, obj);
    }
 }