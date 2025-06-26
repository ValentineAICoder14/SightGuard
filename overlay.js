// overlay.js
console.log('[Freedom Tool] Overlay module loaded');

// CSS styles with !important for maximum priority
const overlayStyles = `
  #distraction-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0,0,0,0.95) !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    color: white !important;
    font-family: system-ui, sans-serif !important;
    backdrop-filter: blur(5px) !important;
  }
  
  #main-modal {
    background: #1a1a1a !important;
    padding: 2rem !important;
    border-radius: 12px !important;
    max-width: 400px !important;
    width: 90% !important;
    text-align: center !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
    animation: fadeIn 0.3s ease-out !important;
  }
  
  .modal-content {
    display: none;
    background: #1a1a1a !important;
    padding: 2rem !important;
    border-radius: 12px !important;
    max-width: 400px !important;
    width: 90% !important;
    text-align: center !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
    animation: fadeIn 0.3s ease-out !important;
  }
  
  .distraction-title {
    font-size: 1.8rem !important;
    margin-bottom: 1rem !important;
    font-weight: 600 !important;
  }
  
  .distraction-message {
    font-size: 1.1rem !important;
    margin-bottom: 1.5rem !important;
    line-height: 1.5 !important;
  }
  
  .distraction-buttons {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 12px !important;
    margin-top: 20px !important;
  }
  
  .distraction-btn {
    padding: 0.8rem 1.2rem !important;
    border: none !important;
    border-radius: 8px !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    transition: all 0.2s !important;
    transform: scale(1);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
    min-width: 120px !important;
  }
  
  .distraction-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3) !important;
  }
  
  .distraction-btn:active {
    animation: buttonClick 0.3s ease !important;
  }
  
  #pray-btn {
    background: #4CAF50 !important;
    color: white !important;
  }
  
  #leave-btn {
    background: #F44336 !important;
    color: white !important;
  }
  
  #continue-btn {
    background: #2196F3 !important;
    color: white !important;
  }
  
  .back-btn {
    background: #9C27B0 !important;
    color: white !important;
  }
  
  .modal-btn {
    background: #4CAF50 !important;
    color: white !important;
  }
  
  #distraction-toast {
    position: fixed !important;
    bottom: 20px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    background: #333 !important;
    color: white !important;
    padding: 12px 24px !important;
    border-radius: 8px !important;
    opacity: 0 !important;
    transition: opacity 0.3s !important;
    z-index: 2147483647 !important;
    font-size: 1rem !important;
    max-width: 90% !important;
    text-align: center !important;
  }
  
  .toast-visible {
    opacity: 1 !important;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes buttonClick {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }
`;

export function injectStyles() {
  if (document.getElementById('freedom-tool-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'freedom-tool-styles';
  style.textContent = overlayStyles;
  
  // Insert at top of head to override site styles
  document.head.insertBefore(style, document.head.firstChild);
}

export function createOverlay() {
  // Remove existing overlay if any
  const existingOverlay = document.getElementById('distraction-overlay');
  if (existingOverlay) existingOverlay.remove();
  
  const overlay = document.createElement('div');
  overlay.id = 'distraction-overlay';
  
  overlay.innerHTML = `
    <div id="main-modal">
      <h1 class="distraction-title">Stay Focused</h1>
      <p class="distraction-message">
        This site might distract you from your goals. Take a moment to reconsider.
      </p>
      <div class="distraction-buttons">
        <button id="pray-btn" class="distraction-btn">🙏 Pray</button>
        <button id="leave-btn" class="distraction-btn">🚪 Leave</button>
        <button id="continue-btn" class="distraction-btn">😞 Continue</button>
      </div>
    </div>
    
    <div id="pray-modal" class="modal-content">
      <h1 class="distraction-title">Take a Moment to Pray</h1>
      <p class="distraction-message" id="prayer-text"></p>
      <div class="distraction-buttons">
        <button id="pray-back-btn" class="distraction-btn back-btn">Back</button>
        <button id="bible-btn" class="distraction-btn modal-btn">Continue to Bible</button>
      </div>
    </div>
    
    <div id="continue-modal" class="modal-content">
      <h1 class="distraction-title">Are You Sure?</h1>
      <p class="distraction-message">
        Continuing to this site may distract you from your goals. Are you certain you want to proceed?
      </p>
      <div class="distraction-buttons">
        <button id="continue-back-btn" class="distraction-btn back-btn">Back</button>
        <button id="confirm-continue-btn" class="distraction-btn modal-btn">Yes, Continue</button>
      </div>
    </div>
    
    <div id="distraction-toast"></div>
  `;
  
  // Use direct DOM insertion at the root level
  document.documentElement.appendChild(overlay);
  
  // Lock scrolling on both html and body elements
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  
  return overlay;
}

export function showModal(modalId) {
  console.log(`[Freedom Tool] Showing modal: ${modalId}`);
  
  // Hide all modals
  document.querySelectorAll('.modal-content').forEach(modal => {
    modal.style.display = 'none';
  });
  
  // Hide main modal
  document.getElementById('main-modal').style.display = 'none';
  
  // Show requested modal
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
  }
}

export function showMainModal() {
  console.log('[Freedom Tool] Showing main modal');
  
  // Hide all modals
  document.querySelectorAll('.modal-content').forEach(modal => {
    modal.style.display = 'none';
  });
  
  // Show main modal
  document.getElementById('main-modal').style.display = 'block';
}

export function removeOverlay() {
  console.log('[Freedom Tool] Removing overlay');
  const overlay = document.getElementById('distraction-overlay');
  if (overlay) overlay.remove();
  
  // Restore scrolling
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

export function showToast(message, duration = 3000) {
  console.log(`[Freedom Tool] Showing toast: ${message}`);
  let toast = document.getElementById('distraction-toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('toast-visible');
  
  setTimeout(() => {
    toast.classList.remove('toast-visible');
  }, duration);
}