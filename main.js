import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling (Lenis) with ultra premium settings
const lenis = new Lenis({
  duration: 0.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 0.8,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0, 0);

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
  
  tl.fromTo(".hero-title .word", 
    { y: "110%", rotate: 8, opacity: 0 },
    { y: "0%", rotate: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }
  )
  .fromTo(".hero-desc, .hero-actions, .nav", 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
    "-=0.8"
  );

  // Section Titles Reveal
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title, 
      { opacity: 0, y: 60 },
      { scrollTrigger: { trigger: title, start: "top 85%" }, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  });

  // Services Stagger
  gsap.fromTo('.service-item',
    { opacity: 0, x: -30 },
    { scrollTrigger: { trigger: '.services-list', start: "top 80%" }, opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
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
    gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: "power3.out" });
    
    // Also shift text slightly if it exists
    const text = btn.querySelector('span') || btn.querySelector('svg');
    if(text) {
      gsap.to(text, { x: x * 0.2, y: y * 0.2, duration: 0.6, ease: "power3.out" });
    }
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    const text = btn.querySelector('span') || btn.querySelector('svg');
    if(text) {
      gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    }
  });
});

window.addEventListener('load', () => {
  initAnimations();
});
