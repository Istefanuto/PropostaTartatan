document.addEventListener('DOMContentLoaded', () => {

  /* ===== LOADER ===== */
  const loader = document.getElementById('loader');
  if (loader) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => loader.remove(), 800);
    }, 2500); // 2.5 segundos
  }

  /* ===== MENU DRAWER ===== */
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');

  const closeDrawer = () => {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
  };

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  drawer.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ===== BARRA DE PROGRESSO ===== */
  const progressFill = document.getElementById('progressFill');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ===== REVEAL AO ROLAR ===== */
  const revealTargets = document.querySelectorAll(
    '.block, .hero-content, .plan-card, .type-card, .reason-card, .mascote-card, .simbolo-item, .cardapio-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ===== UPLOAD DE IMAGENS (o usuario adiciona as próprias artes) ===== */
  document.querySelectorAll('[data-upload]').forEach(box => {
    const input = box.querySelector('.upload-input');
    if (!input) return;

    input.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        let img = box.querySelector('img.uploaded-img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'uploaded-img';
          box.insertBefore(img, box.firstChild);
        }
        img.src = ev.target.result;
        box.classList.add('has-image');

        if (!box.querySelector('.remove-img')) {
          const btn = document.createElement('button');
          btn.className = 'remove-img';
          btn.type = 'button';
          btn.innerHTML = '&times;';
          btn.addEventListener('click', (ev2) => {
            ev2.preventDefault();
            ev2.stopPropagation();
            box.classList.remove('has-image');
            img.remove();
            input.value = '';
          });
          box.appendChild(btn);
        }
      };
      reader.readAsDataURL(file);
    });
  });

});