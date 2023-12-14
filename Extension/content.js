function clickGoButton() {
    // Find the "GO" button
    var goButton = document.querySelector('.button.background-primary-hover.text-primary');

    if (goButton) {
        // Click the button
        goButton.click();
    }
}

// Set an interval to click the "GO" button every 2 seconds
setInterval(clickGoButton, 2000);
