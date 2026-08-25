document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const siteMenu = document.getElementById('site-menu');
  const track = document.getElementById('testimonial-track');
  let testimonialIndex = 0;

  menuButton.addEventListener('click', () => {
    const isOpen = siteMenu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuButton.innerHTML = `<span class="material-symbols-outlined">${isOpen ? 'close' : 'menu'}</span>`;
  });

  siteMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    siteMenu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.innerHTML = '<span class="material-symbols-outlined">menu</span>';
  }));

  const moveSlider = direction => {
    testimonialIndex = (testimonialIndex + direction + 2) % 2;
    track.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  };
  document.getElementById('prev-testimonial').addEventListener('click', () => moveSlider(-1));
  document.getElementById('next-testimonial').addEventListener('click', () => moveSlider(1));

  document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = 'Thanks. Your note is ready to start a conversation.';
    event.target.reset();
  });
});
