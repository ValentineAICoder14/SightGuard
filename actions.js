// actions.js
console.log('[Freedom Tool] Actions module loaded');

import { removeOverlay, showModal, showMainModal, showToast } from './overlay.js';

// IDs for Modals and Controls
const PRAY_MODAL_ID = 'pray-modal';
const CONTINUE_MODAL_ID = 'continue-modal';

const PRAY_BTN_ID = 'pray-btn';
const LEAVE_BTN_ID = 'leave-btn';
const CONTINUE_BTN_ID = 'continue-btn';

const PRAY_BACK_BTN_ID = 'pray-back-btn';
const BIBLE_BTN_ID = 'bible-btn';
const PRAYER_TEXT_ID = 'prayer-text';

const CONTINUE_BACK_BTN_ID = 'continue-back-btn';
const CONFIRM_CONTINUE_BTN_ID = 'confirm-continue-btn';


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
  document.getElementById(PRAY_BTN_ID)?.addEventListener('click', handlePray);
  document.getElementById(LEAVE_BTN_ID)?.addEventListener('click', handleLeave);
  document.getElementById(CONTINUE_BTN_ID)?.addEventListener('click', handleContinue);
  
  // Prayer modal buttons
  document.getElementById(PRAY_BACK_BTN_ID)?.addEventListener('click', () => {
    console.log('[Freedom Tool] Pray back button clicked');
    showMainModal();
  });
  
  document.getElementById(BIBLE_BTN_ID)?.addEventListener('click', () => {
    console.log('[Freedom Tool] Bible button clicked');
    removeOverlay();
    window.location.href = "https://bible.com/random"; // External URL, can remain as string
  });
  
  // Continue modal buttons
  document.getElementById(CONTINUE_BACK_BTN_ID)?.addEventListener('click', () => {
    console.log('[Freedom Tool] Continue back button clicked');
    showMainModal();
  });
  
  document.getElementById(CONFIRM_CONTINUE_BTN_ID)?.addEventListener('click', () => {
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
  const prayerText = document.getElementById(PRAYER_TEXT_ID);
  if (prayerText) {
    prayerText.textContent = randomPrayer;
  }
  
  // Show prayer modal
  showModal(PRAY_MODAL_ID);
}

/**
 * Handles leaving the distracting site
 */
export function handleLeave() {
  console.log('[Freedom Tool] Handling leave action');
  showToast("Proud of you for walking away! 🙌");
  
  setTimeout(() => {
    window.location.href = "https://google.com"; // External URL, can remain as string
  }, 1500);
}

/**
 * Handles continuing to the distracting site
 */
export function handleContinue() {
  console.log('[Freedom Tool] Handling continue action');
  // Show continue confirmation modal
  showModal(CONTINUE_MODAL_ID);
}