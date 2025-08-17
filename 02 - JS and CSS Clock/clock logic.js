// This script will handle the clock logic
// It will get the current time and update the clock hands accordingly
function getHours(){
    let hour = new Date().getHours();
    return hour;
}
function getMinutes(){
    let minit = new Date().getMinutes();
    return minit;
}
function getSeconds(){
    let second = new Date().getSeconds();
    return second;
}

let offset = 90; // Offset for the initial rotation of the hands

// Set an interval to update the clock every second
setInterval(() => {
    // Get the current time
    let hour = getHours(); 
    let minit = getMinutes();
    let second = getSeconds();
    console.log(`The current time is ${hour}:${minit}:${second}`);

    //Get reference to the clock hands
    let secondHand = document.querySelector(".hand.second-hand");
    let minHand = document.querySelector(".hand.min-hand");
    let hourHand = document.querySelector(".hand.hour-hand");
    
    // Calculate the rotation for each hand
    let secondRotation = second * 6 + offset;
    let minRotation = (minit * 6) + (second / 60) * 6 + offset;
    let hourRotation = (hour * 30) + (minit / 60) * 30 + offset;

    // Apply styling for each hand
    secondHand.style.transformOrigin = "100%";
    secondHand.style.transform = `rotate(${secondRotation}deg)`;

    minHand.style.transformOrigin = "100%";
    minHand.style.transform = `rotate(${minRotation}deg)`;

    hourHand.style.transformOrigin = "100%";
    hourHand.style.transform = `rotate(${hourRotation}deg)`;

    
}, 1000);