const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const dialog = document.querySelector('[data-submit-dialog]');
const form = document.querySelector('[data-submit-form]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  nav?.classList.toggle('open', opening);
  document.body.classList.toggle('menu-open', opening);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => window.innerWidth > 900 && closeMenu());
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 14), { passive: true });

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('[data-open-submit]').forEach((button) => {
  button.addEventListener('click', () => {
    closeMenu();
    dialog?.showModal();
    requestAnimationFrame(() => form?.elements.title?.focus());
  });
});

document.querySelector('[data-close-submit]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const title = String(data.get('title')).trim();
  const body = [
    '## Goal',
    String(data.get('goal')).trim(),
    '',
    '## Current prompt',
    '```text',
    String(data.get('prompt')).trim(),
    '```',
    '',
    '## Where I am stuck',
    String(data.get('help')).trim(),
    '',
    '## Submitted by',
    String(data.get('name')).trim() || 'Anonymous community member',
    '',
    '> Submitted through the BYOP website. The prompt has been reviewed by the submitter for safe public sharing.'
  ].join('\n');

  const params = new URLSearchParams({
    template: 'bring-a-prompt.yml',
    title: `[Prompt]: ${title}`,
    body,
    labels: 'prompt-submission'
  });
  window.open(`https://github.com/numerate64/byop/issues/new?${params}`, '_blank', 'noopener,noreferrer');
  dialog.close();
});

const reveals = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px' });
  reveals.forEach((element) => observer.observe(element));
}
