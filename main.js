import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Custom Cursor ───
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
  });

  document.querySelectorAll('[data-cursor="view"], [data-cursor="hover"]').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
  });

  document.addEventListener("mouseleave", () => gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.3 }));
  document.addEventListener("mouseenter", () => gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 }));
}

// ─── Nav Shadow on Scroll ───
const navEl = document.getElementById('nav');
if (navEl) {
  ScrollTrigger.create({
    start: "top -80",
    onEnter: () => navEl.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)',
    onLeaveBack: () => navEl.style.boxShadow = 'none'
  });
}

// ═══════════════════════════════════════════
// ANIMATIONS PIPELINE (called after loader)
// ═══════════════════════════════════════════
const initAnimations = () => {

  // ─── HERO ENTRANCE ───
  const heroTl = gsap.timeline();

  // Photo scales up from 0.8
  heroTl.fromTo(".hero-photo-wrapper",
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.6, ease: "power4.out" },
    0
  )
  // Name label fades in
  .fromTo(".hero-name",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    0.1
  )
  // Title words clip-reveal upward (masked by overflow:hidden on .hero-line)
  .fromTo(".hero-word",
    { y: "110%", rotate: 3 },
    { y: "0%", rotate: 0, duration: 1.4, stagger: 0.06, ease: "power4.out" },
    0.15
  )
  // "Hi" badge pops in
  .fromTo(".hero-badge",
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2.5)" },
    0.8
  )
  // Tagline fades up
  .fromTo(".hero-tagline",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    0.6
  )
  // Scroll indicator
  .fromTo(".hero-scroll-indicator",
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    1.0
  )
  // Nav slides down
  .fromTo(".nav",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    0.7
  );

  // ─── HERO LATERAL TEXT SPLIT ON SCROLL (Portavia signature) ───
  // "PREMIUM WEB" slides LEFT, "DESIGNER" slides RIGHT as user scrolls
  const heroTextTop = document.querySelector('.hero-text-top');
  const heroTextBottom = document.querySelector('.hero-text-bottom');
  const heroPhoto = document.querySelector('.hero-photo-wrapper');

  if (heroTextTop && heroTextBottom) {
    gsap.to(heroTextTop, {
      xPercent: -80,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });

    gsap.to(".hero-heading-right", {
      xPercent: 80,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });
  }

  // Hero photo parallax (moves slower on scroll)
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      y: -80,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });
  }

  // ─── CLIP-PATH TEXT REVEALS (Portavia-style masked reveals) ───
  // Section titles: slide up from behind mask
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
      { y: 80, opacity: 0 },
      {
        scrollTrigger: { trigger: title, start: "top 90%" },
        y: 0, opacity: 1, duration: 1.4, ease: "power4.out"
      }
    );
  });

  // Section labels: slide in from left
  gsap.utils.toArray('.section-label').forEach(label => {
    gsap.fromTo(label,
      { opacity: 0, x: -30 },
      {
        scrollTrigger: { trigger: label, start: "top 90%" },
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out"
      }
    );
  });

  // ─── STICKY STACKING CARDS (Portavia signature) ───
  // Scale the previous card down as the next card overlaps it
  const workCards = gsap.utils.toArray('.work-card');
  workCards.forEach((card, i) => {
    if (i < workCards.length - 1) {
      // Scale down the current card as the next one scrolls over it
      gsap.to(card, {
        scale: 0.92,
        opacity: 0.5,
        filter: "brightness(0.6)",
        ease: "none",
        scrollTrigger: {
          trigger: workCards[i + 1],
          start: "top bottom",
          end: "top 120px",
          scrub: true
        }
      });
    }

    // Each card's image has parallax
    const img = card.querySelector('.work-img');
    if (img) {
      gsap.to(img, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });

  // ─── STATS COUNT-UP ───
  gsap.utils.toArray('.stat-block').forEach((block, i) => {
    gsap.fromTo(block,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        scrollTrigger: { trigger: block, start: "top 88%" },
        opacity: 1, y: 0, scale: 1, duration: 1, delay: i * 0.12, ease: "power3.out"
      }
    );
  });

  gsap.utils.toArray('.stat-number').forEach(num => {
    const target = parseFloat(num.dataset.count);
    const isDecimal = target % 1 !== 0;
    ScrollTrigger.create({
      trigger: num,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            num.textContent = isDecimal
              ? this.targets()[0].val.toFixed(1)
              : Math.round(this.targets()[0].val);
          }
        });
      }
    });
  });

  // ─── SERVICES (staggered slide-up + fade) ───
  gsap.utils.toArray('.service-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: item, start: "top 88%" },
        opacity: 1, y: 0, duration: 1, delay: i * 0.08, ease: "power3.out"
      }
    );
  });

  // ─── ABOUT (image scale reveal + parallax) ───
  gsap.fromTo('.about-img-wrapper',
    { scale: 0.85, opacity: 0, borderRadius: "40px" },
    {
      scrollTrigger: { trigger: '.about-img-wrapper', start: "top 85%" },
      scale: 1, opacity: 1, borderRadius: "24px", duration: 1.6, ease: "power4.out"
    }
  );

  gsap.fromTo('.about-right',
    { opacity: 0, y: 50 },
    {
      scrollTrigger: { trigger: '.about-right', start: "top 82%" },
      opacity: 1, y: 0, duration: 1.2, ease: "power3.out"
    }
  );

  // About image parallax
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      yPercent: 12, ease: "none",
      scrollTrigger: { trigger: '.about-layout', start: "top bottom", end: "bottom top", scrub: true }
    });
  }

  // ─── TESTIMONIALS (Portavia-style staggered left-to-right) ───
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        scrollTrigger: { trigger: '.testimonials-grid', start: "top 80%" },
        opacity: 1, y: 0, scale: 1, duration: 1.2, delay: i * 0.2, ease: "power4.out"
      }
    );
  });

  // ─── FAQ (staggered slide-in) ───
  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -30 },
      {
        scrollTrigger: { trigger: '.faq-list', start: "top 82%" },
        opacity: 1, x: 0, duration: 0.8, delay: i * 0.08, ease: "power3.out"
      }
    );
  });

  // ─── CTA (scale-in) ───
  gsap.fromTo('.cta-box',
    { opacity: 0, y: 50, scale: 0.95 },
    {
      scrollTrigger: { trigger: '.cta-box', start: "top 85%" },
      opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out"
    }
  );

  // ─── FOOTER ───
  gsap.fromTo('.footer-top',
    { opacity: 0, y: 50 },
    {
      scrollTrigger: { trigger: '.footer', start: "top 85%" },
      opacity: 1, y: 0, duration: 1.2, ease: "power3.out"
    }
  );
};

// ─── Magnetic Buttons ───
document.querySelectorAll('.btn, .nav-cta, .nav-logo, .wa-float').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  });
});

// ─── FAQ Toggle ───
document.querySelectorAll('.faq-header').forEach(header => {
  header.addEventListener('click', function () {
    const faqItem = this.parentElement;
    faqItem.classList.toggle('active');
    document.querySelectorAll('.faq-item.active').forEach(item => {
      if (item !== faqItem) item.classList.remove('active');
    });
  });
});

// ─── Loader ───
let n = 0;
const ldNum = document.getElementById('ldNum');
const loader = document.getElementById('loader');

if (ldNum && loader) {
  const ldTimer = setInterval(() => {
    n += Math.ceil(Math.random() * 8);
    if (n >= 100) {
      n = 100;
      ldNum.textContent = String(n).padStart(3, '0');
      clearInterval(ldTimer);
      gsap.to(loader, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        onComplete: () => {
          loader.style.display = 'none';
          initAnimations();
        }
      });
    } else {
      ldNum.textContent = String(n).padStart(3, '0');
    }
  }, 30);
} else {
  setTimeout(initAnimations, 300);
}