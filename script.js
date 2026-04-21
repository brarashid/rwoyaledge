// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('data-page') === pageId) link.classList.add('active-nav');
  });
  document.getElementById('navLinks').classList.remove('open');
  setTimeout(() => { lucide.createIcons(); initReveal(); }, 60);
  return false;
}

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('open');
});
document.addEventListener('click', function (e) {
  const nav = document.getElementById('navLinks');
  const burger = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) nav.classList.remove('open');
});

// ===== STICKY NAVBAR =====
window.addEventListener('scroll', function () {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.1)' : '0 2px 20px rgba(0,0,0,0.06)';
});

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  form.style.opacity = '0'; form.style.transition = 'opacity 0.3s ease';
  setTimeout(() => { form.style.display = 'none'; document.getElementById('formSuccess').classList.add('visible'); lucide.createIcons(); }, 300);
}

// ===== BOOKING TABS =====
function switchBookTab(tab, btn) {
  document.querySelectorAll('.b-pane').forEach(p => p.classList.remove('b-pane--active'));
  document.querySelectorAll('.b-tab').forEach(b => b.classList.remove('b-tab--active'));
  const pane = document.getElementById('pane-' + tab);
  if (pane) pane.classList.add('b-pane--active');
  btn.classList.add('b-tab--active');
  lucide.createIcons();
}

// ===== SWAP FLIGHT CITIES =====
function swapFlightCities() {
  const from = document.getElementById('f-from');
  const to = document.getElementById('f-to');
  if (!from || !to) return;
  const tmp = from.value; from.value = to.value; to.value = tmp;
}

// ===== ONE-WAY toggle =====
document.addEventListener('change', function (e) {
  if (e.target.name === 'triptype') {
    const rw = document.getElementById('f-return-wrap');
    if (rw) rw.style.display = e.target.value === 'oneway' ? 'none' : 'flex';
  }
});

// ===== HANDLE BOOKING =====
function handleBook(type) {
  const labels = { flight: 'Flight Search Submitted!', hotel: 'Hotel Search Submitted!', car: 'Car Rental Search Submitted!' };
  const msgs = {
    flight: 'Our travel team will contact you shortly with the best flight options.',
    hotel: "We'll reach out with curated hotel and Airbnb recommendations.",
    car: 'Our team will get back to you with the best car rental deals.'
  };
  document.getElementById('toastHeading').textContent = labels[type] || 'Request Sent!';
  document.getElementById('toastBody').textContent = msgs[type] || 'Our team will be in touch shortly.';
  const toast = document.getElementById('bToast');
  toast.classList.add('show');
  lucide.createIcons();
  setTimeout(() => toast.classList.remove('show'), 5000);
}
function closeToast() { document.getElementById('bToast').classList.remove('show'); }

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObs.unobserve(entry.target); } });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function initReveal() {
  const els = document.querySelectorAll(
    '.service-card,.mvv-card,.team-card,.value-item,.service-full-card,.gallery-item,.benefit-item,.how-step,.step,.testimonial-card,.video-card,.partner-logo,.booking-box,.affil-card'
  );
  els.forEach((el, i) => {
    if (!el.classList.contains('revealed')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = `opacity 0.5s ease ${(i % 8) * 0.065}s, transform 0.5s ease ${(i % 8) * 0.065}s`;
      revealObs.observe(el);
    }
  });
}

// ===== INIT =====
window.addEventListener('load', function () {
  lucide.createIcons();
  showPage('home');
  initReveal();
});

function switchBookTab(tab, btn) {
  document.querySelectorAll(".b-pane").forEach(p => p.classList.remove("b-pane--active"));
  document.querySelectorAll(".b-tab").forEach(b => b.classList.remove("b-tab--active"));

  document.getElementById("pane-" + tab).classList.add("b-pane--active");
  btn.classList.add("b-tab--active");
}

function handleBook(type) {

  let message = "";

  if (type === "flight") {
    const from = document.getElementById("f-from").value;
    const to = document.getElementById("f-to").value;
    const depart = document.getElementById("f-depart").value;
    const ret = document.getElementById("f-return").value;

    message =
`Hello, I want to book a FLIGHT:
From: ${from}
To: ${to}
Depart: ${depart}
Return: ${ret}`;
  }

  if (type === "hotel") {
    message =
`Hello, I want to book a HOTEL.
Please assist me with availability and pricing.`;
  }

  if (type === "car") {
    message =
`Hello, I want to book a CAR RENTAL.
Please send available options and prices.`;
  }

  const phone = "233553743479"; // CHANGE THIS TO YOUR NUMBER
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}
function closeToast() {
  document.getElementById("bToast").style.display = "none";
}