const body = document.body;
const menu = document.querySelector('.menu-overlay');
const openMenu = document.querySelector('[data-menu-open]');
const closeMenu = document.querySelector('[data-menu-close]');
const menuLinks = document.querySelectorAll('[data-menu-link]');
const progressBar = document.querySelector('.scroll-progress span');
const clock = document.querySelector('[data-clock]');

function setMenu(isOpen) {
  menu.classList.toggle('open', isOpen);
  menu.setAttribute('aria-hidden', String(!isOpen));
  openMenu.setAttribute('aria-expanded', String(isOpen));
  body.classList.toggle('menu-open', isOpen);
}

openMenu?.addEventListener('click', () => setMenu(true));
closeMenu?.addEventListener('click', () => setMenu(false));
menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

function updateClock() {
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour12: false });
}
updateClock();
setInterval(updateClock, 1000);

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressBar.style.width = `${value}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -40px' });
reveals.forEach(el => observer.observe(el));

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let pointerX = -100;
let pointerY = -100;
let ringX = -100;
let ringY = -100;

window.addEventListener('pointermove', event => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (dot) dot.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
});

function animateRing() {
  ringX += (pointerX - ringX) * 0.16;
  ringY += (pointerY - ringY) * 0.16;
  if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();

const interactive = document.querySelectorAll('a, button, input');
interactive.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!ring) return;
    ring.style.width = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'rgba(117,167,255,.75)';
  });
  el.addEventListener('mouseleave', () => {
    if (!ring) return;
    ring.style.width = '32px';
    ring.style.height = '32px';
    ring.style.borderColor = 'rgba(243,240,232,.45)';
  });
});

const commandForm = document.querySelector('[data-command-form]');
const commandInput = document.querySelector('[data-command-input]');
const responseText = document.querySelector('[data-response-text]');
const responseState = document.querySelector('[data-response-state]');
const responseActions = document.querySelector('[data-response-actions]');
const quickCommands = document.querySelectorAll('[data-command]');
let typingTimer;

const responseLibrary = [
  {
    match: ['continue', 'resume', 'where we stopped', 'work'],
    text: 'Restoring the latest project state. I found the previous objective, unresolved decisions and the next useful task. Ready to continue without rebuilding the context.',
    actions: ['RESTORE CONTEXT', 'CHECK REPO', 'CONTINUE TASK']
  },
  {
    match: ['weed', 'robot', 'agribot', 'file'],
    text: 'Searching the project context for the weed-removal robot. I would group the relevant design notes, hardware decisions, references and latest prototype direction before opening anything.',
    actions: ['FIND FILES', 'GROUP CONTEXT', 'OPEN LATEST']
  },
  {
    match: ['plan', 'day', 'college', 'schedule'],
    text: 'I would combine your fixed commitments with unfinished project work, then protect a focused build block instead of producing a generic to-do list.',
    actions: ['READ CALENDAR', 'LOAD PRIORITIES', 'BUILD PLAN']
  },
  {
    match: ['design', 'interface', 'ui', 'website'],
    text: 'I would first load the product direction and visual references, then hand the brief to a design specialist while preserving the same project context for implementation.',
    actions: ['LOAD VISION', 'ROUTE TO DESIGN', 'PREPARE BUILD']
  }
];

function chooseResponse(command) {
  const normalized = command.toLowerCase();
  return responseLibrary.find(item => item.match.some(term => normalized.includes(term))) || {
    text: `I understand the goal: “${command}”. In the full product, Jarvis would first recover the relevant project context, choose the right specialist and tools, then execute with visible checkpoints.`,
    actions: ['UNDERSTAND', 'ROUTE', 'EXECUTE']
  };
}

function typeResponse(text) {
  clearInterval(typingTimer);
  responseText.textContent = '';
  responseState.textContent = 'THINKING';
  let index = 0;
  typingTimer = setInterval(() => {
    responseText.textContent += text[index] || '';
    index += 1;
    if (index >= text.length) {
      clearInterval(typingTimer);
      responseState.textContent = 'READY';
    }
  }, 10);
}

function runCommand(command) {
  const clean = command.trim();
  if (!clean) return;
  commandInput.value = clean;
  const response = chooseResponse(clean);
  responseActions.innerHTML = response.actions.map(action => `<span>${action}</span>`).join('');
  typeResponse(response.text);
}

commandForm?.addEventListener('submit', event => {
  event.preventDefault();
  runCommand(commandInput.value);
});
quickCommands.forEach(button => button.addEventListener('click', () => runCommand(button.dataset.command)));

document.addEventListener('keydown', event => {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
  if (event.key === '/' && !isTyping && !body.classList.contains('menu-open')) {
    event.preventDefault();
    commandInput?.focus();
    commandInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

const magneticItems = document.querySelectorAll('.magnetic');
magneticItems.forEach(item => {
  item.addEventListener('pointermove', event => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * .14}px, ${y * .14}px)`;
  });
  item.addEventListener('pointerleave', () => {
    item.style.transform = '';
  });
});
