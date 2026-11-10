# Hold Amex Accountable: Stop the Unfair MR Points Clawback

A high-impact, fully responsive single-page web campaign designed to rally affected American Express cardholders, protest against arbitrary Membership Rewards (MR) point confiscations, and channel collective action through 1-star reviews on the Google Play Store and Apple App Store.

---

## 🚀 Key Features

1. **Compelling Headline & Narrative**:
   - Headline: *"Earned In Good Faith. Stolen Overnight by American Express."*
   - Clear contextual breakdown explaining the unilateral clawbacks, exorbitant annual fee betrayal, lack of audit evidence, and stonewalling customer support.

2. **10 Anti-Spam Review Variations (1-of-10 Random Selection on Load)**:
   - When a user lands on the page or refreshes, JavaScript randomly selects 1 out of 10 unique, authentic review templates.
   - Prevents Google Play Store and Apple App Store algorithms from flagging incoming reviews as automated copy-paste spam.
   - Includes a **"Shuffle / Try Another Copy"** button and a **"View All 10 Copies"** modal for full user flexibility.

3. **Live Action Counter with Instant Increment on Copy**:
   - Features the exact demanded callout:
     > **`<<X>> people have voted down, please join hands and shame Amex`**
   - Automatically increments by +1 every time a user copies the review text.
   - Persistent storage using `localStorage` combined with a realistic baseline campaign counter (14,832+) and subtle live community activity simulation.

4. **One-Click Copy & App Store Deep-Linking**:
   - High-contrast, pulsating **"Copy Review Content"** button with haptic feedback, celebratory confetti, and clipboard fallback.
   - Direct store action cards:
     - **Google Play Store**: Direct link to the American Express Android app listing.
     - **Apple App Store**: Direct link to the American Express iOS app listing.
   - Region switcher supporting both Indian and US/Global store links.

5. **Official Grievance Redressal Escalation Matrix (Direct Contacts)**:
   - Full regulatory and management escalation path:
     - **Level 1**: Amex Helpline (`1800 419 3646`)
     - **Level 2**: Manager - Executive Correspondence Unit (`+91 124 6702523`, `Manager-Customerservicesindia@aexp.com`)
     - **Level 3**: Head of Customer Service (`+91 124 6702527`, `Head-Customerservicesindia@aexp.com`)
     - **Level 4**: Nodal Officer (`+91 124 6702386`, `AEBCNodalOfficer@aexp.com`)
     - **Level 5**: Principal Nodal Officer (`+91 124 6702638`, `pnoindia@aexp.com`)
     - **Level 6**: RBI Banking Ombudsman (`14448`, `https://cms.rbi.org.in`)
     - **Executive Leadership**: Sanjay Khanna (CEO India, `ceoindia@aexp.com`)
   - 1-click **"Email CEO & All Nodal Officers"** button that pre-addresses and pre-fills a formal legal complaint template in user's email client.
   - 1-click copy for every phone number and email address.

6. **Multi-Channel Social Amplification**:
   - Pre-populated 1-click sharing buttons for **X / Twitter**, **WhatsApp**, and **Reddit (r/CreditCardsIndia)**.

6. **100% Responsive & Cross-Device Optimized**:
   - Built with modern Tailwind CSS and semantic HTML5.
   - Works seamlessly on mobile phones, tablets, laptops, and ultra-wide desktop screens.

---

## 📂 File Structure

```
├── index.html     # Main single-page application (Responsive UI, Tailwind CSS, Lucide Icons)
├── styles.css     # Custom animations, scrollbars, and visual polish
├── app.js         # 10 review copies, random rotation, clipboard handler, counter logic
└── README.md      # Documentation and deployment guide
```

---

## ⚡ How to Run Locally

You can open `index.html` directly in any web browser, or serve it using Python or Node:

### Option 1: Direct File Opening
Double-click `index.html` or open it directly in Chrome, Firefox, Safari, or Edge:
```bash
# On Linux
xdg-open index.html

# On macOS
open index.html
```

### Option 2: Python Local Server
```bash
python3 -m http.server 8080
```
Then visit: `http://localhost:8080`

### Option 3: Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 Free Instant Deployment

This website is completely static and ready for 1-click deployment on:
- **GitHub Pages**: Push this folder to a GitHub repository and enable Pages under Settings > Pages.
- **Vercel**: Run `npx vercel` or import the GitHub repository in Vercel dashboard.
- **Netlify**: Drag and drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Cloudflare Pages**: Connect repo and select Framework: None / Output directory: `.`.

