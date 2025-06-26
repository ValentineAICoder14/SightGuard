// background.js
console.log('[Freedom Tool] Background service worker started');

// Keep service worker alive
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Freedom Tool] Extension installed');
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Freedom Tool] Message received:', message);
  
  if (message.type === 'log') {
    console.log(`[Freedom Tool] Content script log: ${message.text}`);
  }
  
  return true;
});