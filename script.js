const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const yearEl = document.getElementById("year");
const toast = document.getElementById("toast");

const whatsLink = document.getElementById("whatsLink");
const phoneText = document.getElementById("phoneText");

const form = document.getElementById("contactForm");
const clearBtn = document.getElementById("clearBtn");

yearEl.textContent = new Date().getFullYear();

const config = {
  whatsappNumber: "5541984534917",
  displayPhone: "(41) 98453-4917"
};

phoneText.textContent = config.displayPhone;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setWhatsLink(text) {
  const base = "https://wa.me/";
  const url = base + config.whatsappNumber + "?text=" + encodeURIComponent(text);
  whatsLink.href = url;
}

setWhatsLink("Olá! Gostaria de falar com o escritório e tirar uma dúvida.");

menuBtn?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

clearBtn?.addEventListener("click", () => {
  form.reset();
  setWhatsLink("Olá! Gostaria de falar com o escritório e tirar uma dúvida.");
  showToast("Formulário limpo.");
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value;
  const mensagem = document.getElementById("mensagem").value.trim();

  const text =
    `Olá! Meu nome é ${nome}.\n` +
    `E-mail: ${email}\n` +
    `Assunto: ${assunto}\n\n` +
    `${mensagem}\n\n` +
    `Gostaria de orientação sobre os próximos passos.`;

  setWhatsLink(text);
  showToast("Mensagem pronta. Clique em “Abrir WhatsApp” para enviar.");
});