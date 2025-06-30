// popup.js

// IDs for Popup Elements
const SETTINGS_BTN_ID = 'settingsBtn';
const HELP_BTN_ID = 'helpBtn';
const SITE_COUNT_ID = 'siteCount'; // Added for dynamic count
const VERSION_DISPLAY_ID = 'versionDisplay'; // Added for dynamic version

// URLs
const HELP_SUPPORT_URL = 'https://example.com/freedom-tool/support';

document.addEventListener('DOMContentLoaded', async () => { // Added async
    console.log('Popup loaded');
    
    const settingsBtn = document.getElementById(SETTINGS_BTN_ID);
    const helpBtn = document.getElementById(HELP_BTN_ID);
    const siteCountEl = document.getElementById(SITE_COUNT_ID);
    const versionDisplayEl = document.getElementById(VERSION_DISPLAY_ID);

    // Settings button is now disabled in HTML and text changed to "Manage Sites (Soon)"
    // No event listener needed for it for now.
    // if (settingsBtn) {
    //   settingsBtn.addEventListener('click', () => {
    //     // chrome.runtime.openOptionsPage(); // This would require an options page defined in manifest
    //     alert("This feature is coming soon!"); // Or simply do nothing as it's disabled
    //   });
    // }
    
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        window.open(HELP_SUPPORT_URL, '_blank');
      });
    }

    // Dynamically update site count
    if (siteCountEl) {
      try {
        const { distractingDomains } = await import(chrome.runtime.getURL('sites.js'));
        siteCountEl.textContent = distractingDomains.length;
      } catch (e) {
        console.error("[Freedom Tool] Error loading sites.js in popup:", e);
        siteCountEl.textContent = "N/A";
      }
    }

    // Dynamically update version
    if (versionDisplayEl) {
      try {
        const manifest = chrome.runtime.getManifest();
        versionDisplayEl.textContent = `Version ${manifest.version}`;
      } catch (e) {
        console.error("[Freedom Tool] Error getting manifest version:", e);
        versionDisplayEl.textContent = "Version N/A";
      }
    }
});