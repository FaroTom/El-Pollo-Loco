let canvas;
let world;
let keyboard = new Keyboard();

let playBtnI;
let playBtnBig = true;

let sound = true;


function initStartscreen() {
    showVolume();
}


/**
 * function starts the game from start screen
 */
function startGame() {
    clearInterval(playBtnI);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('playButtons').style = '';
    bindTouchEvents();
    document.getElementById('startScreen').classList.add("d-none");
    initGame();
}


/**
 * function opens controls container at the start screen and darkens the background img
 */
function openControls() {
    document.getElementById('controls').style = '';
    document.getElementById('startScreen').style = 'background-blend-mode: darken;'
}

/**
 * resets the function above
 */
function closeControls() {
    document.getElementById('controls').style = 'display: none;'
    document.getElementById('startScreen').style = ''
}


/**
 * Initialization of the game
 */
function initGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.sound = sound;
}


/**
 * function displays correct volume setting
 */
function showVolume() {
    if (sound) {
        document.getElementById('soundBtn').src='img/own_graphics/unmute.png';
    } else {
        document.getElementById('soundBtn').src='img/own_graphics/mute.png';
    }
}


/**
 * function sets the volume and changes volume icon
 */
function turnVolume() {
    if (sound) {
        document.getElementById('soundBtn').src='img/mute.png';
        sound = false;
    } else {
        document.getElementById('soundBtn').src='img/volume-up-4-48.png';
        sound = true;
    }
}


/**
 * Keyboard Press
 */
window.addEventListener('keydown', (e) => {
    if (world.gameGoesOn) {
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (e.keyCode == 68) {
            keyboard.D = true;
        }
    }
})


/**
 * Keyboard Lift
 */
window.addEventListener('keyup', (e) => {
    if (world.gameGoesOn) {
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
        if (e.keyCode == 68) {
            keyboard.D = false;
        }
    }
})


/**
 * binds control images to keyboard
 */
function bindTouchEvents() {
    document.getElementById('left').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })
    document.getElementById('left').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })

    document.getElementById('right').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })
    document.getElementById('right').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    document.getElementById('up').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.UP = true;
    })
    document.getElementById('up').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    })

    document.getElementById('throw').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    })
    document.getElementById('throw').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    })
}


/**
 * restarts the game after it finished
 */
function restartGame() {
    resetEndscreen();
    initGame();
}


/**
 * takes player to start screen after the game
 */
function goToStartMenu() {
    resetEndscreen();
    document.getElementById('startScreen').classList.remove("d-none");
    document.getElementById('playButtons').style = 'display: none;'
    document.getElementById('canvas').classList.add('d-none')
}


/**
 * resets the endscreen
 */
function resetEndscreen() {
    document.getElementById('endScreenWin').classList.add("d-none");
    document.getElementById('endScreenLose').classList.add("d-none");
}