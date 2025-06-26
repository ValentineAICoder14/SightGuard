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
    
    // Enhanced domain matching
    const isDistracting = distractingDomains.some(domain => {
      const domainPattern = domain.replace('.', '\\.');
      const regex = new RegExp(`(^|\\.)${domainPattern}($|\\/)`, 'i');
      return regex.test(currentUrl);
    });

    console.log(`[Freedom Tool] Is distracting site? ${isDistracting}`);
    
    if (!isDistracting) {
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