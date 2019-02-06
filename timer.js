async function timer() {
    var obj = document.getElementById("timervalue");
    var time = obj.value;
    if (time <= 0) {
        player.api("pause");
        return
    }
    time--;
    obj.value = time;
    setTimeout(timer, 5000);
    return
}