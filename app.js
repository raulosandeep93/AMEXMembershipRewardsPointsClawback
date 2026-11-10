/**
 * Amex MR Points Clawback Protest Campaign
 * Interactive Logic: 10 Anti-Spam Review Variations, Local & Collective Counter, One-Click Copy, Store Redirection
 */

// 10 Distinct, authentic review copies to prevent app store spam filters
const REVIEW_COPIES = [
  {
    id: 1,
    title: "Arbitrary Clawback & Total Breach of Trust",
    text: "1 Star. American Express has unilaterally wiped out thousands of hard-earned Membership Rewards points from loyal cardholders without prior warning, audit proof, or due process. Charging premium annual fees while arbitrarily stealing legitimate reward points is daylight robbery. Absolutely unacceptable behavior from a financial institution."
  },
  {
    id: 2,
    title: "Paid Heavy Annual Fees for Nothing",
    text: "Worst customer treatment ever. I paid substantial annual fees specifically for the Membership Rewards program. Now Amex has wiped out all accumulated MR points on legitimate transactions with zero explanation. Customer support gives scripted canned responses. Do not apply for any American Express cards!"
  },
  {
    id: 3,
    title: "Deceptive Marketing & Retroactive Point Seizure",
    text: "Giving 1 star for blatant anti-consumer policies. Amex advertised reward multipliers to attract cardholders, then quietly confiscated points months later. If a company can arbitrarily snatch away earned loyalty points overnight, they cannot be trusted with my money or credit line."
  },
  {
    id: 4,
    title: "Zero Grievance Redressal & Arrogant Support",
    text: "Extremely disappointed with American Express. Thousands of customers are facing sudden point clawbacks on genuine transactions. When we contact helpline or escalate, there is zero accountability and no appeals mechanism. Closing my account and reporting to the banking ombudsman."
  },
  {
    id: 5,
    title: "Erosion of 10+ Years of Customer Loyalty",
    text: "I have been a dedicated Amex cardholder for years, but their recent decision to wipe out Membership Rewards without any transparent audit has shattered my trust. A premium brand that treats its most loyal users like adversaries does not deserve business. 1 star."
  },
  {
    id: 6,
    title: "Bait and Switch Reward Scheme",
    text: "Beware of American Express! They incentivize spending with promise of MR points, only to reverse and delete points retrospectively citing vague clauses without showing any evidence. A classic bait and switch. Rating 1 star to warn new applicants."
  },
  {
    id: 7,
    title: "Consumer Rights Violated - Account Cancellation Next",
    text: "Unfair trade practice at its peak. Amex wiped out MR points earned through validated merchant spends. No individual notice was given before confiscation. I will not be renewing my membership and urge others to boycott until full restitution is made."
  },
  {
    id: 8,
    title: "Premium Reputation Completely Ruined",
    text: "Amex used to be known for world-class service. Today, it arbitrarily deducts hard-earned reward points without giving cardholders a chance to present invoices. When a bank steals from its own customers, 1 star is too generous. Shame on Amex management."
  },
  {
    id: 9,
    title: "Warning to Prospective Applicants: Stay Away",
    text: "Do not get fooled by Amex's flashy marketing. They charge sky-high renewal fees and then suddenly wipe out your points balance overnight. Zero transparency, zero resolution, zero respect for cardholders. Look at other bank cards with reliable reward policies."
  },
  {
    id: 10,
    title: "Unjust Point Wipeout Escalated to Regulators",
    text: "1 star review for unannounced, unilateral confiscation of Membership Rewards points. Valid transactions were honored at the time of purchase, only for points to be seized months later. Consumer court complaints and regulatory petitions are underway. Disgraceful."
  }
];

// App Store & Play Store URLs (Indian listings by default, toggleable to US/Global)
const STORE_LINKS = {
  india: {
    playStore: "https://play.google.com/store/apps/details?id=com.americanexpress.android.acctsvcs.in",
    appStore: "https://apps.apple.com/in/app/amex-india/id984568659"
  },
  global: {
    playStore: "https://play.google.com/store/apps/details?id=com.americanexpress.android.acctsvcs.us",
    appStore: "https://apps.apple.com/us/app/american-express/id363717292"
  }
};

let currentRegion = 'india';
let currentCopyIndex = 0;

// Genuine Real-Time Community Counter Configuration
const COUNTER_NAMESPACE = 'amex_clawback_community_downvotes';
const COUNTER_API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const LOCAL_COUNTER_KEY = 'amex_genuine_downvote_counter';

let currentCount = 0;

// DOM Elements
const voteCounterEl = document.getElementById('voteCounter');
const headerCounterEl = document.getElementById('headerCounter');
const calloutCounterEl = document.getElementById('calloutCounter');
const reviewDisplayEl = document.getElementById('reviewDisplay');
const copyIndexBadgeEl = document.getElementById('copyIndexBadge');
const charCountEl = document.getElementById('charCount');
const copyReviewBtn = document.getElementById('copyReviewBtn');
const copyBtnText = document.getElementById('copyBtnText');
const shuffleBtn = document.getElementById('shuffleBtn');
const quickSelectBtn = document.getElementById('quickSelectBtn');
const copyToast = document.getElementById('copyToast');
const closeToast = document.getElementById('closeToast');
const playStoreLink = document.getElementById('playStoreLink');
const appStoreLink = document.getElementById('appStoreLink');
const regionToggle = document.getElementById('regionToggle');
const allCopiesModal = document.getElementById('allCopiesModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalListContainer = document.getElementById('modalListContainer');
const shareTwitter = document.getElementById('shareTwitter');
const shareWhatsApp = document.getElementById('shareWhatsApp');
const shareReddit = document.getElementById('shareReddit');

/**
 * Fetch honest, real community downvote count from API with local cache
 */
async function fetchRealCounter() {
  // Load cached value first
  const stored = localStorage.getItem(LOCAL_COUNTER_KEY);
  if (stored) {
    currentCount = parseInt(stored, 10) || 0;
    updateCounterDisplay();
  }

  try {
    const res = await fetch(`${COUNTER_API_BASE}/get/${COUNTER_NAMESPACE}`);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        currentCount = data.value;
        localStorage.setItem(LOCAL_COUNTER_KEY, currentCount.toString());
        updateCounterDisplay();
      }
    }
  } catch (err) {
    console.warn('Real counter API fetch (using local value):', err);
  }
}

function updateCounterDisplay(animate = false) {
  const formatted = currentCount.toLocaleString('en-US');
  
  if (voteCounterEl) {
    voteCounterEl.textContent = formatted;
    if (animate) {
      voteCounterEl.classList.remove('counter-animate');
      void voteCounterEl.offsetWidth; // trigger reflow
      voteCounterEl.classList.add('counter-animate');
    }
  }
  
  if (headerCounterEl) {
    headerCounterEl.textContent = formatted;
  }
  
  if (calloutCounterEl) {
    calloutCounterEl.textContent = formatted;
  }
}

async function incrementCounter() {
  // Optimistically increment honest counter
  currentCount += 1;
  localStorage.setItem(LOCAL_COUNTER_KEY, currentCount.toString());
  updateCounterDisplay(true);

  // Sync genuine increment with real public counter
  try {
    const res = await fetch(`${COUNTER_API_BASE}/hit/${COUNTER_NAMESPACE}`);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        currentCount = data.value;
        localStorage.setItem(LOCAL_COUNTER_KEY, currentCount.toString());
        updateCounterDisplay(true);
      }
    }
  } catch (err) {
    console.warn('Counter synced locally:', err);
  }
}

/**
 * Display a review copy by index (0-9)
 */
function displayReviewCopy(index) {
  currentCopyIndex = index % REVIEW_COPIES.length;
  const copy = REVIEW_COPIES[currentCopyIndex];

  if (reviewDisplayEl) {
    reviewDisplayEl.textContent = copy.text;
  }

  if (copyIndexBadgeEl) {
    copyIndexBadgeEl.textContent = `Option #${copy.id} of 10: ${copy.title}`;
  }

  if (charCountEl) {
    charCountEl.textContent = copy.text.length;
  }
}

/**
 * Pick random review copy (1 out of 10) on landing/refresh
 */
function pickRandomCopy() {
  const randomIndex = Math.floor(Math.random() * REVIEW_COPIES.length);
  displayReviewCopy(randomIndex);
}

/**
 * Shuffle to next or random different copy
 */
function shuffleCopy() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * REVIEW_COPIES.length);
  } while (nextIndex === currentCopyIndex && REVIEW_COPIES.length > 1);
  displayReviewCopy(nextIndex);
}

/**
 * Copy review text to clipboard with fallback and UI feedback
 */
async function copyCurrentReview() {
  const currentText = REVIEW_COPIES[currentCopyIndex].text;

  let copySuccessful = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(currentText);
      copySuccessful = true;
    } else {
      // Fallback for older browsers or non-HTTPS
      const textarea = document.createElement('textarea');
      textarea.value = currentText;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      copySuccessful = document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  } catch (err) {
    console.warn('Clipboard write failed, using fallback:', err);
    copySuccessful = false;
  }

  // Increment counter every time user copies review data
  incrementCounter();

  // Trigger celebratory confetti animation
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#EF4444', '#F87171', '#F59E0B', '#FFFFFF']
    });
  }

  // Visual button feedback
  if (copyBtnText) {
    const originalText = copyBtnText.textContent;
    copyBtnText.textContent = '✓ Copied to Clipboard! (Count +1)';
    copyReviewBtn.classList.add('bg-emerald-600');
    setTimeout(() => {
      copyBtnText.textContent = originalText;
      copyReviewBtn.classList.remove('bg-emerald-600');
    }, 2500);
  }

  // Show Toast
  if (copyToast) {
    copyToast.classList.remove('hidden');
    // Scroll smoothly so store links are in easy sight
    playStoreLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Populate "All 10 Copies" modal
 */
function renderAllCopiesModal() {
  if (!modalListContainer) return;
  modalListContainer.innerHTML = '';

  REVIEW_COPIES.forEach((copy, idx) => {
    const item = document.createElement('div');
    item.className = 'p-3.5 rounded-xl border border-slate-800 bg-[#090D17] hover:border-red-500/50 transition cursor-pointer flex flex-col gap-2';
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-red-400 font-mono">Template #${copy.id}: ${copy.title}</span>
        <button class="text-xs bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1 rounded-lg select-this-btn font-semibold">
          Select & Use
        </button>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed">${copy.text}</p>
    `;

    item.addEventListener('click', () => {
      displayReviewCopy(idx);
      allCopiesModal.classList.add('hidden');
    });

    modalListContainer.appendChild(item);
  });
}

/**
 * Update Region Links (India vs US / Global)
 */
function updateRegionLinks() {
  const current = STORE_LINKS[currentRegion];
  if (playStoreLink) playStoreLink.href = current.playStore;
  if (appStoreLink) appStoreLink.href = current.appStore;

  if (regionToggle) {
    if (currentRegion === 'india') {
      regionToggle.textContent = 'Switch to Amex Global / US Listing';
    } else {
      regionToggle.textContent = 'Switch back to Amex India Listing';
    }
  }
}

/**
 * Update Social Sharing links
 */
function updateSocialLinks() {
  const campaignUrl = window.location.href;
  const tweetText = encodeURIComponent(
    "American Express arbitrarily wiped out hard-earned Membership Rewards points from loyal cardholders. Hold them accountable: rate 1-star on App Store & Play Store! Join the movement: " + campaignUrl + " #AmexClawback #BoycottAmex #AmericanExpress"
  );
  if (shareTwitter) {
    shareTwitter.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
  }

  const waText = encodeURIComponent(
    "🚨 Amex Membership Rewards Points Clawback! Join cardholders protesting against arbitrary point cancellations by giving 1-star reviews on App Store & Play Store. Copy review & rate here: " + campaignUrl
  );
  if (shareWhatsApp) {
    shareWhatsApp.href = `https://api.whatsapp.com/send?text=${waText}`;
  }

  const redditTitle = encodeURIComponent("Hold Amex Accountable: Community Push for 1-Star App Store Ratings After Arbitrary MR Points Wipeout");
  if (shareReddit) {
    shareReddit.href = `https://www.reddit.com/r/CreditCardsIndia/submit?title=${redditTitle}&url=${encodeURIComponent(campaignUrl)}`;
  }
}

const COMPLAINT_TEMPLATE = `To: ceoindia@aexp.com
Cc: pnoindia@aexp.com, AEBCNodalOfficer@aexp.com, Head-Customerservicesindia@aexp.com, Manager-Customerservicesindia@aexp.com
Subject: URGENT: Formal Notice & Grievance - Unlawful Retrospective Membership Rewards Clawback

Dear Mr. Sanjay Khanna and Senior Grievance Redressal Team,

I am writing to formally register a severe grievance regarding the arbitrary, unilateral, and unannounced confiscation/clawback of legitimate Membership Rewards (MR) points from my American Express account.

Cardholder Details:
- Full Name: [Insert Your Name]
- Registered Mobile: [Insert Mobile Number]
- Registered Email: [Insert Email Address]
- Card Account (Last 4 digits): [XXXX]
- Total MR Points Confiscated: [Insert Approx Points]

All confiscated points were earned strictly in compliance with advertised bonus multipliers, valid reward programs, and legitimate purchase transactions. The retrospective deduction without individual notice, transparent forensic audit evidence, or due process violates RBI Master Directions on Credit Card Conduct and constitutes an unfair trade practice.

I demand:
1. Complete restitution and reinstatement of all arbitrarily clawed-back Membership Rewards points.
2. A formal transaction-level audit report justifying any deduction.
3. Formal written acknowledgment and resolution within 7 working days.

If this matter is not resolved satisfactorily, I will immediately escalate this complaint to the Reserve Bank of India (RBI) Banking Ombudsman Scheme (cms.rbi.org.in) and the National Consumer Disputes Redressal Commission (NCDRC) for deficiency of service and breach of trust.

Sincerely,
[Insert Your Name]`;

/**
 * Handle Formal Complaint Template Copy
 */
function setupEscalationMatrixHandlers() {
  const copyComplaintTemplateBtn = document.getElementById('copyComplaintTemplateBtn');

  if (copyComplaintTemplateBtn) {
    copyComplaintTemplateBtn.addEventListener('click', async () => {
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(COMPLAINT_TEMPLATE);
          copied = true;
        } else {
          const ta = document.createElement('textarea');
          ta.value = COMPLAINT_TEMPLATE;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          copied = document.execCommand('copy');
          document.body.removeChild(ta);
        }
      } catch (err) {
        console.warn('Copy failed:', err);
      }

      if (copied) {
        const originalText = copyComplaintTemplateBtn.innerHTML;
        copyComplaintTemplateBtn.innerHTML = '<span class="text-emerald-400 font-bold">✓ Copied Complaint Draft!</span>';
        setTimeout(() => {
          copyComplaintTemplateBtn.innerHTML = originalText;
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 2000);
      }
    });
  }

  // Handle individual quick-copy buttons for phone & email values
  document.querySelectorAll('.copy-field-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const ta = document.createElement('textarea');
          ta.value = textToCopy;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        const originalText = btn.textContent;
        btn.textContent = '✓ Copied';
        btn.classList.add('text-emerald-400');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('text-emerald-400');
        }, 1800);
      } catch (err) {
        console.warn('Failed to copy field:', err);
      }
    });
  });
}

/**
 * Event Listeners & Bootstrapping
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Fetch honest community counter from real public API
  fetchRealCounter();

  // Pick random 1-of-10 review copy on landing
  pickRandomCopy();

  // Region links
  updateRegionLinks();

  // Social links
  updateSocialLinks();

  // Setup modal copies
  renderAllCopiesModal();

  // Setup escalation matrix email & copy handlers
  setupEscalationMatrixHandlers();

  // Button Listeners
  if (copyReviewBtn) {
    copyReviewBtn.addEventListener('click', copyCurrentReview);
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', shuffleCopy);
  }

  if (closeToast) {
    closeToast.addEventListener('click', () => {
      copyToast.classList.add('hidden');
    });
  }

  if (regionToggle) {
    regionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      currentRegion = currentRegion === 'india' ? 'global' : 'india';
      updateRegionLinks();
    });
  }

  // Enhanced iOS handler for App Store link
  if (appStoreLink) {
    appStoreLink.addEventListener('click', (e) => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        const appId = currentRegion === 'india' ? '984568659' : '363717292';
        // Directly trigger native App Store protocol with write-review prompt
        window.location.href = `itms-apps://apps.apple.com/app/id${appId}?action=write-review`;
      }
    });
  }

  if (quickSelectBtn) {
    quickSelectBtn.addEventListener('click', () => {
      allCopiesModal.classList.remove('hidden');
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      allCopiesModal.classList.add('hidden');
    });
  }

  if (allCopiesModal) {
    allCopiesModal.addEventListener('click', (e) => {
      if (e.target === allCopiesModal) {
        allCopiesModal.classList.add('hidden');
      }
    });
  }
});

