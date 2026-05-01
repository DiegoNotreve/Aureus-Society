const slides = document.querySelectorAll(".slide");
let index = 0;

// Configuração inicial: garante que tudo comece invisível, exceto o primeiro
gsap.set(".slide", { opacity: 0 });
gsap.set(slides[0], { opacity: 1 });

function animateSlide(nextIndex) {
  const current = slides[index];
  const next = slides[nextIndex];
  const tl = gsap.timeline();

  // 1. SAÍDA: O slide atual desaparece completamente no preto
  tl.to(current, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut"
  });

  // 2. PAUSA (Opcional): Um micro-segundo de tela preta
  tl.to({}, { duration: 0.2 }); 

  // 3. ENTRADA: O próximo slide aparece vindo do preto
  tl.fromTo(next,
    { opacity: 0 },
    { 
      opacity: 1, 
      duration: 1, 
      ease: "power2.inOut" 
    }
  );

  // 4. ZOOM: Começa exatamente quando o slide 'next' começa a aparecer
  tl.fromTo(next.querySelector("img"),
    { scale: 1.1 },
    { scale: 1, duration: 1.5, ease: "power1.out" },
    "<" // O símbolo "<" faz começar junto com a animação anterior (a entrada)
  );

  // 5. CONTEÚDO: Surge com um leve atraso para um ar mais sofisticado
  tl.fromTo(next.querySelectorAll(".content > *"),
    { y: 30, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      stagger: 0.2, 
      duration: 0.8
    },
    "-=0.5" 
  );

  index = nextIndex;
}

setInterval(() => {
  let nextIndex = (index + 1) % slides.length;
  animateSlide(nextIndex);
}, 5000);

gsap.utils.toArray(".counter").forEach(el => {
  let target = +el.dataset.target;

  gsap.fromTo(el,
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top 80%"
      },
      onUpdate: function () {
        let value = Math.floor(el.innerText);

        if (target >= 1000) {
          el.innerText = (value / 1000).toFixed(0) + "k+";
        } else {
          el.innerText = value + "+";
        }
      }
    }
  );
});

// Animação de Scroll Infinito para as Marcas
const marcasWrapper = document.querySelector(".marcas_wrapper");
if (marcasWrapper) {
  gsap.to(".marcas_wrapper", {
    xPercent: -50, // Move metade do conteúdo (já que duplicamos no HTML)
    ease: "none",
    duration: 20, // Velocidade do scroll
    repeat: -1,
  });
}
