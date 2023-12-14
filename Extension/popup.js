document.addEventListener('DOMContentLoaded', function() {
    var speedTestButton = document.getElementById('speedTestButton');
    var crisprServerButton = document.getElementById('crisprServerButton');

    speedTestButton.addEventListener('click', function() {
        openNewTab('https://pcmag.speedtestcustom.com/');
    });

    crisprServerButton.addEventListener('click', function() {
        openNewTab('http://192.168.77.84/FileRun/#/HOME');
    });
});

function openNewTab(url) {
    window.open(url, '_blank');
}
