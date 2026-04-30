const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

menuBtn?.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  nav.classList.toggle('active');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    nav.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObs.observe(el));

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a:not(.nav-cta)');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const assunto = document.getElementById('assunto').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    showToast('Por favor, preencha todos os campos.');
    return;
  }

  const text = `Olá, meu nome é ${nome}.\n\nAssunto: ${assunto}\n\nMensagem: ${mensagem}\n\nMeu e-mail: ${email}`;
  const url = `https://wa.me/5541984534917?text=${encodeURIComponent(text)}`;

  showToast('Abrindo WhatsApp...');
  setTimeout(() => {
    window.open(url, '_blank');
    contactForm.reset();
  }, 1200);
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
