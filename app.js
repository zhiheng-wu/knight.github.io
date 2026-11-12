const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let motionPaused = motionQuery.matches;

function applyMotionState() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.setAttribute('aria-label', motionPaused ? '播放装饰动画' : '暂停装饰动画');
  motionButton.querySelector('.motion-icon').textContent = motionPaused ? '▷' : 'Ⅱ';
  motionButton.querySelector('.motion-label').textContent = motionPaused ? '让风继续吹' : '让风歇一会';
}

motionButton.addEventListener('click', () => {
  motionPaused = !motionPaused;
  applyMotionState();
});
motionQuery.addEventListener('change', event => {
  motionPaused = event.matches;
  applyMotionState();
});
applyMotionState();

if (!motionQuery.matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

async function loadContent() {
  const response = await fetch('content.json');
  if (!response.ok) throw new Error(`content.json: HTTP ${response.status}`);
  const content = await response.json();
  if (typeof content.displayName !== 'string' || typeof content.intro !== 'string' || typeof content.signature !== 'string' || !Array.isArray(content.interests) || !content.interests.every(item => typeof item === 'string') || typeof content.email !== 'string') {
    throw new Error('content.json 的个人资料格式不正确');
  }
  document.querySelectorAll('[data-content="displayName"]').forEach(element => { element.textContent = content.displayName; });
  if (content.intro.trim()) {
    const intro = document.getElementById('intro-content');
    intro.classList.remove('empty-lines');
    intro.textContent = content.intro;
  }
  if (content.signature.trim()) {
    const signature = document.getElementById('signature-content');
    signature.classList.remove('is-empty');
    signature.removeAttribute('aria-label');
    signature.textContent = content.signature;
  }
  if (content.interests.length) {
    const list = document.getElementById('interest-list');
    list.replaceChildren(...content.interests.map((interest, index) => {
      const item = document.createElement('div');
      item.className = 'interest-item';
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      item.append(number, document.createTextNode(interest));
      return item;
    }));
  }
  if (content.email.trim()) {
    const email = document.getElementById('email-link');
    email.href = `mailto:${content.email.trim()}`;
    email.hidden = false;
  }
}

loadContent().catch(error => { console.error('个人资料加载失败，保留页面的留白状态。', error); });
