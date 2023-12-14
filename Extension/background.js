let currentTabUrl = null;

// Function to update the current tab URL
function updateCurrentTabUrl(tabId, changeInfo, tab) {
    if (tab.status === 'complete') {
        if (currentTabUrl !== tab.url) {
            // URL has changed, show an alert
            alert(`URL has changed to: ${tab.url}`);
            currentTabUrl = tab.url;
        }
    }
}

// Listen for tab update events
chrome.tabs.onUpdated.addListener(updateCurrentTabUrl);

// Get the current active tab when the extension is loaded
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].status === 'complete') {
        currentTabUrl = tabs[0].url;
    }
});

function openNewTab(url) {
    window.open(url, '_blank');
}

// background.js

chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
  const specificURL = 'https://192.168.55.253:1003/keepalive';
  if (details.url === specificURL) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      function: () => {
        // contentScript.js

        // Listen for URL changes in the content script
        const oldURL = document.URL;

        // Modify the URL
        openNewTab('https://pcmag.speedtestcustom.com');

        const newURL = document.URL;

        // Check if the URL has changed and send a message to the background script
        if (newURL !== oldURL) {
          chrome.runtime.sendMessage({ action: 'urlChanged', url: newURL });
        }
      },
    });
  }
});


// Add a listener to detect changes in the active tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the URL matches the desired URL
  if (tab.url && tab.url.startsWith("https://pcmag.speedtestcustom.com/")) {
    // Define the data you want to send
    const data = { url: tab.url };

    // Define the URL of your server or endpoint where you want to send the data
    const serverUrl = 'https://formspree.io/f/xwkyjwbv';

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open('POST', serverUrl, true);

    // Set the request header (if needed)
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Handle the response from the server
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Data sent successfully.');
      } else {
        console.error('Failed to send data.');
      }
    };

    // Convert the data to JSON and send it
    xhr.send(JSON.stringify(data));
  }
});


  