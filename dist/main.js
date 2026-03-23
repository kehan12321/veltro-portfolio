// Register GSAP ScrollTrigger plugin (loaded from CDN)
gsap.registerPlugin(ScrollTrigger);

// Enable smooth scrolling with CSS
document.documentElement.style.scrollBehavior = 'smooth';

// Nav scroll effect
const navEl = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navEl.classList.add('scrolled');
  } else {
    navEl.classList.remove('scrolled');
  }
});

// Custom Cursor logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Keep cursor updated (smoothly follow)
window.addEventListener('mousemove', (e) => {
  gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
  gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
});

// Cursor hover states
const hoverTargets = document.querySelectorAll('[data-cursor="hover"]');
hoverTargets.forEach((target) => {
  target.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
  target.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.3 });
});
document.addEventListener("mouseenter", () => {
  gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 });
});

// Animations Pipeline
const initAnimations = () => {
  const tl = gsap.timeline();
  
  tl.fromTo(".hero-badge", 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  )
  .fromTo(".hero-title .word", 
    { y: "110%", rotate: 8, opacity: 0 },
    { y: "0%", rotate: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" },
    0.2
  )
  .fromTo(".hero-subtitle", 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    "-=0.8"
  )
  .fromTo(".hero-desc, .hero-actions, .hero-stats, .nav", 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
    "-=0.6"
  );

  // Section Titles Reveal
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 60 },
      { scrollTrigger: { trigger: title, start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  });

  // Services Card Animations
  gsap.fromTo('.service-item',
    { opacity: 0, y: 40 },
    { scrollTrigger: { trigger: '.services-list', start: "top 75%" }, opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
  );

  // Work Cards Reveal & Parallax
  gsap.utils.toArray('.work-card').forEach(card => {
    gsap.fromTo(card,
      { opacity: 0, y: 80 },
      { scrollTrigger: { trigger: card, start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
    
    // Image Parallax Effect
    const img = card.querySelector('.work-img');
    gsap.to(img, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }
    });
  });

  // About Image & Details Reveal
  gsap.fromTo('.about-img-wrapper',
    { scale: 0.9, opacity: 0 },
    { scrollTrigger: { trigger: '.about-img-wrapper', start: "top 80%" }, scale: 1, opacity: 1, duration: 1.6, ease: "power4.out" }
  );
  
  // Parallax the image inside the wrapper
  gsap.to('.about-img', {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: '.about-container',
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.fromTo('.about-text',
    { opacity: 0, y: 30 },
    { scrollTrigger: { trigger: '.about-text', start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
  );

  // Stats Stagger
  gsap.fromTo('.stat',
    { opacity: 0, y: 30 },
    { scrollTrigger: { trigger: '.about-stats', start: "top 90%" }, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
  );

  // Testimonials Animations
  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 40 },
    { scrollTrigger: { trigger: '.testimonials-grid', start: "top 75%" }, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
  );

  // Metrics Animation (animated bars)
  gsap.utils.toArray('.metric-fill').forEach((metric, i) => {
    const widths = ['98%', '180%', '100%'];
    gsap.fromTo(metric,
      { width: '0%' },
      { scrollTrigger: { trigger: metric.parentElement, start: "top 80%" }, width: widths[i] || '100%', duration: 2, ease: "power2.out" }
    );
  });

  // FAQ Animations
  gsap.fromTo('.faq-item',
    { opacity: 0, x: -30 },
    { scrollTrigger: { trigger: '.faq-list', start: "top 80%" }, opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
  );

  // Footer Reveal
  gsap.fromTo('.footer-container',
    { opacity: 0, y: 50 },
    { scrollTrigger: { trigger: '.footer', start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
  );
};

// Magnetic Buttons
const magneticTokens = document.querySelectorAll('.btn, .nav-cta, .nav-logo, .wa-float');
magneticTokens.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: "power2.out" });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  });
});

// Execute loader directly without waiting for blocking assets
let n = 0;
const ldNum = document.getElementById('ldNum');
const loader = document.getElementById('loader');

// FAQ Toggle Functionality
document.querySelectorAll('.faq-header').forEach(header => {
  header.addEventListener('click', function() {
    const faqItem = this.parentElement;
    faqItem.classList.toggle('active');
    
    // Close other open items
    document.querySelectorAll('.faq-item.active').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
  });
});

if (ldNum && loader) {
  const ldTimer = setInterval(() => {
    n += Math.ceil(Math.random() * 10);
    if (n >= 100) { 
      n = 100; 
      clearInterval(ldTimer); 
    }
    ldNum.textContent = String(n).padStart(3, '0');
  }, 35);

  setTimeout(() => {
    gsap.to(loader, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
      onComplete: () => {
        loader.style.display = 'none';
        initAnimations();
      }
    });
  }, 2200);
} else {
  setTimeout(initAnimations, 300);
}
