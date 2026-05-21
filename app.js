(function () {
  'use strict';

  const TOTAL = 13;
  const INTERACTIVE = [5, 10];

  const SECTION_LABELS = {
    1:  '',
    2:  '议程 · Agenda',
    3:  '沟通 · Supervisor',
    4:  '求助 · Ask for Help',
    5:  '互动 · Activity',
    6:  '常用语 · Phrases',
    7:  '邮件 · Email',
    8:  '请假 · Calling in Sick',
    9:  '休假 · Day Off',
    10: '互动 · Quiz',
    11: '解决问题 · Problems',
    12: 'CSC 服务',
    13: '资源 · Resources',
  };

  let cur = 1;

  function toggleLang() {
    const isZh = document.body.classList.toggle('zh');
    localStorage.setItem('wcm_lang', isZh ? 'zh' : 'en');
    document.documentElement.lang = isZh ? 'zh-Hans' : 'en';
    document.getElementById('langToggle').textContent = isZh ? '中文' : 'EN';
  }

  (function initLang() {
    const saved = localStorage.getItem('wcm_lang');
    const isZh = saved !== 'en';
    document.body.classList.toggle('zh', isZh);
    document.documentElement.lang = isZh ? 'zh-Hans' : 'en';
    document.getElementById('langToggle').textContent = isZh ? '中文' : 'EN';
  })();

  function isRevealed(n) {
    const el = document.getElementById('slide-' + n);
    if (!el) return false;
    if (n === 10) return el.dataset.phase === 'done';
    return el.dataset.phase === 'answer';
  }

  function revealActivity() {
    const slide = document.getElementById('slide-5');
    slide.dataset.phase = 'answer';
    document.getElementById('response-c').classList.add('winner');
    document.getElementById('response-a').classList.add('loser');
    document.getElementById('response-b').classList.add('loser');
    document.getElementById('activity-answer').style.display = 'block';
    document.getElementById('reveal-btn-5').disabled = true;
    document.getElementById('nextBtn').disabled = false;
  }

  function revealQ1() {
    const slide = document.getElementById('slide-10');
    slide.dataset.phase = 'q2';
    document.getElementById('q1-answer').style.display = 'block';
    document.getElementById('q2-block').style.display = 'block';
    document.getElementById('reveal-btn-q1').disabled = true;
  }

  function revealQ2() {
    const slide = document.getElementById('slide-10');
    slide.dataset.phase = 'done';
    document.getElementById('q2-answer').style.display = 'block';
    document.getElementById('reveal-btn-q2').disabled = true;
    document.getElementById('nextBtn').disabled = false;
  }

  function showSlide(n) {
    document.querySelectorAll('.slide').forEach((s, i) => {
      s.classList.toggle('active', i + 1 === n);
    });

    document.getElementById('slideCounter').textContent = n + ' / ' + TOTAL;
    document.getElementById('sectionLabel').textContent = SECTION_LABELS[n] || '';

    const dots = document.getElementById('progressDots');
    dots.innerHTML = Array.from({ length: TOTAL }, (_, i) => {
      const cls = i + 1 === n ? 'active' : i + 1 < n ? 'done' : '';
      return '<span class="dot ' + cls + '" aria-hidden="true"></span>';
    }).join('');

    document.querySelectorAll('.slide [tabindex="-1"]').forEach(el => el.removeAttribute('tabindex'));
    const heading = document.querySelector('#slide-' + n + ' h1, #slide-' + n + ' h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }

    document.getElementById('prevBtn').disabled = (n === 1);
    document.getElementById('nextBtn').disabled = (n === TOTAL) || (INTERACTIVE.includes(n) && !isRevealed(n));
  }

  function nextSlide() {
    if (INTERACTIVE.includes(cur) && !isRevealed(cur)) return;
    if (cur < TOTAL) { cur++; showSlide(cur); }
  }

  function prevSlide() {
    if (cur > 1) { cur--; showSlide(cur); }
  }

  function goHome() {
    cur = 1;
    showSlide(1);
  }

  const ACTIONS = {
    'toggle-lang': toggleLang,
    'home': goHome,
    'prev-slide': prevSlide,
    'next-slide': nextSlide,
    'reveal-activity': revealActivity,
    'reveal-q1': revealQ1,
    'reveal-q2': revealQ2,
  };

  document.body.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-action]');
    if (trigger) {
      const fn = ACTIONS[trigger.dataset.action];
      if (fn) { e.stopPropagation(); fn(); return; }
    }
    const slidesArea = e.target.closest('#slidesArea');
    if (!slidesArea) return;
    if (e.target.closest('a, button')) return;
    nextSlide();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault(); nextSlide();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); prevSlide();
    }
  });

  (function () {
    const now = new Date();
    document.getElementById('dateLine').textContent =
      now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
  })();

  try {
    new QRCode(document.getElementById('qr-container'), {
      text: 'https://workplace-communication-workshop.pages.dev/resources',
      width: 148,
      height: 148,
      colorDark: '#0c4a6e',
      colorLight: '#f0f9ff'
    });
  } catch (e) {
    const el = document.getElementById('qr-container');
    if (el) el.textContent = 'workplace-communication-workshop.pages.dev/resources';
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

  showSlide(1);
})();
