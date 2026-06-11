# Learn-Ed | Premium E-Learning & Assessment Platform

Learn-Ed is a modern, responsive, and feature-rich EdTech platform built using pure **HTML5**, modern **Vanilla CSS3**, and modular **Vanilla JavaScript**. It is structured as a high-fidelity Single Page Application (SPA) with routing, state persistence, dark/light modes, interactive course dashboards, note-taking modules, and a fully functional certification quiz engine.

---

## 🌟 Key Features

1. **Responsive SPA View Routing**: Smooth, instant page switching (Landing Page, Catalog, Student Dashboard, Classroom, and Assessment Center) without page refreshes, maintaining clean states.
2. **Interactive Course Catalog**: Search, filter by category tabs (Development, Design, Business), and sort courses based on rating, popularity, or difficulty levels.
3. **Interactive Learning Classroom**:
   - A mock media player simulating playback progress and completion triggers.
   - Integrated study notes tab that autosaves drafts to browser storage.
   - Accordion-based curriculum browser and course indexes.
4. **Gamified Student Profile**:
   - Dynamic user XP and level up mechanisms.
   - Achievements page with unlocked vs. locked badges.
   - Direct link credentials for completed courses.
5. **Certification Center (Live Exam)**:
   - Timed 5-minute quiz with multiple-choice questions on JavaScript.
   - Active timer and real-time question progress indicator.
   - Dynamic PDF/Print Certificate generator rendering the student's name, completion date, and verification code.
6. **Production Polish**:
   - Seamless Light/Dark theme switching persistent in `localStorage`.
   - Rich glassmorphism aesthetics, glowing borders, slide-in toasts, and custom scrollbars.
   - Optimized vector SVG assets to prevent broken layout images.
   - Client-side validated forms (newsletter subscriptions, checkout simulators).

---

## 📂 Project Structure

```
c:\Users\Akash\Desktop\SAAS/
├── index.html         # Main semantic HTML structure & SPA containers
├── style.css          # Design tokens, variables, typography, layouts, print rules
├── app.js             # State managers, routing engine, course catalog, quiz engine
├── assets/
│   └── images/        # Optimized course covers, avatars, and hero graphics
└── README.md          # Technical setup documentation
```

---

## 🚀 How to Run Locally

Since this project is built with standard web technologies, there are no build steps required! You can open it in two ways:

### Option A: Directly in Browser (Simple)
Simply open the `index.html` file in any modern web browser (Chrome, Firefox, Edge, Safari):
- On Windows: Double-click `index.html` or drag it into your browser.

### Option B: Local Web Server (Recommended)
Running through a local development server resolves path issues and provides a more realistic deployment experience.

1. **Using Node.js (npx)**:
   ```bash
   npx http-server
   ```
2. **Using Python**:
   ```bash
   python -m http.server 8000
   ```
3. **Using VS Code**:
   - Right-click `index.html` and select **Open with Live Server**.

Once running, navigate to `http://localhost:8080` (or the port specified by your tool) in your web browser.

---

## 🛠️ Technical Details

- **Typography**: Uses Google Fonts `Outfit` (headings) and `Inter` (body copy) for premium modern UI typography.
- **Iconography**: Loads lightweight vector icons using the `Lucide Icons` CDN.
- **Design Tokens**: Standardized CSS variables (colors, border-radius, shadows, transitions, layout margins) allow global UI themes.
- **State System**: User data, achievements, course logs, and study notes are dynamically tracked and autosaved in browser `localStorage`.
- **Accessibility**: Includes semantic headings (`<h1>` to `<h4>`), explicit aria-labels on icon buttons, and color contrast ratios suitable for accessibility standards.
