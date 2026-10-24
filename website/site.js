/* NextKDE 0.1.1 — behaviour
   • bilingual copy for the whole page
   • highlight carousel: tabs, dots, keyboard, swipe, autoplay with pause
   • glass lab: three presets and two sliders driving the material recipe
   • install command copy, scroll state, staggered reveal, sub-nav spy
*/

/* ------------------------------------------------------------------ */
/* Slides                                                              */
/* ------------------------------------------------------------------ */
const slides = [
  {
    tabZh: '液态玻璃', tabEn: 'Liquid Glass',
    titleZh: '液态玻璃。<br>跑在合成器里。',
    titleEn: 'Liquid Glass.<br>Running in the compositor.',
    copyZh: '玻璃不是一个 CSS 类，而是 KWin 里的一层效果：折射、边缘高光、连续圆角，模糊按区域分别计算。三个预设，两个滑块。',
    copyEn: 'Not a CSS class but a KWin effect: refraction, edge highlight, continuous rounded corners, and blur computed per region. Three presets, two sliders.',
    plateZh: '液态 · 柔光 · 磨砂，与两个强度滑块。',
    plateEn: 'Liquid · Soft light · Frosted, with two intensity sliders.',
    chipZh: '外观', chipEn: 'Appearance',
    bg: 'radial-gradient(60% 70% at 22% 24%, #6f9bd8, transparent 64%), radial-gradient(54% 60% at 78% 30%, #d89a86, transparent 66%), radial-gradient(62% 62% at 54% 92%, #74b39c, transparent 68%), #0e1014'
  },
  {
    tabZh: 'Dock', tabEn: 'Dock',
    titleZh: 'Dock。<br>跟着指针浮起来。',
    titleEn: 'The Dock.<br>It rises to meet the pointer.',
    copyZh: '悬停放大 100–300%，窗口缩略图带关闭按钮，悬停还能翻出一排信息卡。底、左、右三向停靠，也可以和顶栏合成一条。',
    copyEn: 'Magnification from 100 to 300 %, live window previews with close buttons, and an info-card carousel on the same hover. Dock at the bottom, left or right — or merge it into the top bar.',
    plateZh: '放大、缩略图、智能隐藏，都在一个 Dock 里。',
    plateEn: 'Magnification, previews and smart auto-hide in one Dock.',
    chipZh: '桌面', chipEn: 'Desktop',
    bg: 'radial-gradient(64% 72% at 30% 70%, #2f4f8f, transparent 66%), radial-gradient(52% 58% at 74% 26%, #a86f9b, transparent 66%), #0b0d13'
  },
  {
    tabZh: '启动器', tabEn: 'Launcher',
    titleZh: '启动器。<br>四张脸，一套搜索。',
    titleEn: 'The launcher.<br>Four shapes, one search.',
    copyZh: '全屏 Launchpad 式分页，圆点指示、键盘翻页；把图标拖到一起停留 650 毫秒，就合成一个文件夹。每个应用还能单独改名换图标。',
    copyEn: 'A full-screen Launchpad with pages and dots, driven by keyboard as well as pointer. Drop one icon on another and dwell 650 ms to make a folder. Apps can be renamed and re-iconed individually.',
    plateZh: '四种启动器形态，同样即时生效的搜索。',
    plateEn: 'Four launcher layouts over the same instant search.',
    chipZh: '启动器', chipEn: 'Launcher',
    bg: 'radial-gradient(60% 64% at 26% 30%, #6d5fa8, transparent 66%), radial-gradient(56% 60% at 76% 66%, #3f7fa0, transparent 68%), #0d0e14'
  },
  {
    tabZh: '控制中心', tabEn: 'Control Center',
    titleZh: '控制中心。<br>一眼，一格。',
    titleEn: 'Control Center.<br>One glance, one grid.',
    copyZh: 'Wi-Fi、蓝牙、亮度、音量、勿扰、夜灯、截图、常亮与电源在同一块玻璃面板里。Wi-Fi、蓝牙、亮度和声音各有自己的展开页，电源模式在电池面板里。',
    copyEn: 'Wi-Fi, Bluetooth, brightness, volume, Do Not Disturb, Night Light, screenshot, keep-awake and power in one glass panel — with expanded pages for Wi-Fi, Bluetooth, brightness and sound, and power profiles in the battery panel.',
    plateZh: 'Meta + B，随时呼出。',
    plateEn: 'Meta + B, whenever you need it.',
    chipZh: '控制', chipEn: 'Control',
    bg: 'radial-gradient(62% 68% at 74% 22%, #4f6fb0, transparent 66%), radial-gradient(54% 60% at 24% 78%, #a97d68, transparent 68%), #0b0d12'
  },
  {
    tabZh: '总览', tabEn: 'Overview',
    titleZh: '总览。<br>所有窗口，一起呼吸。',
    titleEn: 'Overview.<br>Every window, at a glance.',
    copyZh: 'Mission Control 式的窗口总览：顶部是虚拟桌面胶囊，窗口缩略图可以直接关闭，方向键与 Tab 在窗口间移动，回车打开。可选的 Stage 侧栏把同类窗口拢在一起，随时滑出。',
    copyEn: 'A Mission Control style overview: virtual-desktop pills across the top, window thumbnails you can close in place, Tab and arrow keys to move between them, Return to open. The optional Stage sidebar gathers windows of a kind and slides out on demand.',
    plateZh: 'Meta + Tab 打开总览。',
    plateEn: 'Meta + Tab opens Overview.',
    chipZh: '窗口', chipEn: 'Windows',
    bg: 'radial-gradient(58% 64% at 50% 18%, #3b6a72, transparent 66%), radial-gradient(52% 58% at 20% 86%, #4c5f92, transparent 68%), #0b0e10'
  },
  {
    tabZh: '剪贴板', tabEn: 'Clipboard',
    titleZh: '剪贴板。<br>复制过的东西都还在。',
    titleEn: 'Clipboard.<br>Everything you copied is still there.',
    copyZh: 'Meta + V 打开历史，方向键翻动，回车就把内容粘到光标处。搜索落在窗口标题、已安装应用与剪贴板条目上，可以置顶常用的那一条。',
    copyEn: 'Meta + V opens the history; arrow through it and press Return to paste at the caret. Search covers window titles, installed apps and clipboard entries, and entries can be pinned.',
    plateZh: '一条历史，文本与图片都在。',
    plateEn: 'One history across text and images.',
    chipZh: '效率', chipEn: 'Flow',
    bg: 'radial-gradient(60% 66% at 26% 22%, #8a6f4f, transparent 66%), radial-gradient(56% 60% at 78% 74%, #3f6d8f, transparent 68%), #0c0d11'
  }
];

/* ------------------------------------------------------------------ */
/* English dictionary, keyed by data-i18n                              */
/* ------------------------------------------------------------------ */
const en = {
  skip: 'Skip to main content',
  navLabel: 'Main navigation', subNavLabel: 'Page navigation', tabsLabel: 'Choose a highlight',
  dotsLabel: 'Choose a slide', presetLabel: 'Glass preset',
  blurLabel: 'Adjust blur strength', liquidLabel: 'Adjust liquid strength',
  navNew: 'What’s new', navDesign: 'Design', navApps: 'Apps', navMore: 'More', navCompat: 'Compatibility',
  getNext: 'Get NextKDE',
  subOverview: 'Overview', subNew: 'What’s new', subDesign: 'Design',
  subApps: 'Apps', subMore: 'More', subCompat: 'Compatibility',
  heroTitle: 'Liquid Glass.<br><span class="sheen">It all feels right.</span>',
  heroNote: 'Built for KDE Plasma 6 and Wayland. Powered by Quickshell and KWin.',
  heroCta: 'Install NextKDE', heroMore: 'See what’s new',
  heroAlt: 'NextKDE desktop: top bar, floating Dock, desktop widgets and the Theme settings page',
  glassRefractionAlt: 'Neon light in a forest refracted through four glass panels rendered by the KWin effect',
  musicAlt: 'KMusic Discover page: curated playlists, new releases and the bottom player bar',
  statement: 'Glass is not decoration.<br><span>It refracts the light behind your windows, inside the KWin compositor.</span>',
  hlEyebrow: 'What’s new',
  highlightsTitle: 'See what NextKDE<br>brings to the desktop.',
  tabGlass: 'Liquid Glass', tabDock: 'Dock', tabLauncher: 'Launcher',
  tabControl: 'Control Center', tabOverview: 'Overview', tabClipboard: 'Clipboard',
  designEyebrow: 'Appearance',
  designTitle: 'The material is real.<br>So are the controls.',
  designLead: 'NextKDE ships a KWin glass effect: refraction, edge light, continuous rounded corners, and blur controlled per region. The three presets and two intensity sliders in Settings are exactly what the panel below offers.',
  glassSample: 'Liquid Glass',
  glassCaption: 'Drag a slider to change how thick this glass feels.',
  labEyebrow: 'Material',
  labCopy: 'Three presets and two sliders — that is the whole of the Liquid Glass page in Settings.',
  presetLiquid: 'Liquid', presetSoft: 'Soft light', presetFrosted: 'Frosted',
  controlBlur: 'Blur strength', controlLiquid: 'Liquid strength',
  controlNote: 'These match the sliders in Settings. The Material appearance uses blur only — no refraction pass.',
  shotTopbar: 'Top bar screenshot', shotDockCard: 'Dock screenshot',
  shotControl: 'Control Center screenshot', shotMaterial: 'Material appearance screenshot',
  d1Title: 'The top bar.<br>Floating above content.',
  d1Copy: 'Three forms: full width, floating capsule, fully transparent. When it auto-hides, it steps aside only as a window comes near.',
  d2Title: 'The Dock.<br>Within reach.',
  d2Copy: '100–300 % magnification on hover, window previews with close buttons, docking on the bottom, left or right — and the option to merge it into the top bar.',
  d3Title: 'Control Center.<br>One glance, one grid.',
  d3Copy: 'Wi-Fi, Bluetooth, brightness, volume, Do Not Disturb, Night Light, screenshot, keep-awake and power — all in one glass panel.',
  d4Title: 'Material.<br>Another expression.',
  d4Copy: 'A Monet palette sampled from your wallpaper, plus locally generated Traditional Chinese and Japanese colour schemes.',
  widgetsEyebrow: 'Desktop',
  widgetsTitle: 'Seven widgets.<br>The desktop is a workbench.',
  widgetsLead: 'Clock, weather, calendar, todo, system, activity and music — each at three sizes, rearranged by dragging and resized from the context menu. Desktop files tidy up like folders.',
  shotWidgetClock: 'Clock widget screenshot', shotWidgetCal: 'Calendar widget screenshot',
  shotWidgetSys: 'System widget screenshot', shotWidgetFiles: 'Desktop files screenshot',
  w1Title: 'Clock.', w1Copy: 'A floral analog dial with a countdown you can start, pause and resume.',
  w2Title: 'Calendar and todo.', w2Copy: 'Schedule and lunar dates on one canvas; tasks come from the same PIM service, so an edit lands in both.',
  w3Title: 'System.', w3Copy: 'CPU, memory and storage rings, with CPU frequency and uptime heatmaps.',
  w4Title: 'Desktop files.', w4Copy: 'Rename, copy, move to trash, choose an application, sort by name, type or modified time — and folders that take a colour and an emoji.',
  appsEyebrow: 'Apps',
  appsTitle: 'Four standalone apps.<br>One language.',
  appsLead: 'Calendar, Calculator, Todo and Weather are separate Qt Quick applications — their own process, their own window, installed together by <code>kosctl install apps</code>. KMusic installs from the app store in Settings; ListenFree is a player you opt into.',
  shotCalendar: 'Calendar screenshot', shotCalc: 'Calculator screenshot',
  shotTodo: 'Todo screenshot', shotWeather: 'Weather screenshot',
  a1Title: 'Calendar.', a1Copy: 'Day, week, month and year views. Ctrl+N to add, Ctrl+1–4 to switch, Ctrl+F to search, and iCalendar import and export.',
  a2Title: 'Calculator.', a2Copy: 'Basic, scientific and conversion modes, 13 unit categories, a 100-entry recallable history, and keyboard entry. Exchange rates are a dated offline snapshot.',
  a3Title: 'Todo.', a3Copy: 'Inbox, Today, Planned, Calendar and Completed views, with priority, due date, repeat and reminders.',
  a4Title: 'Weather.', a4Copy: 'A sky that changes with the weather. Search and save locations for current, hourly and seven-day forecasts, air quality, wind and moon phase. Offline, the last complete forecast stays visible and is marked stale.',
  musicEyebrow: 'Music',
  musicTitle: 'Two choices,<br>both in a native player.',
  musicCopy: 'KMusic installs from the app store in Settings, pinned to a fixed commit and verified by hash. ListenFree must be selected explicitly; its first build downloads and verifies its own audio SDK.',
  musicLink: 'Explore KMusic', shotMusic: 'KMusic screenshot',
  moreEyebrow: 'Details',
  moreTitle: 'And so much more.',
  m1Title: 'Seven global shortcuts.', m1Copy: 'Meta + Space for the launcher, Meta + Shift + Space for Quick Search, Meta + B for Control Center, Meta + Tab for Overview, Meta + V for clipboard. All rebindable.',
  m2Title: 'Notification Center.', m2Copy: 'Inline reply on banners, grouping by app, 50 entries of session history, per-app blocking and Do Not Disturb.',
  m3Title: 'Lock screen and login.', m3Copy: 'An iPadOS-style glass clock with weather, a month view and lyrics — plus a matching SDDM login theme.',
  m4Title: 'Wallpaper transitions.', m4Copy: '15 transitions, 5 built-in themes, slideshows and colour modes. It takes over the Plasma wallpaper, and can hand it back at any time.',
  m5Title: 'One window appearance.', m5Copy: 'Continuous corners clipped natively by KWin, an edge shadow, a centred caption, and a three-dot button panel you can place at either end.',
  m6Title: 'Icon appearance.', m6Copy: 'Colour, grayscale or a single tint, with adjustable opacity — for app icons and the tray together.',
  m7Title: 'Power profiles.', m7Copy: 'Power saver, balanced and performance, read straight from power-profiles-daemon. Works on desktops too.',
  m8Title: 'Reduced motion.', m8Copy: 'Reduce motion and reduce transparency are switches in Settings: durations drop to zero and glass falls back to an opaque surface.',
  m9Title: 'Chinese and English.', m9Copy: 'Follows the system language, and can be switched by hand in Settings — applied immediately, no restart.',
  compatEyebrow: 'Compatibility',
  compatTitle: 'NextKDE 0.1.1<br>runs on these.',
  compatLead: 'Distribution recipes ship with the source; they are not a claim that every one has passed end-to-end acceptance. The environments and results that were actually accepted are recorded in the release notes.',
  specSession: 'Session',
  recipeTag: 'Package recipe', communityTag: 'Community-contributed', flakeTag: 'Flake',
  readGuide: 'Read the installation guide', browseReleases: 'Browse releases',
  compatPanelTitle: 'NextKDE 0.1.1 runs on these environments.',
  installTitle: 'Install', copy: 'Copy',
  installNote: 'Apps install separately with <code>./tools/kosctl install apps</code>. KWin effects load after you log out or reboot.',
  devTitle: 'Developers will<br>like it, too.',
  devCopy: 'The shell is written in Quickshell and QML. System integration goes through a versioned local socket, and every app is its own process. Docs, component examples and shared layouts are all public.',
  devDemo: 'Component examples', devDocs: 'Documentation', devSource: 'Source',
  getTitle: 'Begin with your<br>next login.',
  getCopy: 'Updates are free, the source is open, GPLv3. Prepare the dependencies for your distribution, then follow the guide.',
  installNow: 'Read the installation guide', getSource: 'Get it on GitHub',
  footerCopy: 'Made for KDE Plasma. Built by the open-source community.',
  fExplore: 'Explore', fProject: 'Project', fApps: 'Apps', fSupport: 'Support',
  fReleases: 'Releases', fFeedback: 'Feedback', fLicense: 'License (GPLv3)',
  fCalendar: 'Calendar', fWeather: 'Weather', fAllApps: 'All apps',
  fGuide: 'Installation guide', fGuideEn: '中文指南', fDemo: 'Component examples',
  footerNote: 'NextKDE is a community desktop project for KDE Plasma, not affiliated with KDE e.V. Spatial wallpaper, Stage and Live Stage thumbnails are features you enable by hand.',
  footerLegal: 'GPLv3 · Upstream attribution retained'
};

/* Chinese preset names reused as the glass sample's readout */
const presetNames = {
  liquid: ['液态玻璃', 'Liquid'],
  soft: ['柔光玻璃', 'Soft light'],
  frosted: ['磨砂玻璃', 'Frosted']
};

/* Language follows the operating system, using the same policy as the
   desktop itself (shared/qml/i18n/SystemLanguage.mjs): only the primary UI
   language counts — zh / zh-* → Chinese, everything else → English. An
   explicit switch is remembered, so returning visitors keep their choice. */
const LANGUAGE_KEY = 'nextkde-site-language';

function systemLanguage() {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  const primary = String(list?.[0] || '').toLowerCase().replace(/_/g, '-');
  return primary === 'zh' || primary.startsWith('zh-') ? 'zh' : 'en';
}

function storedLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved === 'zh' || saved === 'en' ? saved : null;
  } catch {
    return null;
  }
}

function rememberLanguage(next) {
  try { localStorage.setItem(LANGUAGE_KEY, next); } catch { /* private mode */ }
}

let language = storedLanguage() ?? systemLanguage();
document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';

/* Source strings are the Chinese markup; English comes from the dictionary */
const originals = new Map(
  [...document.querySelectorAll('[data-i18n]')].map(el => [el, el.innerHTML])
);
const originalAria = new Map(
  [...document.querySelectorAll('[data-i18n-aria]')].map(el => [el, el.getAttribute('aria-label')])
);
const originalAlt = new Map(
  [...document.querySelectorAll('[data-i18n-alt]')].map(el => [el, el.getAttribute('alt')])
);

/* ------------------------------------------------------------------ */
/* Elements                                                            */
/* ------------------------------------------------------------------ */
const track = document.getElementById('stage-track');
const dotsBox = document.getElementById('dots');
const tabs = [...document.querySelectorAll('.tab')];
const stage = document.getElementById('stage');
const toggle = document.getElementById('stage-toggle');
const blurInput = document.getElementById('blur');
const liquidInput = document.getElementById('liquid');
const blurOut = document.getElementById('blur-out');
const liquidOut = document.getElementById('liquid-out');
const sample = document.getElementById('glass-sample');
const sampleLabel = sample.querySelector('span');
const presets = [...document.querySelectorAll('.preset')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const zh = () => language === 'zh';

/* ------------------------------------------------------------------ */
/* Carousel                                                            */
/* ------------------------------------------------------------------ */
let current = 0;
let playing = !reducedMotion.matches;
let timer = null;
let swipe = null;

const slideMarkup = (slide, index) => `
  <div class="slide" style="--slide-bg:${slide.bg}" role="group"
       aria-roledescription="slide" aria-label="${index + 1} / ${slides.length}">
    <h3>${zh() ? slide.titleZh : slide.titleEn}</h3>
    <p>${zh() ? slide.copyZh : slide.copyEn}</p>
    <div class="slide-plate">
      <span>${zh() ? slide.plateZh : slide.plateEn}</span>
      <em class="slide-chip">${zh() ? slide.chipZh : slide.chipEn}</em>
    </div>
  </div>`;

function renderSlides() {
  track.innerHTML = slides.map(slideMarkup).join('');
  dotsBox.innerHTML = slides.map((_slide, i) => `
    <button class="dot" data-slide="${i}"
      aria-label="${zh() ? `第 ${i + 1} 页` : `Slide ${i + 1}`}"
      ${i === current ? 'aria-current="true"' : ''}></button>`).join('');
  dotsBox.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.slide)));
  });
  track.style.transition = 'none';
  track.style.transform = `translateX(${-current * 100}%)`;
  requestAnimationFrame(() => { track.style.transition = ''; });
}

function paintTabs() {
  tabs.forEach((tab, i) => {
    const active = i === current;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  stage.setAttribute('aria-labelledby', tabs[current].id);
  dotsBox.querySelectorAll('.dot').forEach((dot, i) => {
    if (i === current) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
}

function goTo(index, { focus = false } = {}) {
  current = (index + slides.length) % slides.length;
  track.style.transition = '';
  track.style.transform = `translateX(${-current * 100}%)`;
  tabs.forEach((tab, i) => {
    const active = i === current;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focus) tab.focus();
  });
  stage.setAttribute('aria-labelledby', tabs[current].id);
  dotsBox.querySelectorAll('.dot').forEach((dot, i) => {
    if (i === current) dot.setAttribute('aria-current', 'true');
    else dot.removeAttribute('aria-current');
  });
  // Keep the active capsule in view when the tab row scrolls
  const activeTab = tabs[current];
  if (activeTab.scrollIntoView) {
    activeTab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  }
  restartTimer();
}

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

function restartTimer() {
  stopTimer();
  if (!playing || reducedMotion.matches) return;
  timer = setInterval(() => goTo(current + 1), 7000);
}

function setPlaying(next) {
  playing = next;
  toggle.setAttribute('aria-pressed', String(!next));
  toggle.setAttribute('aria-label', next
    ? (zh() ? '暂停自动播放' : 'Pause autoplay')
    : (zh() ? '继续自动播放' : 'Resume autoplay'));
  restartTimer();
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => goTo(i));
  tab.addEventListener('keydown', event => {
    let next = i;
    if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    goTo(next, { focus: true });
  });
});

toggle.addEventListener('click', () => setPlaying(!playing));

// Hover and focus both hold the carousel; leaving resumes it
stage.addEventListener('pointerenter', stopTimer);
stage.addEventListener('pointerleave', restartTimer);
stage.addEventListener('focusin', stopTimer);
stage.addEventListener('focusout', restartTimer);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopTimer();
  else restartTimer();
});

// Swipe: track the drag, commit on direction and release velocity
stage.addEventListener('pointerdown', event => {
  if (event.target.closest('button')) return;
  swipe = { x: event.clientX, t: event.timeStamp };
});
stage.addEventListener('pointerup', event => {
  if (!swipe) return;
  const dx = event.clientX - swipe.x;
  const dt = Math.max(event.timeStamp - swipe.t, 1);
  const velocity = dx / dt;
  swipe = null;
  if (Math.abs(dx) < 40 && Math.abs(velocity) < 0.35) return;
  goTo(current + (dx < 0 ? 1 : -1));
});
stage.addEventListener('pointercancel', () => { swipe = null; });

renderSlides();
setPlaying(playing);

/* ------------------------------------------------------------------ */
/* Glass lab                                                           */
/* ------------------------------------------------------------------ */
/* Values mirror the three presets in Settings → Appearance */
const glassPresets = {
  liquid: { blur: 58, liquid: 100 },
  soft: { blur: 40, liquid: 62 },
  frosted: { blur: 100, liquid: 28 }
};
let activePreset = 'liquid';

function paintGlass() {
  const b = Number(blurInput.value) / 100;
  const l = Number(liquidInput.value) / 100;
  sample.style.setProperty('--tint', (0.02 + l * 0.36).toFixed(3));
  sample.style.setProperty('--blur', `${Math.round(b * 40)}px`);
  sample.style.setProperty('--sat', `${Math.round(120 + l * 80)}%`);
  blurOut.textContent = blurInput.value;
  liquidOut.textContent = liquidInput.value;
  blurInput.style.background = rangeTrack(`${blurInput.value}%`);
  liquidInput.style.background = rangeTrack(`${liquidInput.value}%`);
}

function rangeTrack(pct) {
  return `linear-gradient(90deg, rgba(245,245,247,.9) 0 ${pct}, rgba(255,255,255,.14) ${pct} 100%)`;
}

function selectPreset(name) {
  activePreset = name;
  const preset = glassPresets[name];
  blurInput.value = String(preset.blur);
  liquidInput.value = String(preset.liquid);
  presets.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.preset === name));
  });
  sampleLabel.textContent = presetNames[name][zh() ? 0 : 1];
  paintGlass();
}

presets.forEach(button => {
  button.addEventListener('click', () => selectPreset(button.dataset.preset));
});

/* A manual drag leaves the preset behind, so nothing claims to be active */
function onSlider() {
  activePreset = null;
  presets.forEach(button => button.setAttribute('aria-pressed', 'false'));
  paintGlass();
}

blurInput.addEventListener('input', onSlider);
liquidInput.addEventListener('input', onSlider);
selectPreset(activePreset);

/* ------------------------------------------------------------------ */
/* Install command                                                     */
/* ------------------------------------------------------------------ */
const copyButton = document.getElementById('copy-install');
let copyTimer = null;

copyButton.addEventListener('click', async () => {
  const command = document.getElementById('install-code').innerText;
  try {
    await navigator.clipboard.writeText(command);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('install-code'));
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }
  copyButton.textContent = zh() ? '已复制' : 'Copied';
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyButton.textContent = zh() ? '复制' : 'Copy';
  }, 1600);
});

/* ------------------------------------------------------------------ */
/* Language                                                            */
/* ------------------------------------------------------------------ */
function guideUrl(next) {
  return `https://github.com/NextKde/NextKde/blob/main/docs/GettingStarted${next === 'zh' ? '.zh-CN' : ''}.md`;
}

function applyLanguage(next) {
  language = next;
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  document.documentElement.removeAttribute('data-lang-pending');

  originals.forEach((original, el) => {
    el.innerHTML = next === 'zh' ? original : (en[el.dataset.i18n] ?? original);
  });
  originalAria.forEach((original, el) => {
    el.setAttribute('aria-label', next === 'zh' ? original : (en[el.dataset.i18nAria] ?? original));
  });
  originalAlt.forEach((original, el) => {
    el.setAttribute('alt', next === 'zh' ? original : (en[el.dataset.i18nAlt] ?? original));
  });

  const toggleBtn = document.getElementById('language');
  toggleBtn.textContent = next === 'zh' ? 'EN' : '中文';
  toggleBtn.setAttribute('aria-label', next === 'zh' ? 'Switch to English' : '切换至中文');

  document.title = next === 'zh'
    ? 'NextKDE 0.1.1 · 液态玻璃。'
    : 'NextKDE 0.1.1 · Liquid Glass.';

  copyButton.textContent = next === 'zh' ? '复制' : 'Copy';

  ['guide-link', 'install-link', 'footer-guide'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = guideUrl(next);
  });

  renderSlides();
  paintTabs();
  if (activePreset) sampleLabel.textContent = presetNames[activePreset][next === 'zh' ? 0 : 1];
  setPlaying(playing);
}

document.getElementById('language').addEventListener('click', () => {
  const next = zh() ? 'en' : 'zh';
  rememberLanguage(next);
  applyLanguage(next);
});

// Apply the resolved start-up language (system default, or a stored choice)
applyLanguage(language);

/* ------------------------------------------------------------------ */
/* Scroll state + reveal + spy                                         */
/* ------------------------------------------------------------------ */
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.body.classList.toggle('is-scrolled', scrollY > 12);
    ticking = false;
  });
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

  // Cards revealed as a group stagger in reading order
  document.querySelectorAll('.gallery, .more-grid, .footer-grid').forEach(group => {
    [...group.children].forEach((child, i) => {
      if (child.classList.contains('reveal')) {
        child.style.setProperty('--delay', `${Math.min(i, 6) * 70}ms`);
      }
    });
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

const spyLinks = [...document.querySelectorAll('.sub-nav .pill[href^="#"]')];
const spyTargets = spyLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

/* The navigation takes the polarity of the band currently under it.
   A probe line just below the sticky bars decides, so overlapping bands and
   fast scrolling cannot leave the bar in the wrong polarity. */
const bandSections = [...document.querySelectorAll('.hero, .statement, .section, .get')];
let bandTicking = false;

function sampleBand() {
  const probe = document.querySelector('.sub-nav').getBoundingClientRect().bottom + 2;
  // Pick the last band whose top has passed the probe; that is what sits under
  // the bars when sections meet edge to edge.
  let current = null;
  for (const section of bandSections) {
    const r = section.getBoundingClientRect();
    if (r.top <= probe && r.bottom > probe) { current = section; break; }
  }
  if (current && current.classList.contains('section--light')) {
    document.documentElement.setAttribute('data-band', 'light');
  } else {
    document.documentElement.removeAttribute('data-band');
  }
}

addEventListener('scroll', () => {
  if (bandTicking) return;
  bandTicking = true;
  requestAnimationFrame(() => { sampleBand(); bandTicking = false; });
}, { passive: true });
sampleBand();

if ('IntersectionObserver' in window && spyTargets.length) {
  const spy = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      spyLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-42% 0px -52% 0px' });
  spyTargets.forEach(section => spy.observe(section));
}
