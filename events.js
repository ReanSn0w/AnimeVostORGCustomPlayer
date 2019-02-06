var player
var cleanId

function PlayerjsEvents(event,id,info){
    if(event=="stop"){
        player.api("next");
        player.api("play");
    }
 }

 function loadState() {
    var cookie = getCookie(cleanId);
    if (cookie == undefined) {
        stateSaver();
        return
    }

    var num = cookie["num"];
    var second = cookie["second"];

    player.api(find, num);
    player.api(seek, second);
    stateSaver();
 }

async function stateSaver() {
    for (i=true; i; i=true) {
        //Сон перед сохранением позиции
        sleep(15000);
        //Подготовка объекта для cookie
        var obj = {
            num: player.api("playlist_id"),
            second: player.api("second"),
        };
        //Удаление старой куки
        var date = new Date(0);
        document.cookie = cleanId + "=; path=/; expires=" + date.toUTCString();
        //Запись новой
        document.cookie = cleanId + "=" + obj
    }
 }

 function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

//Ебаный косталь для sleep
function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
 } 