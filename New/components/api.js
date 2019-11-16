var lastTitles = [];
var player;

function getPageType() {
    let search = getParameterByName('search');
    if (search != null) {
        return "search";
    }
    let id = getParameterByName('id');
    if (id != null) {
        return "title";     
    }
    return "last";
}

function loadPage() {
    let type = getPageType();
    if (type == "search") {
        loadSearchTitles();
        return
    }
    if (type == "title") {
        loadOneTitle();
        return
    }
    loadLastTitles();
}

// MARK: - Работа с сетью

function loadPlaylist() {
    let body = "id=" + getParameterByName("id");

    var req = new XMLHttpRequest();

    req.open("POST", "https://api.animevost.org/v1/playlist", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    
    req.onload = function() {
        let playlist = rebuildPlaylist(req.response);
        setupPlayer(playlist);
    };

    req.onerror = function() {
        alert("Загрузка не удалась");
    };

    req.send(body);
}

function loadOneTitle() {
    let body = "id=" + encodeURIComponent(getParameterByName("id"));

    var req = new XMLHttpRequest();

    req.open("POST", "https://api.animevost.org/v1/info", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    
    req.onload = function() {
        unpackLastTitles(req.response);
    };

    req.onerror = function() {
        alert("Загрузка не удалась");
    };

    req.send(body);
}

function loadLastTitles() {
    var req = new XMLHttpRequest();
    
    req.open("GET", "https://api.animevost.org/v1/last?page=" + (lastTitles.length / 20 + 1) + "&quantity=20", true);

    req.onload = function() {
        unpackLastTitles(req.response);
    };

    req.onerror = function() {
        alert("Загрузка не удалась");
    };

    req.send();
}

function loadSearchTitles() {
    let body = "name=" + encodeURIComponent(getParameterByName('search')); 

    var req = new XMLHttpRequest();
    
    req.open("POST", "https://api.animevost.org/v1/search", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 

    req.onload = function() {
        unpackLastTitles(req.response);
    };

    req.onerror = function() {
        alert("Загрузка не удалась");
    };

    req.send(body);
}

function unpackLastTitles(resp) {
    if (resp != null) {
        var newTitles = JSON.parse(resp);

        for (i=0; i<newTitles.data.length; i++) {
            lastTitles.push(newTitles.data[i]);
        };
    }

    let id = getParameterByName('id');
    if (id != null) {
        SetTitle();
        loadPlaylist();
        return    
    }

    RenderList();
}

// MARK: - Извлечение не тривиальных данных из объекта

function titleName(name) {
    let first = name.split(" /");
    return first[0]
}

function titleOriginalName(name) {
    let first = name.split(" /");
    let second = first[1].split(" [");
    return second[0]
}

function seriesFromTitle(name) {
    let first = name.split(" /");
    let second = first[1].split(" [");
    return second[1].substring(0, second[1].length - 1)
}


// MARK: - Работа с плеером

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

function setupPlayer(playlist) {
    player = new Playerjs({id:"web-player", file: playlist});
}

// MARK: - Сортировка плейлиста

function resort(item1, item2) {
    var num1 = getNumber(item1["name"]);
    var num2 = getNumber(item2["name"]);
    return parseInt(num1) - parseInt(num2)
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

function checkIfNum(a) {
    if (a == " "){
        return false;
    }
    if (a == 1 || a == 2 || a == 3 || a == 4 || a == 5 || a == 6 || a == 7 || a == 8 || a == 9 || a == 0) {
        return true;
    }
    return false
}

// MARK: - some funcs from StackOverFlow

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}