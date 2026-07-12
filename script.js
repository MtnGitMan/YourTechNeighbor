// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile nav after tapping a link
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Hero "right now, I could be fixing" rotator
// Edit this list to reflect the jobs you actually want to advertise.
// =========================================================
const rotatorItems = [
  'a PC that won\u2019t boot',
  'a security camera that won\u2019t connect',
  'a Wi-Fi dead zone in the back bedroom',
  'a game console with a dead HDMI port',
  'a home network that keeps dropping',
  'a car fob that needs programming',
  'a media server for old family photos'
];

const rotatorEl = document.getElementById('rotator-text');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (rotatorEl && !prefersReducedMotion) {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % rotatorItems.length;
    rotatorEl.style.opacity = 0;
    setTimeout(() => {
      rotatorEl.textContent = rotatorItems[index];
      rotatorEl.style.opacity = 1;
    }, 200);
  }, 3200);
  rotatorEl.style.transition = 'opacity 0.2s ease';
}

// =========================================================
// Contact form — AJAX submit to Formspree (or any endpoint that
// accepts a POST with Accept: application/json)
// =========================================================
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const actionUrl = form.getAttribute('action');
  if (!actionUrl || actionUrl.includes('REPLACE_WITH_YOUR_FORM_ID')) {
    statusEl.dataset.state = 'error';
    statusEl.textContent = 'Form isn\u2019t connected yet — add your Formspree (or other) endpoint in index.html.';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending\u2026';
  statusEl.dataset.state = '';
  statusEl.textContent = '';

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      statusEl.dataset.state = 'success';
      statusEl.textContent = 'Got it — I\u2019ll follow up soon.';
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    statusEl.dataset.state = 'error';
    statusEl.textContent = 'Something went wrong sending that. Try again, or email/call directly.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send it over';
  }
});
