/* ============================================================
   AUREA-SCROLL-ANIMATIONS.JS
   Efeitos de entrada e saída ao rolar — GSAP + ScrollTrigger
   ============================================================
   
   COMO USAR:
   1. Adicione o plugin ScrollTrigger ANTES deste script no HTML:
      <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

   2. Adicione este arquivo DEPOIS dos scripts acima e do aurea-app.js:
      <script src="aurea-scroll-animations.js"></script>

   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   UTILITÁRIOS
───────────────────────────────────────────────────────── */

/** Cria uma animação de entrada padrão com ScrollTrigger. */
function revelar(targets, fromVars = {}, toVars = {}, triggerEl = null) {
  const defaults = { opacity: 0, ...fromVars };
  const tweenTo  = { opacity: 1, duration: 0.85, ease: 'power3.out', ...toVars };

  return gsap.fromTo(targets, defaults, {
    ...tweenTo,
    scrollTrigger: {
      trigger: triggerEl || (typeof targets === 'string' ? targets : targets[0]),
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
  });
}

/** Stagger para grupos de filhos com ScrollTrigger */
function revelarGrupo(targets, fromVars = {}, toVars = {}, triggerEl = null, stagger = 0.12) {
  const defaults = { opacity: 0, ...fromVars };
  const tweenTo  = { opacity: 1, duration: 0.75, ease: 'power3.out', stagger, ...toVars };

  return gsap.fromTo(targets, defaults, {
    ...tweenTo,
    scrollTrigger: {
      trigger: triggerEl || (typeof targets === 'string' ? targets : targets[0]),
      start: 'top 88%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ─────────────────────────────────────────────────────────
   Aguarda o DOM estar completamente pronto
───────────────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════
     1. NAVBAR — entra deslizando do topo
  ══════════════════════════════════════════════════════ */
  
  /* ══════════════════════════════════════════════════════
     2. HERO — conteúdo dos slides (tag, h2, sub-tag, botão)
        O slide.js cuida do loop; aqui animamos a entrada
        inicial apenas (slide ativo no carregamento).
  ══════════════════════════════════════════════════════ */
  gsap.fromTo(
    '.slide.active .content > *',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.18, delay: 0.5 }
  );

  /* ══════════════════════════════════════════════════════
     3. SEÇÃO SOBRE
  ══════════════════════════════════════════════════════ */
  // Imagem vem da esquerda
  revelar(
    '.sobre_content1',
    { x: -80, opacity: 0 },
    { x: 0,   opacity: 1, duration: 1, ease: 'power3.out' }
  );

  // Texto vem da direita
  revelar(
    '.sobre_content2',
    { x: 80, opacity: 0 },
    { x: 0,  opacity: 1, duration: 1, ease: 'power3.out' }
  );

  // Números contadores (a animação de contagem já existe no slide.js;
  // aqui adicionamos só o fade de entrada do wrapper)
  revelarGrupo(
    '.infonumber',
    { y: 30, opacity: 0 },
    { y: 0,  opacity: 1 },
    '.sobre_infonumber',
    0.18
  );

  /* ══════════════════════════════════════════════════════
     4. BANNER PROMOCIONAL
  ══════════════════════════════════════════════════════ */
  revelar(
    '.promo-banner__content',
    { x: -60, opacity: 0 },
    { x: 0,   opacity: 1, duration: 1, ease: 'power3.out' }
  );

  revelar(
    '.promo-banner__img',
    { x: 60,   opacity: 0, scale: 0.95 },
    { x: 0,    opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
  );

  // Itens do countdown surgem em stagger
  revelarGrupo(
    '.countdown-block',
    { y: 20, opacity: 0 },
    { y: 0,  opacity: 1 },
    '.promo-countdown',
    0.1
  );

  /* ══════════════════════════════════════════════════════
     5. SEÇÃO COLEÇÕES — header e filtros
  ══════════════════════════════════════════════════════ */
  revelar(
    '#colecoes .tag',
    { y: -20, opacity: 0 },
    { y: 0,   opacity: 1 }
  );

  revelar(
    '#colecoes h2',
    { y: 30, opacity: 0 },
    { y: 0,  opacity: 1 },
    '#colecoes .tag'
  );

  revelar(
    '.colecoes-search',
    { y: 20, opacity: 0 },
    { y: 0,  opacity: 1 },
    '#colecoes h2'
  );

  revelarGrupo(
    '#filterBtns button',
    { y: 15, opacity: 0 },
    { y: 0,  opacity: 1 },
    '#filterBtns',
    0.07
  );

  /* ══════════════════════════════════════════════════════
     5b. CARDS DE PRODUTO — animam quando o grid renderiza
         O aurea-app.js popula o #productGrid dinamicamente;
         usamos um MutationObserver para pegar os cards.
  ══════════════════════════════════════════════════════ */
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    const observerCards = new MutationObserver(() => {
      const cards = productGrid.querySelectorAll('.card:not(.aurea-animated)');
      if (!cards.length) return;

      cards.forEach(card => card.classList.add('aurea-animated'));

      gsap.fromTo(
        Array.from(cards),
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.65, ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: productGrid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Hover magnético nos cards (sutil)
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -6, scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
        });
      });
    });

    observerCards.observe(productGrid, { childList: true });
  }

  /* ══════════════════════════════════════════════════════
     6. LOOKBOOK — grid de imagens em stagger diagonal
  ══════════════════════════════════════════════════════ */
  revelar(
    '#lookbook .tag',
    { y: -20, opacity: 0 },
    { y: 0,   opacity: 1 }
  );

  revelar(
    '#lookbook h2',
    { y: 30, opacity: 0 },
    { y: 0,  opacity: 1 },
    '#lookbook .tag'
  );

  // Cada célula do grid entra com delay escalonado
  const lookbookCells = document.querySelectorAll(
    '.parent .div1, .parent .div2, .parent .div3, .parent .div4,' +
    '.parent .div5, .parent .div6, .parent .div7, .parent .div8'
  );

  if (lookbookCells.length) {
    gsap.fromTo(
      lookbookCells,
      { opacity: 0, scale: 0.92, y: 30 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: {
          trigger: '.parent',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Efeito parallax leve nas imagens do lookbook ao rolar
  /*   lookbookCells.forEach(cell => {
      const img = cell.querySelector('img');
      if (!img) return;
      gsap.fromTo(img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: cell,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }); */

    // Labels de texto do lookbook
    revelarGrupo(
      '.parent [class^="div"] p',
      { y: 15, opacity: 0 },
      { y: 0,  opacity: 1 },
      '.parent',
      0.09
    );
  }

  /* ══════════════════════════════════════════════════════
     7. DEPOIMENTOS — cards chegam em wave
  ══════════════════════════════════════════════════════ */
  const depoimentosGrid = document.getElementById('depoimentosGrid');
  if (depoimentosGrid) {
    const observerDep = new MutationObserver(() => {
      const cards = depoimentosGrid.querySelectorAll('.dep-card:not(.aurea-animated)');
      if (!cards.length) return;
      cards.forEach(c => c.classList.add('aurea-animated'));

      gsap.fromTo(
        Array.from(cards),
        { y: 60, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: {
            trigger: depoimentosGrid,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    observerDep.observe(depoimentosGrid, { childList: true });
  }

  // Header da seção
  revelar(
    '#depoimentos .tag',
    { y: -20, opacity: 0 },
    { y: 0,   opacity: 1 }
  );
  revelar(
    '#depoimentos h2',
    { y: 30, opacity: 0 },
    { y: 0,  opacity: 1 },
    '#depoimentos .tag'
  );

  /* ══════════════════════════════════════════════════════
     8. MARCAS PARCEIRAS
  ══════════════════════════════════════════════════════ */
  revelar(
    '#marcas .tag',
    { y: -20, opacity: 0 },
    { y: 0,   opacity: 1 }
  );
  revelar(
    '#marcas h2',
    { y: 30, opacity: 0 },
    { y: 0,  opacity: 1 },
    '#marcas .tag'
  );

  revelarGrupo(
    '.marca-card',
    { y: 40, opacity: 0, scale: 0.9 },
    { y: 0,  opacity: 1, scale: 1 },
    '.marcas-grid',
    0.1
  );

  // Hover nas marca-cards
  document.querySelectorAll('.marca-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, scale: 1.05, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
    });
  });

  /* ══════════════════════════════════════════════════════
     9. NEWSLETTER — split: texto da esquerda, form da direita
  ══════════════════════════════════════════════════════ */
  revelar(
    '.newsletter-text',
    { x: -60, opacity: 0 },
    { x: 0,   opacity: 1, duration: 1, ease: 'power3.out' }
  );

  revelar(
    '.newsletter-form',
    { x: 60, opacity: 0 },
    { x: 0,  opacity: 1, duration: 1, ease: 'power3.out' }
  );

  /* ══════════════════════════════════════════════════════
     10. FOOTER — fade simples de baixo para cima
  ══════════════════════════════════════════════════════ */
  revelarGrupo(
    '.footer__brand, .footer__col',
    { y: 40, opacity: 0 },
    { y: 0,  opacity: 1 },
    '.footer__top',
    0.12
  );

  revelar(
    '.footer__mid',
    { y: 20, opacity: 0 },
    { y: 0,  opacity: 1 }
  );

  revelar(
    '.footer__bottom',
    { y: 20, opacity: 0 },
    { y: 0,  opacity: 1 }
  );

  /* ══════════════════════════════════════════════════════
     11. TAG DOURADA UNIVERSAL
         Toda .tag que não foi tratada acima recebe um
         efeito de clip-reveal (expande da esquerda).
  ══════════════════════════════════════════════════════ */
  document.querySelectorAll('.tag').forEach(tag => {
    // Verifica se já tem ScrollTrigger associado
    if (ScrollTrigger.getById(tag)) return;

    gsap.fromTo(tag,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tag,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ══════════════════════════════════════════════════════
     12. LINHA SEPARADORA / BORDAS DOURADAS
         Qualquer elemento com classe .divider ou
         borda decorativa anima sua largura de 0 → 100%.
  ══════════════════════════════════════════════════════ */
  document.querySelectorAll('.divider').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ══════════════════════════════════════════════════════
     13. EFEITO PARALLAX NO BANNER PROMOCIONAL
  ══════════════════════════════════════════════════════ */
  gsap.to('.promo-banner__img img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.promo-banner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    },
  });

  /* ══════════════════════════════════════════════════════
     14. BARRA DE PROGRESSO DE LEITURA (topo da página)
  ══════════════════════════════════════════════════════ */
  const progressBar = document.createElement('div');
  progressBar.id = 'aurea-progress';
  Object.assign(progressBar.style, {
    position:   'fixed',
    top:        '0',
    left:       '0',
    height:     '2px',
    width:      '0%',
    background: 'linear-gradient(90deg, #c9a84c, #f7c625)',
    zIndex:     '9999',
    pointerEvents: 'none',
    transition: 'width 0.1s linear',
  });
  document.body.appendChild(progressBar);

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => {
      progressBar.style.width = (self.progress * 100).toFixed(1) + '%';
    },
  });

  /* ══════════════════════════════════════════════════════
     15. REFRESH após fonts e imagens carregarem
  ══════════════════════════════════════════════════════ */
  window.addEventListener('load', () => ScrollTrigger.refresh());

});
/* ── FIM ── */
