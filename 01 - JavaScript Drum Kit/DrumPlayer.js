//Button functionality

function buttonClicked(id) {
    console.log("Button was clicked!");
    console.log("Button ID:", id);

    const button = document.getElementById(id);
    if (!button) return

    if (button.classList.contains('playing')){
        button.classList.remove('playing');
        console.log("Removing 'clicked' class from button:", id);
    }
    else {
        button.classList.add('playing');
        console.log("Adding 'clicked' class to button:", id);
    }
}

//Playbar functionality

const playbar = document.getElementById('progress-bar');
let TrackRunning = false;
window.addEventListener('keydown', playbarStateToggle);
let playbarInterval = null;

function playbarStateToggle(event) {
    if (event.keyCode === 32) { // Space key
        event.preventDefault(); // Prevent default space key behavior (aka scrolling)

        if (TrackRunning) {
            TrackRunning = !TrackRunning;
            console.log("Stopping track...");
            stopTrack();
        }
        else {
            TrackRunning = !TrackRunning;
            console.log("Starting track...");
            startTrack();
        }
    }
}

function startTrack() {
    const playbar = document.getElementById('progress-bar');
    if (playbarInterval) return; // Prevent multiple intervals
    playbarInterval = setInterval(() => {

        note = checkNoteHits(); // Check for note hits at each interval
        playNote(note); // Play the note if it exists

        let pbCurrentPosition = Number(playbar.value);
        if (pbCurrentPosition < playbar.max) {
            playbar.value = pbCurrentPosition + 1;
        } 
        else {
            playbar.value = playbar.min; // Reset to min when max is reached
        }
    }, 35);
}

function checkNoteHits() {
    const playbar = document.getElementById('progress-bar');
    if (playbar.value % 9 < 0.9) {
        //console.log("Hit a note at position:", playbar.value);
        const noteId = `${playbar.value / 9}`;
        console.log("Note ID to play:", noteId);
        return noteId;
    }
}

function playNote(noteId) {
    const clap = document.getElementById(`clap-${noteId}`);
    const hihat = document.getElementById(`hihat-${noteId}`);
    const kick = document.getElementById(`kick-${noteId}`);
    const openhat = document.getElementById(`openhat-${noteId}`);
    const snare = document.getElementById(`snare-${noteId}`);
    const notes = [clap, hihat, kick, openhat, snare];

    notes.forEach(note => {
        if (note && note.classList.contains('playing')) {
            console.log(note.classList);
            const audio = document.querySelector(`audio[data-key="${note.getAttribute('data-key')}"]`);
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }   
        }
    });
}

function stopTrack() {
    clearInterval(playbarInterval);
    playbarInterval = null;
}

