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
/* ================================================================
   CALENDAR & WORLD CLOCKS
   - All public holidays are hardcoded (no API needed, no updates required)
   - Covers 30+ countries with full year holidays
   - World clocks update every second using Intl.DateTimeFormat
================================================================ */
 
// ── HARDCODED PUBLIC HOLIDAYS DATABASE ─────────────────────────────────────
// Format: "MM-DD": "Holiday Name"
// For Easter-based holidays, computed dynamically for current year
const HOLIDAY_DB = {
  GH: {
    name: "Ghana",
    fixed: {
      "01-01": "New Year's Day",
      "03-06": "Independence Day",
      "05-01": "Workers' Day",
      "07-01": "Republic Day",
      "08-04": "Founders' Day",
      "09-21": "Kwame Nkrumah Memorial Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 0, name: "Easter Sunday" },
      { offset: 1, name: "Easter Monday" }
    ],
    variable: (yr) => {
      // Eid al-Fitr and Eid al-Adha (approximate)
      return [
        { date: eidAlFitr(yr), name: "Eid al-Fitr" },
        { date: eidAlAdha(yr), name: "Eid al-Adha" }
      ];
    }
  },
  NG: {
    name: "Nigeria",
    fixed: {
      "01-01": "New Year's Day",
      "05-01": "Workers' Day",
      "06-12": "Democracy Day",
      "10-01": "Independence Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" },
      { date: islamicNewYear(yr), name: "Islamic New Year" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  KE: {
    name: "Kenya",
    fixed: {
      "01-01": "New Year's Day",
      "04-19": "Good Friday",
      "05-01": "Labour Day",
      "06-01": "Madaraka Day",
      "10-10": "Huduma Day",
      "10-20": "Mashujaa Day",
      "12-12": "Jamhuri Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" }
    ])
  },
  ZA: {
    name: "South Africa",
    fixed: {
      "01-01": "New Year's Day",
      "03-21": "Human Rights Day",
      "04-27": "Freedom Day",
      "05-01": "Workers' Day",
      "06-16": "Youth Day",
      "08-09": "National Women's Day",
      "09-24": "Heritage Day",
      "12-16": "Day of Reconciliation",
      "12-25": "Christmas Day",
      "12-26": "Day of Goodwill"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 0, name: "Family Day (Easter Monday)" }
    ]
  },
  US: {
    name: "United States",
    fixed: {
      "01-01": "New Year's Day",
      "06-19": "Juneteenth",
      "07-04": "Independence Day",
      "11-11": "Veterans Day",
      "12-25": "Christmas Day"
    },
    computed: (yr) => {
      const d = [];
      d.push({ date: nthWeekday(yr, 1, 1, 3), name: "Martin Luther King Jr. Day" });
      d.push({ date: nthWeekday(yr, 2, 1, 3), name: "Presidents' Day" });
      d.push({ date: nthWeekday(yr, 5, 1, 4, true), name: "Memorial Day" });
      d.push({ date: nthWeekday(yr, 9, 1, 1), name: "Labor Day" });
      d.push({ date: nthWeekday(yr, 10, 4, 2), name: "Columbus Day" });
      d.push({ date: nthWeekday(yr, 11, 4, 4), name: "Thanksgiving Day" });
      return d;
    }
  },
  GB: {
    name: "United Kingdom",
    fixed: {
      "01-01": "New Year's Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ],
    computed: (yr) => [
      { date: nthWeekday(yr, 5, 1, 1), name: "Early May Bank Holiday" },
      { date: nthWeekday(yr, 5, 1, 4, true), name: "Spring Bank Holiday" },
      { date: nthWeekday(yr, 8, 1, 4, true), name: "Summer Bank Holiday" }
    ]
  },
  AE: {
    name: "UAE",
    fixed: {
      "01-01": "New Year's Day",
      "12-02": "National Day",
      "12-03": "National Day Holiday"
    },
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr Day 1" },
      { date: addDays(eidAlFitr(yr), 1), name: "Eid al-Fitr Day 2" },
      { date: addDays(eidAlFitr(yr), 2), name: "Eid al-Fitr Day 3" },
      { date: eidAlAdha(yr), name: "Eid al-Adha Day 1" },
      { date: addDays(eidAlAdha(yr), 1), name: "Eid al-Adha Day 2" },
      { date: addDays(eidAlAdha(yr), 2), name: "Eid al-Adha Day 3" },
      { date: islamicNewYear(yr), name: "Islamic New Year" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  DE: {
    name: "Germany",
    fixed: {
      "01-01": "New Year's Day",
      "05-01": "Labour Day",
      "10-03": "German Unity Day",
      "12-25": "Christmas Day",
      "12-26": "Second Day of Christmas"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 0, name: "Easter Sunday" },
      { offset: 1, name: "Easter Monday" },
      { offset: 39, name: "Ascension Day" },
      { offset: 49, name: "Whit Sunday" },
      { offset: 50, name: "Whit Monday" }
    ]
  },
  FR: {
    name: "France",
    fixed: {
      "01-01": "New Year's Day",
      "05-01": "Labour Day",
      "05-08": "Victory in Europe Day",
      "07-14": "Bastille Day",
      "08-15": "Assumption of Mary",
      "11-01": "All Saints' Day",
      "11-11": "Armistice Day",
      "12-25": "Christmas Day"
    },
    easter: [
      { offset: 1, name: "Easter Monday" },
      { offset: 39, name: "Ascension Day" },
      { offset: 50, name: "Whit Monday" }
    ]
  },
  CA: {
    name: "Canada",
    fixed: {
      "01-01": "New Year's Day",
      "07-01": "Canada Day",
      "11-11": "Remembrance Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ],
    computed: (yr) => [
      { date: nthWeekday(yr, 5, 1, 3, true), name: "Victoria Day" },
      { date: nthWeekday(yr, 9, 1, 1), name: "Labour Day" },
      { date: nthWeekday(yr, 10, 1, 2), name: "Thanksgiving Day" }
    ]
  },
  AU: {
    name: "Australia",
    fixed: {
      "01-01": "New Year's Day",
      "01-26": "Australia Day",
      "04-25": "Anzac Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 0, name: "Easter Saturday" },
      { offset: 1, name: "Easter Monday" }
    ]
  },
  IN: {
    name: "India",
    fixed: {
      "01-26": "Republic Day",
      "08-15": "Independence Day",
      "10-02": "Gandhi Jayanti",
      "12-25": "Christmas Day"
    },
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" }
    ])
  },
  CN: {
    name: "China",
    fixed: {
      "01-01": "New Year's Day",
      "03-08": "Women's Day",
      "05-01": "Labour Day",
      "06-01": "Children's Day",
      "10-01": "National Day",
      "10-02": "National Day Holiday",
      "10-03": "National Day Holiday"
    }
  },
  JP: {
    name: "Japan",
    fixed: {
      "01-01": "New Year's Day",
      "02-11": "Foundation Day",
      "02-23": "Emperor's Birthday",
      "03-20": "Vernal Equinox Day",
      "04-29": "Showa Day",
      "05-03": "Constitution Memorial Day",
      "05-04": "Greenery Day",
      "05-05": "Children's Day",
      "07-17": "Marine Day",
      "08-11": "Mountain Day",
      "09-16": "Respect for the Aged Day",
      "09-23": "Autumnal Equinox Day",
      "10-14": "Sports Day",
      "11-03": "Culture Day",
      "11-23": "Labour Thanksgiving Day"
    }
  },
  BR: {
    name: "Brazil",
    fixed: {
      "01-01": "New Year's Day",
      "04-21": "Tiradentes Day",
      "05-01": "Labour Day",
      "09-07": "Independence Day",
      "10-12": "Our Lady of Aparecida",
      "11-02": "All Souls' Day",
      "11-15": "Proclamation of the Republic",
      "12-25": "Christmas Day"
    },
    easter: [
      { offset: -48, name: "Carnival" },
      { offset: -47, name: "Carnival" },
      { offset: -2, name: "Good Friday" },
      { offset: 60, name: "Corpus Christi" }
    ]
  },
  SG: {
    name: "Singapore",
    fixed: {
      "01-01": "New Year's Day",
      "05-01": "Labour Day",
      "08-09": "National Day",
      "12-25": "Christmas Day"
    },
    easter: [{ offset: -2, name: "Good Friday" }],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Hari Raya Puasa" },
      { date: eidAlAdha(yr), name: "Hari Raya Haji" }
    ])
  },
  QA: {
    name: "Qatar",
    fixed: {
      "02-22": "National Sports Day",
      "12-18": "National Day"
    },
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: addDays(eidAlFitr(yr),1), name: "Eid al-Fitr Day 2" },
      { date: addDays(eidAlFitr(yr),2), name: "Eid al-Fitr Day 3" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" },
      { date: addDays(eidAlAdha(yr),1), name: "Eid al-Adha Day 2" },
      { date: addDays(eidAlAdha(yr),2), name: "Eid al-Adha Day 3" },
      { date: islamicNewYear(yr), name: "Islamic New Year" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  SA: {
    name: "Saudi Arabia",
    fixed: {
      "09-23": "Saudi National Day",
      "02-22": "Founding Day"
    },
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: addDays(eidAlFitr(yr),1), name: "Eid al-Fitr Day 2" },
      { date: addDays(eidAlFitr(yr),2), name: "Eid al-Fitr Day 3" },
      { date: eidAlAdha(yr), name: "Eid al-Adha Day 1" },
      { date: addDays(eidAlAdha(yr),1), name: "Eid al-Adha Day 2" },
      { date: addDays(eidAlAdha(yr),2), name: "Eid al-Adha Day 3" },
      { date: islamicNewYear(yr), name: "Islamic New Year" }
    ])
  },
  EG: {
    name: "Egypt",
    fixed: {
      "01-07": "Coptic Christmas",
      "04-25": "Sinai Liberation Day",
      "05-01": "Labour Day",
      "07-23": "Revolution Day",
      "10-06": "Armed Forces Day"
    },
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: addDays(eidAlFitr(yr),1), name: "Eid al-Fitr Day 2" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" },
      { date: islamicNewYear(yr), name: "Islamic New Year" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  ET: {
    name: "Ethiopia",
    fixed: {
      "01-07": "Ethiopian Christmas",
      "01-19": "Timkat (Epiphany)",
      "03-02": "Victory of Adwa",
      "05-01": "Labour Day",
      "05-05": "Patriots' Victory Day",
      "05-28": "Downfall of the Derg",
      "09-11": "Ethiopian New Year",
      "09-27": "Meskel (Finding of the Cross)"
    },
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" }
    ])
  },
  CI: {
    name: "Côte d'Ivoire",
    fixed: {
      "01-01": "New Year's Day",
      "05-01": "Labour Day",
      "08-07": "Independence Day",
      "08-15": "Assumption Day",
      "11-01": "All Saints' Day",
      "11-15": "National Peace Day",
      "12-25": "Christmas Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" },
      { offset: 39, name: "Ascension Day" },
      { offset: 50, name: "Whit Monday" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  SN: {
    name: "Senegal",
    fixed: {
      "01-01": "New Year's Day",
      "04-04": "Independence Day",
      "05-01": "Labour Day",
      "08-15": "Assumption Day",
      "11-01": "All Saints' Day",
      "12-25": "Christmas Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 0, name: "Easter Sunday" },
      { offset: 50, name: "Whit Monday" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Korite (Eid al-Fitr)" },
      { date: eidAlAdha(yr), name: "Tabaski (Eid al-Adha)" },
      { date: islamicNewYear(yr), name: "Islamic New Year" },
      { date: prophetBirthday(yr), name: "Gamou (Prophet's Birthday)" }
    ])
  },
  TZ: {
    name: "Tanzania",
    fixed: {
      "01-01": "New Year's Day",
      "01-12": "Zanzibar Revolution Day",
      "04-26": "Union Day",
      "05-01": "Workers' Day",
      "07-07": "Saba Saba Day",
      "08-08": "Peasants' Day",
      "10-14": "Nyerere Day",
      "12-09": "Independence Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  UG: {
    name: "Uganda",
    fixed: {
      "01-01": "New Year's Day",
      "01-26": "Liberation Day",
      "03-08": "Women's Day",
      "05-01": "Labour Day",
      "06-03": "Martyrs' Day",
      "06-09": "National Heroes' Day",
      "10-09": "Independence Day",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" }
    ])
  },
  CM: {
    name: "Cameroon",
    fixed: {
      "01-01": "New Year's Day",
      "02-11": "Youth Day",
      "05-01": "Labour Day",
      "05-20": "National Day",
      "08-15": "Assumption Day",
      "12-25": "Christmas Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" },
      { offset: 39, name: "Ascension Day" }
    ],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" },
      { date: prophetBirthday(yr), name: "Prophet's Birthday" }
    ])
  },
  RW: {
    name: "Rwanda",
    fixed: {
      "01-01": "New Year's Day",
      "02-01": "Heroes' Day",
      "04-07": "Genocide Memorial Day",
      "05-01": "Labour Day",
      "07-01": "Independence Day",
      "07-04": "Liberation Day",
      "08-01": "Umuganura (Harvest Festival)",
      "08-15": "Assumption of Mary",
      "12-25": "Christmas Day",
      "12-26": "Boxing Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 1, name: "Easter Monday" }
    ]
  },
  MU: {
    name: "Mauritius",
    fixed: {
      "01-01": "New Year's Day",
      "01-02": "New Year Holiday",
      "02-01": "Abolition of Slavery",
      "03-12": "Independence Day",
      "05-01": "Labour Day",
      "11-01": "All Saints' Day",
      "11-02": "Arrival of Indentured Labourers",
      "12-25": "Christmas Day"
    },
    easter: [{ offset: -2, name: "Good Friday" }],
    variable: (yr) => ([
      { date: eidAlFitr(yr), name: "Eid al-Fitr" },
      { date: eidAlAdha(yr), name: "Eid al-Adha" }
    ])
  },
  IT: {
    name: "Italy",
    fixed: {
      "01-01": "New Year's Day",
      "01-06": "Epiphany",
      "04-25": "Liberation Day",
      "05-01": "Labour Day",
      "06-02": "Republic Day",
      "08-15": "Assumption of Mary",
      "11-01": "All Saints' Day",
      "12-08": "Immaculate Conception",
      "12-25": "Christmas Day",
      "12-26": "St. Stephen's Day"
    },
    easter: [
      { offset: 0, name: "Easter Sunday" },
      { offset: 1, name: "Easter Monday" }
    ]
  },
  ES: {
    name: "Spain",
    fixed: {
      "01-01": "New Year's Day",
      "01-06": "Epiphany",
      "05-01": "Labour Day",
      "10-12": "National Day",
      "11-01": "All Saints' Day",
      "12-06": "Constitution Day",
      "12-08": "Immaculate Conception",
      "12-25": "Christmas Day"
    },
    easter: [
      { offset: -3, name: "Maundy Thursday" },
      { offset: -2, name: "Good Friday" }
    ]
  },
  NL: {
    name: "Netherlands",
    fixed: {
      "01-01": "New Year's Day",
      "04-27": "King's Day",
      "05-05": "Liberation Day",
      "12-25": "Christmas Day",
      "12-26": "Second Christmas Day"
    },
    easter: [
      { offset: -2, name: "Good Friday" },
      { offset: 0, name: "Easter Sunday" },
      { offset: 1, name: "Easter Monday" },
      { offset: 39, name: "Ascension Day" },
      { offset: 50, name: "Whit Monday" }
    ]
  }
};
 
// ── HELPER: EASTER CALCULATION (Butcher's algorithm) ──────────────────────
function getEaster(year) {
  const a = year % 19, b = Math.floor(year/100), c = year % 100;
  const d = Math.floor(b/4), e = b % 4, f = Math.floor((b+8)/25);
  const g = Math.floor((b-f+1)/3), h = (19*a+b-d-g+15) % 30;
  const i = Math.floor(c/4), k = c % 4;
  const l = (32+2*e+2*i-h-k) % 7;
  const m = Math.floor((a+11*h+22*l)/451);
  const month = Math.floor((h+l-7*m+114)/31);
  const day = ((h+l-7*m+114) % 31) + 1;
  return new Date(year, month-1, day);
}
 
function addDays(date, n) {
  if (!date) return null;
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
 
// ── ISLAMIC HOLIDAYS (approximate, Gregorian estimate) ─────────────────────
// Based on astronomical calculation; shifts ~11 days earlier each year
function islamicToGregorian(islamicYear, islamicMonth, islamicDay) {
  // Simple approximation: Islamic calendar drifts vs Gregorian
  // Reference: 1 Muharram 1446 = July 7, 2024
  const refGreg = new Date(2024, 6, 7); // 1 Muharram 1446
  const refIslamic = { year: 1446, month: 1, day: 1 };
 
  // Days from reference
  const yearsFromRef = islamicYear - refIslamic.year;
  const monthsFromRef = (islamicMonth - refIslamic.month) + yearsFromRef * 12;
  const daysFromRef = monthsFromRef * 29.53059 + (islamicDay - refIslamic.day);
  const result = new Date(refGreg);
  result.setDate(result.getDate() + Math.round(daysFromRef));
  return result;
}
 
function eidAlFitr(year) {
  // 1 Shawwal — Ramadan ends on 29/30 of 9th month
  // Rough calculation based on known dates + drift
  const known = new Date(2024, 3, 10); // Eid al-Fitr 2024: Apr 10
  const diff = year - 2024;
  const d = new Date(known);
  d.setDate(d.getDate() - Math.round(diff * 10.875));
  return d;
}
 
function eidAlAdha(year) {
  const known = new Date(2024, 5, 17); // Eid al-Adha 2024: Jun 17
  const diff = year - 2024;
  const d = new Date(known);
  d.setDate(d.getDate() - Math.round(diff * 10.875));
  return d;
}
 
function islamicNewYear(year) {
  const known = new Date(2024, 6, 7);
  const diff = year - 2024;
  const d = new Date(known);
  d.setDate(d.getDate() - Math.round(diff * 10.875));
  return d;
}
 
function prophetBirthday(year) {
  const known = new Date(2024, 8, 15); // Mawlid 2024: Sep 15
  const diff = year - 2024;
  const d = new Date(known);
  d.setDate(d.getDate() - Math.round(diff * 10.875));
  return d;
}
 
// ── HELPER: nth weekday of a month ────────────────────────────────────────
function nthWeekday(year, month, weekday, n, last=false) {
  // month: 1-based; weekday: 0=Sun,1=Mon...6=Sat; n: 1st,2nd,3rd,4th
  if (last) {
    // Last occurrence
    const lastDay = new Date(year, month, 0); // last day of month
    const diff = (lastDay.getDay() - weekday + 7) % 7;
    return new Date(year, month-1, lastDay.getDate() - diff);
  }
  const first = new Date(year, month-1, 1);
  const diff = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month-1, 1 + diff + (n-1)*7);
}
 
// ── BUILD HOLIDAY MAP FOR A YEAR ─────────────────────────────────────────
function buildHolidayMap(countryCode, year) {
  const country = HOLIDAY_DB[countryCode];
  if (!country) return {};
 
  const map = {}; // "YYYY-MM-DD" → name
 
  const pad = (n) => String(n).padStart(2,'0');
  const fmt = (d) => d ? `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` : null;
 
  // Fixed holidays
  if (country.fixed) {
    for (const [mmdd, name] of Object.entries(country.fixed)) {
      map[`${year}-${mmdd}`] = name;
    }
  }
 
  // Easter-based
  if (country.easter) {
    const easter = getEaster(year);
    for (const {offset, name} of country.easter) {
      const d = addDays(easter, offset);
      const k = fmt(d);
      if (k) map[k] = name;
    }
  }
 
  // Computed (nth weekday etc.)
  if (country.computed) {
    const items = country.computed(year);
    for (const {date, name} of items) {
      if (date) { const k = fmt(date); if (k) map[k] = name; }
    }
  }
 
  // Variable (Islamic, etc.)
  if (country.variable) {
    const items = country.variable(year);
    for (const {date, name} of items) {
      if (date) { const k = fmt(date); if (k) map[k] = name; }
    }
  }
 
  return map;
}
 
// ── CALENDAR STATE ────────────────────────────────────────────────────────
let calYear  = new Date().getFullYear();
let calMonth = new Date().getMonth(); // 0-based
let calHolidayMap = {};
 
function loadHolidays() {
  const cc = document.getElementById('calCountrySelect')?.value || 'GH';
  // Load holidays for current year AND next year (for upcoming list)
  calHolidayMap = {
    ...buildHolidayMap(cc, calYear),
    ...buildHolidayMap(cc, calYear + 1)
  };
  renderCalendar();
  renderHolidayList();
}
 
function changeCalMonth(delta) {
  calMonth += delta;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  // Refresh holiday map if year changed
  const cc = document.getElementById('calCountrySelect')?.value || 'GH';
  calHolidayMap = {
    ...buildHolidayMap(cc, calYear),
    ...buildHolidayMap(cc, calYear + 1)
  };
  renderCalendar();
  renderHolidayList();
}
 
function renderCalendar() {
  const el = document.getElementById('calDays');
  const lbl = document.getElementById('calMonthLabel');
  if (!el || !lbl) return;
 
  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  lbl.textContent = `${monthNames[calMonth]} ${calYear}`;
 
  const today = new Date();
  const todayStr = fmtDate(today);
 
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const prevDays = new Date(calYear, calMonth, 0).getDate();
 
  let html = '';
 
  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day cal-day-empty cal-day-other-month">${prevDays - i}</div>`;
  }
 
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${calYear}-${pad2(calMonth+1)}-${pad2(d)}`;
    const dow = new Date(calYear, calMonth, d).getDay();
    const isToday   = dateStr === todayStr;
    const isHoliday = !!calHolidayMap[dateStr];
    const isWeekend = dow === 0 || dow === 6;
 
    let cls = 'cal-day';
    if (isToday)   cls += ' cal-day-today';
    else if (isHoliday) cls += ' cal-day-holiday';
    else if (isWeekend) cls += ' cal-day-weekend';
 
    const title = isHoliday ? `title="${calHolidayMap[dateStr]}"` : '';
    html += `<div class="${cls}" ${title}>${d}</div>`;
  }
 
  // Next month padding to complete the grid
  const totalCells = firstDay + daysInMonth;
  const remaining = 7 - (totalCells % 7 === 0 ? 7 : totalCells % 7);
  for (let d = 1; d <= remaining && remaining < 7; d++) {
    html += `<div class="cal-day cal-day-empty cal-day-other-month">${d}</div>`;
  }
 
  el.innerHTML = html;
}
 
function renderHolidayList() {
  const el    = document.getElementById('calHolidaysList');
  const title = document.getElementById('calHolidaysTitle');
  const cc    = document.getElementById('calCountrySelect')?.value || 'GH';
  const ctry  = HOLIDAY_DB[cc];
  if (!el) return;
 
  if (title) title.textContent = `Public Holidays — ${ctry?.name || cc}`;
 
  const today   = new Date(); today.setHours(0,0,0,0);
  const todayStr = fmtDate(today);
 
  // Gather all holidays from map, sort them
  const entries = Object.entries(calHolidayMap)
    .map(([d, name]) => ({ dateStr: d, date: new Date(d), name }))
    .filter(h => !isNaN(h.date))
    .sort((a,b) => a.date - b.date);
 
  if (entries.length === 0) {
    el.innerHTML = `<div class="cal-empty-msg">No holiday data available for this country.</div>`;
    return;
  }
 
  // Show upcoming 12 months
  const cutoff = new Date(today);
  cutoff.setMonth(cutoff.getMonth() + 13);
 
  const upcoming = entries.filter(h => h.date >= today && h.date < cutoff);
  const past     = entries.filter(h => h.date < today).slice(-3).reverse();
 
  const all = [...upcoming.slice(0, 15), ...past];
 
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'];
 
  let html = '';
  for (const {dateStr, date, name} of all) {
    const isPast   = date < today;
    const isToday  = dateStr === todayStr;
    const dayNum   = date.getDate();
    const mon      = monthNames[date.getMonth()];
    const yr       = date.getFullYear();
    const todayBadge = isToday ? `<span class="cal-h-today-badge">Today!</span>` : '';
    html += `
      <div class="cal-h-item ${isPast ? 'cal-h-past' : ''}">
        <span class="cal-h-date">${pad2(dayNum)} ${mon} ${yr}</span>
        <div>
          <div class="cal-h-name">${name}${todayBadge}</div>
        </div>
      </div>`;
  }
 
  el.innerHTML = html || `<div class="cal-empty-msg">No upcoming holidays found.</div>`;
}
 
function pad2(n) { return String(n).padStart(2,'0'); }
function fmtDate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
}
 
// ── WORLD CLOCKS ─────────────────────────────────────────────────────────
const TIMEZONES = [
  { flag:'🇬🇭', city:'Accra',         country:'Ghana',           tz:'Africa/Accra',         offset:'GMT+0'  },
  { flag:'🇳🇬', city:'Lagos',         country:'Nigeria',         tz:'Africa/Lagos',         offset:'GMT+1'  },
  { flag:'🇰🇪', city:'Nairobi',       country:'Kenya',           tz:'Africa/Nairobi',       offset:'GMT+3'  },
  { flag:'🇿🇦', city:'Johannesburg',  country:'South Africa',    tz:'Africa/Johannesburg',  offset:'GMT+2'  },
  { flag:'🇬🇧', city:'London',        country:'United Kingdom',  tz:'Europe/London',        offset:'GMT+0/+1'},
  { flag:'🇩🇪', city:'Frankfurt',     country:'Germany',         tz:'Europe/Berlin',        offset:'GMT+1/+2'},
  { flag:'🇫🇷', city:'Paris',         country:'France',          tz:'Europe/Paris',         offset:'GMT+1/+2'},
  { flag:'🇦🇪', city:'Dubai',         country:'UAE',             tz:'Asia/Dubai',           offset:'GMT+4'  },
  { flag:'🇶🇦', city:'Doha',          country:'Qatar',           tz:'Asia/Qatar',           offset:'GMT+3'  },
  { flag:'🇸🇦', city:'Riyadh',        country:'Saudi Arabia',    tz:'Asia/Riyadh',          offset:'GMT+3'  },
  { flag:'🇺🇸', city:'New York',      country:'United States',   tz:'America/New_York',     offset:'GMT-5/-4'},
  { flag:'🇺🇸', city:'Los Angeles',   country:'United States',   tz:'America/Los_Angeles',  offset:'GMT-8/-7'},
  { flag:'🇨🇦', city:'Toronto',       country:'Canada',          tz:'America/Toronto',      offset:'GMT-5/-4'},
  { flag:'🇧🇷', city:'São Paulo',     country:'Brazil',          tz:'America/Sao_Paulo',    offset:'GMT-3'  },
  { flag:'🇮🇳', city:'Mumbai',        country:'India',           tz:'Asia/Kolkata',         offset:'GMT+5:30'},
  { flag:'🇨🇳', city:'Beijing',       country:'China',           tz:'Asia/Shanghai',        offset:'GMT+8'  },
  { flag:'🇯🇵', city:'Tokyo',         country:'Japan',           tz:'Asia/Tokyo',           offset:'GMT+9'  },
  { flag:'🇸🇬', city:'Singapore',     country:'Singapore',       tz:'Asia/Singapore',       offset:'GMT+8'  },
  { flag:'🇦🇺', city:'Sydney',        country:'Australia',       tz:'Australia/Sydney',     offset:'GMT+10/+11'},
  { flag:'🇪🇬', city:'Cairo',         country:'Egypt',           tz:'Africa/Cairo',         offset:'GMT+2'  },
  { flag:'🇪🇹', city:'Addis Ababa',   country:'Ethiopia',        tz:'Africa/Addis_Ababa',   offset:'GMT+3'  },
  { flag:'🇸🇳', city:'Dakar',         country:'Senegal',         tz:'Africa/Dakar',         offset:'GMT+0'  },
];
 
function buildWorldClocks() {
  const grid = document.getElementById('tzGrid');
  if (!grid) return;
  grid.innerHTML = TIMEZONES.map((tz, i) =>
    `<div class="tz-card" id="tzcard-${i}">
      <span class="tz-flag">${tz.flag}</span>
      <div class="tz-city">${tz.city}</div>
      <div class="tz-country">${tz.country}</div>
      <div class="tz-time" id="tztime-${i}">--:--:--</div>
      <div class="tz-date" id="tzdate-${i}">---</div>
      <span class="tz-offset">${tz.offset}</span>
      <div class="tz-daynight" id="tzdn-${i}"></div>
    </div>`
  ).join('');
}
 
function updateClocks() {
  const now = new Date();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 
  TIMEZONES.forEach((tz, i) => {
    try {
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz.tz,
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(now);
 
      const dateObj = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz.tz,
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
      }).formatToParts(now);
 
      const parts = {};
      dateObj.forEach(p => { parts[p.type] = p.value; });
      const dateStr = `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year}`;
 
      // Day/night based on local hour
      const hourStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz.tz, hour: 'numeric', hour12: false
      }).format(now);
      const hr = parseInt(hourStr);
      const isDay = hr >= 6 && hr < 20;
 
      const tEl = document.getElementById(`tztime-${i}`);
      const dEl = document.getElementById(`tzdate-${i}`);
      const dnEl = document.getElementById(`tzdn-${i}`);
      if (tEl) tEl.textContent = timeStr;
      if (dEl) dEl.textContent = dateStr;
      if (dnEl) dnEl.innerHTML = isDay
        ? `<i data-lucide="sun" class="tz-sun" style="width:12px;height:12px"></i> Daytime`
        : `<i data-lucide="moon" class="tz-moon" style="width:12px;height:12px"></i> Nighttime`;
    } catch(e) { /* timezone not supported */ }
  });
  // Reinit lucide for sun/moon icons
  if (window.lucide) lucide.createIcons();
}
 
// ── INIT CALENDAR & CLOCKS ────────────────────────────────────────────────
function initCalendarAndClocks() {
  buildWorldClocks();
  loadHolidays();
  updateClocks();
  setInterval(updateClocks, 1000);
}
 
// Hook into the existing load handler
const _origLoad = window.onload;
window.addEventListener('load', function() {
  initCalendarAndClocks();
});
 
function openLightbox(img){
  document.getElementById("imgLightbox").style.display = "flex";
  document.getElementById("lightboxImg").src = img.src;
}

function closeLightbox(){
  document.getElementById("imgLightbox").style.display = "none";
}
function openLightbox(img){
  const lightbox = document.getElementById("imgLightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
}

function closeLightbox(){
  document.getElementById("imgLightbox").style.display = "none";
}











