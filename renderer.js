// --- GLOBALE VARIABLEN ---
let timerInterval;
let stopwatchInterval;
let alarmTime = null;
let totalWorkSeconds = 0;
let sessionsCompleted = 0;

const alarmSound = document.getElementById('alarmSound');
const themeToggle = document.getElementById('themeToggle');

// --- THEME TOGGLE ---
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeToggle.checked);
    document.body.classList.toggle('light-mode', !themeToggle.checked);
});

// --- TIMER LOGIK ---
function startTimer() {
    if (timerInterval) return;
    let mins = parseInt(document.getElementById('timerMinutes').value) || 0;
    let secs = parseInt(document.getElementById('timerSeconds').value) || 0;
    let total = mins * 60 + secs;
    const initial = total;

    if (total <= 0) return;

    timerInterval = setInterval(() => {
        total--;
        totalWorkSeconds++;
        updateDisplay(total, document.getElementById('timerDisplay'));
        document.getElementById('timerProgress').style.width = (total / initial * 100) + "%";

        if (total <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            triggerAlarm("Fokus beendet!");
            sessionsCompleted++;
            document.getElementById('sessionsDone').textContent = sessionsCompleted;
            document.getElementById('statsSessionCount').textContent = sessionsCompleted;
            updateStats();
        }
    }, 1000);
}

function triggerAlarm(msg) {
    document.getElementById('timerStatus').textContent = msg;
    alarmSound.loop = true;
    alarmSound.play();
    document.getElementById('stopSound').classList.remove('hidden');
}

document.getElementById('stopSound').addEventListener('click', () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('stopSound').classList.add('hidden');
    document.getElementById('timerStatus').textContent = "";
});

// --- WECKER ---
function setAlarm() {
    const time = document.getElementById('alarmTime').value;
    if (!time) return;
    alarmTime = time;
    document.getElementById('alarmStatus').textContent = "Aktiv: " + alarmTime;
}

setInterval(() => {
    if (alarmTime) {
        const now = new Date();
        const current = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
        if (current === alarmTime) {
            triggerAlarm("Wecker!");
            alarmTime = null;
            document.getElementById('alarmStatus').textContent = "Inaktiv";
        }
    }
}, 1000);

// --- STOPPUHR ---
let swSecs = 0;
function startStopwatch() {
    if (stopwatchInterval) return;
    stopwatchInterval = setInterval(() => {
        swSecs += 0.01;
        const m = Math.floor(swSecs / 60);
        const s = Math.floor(swSecs % 60);
        const ms = Math.floor((swSecs % 1) * 100);
        document.getElementById('stopwatchDisplay').textContent = 
            `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${ms.toString().padStart(2,'0')}`;
    }, 10);
}

// --- TASKS ---
document.getElementById('addTask').addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value;
    if (!title) return;
    const li = document.createElement('li');
    li.className = "task-item";
    li.innerHTML = `<input type="checkbox" onchange="this.parentElement.classList.toggle('completed')"> <span>${title}</span>`;
    document.getElementById('tasks').appendChild(li);
    document.getElementById('taskTitle').value = "";
    document.getElementById('taskCount').textContent = document.getElementById('tasks').children.length;
});

// --- HELPERS ---
function updateDisplay(s, el) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateStats() {
    const h = Math.floor(totalWorkSeconds / 3600);
    const m = Math.floor((totalWorkSeconds % 3600) / 60);
    document.getElementById('totalWorkDisplay').textContent = `${h}h ${m}m`;
}

// Event-Binding
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('pauseTimer').addEventListener('click', () => { clearInterval(timerInterval); timerInterval = null; });
document.getElementById('resetTimer').addEventListener('click', () => { location.reload(); });
document.getElementById('setAlarm').addEventListener('click', setAlarm);
document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('stopStopwatch').addEventListener('click', () => { clearInterval(stopwatchInterval); stopwatchInterval = null; });
document.getElementById('resetStopwatch').addEventListener('click', () => { swSecs = 0; document.getElementById('stopwatchDisplay').textContent = "00:00.00"; });











