/* Portfolio – simple password unlock for personal progress sections */

(function () {
  const PASSWORD    = 'Robert!23';
  const SESSION_KEY = 'portfolioAuthOk';

  function isAuthed() { return sessionStorage.getItem(SESSION_KEY) === '1'; }

  function revealAll() {
    document.querySelectorAll('.protected-gate').forEach(el => el.setAttribute('hidden', ''));
    document.querySelectorAll('.protected-content').forEach(el => el.removeAttribute('hidden'));
    document.querySelectorAll('.unlock-btn, .unlock-btn-large').forEach(btn => btn.setAttribute('hidden', ''));
    document.querySelectorAll('.nav-locked .lock-icon').forEach(el => { el.textContent = '🔓'; });
  }

  function openModal() {
    document.getElementById('auth-error').textContent = '';
    document.getElementById('auth-input').value = '';
    document.getElementById('auth-modal').removeAttribute('hidden');
    setTimeout(() => document.getElementById('auth-input').focus(), 50);
  }

  function closeModal() {
    document.getElementById('auth-modal').setAttribute('hidden', '');
  }

  function handleSubmit() {
    const input = document.getElementById('auth-input');
    const errEl = document.getElementById('auth-error');

    if (input.value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      revealAll();
      closeModal();
    } else {
      errEl.textContent = 'Incorrect password.';
      input.select();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (isAuthed()) revealAll();

    document.querySelectorAll('.nav-locked').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!isAuthed()) { e.preventDefault(); openModal(); }
      });
    });

    document.querySelectorAll('.unlock-btn, .unlock-btn-large').forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(); });
    });

    document.getElementById('auth-close').addEventListener('click', closeModal);
    document.getElementById('auth-submit').addEventListener('click', handleSubmit);
    document.getElementById('auth-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSubmit();
    });
    document.getElementById('auth-modal').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !document.getElementById('auth-modal').hasAttribute('hidden')) closeModal();
    });
  });
}());
