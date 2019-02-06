function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function checkIfNum(a) {
    if (a == " "){
        return false;
    }
    if (a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 6 || a == 7 || a == 8 || a == 9 || a == 0) {
        return true;
    }
    return false
}

function getIdFromURL(url) {
    var lastslash = 0;
    var id = false;
    for (i=0; i<url.length; i++) {
        if (url[i] == "/") {
            lastslash = i;
        }
    }
    var lastnum = 0
    for (i=lastslash+1; i<url.length; i++) {
        if (checkIfNum(url[i])) {
            lastnum = i
        }else{
            break;
        }
    }
    cleanId = url.substring(lastslash+1, lastnum+1)
    return url.substring(lastslash+1, lastnum+1)
}

function getPlaylistById(id) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://api.animevost.org/v1/playlist", false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    body = "id=" + id;
    request.send(body);
    if (request.status != 200) {
        alert("Произошла ошибка загрузки плейлиста");
    }
    return request.responseText
}

function getNumber(str) {
    var pos = "";
    for (i=0; i<str.length; i++) {
        if (checkIfNum(str[i])) {
            pos += str[i];
        }
    }
    return pos
}

function resort(item1, item2) {
    var num1 = getNumber(item1["name"]);
    var num2 = getNumber(item2["name"]);
    return parseInt(num1) > parseInt(num2)
}

function rebuildPlaylist(pl) {
    var old = JSON.parse(pl);
    var res = new Array();
    old.sort(resort)
    for (i=0; i<old.length; i++) {
        res.push(
            {
                title: old[i]["name"],
                poster: old[i]["preview"],
                file: "[SD]" + old[i]["std"] + ",[HD]" + old[i]["hd"],
            }
        );
    };
    return res
}

function playlist() {
    var id = getIdFromURL(getParameterByName("url"));
    if (id == "" || id == null || id == undefined) {
        alert("Введи ссылку в поле наверху и нажми Enter")
        return
    }
    var pl = getPlaylistById(id);
    playlist = rebuildPlaylist(pl);
    player = new Playerjs({id:"player", file: playlist});
    loadState();
}

document.onload(
    playlist()
);