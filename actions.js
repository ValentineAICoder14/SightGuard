// actions.js
console.log('[Freedom Tool] Actions module loaded');

import { removeOverlay, showModal, showMainModal, showToast } from './overlay.js';

// Prayer database
const PRAYERS = [
  "Lord, guide my heart and mind today. Amen.",
  "Heavenly Father, help me use this time wisely. Amen.",
  "Jesus, be with me in this moment. Amen.",
  "God, grant me focus and discipline. Amen.",
  "Holy Spirit, fill me with your peace. Amen."
];

// Setup all event listeners
export function setupEventListeners() {
  console.log('[Freedom Tool] Setting up event listeners');
  
  // Main modal buttons
  document.getElementById('pray-btn')?.addEventListener('click', handlePray);
  document.getElementById('leave-btn')?.addEventListener('click', handleLeave);
  document.getElementById('continue-btn')?.addEventListener('click', handleContinue);
  
  // Prayer modal buttons
  document.getElementById('pray-back-btn')?.addEventListener('click', () => {
    console.log('[Freedom Tool] Pray back button clicked');
    showMainModal();
  });
  
  document.getElementById('bible-btn')?.addEventListener('click', () => {
    console.log('[Freedom Tool] Bible button clicked');
    removeOverlay();
    window.location.href = "https://bible.com/random";
  });
  
  // Continue modal buttons
  document.getElementById('continue-back-btn')?.addEventListener('click', () => {
    console.log('[Freedom Tool] Continue back button clicked');
    showMainModal();
  });
  
  document.getElementById('confirm-continue-btn')?.addEventListener('click', () => {
    console.log('[Freedom Tool] Confirm continue button clicked');
    removeOverlay();
    showToast("Stay mindful of your time! ⏳", 2000);
  });
}

/**
 * Handles the pray action - shows random prayer
 */
export function handlePray() {
  console.log('[Freedom Tool] Handling pray action');
  const randomPrayer = PRAYERS[Math.floor(Math.random() * PRAYERS.length)];
  
  // Set prayer text
  const prayerText = document.getElementById('prayer-text');
  if (prayerText) {
    prayerText.textContent = randomPrayer;
  }
  
  // Show prayer modal
  showModal('pray-modal');
}

/**
 * Handles leaving the distracting site
 */
export function handleLeave() {
  console.log('[Freedom Tool] Handling leave action');
  showToast("Proud of you for walking away! 🙌");
  
  setTimeout(() => {
    window.location.href = "https://google.com";
  }, 1500);
}

/**
 * Handles continuing to the distracting site
 */
export function handleContinue() {
  console.log('[Freedom Tool] Handling continue action');
  // Show continue confirmation modal
  showModal('continue-modal');
}