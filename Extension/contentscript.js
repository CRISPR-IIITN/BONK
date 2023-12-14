function openNewTab(url) {
    window.open(url, '_blank');
}

// contentScript.js

// Add your script logic here
console.log('Content script executed on the specific URL (https://192.168.55.253:1003/keepalive)');

openNewTab('https://pcmag.speedtestcustom.com/');



