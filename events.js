var player
var cleanId

function PlayerjsEvents(event,id,info){
    //Обработка событий плеера
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
    //Подготовка объекта для cookie
    var obj = {
        num: player.api("playlist_id"),
        second: player.api("second"),
    };
    //Сохранение объекта
    localStorage.setItem(cleanId, obj);
    //Рекурсивный отложенный запуск
    setTimeout(stateSaver().then, 30000);
 }