/**
 * Learn-Ed Platform Main Application JavaScript
 * Core SPA Router, State Manager, Course Catalog Filters,
 * Classroom Video Simulators, Certification Exam Engine, and Form Validation.
 */

// ==========================================
// 1. Initial State Definitions
// ==========================================

const INITIAL_USER_STATE = {
  fullname: "Alex Morgan",
  username: "alex_morgan",
  level: 5,
  xp: 1250,
  xpNeeded: 2000,
  enrolledCourses: [
    { id: "js-essentials", progress: 25, completedLessons: ["intro"] },
    { id: "css-grid", progress: 0, completedLessons: [] }
  ],
  completedCourses: ["react-hooks"],
  badges: [
    { id: "first-step", name: "First Step", desc: "Enrolled in your first course", icon: "🌱", earned: true },
    { id: "code-warrior", name: "Code Warrior", desc: "Completed your first course path", icon: "⚔️", earned: true },
    { id: "quiz-master", name: "Quiz Master", desc: "Passed a certification exam", icon: "🎓", earned: false },
    { id: "scribe", name: "Scribe", desc: "Saved custom study notes", icon: "📝", earned: false }
  ],
  notes: {
    "js-essentials": "JavaScript utilizes prototypal inheritance. Remember that Closures remember their lexical scope!"
  }
};

const COURSES_DATABASE = [
  {
    id: "js-essentials",
    title: "Mastering JavaScript Essentials",
    category: "development",
    duration: "6h 15m",
    rating: "4.8",
    enrollments: "14,203",
    difficulty: "Beginner",
    difficultyValue: 1,
    image: "assets/images/course_js.svg",
    instructor: "Sarah Jenkins",
    instructorAvatar: "assets/images/student_1.svg",
    description: "Learn core variables, scoping, control structures, arrays, objects, standard DOM manipulation, and asynchronous ES6 promises.",
    lessons: [
      { id: "intro", title: "Introduction to JavaScript Engine", duration: "10:24" },
      { id: "scope", title: "Variables, Scope, and Mutability", duration: "12:15" },
      { id: "arrays", title: "Arrays & Iteration Methodologies", duration: "15:40" },
      { id: "dom", title: "DOM Manipulation & Event Listeners", duration: "20:10" }
    ]
  },
  {
    id: "css-grid",
    title: "Advanced CSS Grid & Flexbox",
    category: "design",
    duration: "8h 45m",
    rating: "4.9",
    enrollments: "8,512",
    difficulty: "Intermediate",
    difficultyValue: 2,
    image: "assets/images/course_css.svg",
    instructor: "Jane Doe",
    instructorAvatar: "assets/images/student_2.svg",
    description: "Master CSS layout engines. Learn responsive layouts, grid templates, dynamic clamp styling, custom properties, and advanced transitions.",
    lessons: [
      { id: "flexbox", title: "Flexbox Alignments and Self-Distribution", duration: "14:20" },
      { id: "grid-tracks", title: "CSS Grid Tracks, Areas, and Auto-Fill", duration: "18:45" },
      { id: "vars", title: "Dynamic Custom Properties (CSS Variables)", duration: "11:15" },
      { id: "animations", title: "Animating Complex Grid Transitions", duration: "22:30" }
    ]
  },
  {
    id: "react-hooks",
    title: "Modern React with Hooks",
    category: "development",
    duration: "12h 30m",
    rating: "4.7",
    enrollments: "22,142",
    difficulty: "Advanced",
    difficultyValue: 3,
    image: "assets/images/course_react.svg",
    instructor: "Ryan Dahl",
    instructorAvatar: "assets/images/student_3.svg",
    description: "Build robust single-page applications. Master functional components, state hooks, custom hook design patterns, and global Context APIs.",
    lessons: [
      { id: "comps", title: "Component Architecture & Props", duration: "18:20" },
      { id: "state", title: "Deep Dive into useState and useEffect", duration: "25:40" },
      { id: "custom", title: "Writing Scalable Custom Hooks", duration: "22:15" },
      { id: "context", title: "Global Context API State Management", duration: "28:10" }
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Systems in Figma",
    category: "design",
    duration: "5h 20m",
    rating: "4.9",
    enrollments: "12,311",
    difficulty: "Intermediate",
    difficultyValue: 2,
    image: "assets/images/course_ui.svg",
    instructor: "Jane Doe",
    instructorAvatar: "assets/images/student_2.svg",
    description: "Create standard layouts, layout grids, components, auto layouts, variants, and design systems for enterprise applications.",
    lessons: [
      { id: "architecture", title: "Core Design System Architecture", duration: "15:10" },
      { id: "typography", title: "Establishing Typography & Grid Hierarchies", duration: "19:40" },
      { id: "variants", title: "Component Variants & Auto-Layout", duration: "24:30" }
    ]
  },
  {
    id: "cloud-computing",
    title: "Introduction to Cloud Computing",
    category: "business",
    duration: "4h 15m",
    rating: "4.5",
    enrollments: "5,420",
    difficulty: "Beginner",
    difficultyValue: 1,
    image: "assets/images/course_cloud.svg",
    instructor: "Alex Morgan",
    instructorAvatar: "assets/images/student_3.svg",
    description: "Explore cloud platforms, AWS paradigms, basic compute resources, S3 storage, serverless setups, and security groups.",
    lessons: [
      { id: "basics", title: "Cloud Architecture Foundations", duration: "12:10" },
      { id: "aws", title: "AWS Core Compute, Storage & Networking", duration: "24:50" },
      { id: "lambda", title: "Serverless Deployments & Lambda Functions", duration: "18:30" }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Which keyword creates a block-scoped variable that cannot be reassigned?",
    options: ["var", "let", "const", "def"],
    answerIndex: 2
  },
  {
    question: "What is the output of 'typeof null' in standard JavaScript?",
    options: ["'null'", "'undefined'", "'object'", "'string'"],
    answerIndex: 2
  },
  {
    question: "Which array method executes a reducer function on each element to return a single cumulative value?",
    options: ["map()", "filter()", "reduce()", "forEach()"],
    answerIndex: 2
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A method to close browser tabs dynamically",
      "A function combined with its lexical environment, allowing it to access outer scope variables",
      "A way to lock objects from being edited",
      "The concluding bracket in a function body"
    ],
    answerIndex: 1
  },
  {
    question: "Which web API is standard for executing asynchronous HTTP requests?",
    options: ["fetch()", "JSON.parse()", "request()", "localStorage"],
    answerIndex: 0
  }
];

// ==========================================
// 2. State Controller
// ==========================================

let state = {
  user: JSON.parse(localStorage.getItem('learned_user_state')) || INITIAL_USER_STATE,
  courses: COURSES_DATABASE,
  currentView: 'landing',
  activeCourseId: null,
  activeLessonId: null,
  activeQuiz: {
    inProgress: false,
    currentQuestionIndex: 0,
    answers: [],
    timerSeconds: 300, // 5 minutes
    timerInterval: null
  }
};

function saveState() {
  localStorage.setItem('learned_user_state', JSON.stringify(state.user));
  updateUI();
}

// ==========================================
// 3. SPA Routing Controller
// ==========================================

const VIEWS = {
  landing: document.getElementById('view-landing'),
  courses: document.getElementById('view-courses'),
  dashboard: document.getElementById('view-dashboard'),
  learning: document.getElementById('view-learning'),
  quiz: document.getElementById('view-quiz')
};

function navigateTo(viewId) {
  if (!VIEWS[viewId]) return;
  
  // Hide all views, display targeted view
  Object.keys(VIEWS).forEach(key => {
    VIEWS[key].classList.remove('active');
  });
  VIEWS[viewId].classList.add('active');
  state.currentView = viewId;
  
  // Update nav link highlighting
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.getAttribute('data-view') === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile menu close on route
  document.getElementById('mobile-nav').classList.remove('active');

  // Trigger view-specific behaviors
  if (viewId === 'landing') {
    startStatsCounter();
  } else if (viewId === 'courses') {
    renderCourseCatalog();
  } else if (viewId === 'dashboard') {
    renderDashboard();
  } else if (viewId === 'learning') {
    renderClassroom();
  } else if (viewId === 'quiz') {
    resetQuizState();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hash change router handler
function handleHashRoute() {
  const hash = window.location.hash.substring(1);
  if (hash && VIEWS[hash]) {
    navigateTo(hash);
  } else {
    navigateTo('landing');
  }
}

// ==========================================
// 4. UI Updating Functions
// ==========================================

function updateUI() {
  // Update header profile summary
  document.getElementById('tooltip-user-name').textContent = state.user.fullname;
  document.getElementById('tooltip-user-xp').textContent = `${state.user.xp.toLocaleString()} XP`;
  
  // Update level text
  const levelBadge = document.getElementById('dashboard-user-level');
  if (levelBadge) levelBadge.textContent = `Level ${state.user.level}`;
  
  const xpProgress = document.getElementById('dashboard-user-xp-progress');
  if (xpProgress) xpProgress.textContent = `${state.user.xp} / ${state.user.xpNeeded} XP`;
  
  const xpFill = document.getElementById('dashboard-xp-progress-fill');
  if (xpFill) {
    const percentage = (state.user.xp / state.user.xpNeeded) * 100;
    xpFill.style.width = `${Math.min(percentage, 100)}%`;
  }

  // Re-render subelements if actively viewing that page
  if (state.currentView === 'dashboard') {
    renderDashboard();
  } else if (state.currentView === 'courses') {
    renderCourseCatalog();
  }
  
  // Refresh Lucide Icons
  lucide.createIcons();
}

// Toast alerts helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span class="toast-message">${message}</span>
  `;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// 5. Landing Page Logic
// ==========================================

// Stats counter count-up animation
let statsAnimated = false;
function startStatsCounter() {
  if (statsAnimated) return;
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    
    let current = 0;
    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target.toLocaleString() + (target === 98 ? '%' : '+');
      }
    };
    updateCount();
  });
  statsAnimated = true;
}

// Testimonials Slider
let activeTestimonialIndex = 0;
const TESTIMONIALS = [
  {
    rating: 5,
    text: "The coding sandbox integrated directly alongside the video panels made this the best Javascript course I have ever taken. The gamified dashboard kept me super motivated!",
    name: "Sarah Jenkins",
    role: "Frontend Dev at Vercel",
    avatar: "assets/images/student_1.svg"
  },
  {
    rating: 5,
    text: "Highly recommended path! The certification exam was challenging but highly detailed. It helped me structure my coding profile and secure a React role.",
    name: "David Vance",
    role: "Software Engineer at Stripe",
    avatar: "assets/images/student_2.svg"
  },
  {
    rating: 5,
    text: "Learn-Ed offers an exceptional aesthetic interface. The notes sync instantly and the course structures are tailored perfectly to production environments.",
    name: "Aisha Rahman",
    role: "Lead UI Designer at Figma",
    avatar: "assets/images/student_3.svg"
  }
];

function renderTestimonials() {
  const slider = document.getElementById('testimonial-slider');
  slider.innerHTML = '';
  
  TESTIMONIALS.forEach((test, idx) => {
    const slide = document.createElement('div');
    slide.className = `testimonial-slide ${idx === activeTestimonialIndex ? 'active' : ''}`;
    
    let ratingStars = '';
    for (let i = 0; i < test.rating; i++) {
      ratingStars += `<i data-lucide="star" class="star-filled"></i>`;
    }

    slide.innerHTML = `
      <div class="testimonial-rating">${ratingStars}</div>
      <p class="testimonial-text">"${test.text}"</p>
      <div class="testimonial-user">
        <img src="${test.avatar}" alt="${test.name}">
        <div class="user-info">
          <span class="user-name">${test.name}</span>
          <span class="user-role">${test.role}</span>
        </div>
      </div>
    `;
    slider.appendChild(slide);
  });
  lucide.createIcons();
}

// Pricing Toggle Functionality
const billingToggleBtn = document.getElementById('billing-toggle');
let isAnnualBilling = false;

if (billingToggleBtn) {
  billingToggleBtn.addEventListener('click', () => {
    isAnnualBilling = !isAnnualBilling;
    billingToggleBtn.classList.toggle('annual', isAnnualBilling);
    document.getElementById('billing-monthly').classList.toggle('active', !isAnnualBilling);
    document.getElementById('billing-annual').classList.toggle('active', isAnnualBilling);
    
    // Update pricing cards
    document.querySelectorAll('.price-amount').forEach(priceEl => {
      const monthlyPrice = priceEl.getAttribute('data-monthly');
      const annualPrice = priceEl.getAttribute('data-annual');
      priceEl.textContent = isAnnualBilling ? annualPrice : monthlyPrice;
    });
  });
}

// Newsletter submit validator
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const msgEl = document.getElementById('newsletter-message');
    
    if (emailInput.value) {
      msgEl.textContent = "✓ Successfully subscribed to Learn-Ed newsletters!";
      msgEl.className = "form-message success";
      showToast("Thank you for subscribing!", "success");
      
      // Award Scribe / Read badge if applicable
      awardXP(50);
      emailInput.value = '';
    }
  });
}

// Pricing upgrade check
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('purchase-btn')) {
    const plan = e.target.getAttribute('data-plan');
    showToast(`Successfully simulated ${plan} upgrade check. Checkout portal ready.`, 'success');
  }
  if (e.target.classList.contains('contact-sales-btn')) {
    showToast("Opening B2B team sales query portal.", "info");
  }
});

// ==========================================
// 6. Courses Catalog Logic
// ==========================================

let activeCategoryFilter = 'all';
let currentSearchQuery = '';
let currentSortMode = 'popular';

function renderCourseCatalog() {
  const grid = document.getElementById('courses-grid-container');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  // Filter courses
  let filtered = state.courses.filter(course => {
    const matchesCategory = activeCategoryFilter === 'all' || course.category === activeCategoryFilter;
    const matchesSearch = course.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(currentSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort courses
  filtered.sort((a, b) => {
    if (currentSortMode === 'popular') {
      const countA = parseFloat(a.enrollments.replace(',', ''));
      const countB = parseFloat(b.enrollments.replace(',', ''));
      return countB - countA;
    }
    if (currentSortMode === 'newest') {
      return a.id.localeCompare(b.id); // Simple mock chronological
    }
    if (currentSortMode === 'difficulty-asc') {
      return a.difficultyValue - b.difficultyValue;
    }
    if (currentSortMode === 'difficulty-desc') {
      return b.difficultyValue - a.difficultyValue;
    }
    return 0;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-xl font-bold">No courses found matching your criteria.</p>
        <button class="btn btn-secondary mt-4" id="clear-filters-btn">Clear Filters</button>
      </div>
    `;
    document.getElementById('clear-filters-btn')?.addEventListener('click', () => {
      currentSearchQuery = '';
      activeCategoryFilter = 'all';
      document.getElementById('course-search-input').value = '';
      document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-category') === 'all') btn.classList.add('active');
        else btn.classList.remove('active');
      });
      renderCourseCatalog();
    });
    return;
  }

  filtered.forEach(course => {
    const enrollment = state.user.enrolledCourses.find(ec => ec.id === course.id);
    const isCompleted = state.user.completedCourses.includes(course.id);
    
    let buttonHtml = '';
    let progressHtml = '';
    
    if (isCompleted) {
      buttonHtml = `<button class="btn btn-secondary btn-sm course-action-btn" data-action="resume" data-id="${course.id}">Review Course</button>`;
      progressHtml = `
        <div class="course-card-progress">
          <div class="progress-info">
            <span>Progress</span>
            <span>100%</span>
          </div>
          <div class="progress-outer">
            <div class="progress-inner" style="width: 100%"></div>
          </div>
        </div>
      `;
    } else if (enrollment) {
      buttonHtml = `<button class="btn btn-primary btn-sm course-action-btn" data-action="resume" data-id="${course.id}">Resume</button>`;
      progressHtml = `
        <div class="course-card-progress">
          <div class="progress-info">
            <span>Progress</span>
            <span>${enrollment.progress}%</span>
          </div>
          <div class="progress-outer">
            <div class="progress-inner" style="width: ${enrollment.progress}%"></div>
          </div>
        </div>
      `;
    } else {
      buttonHtml = `<button class="btn btn-secondary btn-sm course-action-btn" data-action="preview" data-id="${course.id}">Preview</button>`;
      progressHtml = `<p class="course-desc-short">${course.description}</p>`;
    }

    const card = document.createElement('article');
    card.className = 'course-card';
    card.innerHTML = `
      <img src="${course.image}" alt="${course.title} Banner" class="course-card-banner">
      <div class="course-card-body">
        <div class="course-meta-tags">
          <span class="course-category">${course.category}</span>
          <div class="course-rating-row">
            <i data-lucide="star" class="star-filled"></i>
            <span>${course.rating}</span>
          </div>
        </div>
        <h3>${course.title}</h3>
        ${progressHtml}
        <div class="course-card-footer">
          <div class="course-author">
            <img src="${course.instructorAvatar}" alt="${course.instructor}" class="course-author-avatar">
            <span>${course.instructor}</span>
          </div>
          ${buttonHtml}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

// Add event handlers for search/filter inputs
const searchInput = document.getElementById('course-search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    renderCourseCatalog();
  });
}

const categoryTabs = document.getElementById('category-tabs');
if (categoryTabs) {
  categoryTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      activeCategoryFilter = e.target.getAttribute('data-category');
      renderCourseCatalog();
    }
  });
}

const sortSelect = document.getElementById('course-sort-select');
if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    currentSortMode = e.target.value;
    renderCourseCatalog();
  });
}

// Handle course card buttons (Preview/Enroll/Resume)
document.addEventListener('click', (e) => {
  const targetBtn = e.target.closest('.course-action-btn');
  if (!targetBtn) return;

  const action = targetBtn.getAttribute('data-action');
  const courseId = targetBtn.getAttribute('data-id');
  
  if (action === 'preview') {
    openCourseModal(courseId);
  } else if (action === 'resume') {
    launchClassroom(courseId);
  }
});

// Modal Logic
const modal = document.getElementById('course-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

function openCourseModal(courseId) {
  const course = state.courses.find(c => c.id === courseId);
  if (!course) return;

  document.getElementById('modal-title').textContent = course.title;
  document.getElementById('modal-instructor-name').textContent = course.instructor;
  document.getElementById('modal-desc').textContent = course.description;
  document.getElementById('modal-difficulty').textContent = course.difficulty;
  document.getElementById('modal-duration').textContent = course.duration;
  document.getElementById('modal-enrollments').textContent = course.enrollments;
  document.getElementById('modal-rating').textContent = `${course.rating}/5.0`;
  
  const enrollBtn = document.getElementById('modal-enroll-btn');
  enrollBtn.setAttribute('data-id', courseId);
  
  modal.classList.add('active');
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', () => modal.classList.remove('active'));
  document.getElementById('modal-secondary-btn').addEventListener('click', () => modal.classList.remove('active'));
}

const enrollBtn = document.getElementById('modal-enroll-btn');
if (enrollBtn) {
  enrollBtn.addEventListener('click', () => {
    const courseId = enrollBtn.getAttribute('data-id');
    enrollInCourse(courseId);
    modal.classList.remove('active');
  });
}

function enrollInCourse(courseId) {
  // Check if already enrolled
  const enrolled = state.user.enrolledCourses.find(ec => ec.id === courseId);
  if (enrolled) {
    launchClassroom(courseId);
    return;
  }

  // Create enrollment record
  state.user.enrolledCourses.push({
    id: courseId,
    progress: 0,
    completedLessons: []
  });

  // Award XP
  awardXP(150);
  
  // Award Badge 'First Step' if applicable
  const firstStepBadge = state.user.badges.find(b => b.id === 'first-step');
  if (firstStepBadge && !firstStepBadge.earned) {
    firstStepBadge.earned = true;
    showToast("Badge Unlocked: First Step! 🌱", "success");
  }

  saveState();
  showToast("Successfully enrolled in course!", "success");
  launchClassroom(courseId);
}

// ==========================================
// 7. Dashboard View Logic
// ==========================================

function renderDashboard() {
  // Set profile details
  document.getElementById('dashboard-user-name').textContent = state.user.fullname;
  document.getElementById('dashboard-fullname').textContent = state.user.fullname;
  document.getElementById('dashboard-user-level').textContent = `Level ${state.user.level}`;
  
  // Update metric indicators
  document.getElementById('metric-enrolled-count').textContent = state.user.enrolledCourses.length;
  document.getElementById('metric-completed-count').textContent = state.user.completedCourses.length;
  document.getElementById('metric-certificates-count').textContent = state.user.completedCourses.length; // 1 to 1 mock

  // Render Enrolled Courses List
  const enrolledList = document.getElementById('dashboard-enrolled-list');
  enrolledList.innerHTML = '';

  if (state.user.enrolledCourses.length === 0) {
    enrolledList.innerHTML = `
      <div class="text-center py-8 bg-tertiary rounded-lg border border-dashed">
        <p>You aren't enrolled in any paths yet.</p>
        <a href="#courses" class="btn btn-primary btn-sm mt-3">Find Courses</a>
      </div>
    `;
  } else {
    state.user.enrolledCourses.forEach(ec => {
      const course = state.courses.find(c => c.id === ec.id);
      if (!course) return;

      const row = document.createElement('div');
      row.className = 'enrolled-course-row';
      row.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="ec-image">
        <div class="ec-details">
          <h3>${course.title}</h3>
          <div class="ec-progress-bar-row">
            <div class="xp-progress-bar-container">
              <div class="xp-progress-bar-fill" style="width: ${ec.progress}%"></div>
            </div>
            <span class="ec-pct">${ec.progress}%</span>
          </div>
        </div>
        <button class="btn btn-primary btn-sm course-action-btn" data-action="resume" data-id="${course.id}">Resume</button>
      `;
      enrolledList.appendChild(row);
    });
  }

  // Render Badges achievements
  const badgesGrid = document.getElementById('dashboard-badges-grid');
  badgesGrid.innerHTML = '';
  
  state.user.badges.forEach(badge => {
    const item = document.createElement('div');
    item.className = `badge-item ${badge.earned ? 'earned' : 'locked'}`;
    item.setAttribute('data-tooltip', `${badge.name}: ${badge.desc}`);
    item.innerHTML = badge.earned ? badge.icon : '🔒';
    badgesGrid.appendChild(item);
  });

  // Render Certificate credentials list
  const certList = document.getElementById('dashboard-certificates-list');
  certList.innerHTML = '';
  
  if (state.user.completedCourses.length === 0) {
    certList.innerHTML = `<p class="text-muted text-sm">No certified credentials earned yet. Complete a path to certify.</p>`;
  } else {
    state.user.completedCourses.forEach(ccId => {
      const course = state.courses.find(c => c.id === ccId);
      if (!course) return;

      const certRow = document.createElement('div');
      certRow.className = 'certificate-row';
      certRow.innerHTML = `
        <div class="cert-info-col">
          <span class="cert-name-label">${course.title} Certificate</span>
          <span class="cert-id-label">ID: LE-${course.id.toUpperCase()}-772A</span>
        </div>
        <button class="btn btn-secondary btn-sm view-cert-btn" data-id="${course.id}">View Cert</button>
      `;
      certList.appendChild(certRow);
    });
  }
}

// Handle viewing cert from dashboard
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-cert-btn')) {
    const courseId = e.target.getAttribute('data-id');
    const course = state.courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Switch to quiz results view directly to show certificate
    navigateTo('quiz');
    displayCertificateResult(5, course.title);
  }
});

// ==========================================
// 8. Classroom / Learning Engine
// ==========================================

let videoProgressTimer = null;
let isVideoPlaying = false;

function launchClassroom(courseId) {
  state.activeCourseId = courseId;
  const course = state.courses.find(c => c.id === courseId);
  
  // Find first incomplete lesson
  const enrollment = state.user.enrolledCourses.find(ec => ec.id === courseId);
  let targetLessonId = course.lessons[0].id;
  
  if (enrollment && enrollment.completedLessons.length > 0) {
    const nextUnfinished = course.lessons.find(l => !enrollment.completedLessons.includes(l.id));
    if (nextUnfinished) targetLessonId = nextUnfinished.id;
  }
  
  state.activeLessonId = targetLessonId;
  navigateTo('learning');
}

function renderClassroom() {
  const course = state.courses.find(c => c.id === state.activeCourseId);
  const lesson = course.lessons.find(l => l.id === state.activeLessonId);
  const enrollment = state.user.enrolledCourses.find(ec => ec.id === state.activeCourseId);
  
  if (!course || !lesson || !enrollment) return;

  // Header and descriptions
  document.getElementById('learning-course-title').textContent = course.title;
  document.getElementById('learning-course-desc').textContent = course.description;
  
  // Sidebar completion rates
  const completedCount = enrollment.completedLessons.length;
  const totalLessons = course.lessons.length;
  const percentVal = Math.round((completedCount / totalLessons) * 100);
  
  document.getElementById('learning-sidebar-progress').textContent = `${percentVal}% Complete`;
  document.getElementById('learning-sidebar-progress-fill').style.width = `${percentVal}%`;

  // Render Lectures List
  const lectureContainer = document.getElementById('learning-lecture-list');
  lectureContainer.innerHTML = '';
  
  course.lessons.forEach(les => {
    const isCompleted = enrollment.completedLessons.includes(les.id);
    const isActive = les.id === state.activeLessonId;
    
    const item = document.createElement('div');
    item.className = `lecture-item ${isActive ? 'active' : ''}`;
    item.setAttribute('data-id', les.id);
    
    item.innerHTML = `
      <div class="lecture-icon ${isCompleted ? 'completed' : 'incomplete'}">
        ${isCompleted ? '✓' : '▶'}
      </div>
      <div class="lecture-info-col">
        <span class="lecture-title">${les.title}</span>
        <span class="lecture-duration">${les.duration}</span>
      </div>
    `;
    
    item.addEventListener('click', () => {
      state.activeLessonId = les.id;
      resetClassroomVideo();
      renderClassroom();
    });
    
    lectureContainer.appendChild(item);
  });

  // Render Curriculum accordion tab content
  const curriculumContainer = document.getElementById('learning-curriculum-list');
  curriculumContainer.innerHTML = '';
  
  course.lessons.forEach((les, idx) => {
    const item = document.createElement('div');
    item.className = `accordion-item ${les.id === state.activeLessonId ? 'active' : ''}`;
    
    item.innerHTML = `
      <div class="accordion-header">
        <span>Module ${idx + 1}: ${les.title}</span>
        <span>${les.duration}</span>
      </div>
      <div class="accordion-content">
        <p>In this lecture section we cover theoretical underpinnings, key syntax rules, and complete code walkthroughs. Click to view video module on player screen.</p>
      </div>
    `;
    
    item.querySelector('.accordion-header').addEventListener('click', () => {
      item.classList.toggle('active');
    });
    
    curriculumContainer.appendChild(item);
  });

  // Load Notes
  const notesArea = document.getElementById('notes-textarea');
  notesArea.value = state.user.notes[state.activeCourseId] || '';

  // Setup Quiz button in classroom sidebar
  const startQuizBtn = document.getElementById('classroom-take-quiz-btn');
  if (percentVal >= 100 || isCompleted) {
    startQuizBtn.removeAttribute('disabled');
    startQuizBtn.innerHTML = `<i data-lucide="award"></i> Take Certification Exam`;
  } else {
    startQuizBtn.setAttribute('disabled', 'true');
    startQuizBtn.innerHTML = `Complete All Lessons to Certify`;
  }
}

// Video simulator player details
const videoPlayToggleBtn = document.getElementById('classroom-play-toggle');
const videoOverlayBtn = document.getElementById('classroom-video-play-btn');
const videoProgressFill = document.getElementById('classroom-video-progress');
const videoTimeText = document.getElementById('classroom-video-time');
const videoOverlay = document.getElementById('video-overlay');

function resetClassroomVideo() {
  clearInterval(videoProgressTimer);
  isVideoPlaying = false;
  videoOverlay.style.display = 'flex';
  videoProgressFill.style.width = '0%';
  videoTimeText.textContent = '0:00 / 5:00';
  videoPlayToggleBtn.innerHTML = '<i data-lucide="play"></i>';
  lucide.createIcons();
}

function simulatePlayVideo() {
  if (isVideoPlaying) {
    // Pause
    clearInterval(videoProgressTimer);
    isVideoPlaying = false;
    videoPlayToggleBtn.innerHTML = '<i data-lucide="play"></i>';
    videoOverlay.style.display = 'flex';
  } else {
    // Play
    isVideoPlaying = true;
    videoPlayToggleBtn.innerHTML = '<i data-lucide="pause"></i>';
    videoOverlay.style.display = 'none';
    
    let duration = 300; // 5 min mock
    let current = 0;
    
    videoProgressTimer = setInterval(() => {
      current += 10; // Fast simulation: updates by 10s every second
      if (current >= duration) {
        current = duration;
        clearInterval(videoProgressTimer);
        completeCurrentLesson();
      }
      
      const pct = (current / duration) * 100;
      videoProgressFill.style.width = `${pct}%`;
      
      const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      };
      
      videoTimeText.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    }, 1000);
  }
  lucide.createIcons();
}

if (videoOverlayBtn) {
  videoOverlayBtn.addEventListener('click', simulatePlayVideo);
  videoPlayToggleBtn.addEventListener('click', simulatePlayVideo);
  document.getElementById('video-overlay').addEventListener('click', simulatePlayVideo);
}

function completeCurrentLesson() {
  resetClassroomVideo();
  
  const course = state.courses.find(c => c.id === state.activeCourseId);
  const enrollment = state.user.enrolledCourses.find(ec => ec.id === state.activeCourseId);
  
  if (!enrollment.completedLessons.includes(state.activeLessonId)) {
    enrollment.completedLessons.push(state.activeLessonId);
    
    // Calculate new overall progress
    const pct = Math.round((enrollment.completedLessons.length / course.lessons.length) * 100);
    enrollment.progress = pct;
    
    // Award XP
    awardXP(100);
    
    // Check if whole course completed
    if (pct === 100) {
      if (!state.user.completedCourses.includes(course.id)) {
        state.user.completedCourses.push(course.id);
        awardXP(300);
        
        // Award badge Code Warrior
        const cwBadge = state.user.badges.find(b => b.id === 'code-warrior');
        if (cwBadge && !cwBadge.earned) {
          cwBadge.earned = true;
          showToast("Badge Unlocked: Code Warrior! ⚔️", "success");
        }
      }
      showToast(`Congratulations! You completed: ${course.title}`, "success");
    } else {
      showToast("Lesson completed! Earned +100 XP", "success");
    }
    
    saveState();
  }
  
  renderClassroom();
}

// Classroom notes saving
const saveNotesBtn = document.getElementById('notes-save-btn');
if (saveNotesBtn) {
  saveNotesBtn.addEventListener('click', () => {
    const notesText = document.getElementById('notes-textarea').value;
    state.user.notes[state.activeCourseId] = notesText;
    
    // Award Badge 'Scribe'
    const scribeBadge = state.user.badges.find(b => b.id === 'scribe');
    if (scribeBadge && !scribeBadge.earned) {
      scribeBadge.earned = true;
      showToast("Badge Unlocked: Scribe! 📝", "success");
    }
    
    saveState();
    const statusText = document.getElementById('notes-save-status');
    statusText.textContent = "Saved to local storage!";
    setTimeout(() => {
      statusText.textContent = "All changes saved locally";
    }, 2000);
  });
}

// Notes keyup auto-saving debounce
let noteTimeout = null;
const notesTextarea = document.getElementById('notes-textarea');
if (notesTextarea) {
  notesTextarea.addEventListener('keyup', () => {
    clearTimeout(noteTimeout);
    document.getElementById('notes-save-status').textContent = "Saving changes...";
    noteTimeout = setTimeout(() => {
      state.user.notes[state.activeCourseId] = notesTextarea.value;
      saveState();
      document.getElementById('notes-save-status').textContent = "Autosaved draft";
    }, 1500);
  });
}

// Classroom Sidebar take quiz button router trigger
const classTakeQuizBtn = document.getElementById('classroom-take-quiz-btn');
if (classTakeQuizBtn) {
  classTakeQuizBtn.addEventListener('click', () => {
    navigateTo('quiz');
  });
}

// ==========================================
// 9. Timed Quiz Assessment Engine
// ==========================================

const quizStartBtn = document.getElementById('quiz-start-btn');
const quizQuitBtn = document.getElementById('quiz-quit-btn');
const quizNextBtn = document.getElementById('quiz-next-btn');

function resetQuizState() {
  clearInterval(state.activeQuiz.timerInterval);
  state.activeQuiz = {
    inProgress: false,
    currentQuestionIndex: 0,
    answers: [],
    timerSeconds: 300,
    timerInterval: null
  };
  
  // Show intro container, hide others
  document.getElementById('quiz-intro-state').classList.add('active');
  document.getElementById('quiz-active-state').classList.remove('active');
  document.getElementById('quiz-results-state').classList.remove('active');
}

function startQuiz() {
  state.activeQuiz.inProgress = true;
  state.activeQuiz.currentQuestionIndex = 0;
  state.activeQuiz.answers = [];
  state.activeQuiz.timerSeconds = 300;
  
  document.getElementById('quiz-intro-state').classList.remove('active');
  document.getElementById('quiz-active-state').classList.add('active');
  document.getElementById('quiz-results-state').classList.remove('active');
  
  loadQuizQuestion();
  startQuizTimer();
  showToast("Exam started! You have 5 minutes.", "info");
}

function startQuizTimer() {
  const timerText = document.getElementById('quiz-timer-text');
  
  state.activeQuiz.timerInterval = setInterval(() => {
    state.activeQuiz.timerSeconds--;
    
    if (state.activeQuiz.timerSeconds <= 0) {
      clearInterval(state.activeQuiz.timerInterval);
      finishQuiz();
      showToast("Time ran out! Exam submitted automatically.", "error");
      return;
    }
    
    const minutes = Math.floor(state.activeQuiz.timerSeconds / 60);
    const seconds = (state.activeQuiz.timerSeconds % 60).toString().padStart(2, '0');
    timerText.innerHTML = `<i data-lucide="clock"></i> ${minutes}:${seconds}`;
    lucide.createIcons();
  }, 1000);
}

function loadQuizQuestion() {
  const index = state.activeQuiz.currentQuestionIndex;
  const question = QUIZ_QUESTIONS[index];
  
  // Update progress bars
  const progressPercent = ((index) / QUIZ_QUESTIONS.length) * 100;
  document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
  document.getElementById('quiz-q-num').textContent = `Question ${index + 1} of ${QUIZ_QUESTIONS.length}`;
  
  document.getElementById('quiz-question-title').textContent = question.question;
  
  // Render options list
  const container = document.getElementById('quiz-options-container');
  container.innerHTML = '';
  
  question.options.forEach((opt, idx) => {
    const letter = String.fromCharCode(65 + idx); // A, B, C, D
    const optionRow = document.createElement('div');
    optionRow.className = 'quiz-option';
    optionRow.setAttribute('data-index', idx);
    
    optionRow.innerHTML = `
      <div class="quiz-option-letter">${letter}</div>
      <div class="quiz-option-text">${opt}</div>
    `;
    
    optionRow.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
      optionRow.classList.add('selected');
      state.activeQuiz.answers[index] = idx;
      quizNextBtn.removeAttribute('disabled');
    });
    
    container.appendChild(optionRow);
  });
  
  quizNextBtn.setAttribute('disabled', 'true');
  if (index === QUIZ_QUESTIONS.length - 1) {
    quizNextBtn.innerHTML = `Submit Exam <i data-lucide="check"></i>`;
  } else {
    quizNextBtn.innerHTML = `Next Question <i data-lucide="arrow-right"></i>`;
  }
  lucide.createIcons();
}

function nextQuizQuestion() {
  const index = state.activeQuiz.currentQuestionIndex;
  
  if (index === QUIZ_QUESTIONS.length - 1) {
    clearInterval(state.activeQuiz.timerInterval);
    finishQuiz();
  } else {
    state.activeQuiz.currentQuestionIndex++;
    loadQuizQuestion();
  }
}

function finishQuiz() {
  let score = 0;
  QUIZ_QUESTIONS.forEach((q, idx) => {
    if (state.activeQuiz.answers[idx] === q.answerIndex) {
      score++;
    }
  });
  
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  
  // Display results screen
  document.getElementById('quiz-active-state').classList.remove('active');
  document.getElementById('quiz-results-state').classList.add('active');
  
  const resultsCircle = document.getElementById('results-circle');
  resultsCircle.style.background = percentage >= 80 
    ? 'conic-gradient(#10B981 0%, #059669 100%)' 
    : 'conic-gradient(#EF4444 0%, #DC2626 100%)';
  
  document.getElementById('results-pct').textContent = `${percentage}%`;
  
  const heading = document.getElementById('results-heading');
  const desc = document.getElementById('results-desc');
  const mockup = document.getElementById('certificate-print-area');
  
  if (percentage >= 80) {
    heading.textContent = "Congratulations! You Passed!";
    desc.textContent = `You scored ${score} out of ${QUIZ_QUESTIONS.length} (${percentage}%). Your verified certificate is ready to print or download.`;
    mockup.style.display = 'block';
    
    // Unlock certificate in completing courses
    if (!state.user.completedCourses.includes("js-essentials")) {
      state.user.completedCourses.push("js-essentials");
    }
    
    // Award Badge Quiz Master
    const qmBadge = state.user.badges.find(b => b.id === 'quiz-master');
    if (qmBadge && !qmBadge.earned) {
      qmBadge.earned = true;
      showToast("Badge Unlocked: Quiz Master! 🎓", "success");
    }
    
    awardXP(500);
    saveState();
    displayCertificateResult(score, "JavaScript Essentials");
  } else {
    heading.textContent = "Keep Practicing!";
    desc.textContent = `You scored ${score} out of ${QUIZ_QUESTIONS.length} (${percentage}%). Minimum passing score is 80%. Review curriculum notes and try again.`;
    mockup.style.display = 'none';
  }
}

function displayCertificateResult(score, courseTitle) {
  document.getElementById('cert-recipient-name').textContent = state.user.fullname;
  document.getElementById('cert-course-name').textContent = courseTitle;
  
  // Current Date formatting
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('cert-issue-date').textContent = `Issued on ${today.toLocaleDateString('en-US', options)}`;
  document.getElementById('cert-id-text').textContent = `Verification ID: LE-JS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

if (quizStartBtn) {
  quizStartBtn.addEventListener('click', startQuiz);
  quizQuitBtn.addEventListener('click', resetQuizState);
  quizNextBtn.addEventListener('click', nextQuizQuestion);
}

// Results Action Buttons
const downloadCertBtn = document.getElementById('results-download-btn');
if (downloadCertBtn) {
  downloadCertBtn.addEventListener('click', () => {
    window.print(); // Triggers native browser print dialong using CSS print rules
    showToast("Opening print dialog. Best printed as Landscape PDF.", "success");
  });
}

const resDashboardBtn = document.getElementById('results-dashboard-btn');
if (resDashboardBtn) {
  resDashboardBtn.addEventListener('click', () => {
    navigateTo('dashboard');
  });
}

// ==========================================
// 10. General Helpers (Theme Switch, XP, Menu)
// ==========================================

// Theme Toggler
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-theme', targetTheme);
    localStorage.setItem('learned_theme', targetTheme);
    showToast(`Switched to ${targetTheme} mode`, 'info');
  });
}

// Apply Saved Theme
const savedTheme = localStorage.getItem('learned_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Gamified XP Allocation System
function awardXP(amount) {
  state.user.xp += amount;
  while (state.user.xp >= state.user.xpNeeded) {
    state.user.xp -= state.user.xpNeeded;
    state.user.level += 1;
    state.user.xpNeeded = Math.round(state.user.xpNeeded * 1.25);
    showToast(`LEVEL UP! You reached Level ${state.user.level}! 🎉`, 'success');
  }
}

// Mobile navigation toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
}

// Testimonials slider controllers
document.getElementById('testimonial-prev')?.addEventListener('click', () => {
  activeTestimonialIndex = (activeTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  renderTestimonials();
});

document.getElementById('testimonial-next')?.addEventListener('click', () => {
  activeTestimonialIndex = (activeTestimonialIndex + 1) % TESTIMONIALS.length;
  renderTestimonials();
});

// Navigation links setup router hooks
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (href && href.startsWith('#')) {
    const targetView = href.substring(1);
    if (VIEWS[targetView]) {
      e.preventDefault();
      window.location.hash = href;
      navigateTo(targetView);
    }
  }
});

// App Initiation
window.addEventListener('DOMContentLoaded', () => {
  // Setup view routing
  handleHashRoute();
  window.addEventListener('hashchange', handleHashRoute);
  
  // Render sub elements
  renderTestimonials();
  updateUI();
});
