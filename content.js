// content.js
console.log('[Freedom Tool] Content script loaded');

let initialized = false;

async function initFreedomTool() {
  if (initialized) return;
  initialized = true;
  
  console.log('[Freedom Tool] Initializing');

  try {
    // Import modules
    const { distractingDomains } = await import(chrome.runtime.getURL('sites.js'));
    const { injectStyles, createOverlay } = await import(chrome.runtime.getURL('overlay.js'));
    const { handlePray, handleLeave, handleContinue, setupEventListeners } = await import(chrome.runtime.getURL('actions.js'));

    // Check current URL
    const currentUrl = window.location.href;
    console.log(`[Freedom Tool] Current URL: ${currentUrl}`);

    function isUrlDistracting(url, domains) {
      if (!domains || domains.length === 0) {
        return false;
      }
      return domains.some(domain => {
        // Ensure domain is a string and not empty
        if (typeof domain !== 'string' || domain.trim() === '') {
          return false;
        }
        try {
          // Escape special characters in the domain for regex
          const domainPattern = domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          // Match domain at the start of hostname or preceded by a dot (for subdomains)
          // and followed by a slash, query parameter, hash, or end of string.
          const regex = new RegExp(`(^|\\.)${domainPattern}($|\\/|\\?|#)`, 'i');
          // Use URL object to robustly get hostname
          const hostname = new URL(url).hostname;
          return regex.test(hostname);
        } catch (e) {
          // If domain is invalid and causes URL constructor to fail or other error
          console.warn(`[Freedom Tool] Invalid domain or URL processing error for domain "${domain}" and URL "${url}":`, e);
          return false;
        }
      });
    }
    
    const isDistractingSite = isUrlDistracting(currentUrl, distractingDomains);

    console.log(`[Freedom Tool] Is distracting site? ${isDistractingSite}`);
    
    if (!isDistractingSite) {
      console.log('[Freedom Tool] Site not in blocked list');
      return;
    }

    console.log('[Freedom Tool] Setting up overlay');
    
    // Wait for body to be available
    const bodyCheck = setInterval(() => {
      if (document.body) {
        clearInterval(bodyCheck);
        console.log('[Freedom Tool] Body available, injecting overlay');
        
        injectStyles();
        const overlay = createOverlay();
        
        // Setup all event listeners after overlay is created
        setupEventListeners();
      }
    }, 100);
  } catch (error) {
    console.error('[Freedom Tool] Initialization error:', error);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFreedomTool);
} else {
  initFreedomTool();
}

// Also run on SPA navigation changes
window.addEventListener('load', initFreedomTool);