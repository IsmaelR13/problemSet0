const btn = document.querySelector('.custom-button'); // btn is our "fake" button

// Write your code here
// Add a class of "hover" to the button when the mouse is over it
//      Hint: Use the mouseover and mouseout events

// Add a class of "active" to the button when the user presses the mouse down on it
// If the user's mouse is released while it is over the button, "flash" the button by calling flashClicked(btn)
//      Hint: Use the mousedown and mouseup events


// If the user's mouse leaves the button while the mouse is pressed down, remove the "active" class
// If the user's mouse comes back over the button while the mouse is **still** pressed down, add the "active" class
//     Hint: Use the mouseout and mouseover events (again)
//     Hint: You will need to use a variable to keep track of whether the mouse is pressed down or not


let mousePressedDown = false;
let insideButton = false;
/**
 * Call this function when you want to "flash" the button --- when it is clicked
 * 
 * @param {*} element The element that we want to "flash"
 */
function flashClicked(element) {
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 300);
}

// Give the "real" button a flash effect
const realButton = document.querySelector('button');
realButton.addEventListener('click', () => {
    flashClicked(realButton);
});

btn.addEventListener('click', () => {
    
    flashClicked(btn);
});

btn.addEventListener('mouseover', () => {
    // Add the 'hover' class to the button when mouse is over it
    btn.classList.add('hover');
    // If the mouse is pressed down and hovering over the button, add the 'active' class
    if(mousePressedDown) {
        btn.classList.add('active');
    }
    insideButton = true;
});



// Add an event listener for the 'mouseout' event on the button
btn.addEventListener('mouseout', () => {
    // Remove the 'hover' class when mouse is no longer hovering over the button
    btn.classList.remove('hover');
    // If the mouse was pressed down when leaving the button, remove the 'active' class
    
    if(mousePressedDown) {
        btn.classList.remove('active');
    }
    insideButton = false;
});

// Add an event listener for the 'mousedown' event on the button
btn.addEventListener('mousedown', () => {
    // Add the 'active' class when the mouse button is pressed down on the button
    btn.classList.add('active');
    // Set the flag to true indicating that the mouse button is pressed down
    mousePressedDown = true;
});

// Add an event listener for the 'mouseup' event on the window
window.addEventListener('mouseup', (mousD) => {
    // Remove the 'active' class when the mouse button is released
    btn.classList.remove('active');
    // If the button was clicked while the mouse button was pressed down, call the 'flashClicked' function
    if(insideButton) {
        flashClicked(btn);
    }
    // Reset the flag to false indicating that the mouse button is no longer pressed down
    mousePressedDown = false;
});