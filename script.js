const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Entrada suave dos elementos durante a rolagem.
const revealItems = document.querySelectorAll(
  '.service-card, .process-step, .about-copy, .about-text, .testimonial, .team-card, .contact-form, .contact-statement'
);
revealItems.forEach((item) => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Formulário demonstrativo: ainda precisa de um serviço de envio para receber mensagens.
const contactForm = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = 'Obrigado pelo contacto! Este formulário é uma demonstração e ainda precisa de ser ligado ao e-mail do escritório.';
  contactForm.reset();
});