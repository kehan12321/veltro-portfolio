import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 1. REMOVED CSS smooth scroll to prevent ScrollTrigger conflicts. 
// Use Lenis.js if you want global smooth scrolling.

// 2. OPTIMIZED Nav scroll effect using ScrollTrigger instead of raw event listener
const navEl = document.querySelector('.nav');
if (navEl) {
  ScrollTrigger.create({
    start: "top -60",
    toggleClass: {targets: navEl, className: "scrolled"}
  });
}

// 3. ADDED null checks for Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
  });

  const hoverTargets = document.querySelectorAll('[data-cursor="hover"]');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
  });

  document.addEventListener("mouseleave", () => {
    gsap.to([cursorDot, cursorOutline], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener("mouseenter", () => {
    gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 });
  });
}

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

  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 60 },
      { scrollTrigger: { trigger: title, start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  });

  gsap.fromTo('.service-item',
    { opacity: 0, y: 40 },
    { scrollTrigger: { trigger: '.services-list', start: "top 75%" }, opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
  );

  gsap.utils.toArray('.work-card').forEach(card => {
    gsap.fromTo(card,
      { opacity: 0, y: 80 },
      { scrollTrigger: { trigger: card, start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
    
    const img = card.querySelector('.work-img');
    if (img) {
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
    }
  });

  gsap.fromTo('.about-img-wrapper',
    { scale: 0.9, opacity: 0 },
    { scrollTrigger: { trigger: '.about-img-wrapper', start: "top 80%" }, scale: 1, opacity: 1, duration: 1.6, ease: "power4.out" }
  );
  
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

  gsap.fromTo('.stat',
    { opacity: 0, y: 30 },
    { scrollTrigger: { trigger: '.about-stats', start: "top 90%" }, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
  );

  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 40 },
    { scrollTrigger: { trigger: '.testimonials-grid', start: "top 75%" }, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
  );

  // 4. FIXED the 180% width issue (changed to 80%)
  gsap.utils.toArray('.metric-fill').forEach((metric, i) => {
    const widths = ['98%', '80%', '100%']; 
    gsap.fromTo(metric,
      { width: '0%' },
      { scrollTrigger: { trigger: metric.parentElement, start: "top 80%" }, width: widths[i] || '100%', duration: 2, ease: "power2.out" }
    );
  });

  gsap.fromTo('.faq-item',
    { opacity: 0, x: -30 },
    { scrollTrigger: { trigger: '.faq-list', start: "top 80%" }, opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
  );

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

// FAQ Toggle Functionality
document.querySelectorAll('.faq-header').forEach(header => {
  header.addEventListener('click', function() {
    const faqItem = this.parentElement;
    faqItem.classList.toggle('active');
    
    document.querySelectorAll('.faq-item.active').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
  });
});

// 5. FIXED Loader sync issue
let n = 0;
const ldNum = document.getElementById('ldNum');
const loader = document.getElementById('loader');

if (ldNum && loader) {
  const ldTimer = setInterval(() => {
    n += Math.ceil(Math.random() * 10);
    if (n >= 100) { 
      n = 100; 
      ldNum.textContent = String(n).padStart(3, '0');
      clearInterval(ldTimer); 
      
      // Trigger loader exit ONLY when n hits 100
      gsap.to(loader, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          loader.style.display = 'none';
          initAnimations();
        }
      });
    } else {
      ldNum.textContent = String(n).padStart(3, '0');
    }
  }, 35);
} else {
  setTimeout(initAnimations, 300);
}