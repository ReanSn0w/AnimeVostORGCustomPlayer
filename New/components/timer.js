var timerRunned = false;
var timerValue = 60;

function openSleepTimerModal() {
    RenderTimer();

    $('#timerModal').on('show.bs.modal', {})
}