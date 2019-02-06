var player

function PlayerjsEvents(event,id,info){
    if(event=="stop"){
        alert(event);
        player.api("next");
        player.api("play");
    }
    if(event="playlist"){
        loadState();
        stateSaver();
    }
 }

 function loadState() {}

 function stateSaver() {}