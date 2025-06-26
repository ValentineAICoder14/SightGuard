// popup.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup loaded');
    
    document.getElementById('settingsBtn').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
    
    document.getElementById('helpBtn').addEventListener('click', () => {
      window.open('https://example.com/freedom-tool/support', '_blank');
    });
  });