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

  document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
  });

  document.addEventListener("mouseleave", () => gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.3 }));
  document.addEventListener("mouseenter", () => gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 }));
}

// ─── Nav Scroll Effect ───
const navEl = document.getElementById('nav');
if (navEl) {
  ScrollTrigger.create({
    start: "top -80",
    onEnter: () => navEl.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)',
    onLeaveBack: () => navEl.style.boxShadow = 'none'
  });
}

// ─── Animations Pipeline ───
const initAnimations = () => {
  const tl = gsap.timeline();

  // Hero text reveal
  tl.fromTo(".hero-word",
    { y: "110%", rotate: 5 },
    { y: "0%", rotate: 0, duration: 1.4, stagger: 0.08, ease: "power4.out" },
    0.2
  )
  .fromTo(".hero-name",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    0.1
  )
  .fromTo(".hero-photo-wrapper",
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.4, ease: "power4.out" },
    0.3
  )
  .fromTo(".hero-badge",
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" },
    0.9
  )
  .fromTo(".hero-tagline",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    0.7
  )
  .fromTo(".hero-scroll-indicator",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out" },
    1.2
  )
  .fromTo(".nav",
    { y: -60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    0.8
  );

  // Section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        scrollTrigger: { trigger: title, start: "top 85%" },
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out"
      }
    );
  });

  // Section labels
  gsap.utils.toArray('.section-label').forEach(label => {
    gsap.fromTo(label,
      { opacity: 0, x: -20 },
      {
        scrollTrigger: { trigger: label, start: "top 90%" },
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out"
      }
    );
  });

  // Stats — count up animation
  gsap.utils.toArray('.stat-block').forEach((block, i) => {
    gsap.fromTo(block,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: block, start: "top 85%" },
        opacity: 1, y: 0, duration: 1, delay: i * 0.1, ease: "power3.out"
      }
    );
  });

  // Stat number count-up
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
          onUpdate: function() {
            num.textContent = isDecimal
              ? this.targets()[0].val.toFixed(1)
              : Math.round(this.targets()[0].val);
          }
        });
      }
    });
  });

  // Work cards
  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        scrollTrigger: { trigger: card, start: "top 85%" },
        opacity: 1, y: 0, duration: 1.2, ease: "power4.out"
      }
    );

    // Image parallax
    const img = card.querySelector('.work-img');
    if (img) {
      gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
      });
    }
  });

  // Services
  gsap.utils.toArray('.service-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -30 },
      {
        scrollTrigger: { trigger: item, start: "top 85%" },
        opacity: 1, x: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out"
      }
    );
  });

  // About
  gsap.fromTo('.about-img-wrapper',
    { scale: 0.9, opacity: 0 },
    {
      scrollTrigger: { trigger: '.about-img-wrapper', start: "top 80%" },
      scale: 1, opacity: 1, duration: 1.4, ease: "power4.out"
    }
  );

  gsap.fromTo('.about-right',
    { opacity: 0, y: 40 },
    {
      scrollTrigger: { trigger: '.about-right', start: "top 80%" },
      opacity: 1, y: 0, duration: 1.2, ease: "power3.out"
    }
  );

  // About parallax
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: '.about-layout', start: "top bottom", end: "bottom top", scrub: true }
    });
  }

  // Testimonials
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: '.testimonials-grid', start: "top 80%" },
        opacity: 1, y: 0, duration: 1, delay: i * 0.15, ease: "power3.out"
      }
    );
  });

  // FAQ
  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -20 },
      {
        scrollTrigger: { trigger: '.faq-list', start: "top 80%" },
        opacity: 1, x: 0, duration: 0.8, delay: i * 0.08, ease: "power3.out"
      }
    );
  });

  // CTA
  gsap.fromTo('.cta-box',
    { opacity: 0, y: 40, scale: 0.97 },
    {
      scrollTrigger: { trigger: '.cta-box', start: "top 85%" },
      opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out"
    }
  );

  // Footer
  gsap.fromTo('.footer-top',
    { opacity: 0, y: 40 },
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
  header.addEventListener('click', function() {
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