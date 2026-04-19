
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  nav.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    nav.classList.remove('active');
  });
});

const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação básica
    if (!nome || !email || !assunto || !mensagem) {
      showToast('Por favor, preencha todos os campos', 'error');
      return;
    }

    // Simular envio (em produção, seria um POST para um servidor)
    console.log('Formulário enviado:', { nome, email, assunto, mensagem });

    // Gerar mensagem WhatsApp
    const whatsappMessage = `Olá, meu nome é ${nome}.\n\nAssunto: ${assunto}\n\nMensagem: ${mensagem}\n\nMeu e-mail: ${email}`;
    const whatsappUrl = `https://wa.me/5541984534917?text=${encodeURIComponent(whatsappMessage)}`;

    // Mostrar sucesso e abrir WhatsApp
    showToast('Mensagem preparada! Abrindo WhatsApp...', 'success');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    }, 1500);
  });
}

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ============================================
// ANO NO FOOTER
// ============================================

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar cards e elementos
document.querySelectorAll('.card, .member, details').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// ACTIVE NAV LINK
// ============================================

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a:not(.btn)');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#c9a961';
      link.style.fontWeight = '700';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// LAZY LOADING DE IMAGENS (se houver)
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

console.log('🎯 Advocacia Premium - Site carregado com sucesso!');
