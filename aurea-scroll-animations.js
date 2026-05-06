/* ============================================================
   AUREA-SCROLL-ANIMATIONS.JS — v3
   Efeitos de entrada ao rolar — GSAP + ScrollTrigger
   ============================================================
   Inclua no HTML, APÓS o aurea-app.js:

   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
   <script src="aurea-scroll-animations.js"></script>
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   ANTI-OVERFLOW MOBILE
   overflow-x: hidden no html resolve o vazamento lateral
   sem interferir no ScrollTrigger (que lê document.body).
   NUNCA coloque overflow: hidden no body — quebra o ST.
───────────────────────────────────────────────────────── */
document.documentElement.style.overflowX = 'hidden';

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
const mobile = window.matchMedia('(max-width: 768px)').matches;

/**
 * Animação de entrada com ScrollTrigger.
 * @param {string|Element|Element[]} alvo   - seletor ou elemento(s)
 * @param {object} de                        - estado inicial (fromVars)
 * @param {object} para                      - estado final  (toVars)
 * @param {string|Element} [gatilho]         - trigger (padrão = alvo)
 */
function animar(alvo, de = {}, para = {}, gatilho = null) {
  // Em mobile, troca qualquer x lateral por y vertical
  if (mobile) {
    if (de.x  !== undefined) { de.y  = de.y  ?? 30; delete de.x;  }
    if (para.x !== undefined) { para.y = 0;           delete para.x; }
  }

  const trigger = gatilho ?? (typeof alvo === 'string' ? alvo : alvo[0] ?? alvo);

  gsap.fromTo(alvo,
    { opacity: 0, ...de },
    {
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      ...para,
      scrollTrigger: {
        trigger,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Igual a animar(), mas com stagger para grupos de elementos.
 */
function animarGrupo(alvo, de = {}, para = {}, gatilho = null, stagger = 0.12) {
  animar(alvo, de, { stagger, ...para }, gatilho);
}

/* ─────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR ─────────────────────────────────────── */
  
  /* 
  gsap.from('header', {
    y: -60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15,
  }); */

  /* ── 2. HERO (slide inicial) ────────────────────────── */
 /*  gsap.fromTo('.slide.active .content > *',
    { y: 40, opacity: 0 },
    { y: 0,  opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.18, delay: 0.5 }
  ); */

  /* ── 3. SOBRE ───────────────────────────────────────── */
  animar('.sobre_content1', { x: -70 }, { x: 0, duration: 1 });
  animar('.sobre_content2', { x:  70 }, { x: 0, duration: 1 });
  animarGrupo('.infonumber', { y: 30 }, { y: 0 }, '.sobre_infonumber', 0.18);

  /* ── 4. BANNER PROMOCIONAL ──────────────────────────── */
  animar('.promo-banner__content', { x: -60 }, { x: 0, duration: 1 });
  animar('.promo-banner__img',     { x:  60, scale: 0.95 }, { x: 0, scale: 1, duration: 1 });
  animarGrupo('.countdown-block',  { y: 20 }, { y: 0 }, '.promo-countdown', 0.1);

  /* ── 5. COLEÇÕES — cabeçalho e filtros ─────────────── */
  animar('#colecoes .tag', { y: -20 }, { y: 0 });
  animar('#colecoes h2',   { y:  30 }, { y: 0 }, '#colecoes .tag');
  animar('.colecoes-search', { y: 20 }, { y: 0 }, '#colecoes h2');
  animarGrupo('#filterBtns button', { y: 15 }, { y: 0 }, '#filterBtns', 0.07);

  /* ── 5b. CARDS DE PRODUTO (renderizados via JS) ─────── */
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    const obs = new MutationObserver(() => {
      const novos = productGrid.querySelectorAll('.card:not(.sa-done)');
      if (!novos.length) return;
      novos.forEach(c => c.classList.add('sa-done'));

      gsap.fromTo(Array.from(novos),
        { y: 45, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.65, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: {
            trigger: productGrid,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Hover sutil — só desktop
      if (!mobile) {
        novos.forEach(card => {
          card.addEventListener('mouseenter', () =>
            gsap.to(card, { y: -6, scale: 1.02, duration: 0.28, ease: 'power2.out' }));
          card.addEventListener('mouseleave', () =>
            gsap.to(card, { y:  0, scale: 1,    duration: 0.32, ease: 'power2.out' }));
        });
      }
    });
    obs.observe(productGrid, { childList: true });
  }

  /* ── 6. LOOKBOOK ────────────────────────────────────── */
  animar('#lookbook .tag', { y: -20 }, { y: 0 });
  animar('#lookbook h2',   { y:  30 }, { y: 0 }, '#lookbook .tag');

  const cells = document.querySelectorAll(
    '.parent .div1,.parent .div2,.parent .div3,.parent .div4,' +
    '.parent .div5,.parent .div6,.parent .div7,.parent .div8'
  );
  if (cells.length) {
    gsap.fromTo(Array.from(cells),
      { opacity: 0, y: 30, scale: 0.93 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.75, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.parent', start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );

    // Parallax nas fotos — apenas desktop (mobile já é lento)
    if (!mobile) {
      cells.forEach(cell => {
        const img = cell.querySelector('img');
        if (!img) return;
        gsap.fromTo(img,
          { yPercent: -7 },
          {
            yPercent: 7, ease: 'none',
            scrollTrigger: { trigger: cell, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
          }
        );
      });
    }

    animarGrupo('.parent [class^="div"] p', { y: 15 }, { y: 0 }, '.parent', 0.08);
  }

  /* ── 7. DEPOIMENTOS ─────────────────────────────────── */
  animar('#depoimentos .tag', { y: -20 }, { y: 0 });
  animar('#depoimentos h2',   { y:  30 }, { y: 0 }, '#depoimentos .tag');

  const depGrid = document.getElementById('depoimentosGrid');
  if (depGrid) {
    const obs2 = new MutationObserver(() => {
      const novos = depGrid.querySelectorAll('.dep-card:not(.sa-done)');
      if (!novos.length) return;
      novos.forEach(c => c.classList.add('sa-done'));
      gsap.fromTo(Array.from(novos),
        { y: 55, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7, ease: 'power3.out', stagger: 0.11,
          scrollTrigger: { trigger: depGrid, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      );
    });
    obs2.observe(depGrid, { childList: true });
  }

  /* ── 8. MARCAS PARCEIRAS ────────────────────────────── */
  animar('#marcas .tag', { y: -20 }, { y: 0 });
  animar('#marcas h2',   { y:  30 }, { y: 0 }, '#marcas .tag');
  animarGrupo('.marca-card', { y: 40, scale: 0.9 }, { y: 0, scale: 1 }, '.marcas-grid', 0.09);

  if (!mobile) {
    document.querySelectorAll('.marca-card').forEach(card => {
      card.addEventListener('mouseenter', () =>
        gsap.to(card, { y: -8, scale: 1.05, duration: 0.28, ease: 'power2.out' }));
      card.addEventListener('mouseleave', () =>
        gsap.to(card, { y:  0, scale: 1,    duration: 0.32, ease: 'power2.out' }));
    });
  }

  /* ── 9. NEWSLETTER ──────────────────────────────────── */
  animar('.newsletter-text', { x: -60 }, { x: 0, duration: 1 });
  animar('.newsletter-form', { x:  60 }, { x: 0, duration: 1 });

  /* ── 10. FOOTER ─────────────────────────────────────── */
  animarGrupo('.footer__brand, .footer__col', { y: 40 }, { y: 0 }, '.footer__top', 0.11);
  animar('.footer__mid',    { y: 20 }, { y: 0 });
  animar('.footer__bottom', { y: 20 }, { y: 0 });

  /* ── 11. PARALLAX NO BANNER (desktop) ───────────────── */
  if (!mobile) {
    gsap.to('.promo-banner__img img', {
      yPercent: 14, ease: 'none',
      scrollTrigger: {
        trigger: '.promo-banner',
        start: 'top bottom', end: 'bottom top', scrub: 2,
      },
    });
  }

  /* ── 12. BARRA DE PROGRESSO ─────────────────────────── */
  const bar = document.createElement('div');
  bar.id = 'aurea-progress';
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0',
    height: '2px', width: '0%',
    background: 'linear-gradient(90deg,#c9a84c,#f7c625)',
    zIndex: '10000', pointerEvents: 'none',
  });
  document.body.appendChild(bar);

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: s => { bar.style.width = (s.progress * 100).toFixed(2) + '%'; },
  });

  /* ── 13. REFRESH após load completo ─────────────────── */
  window.addEventListener('load', () => ScrollTrigger.refresh());

});
