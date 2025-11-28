// --- 1. SİNEMATİK AÇILIŞ (PRELOADER) ---
window.addEventListener('load', () => {
    
    const preloader = document.querySelector('.preloader');
    const heroImage = document.querySelector('.hero-image');
    const progress = document.querySelector('.loader-progress');
    
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to('.char', { y: 0, opacity: 1, stagger: 0.05, duration: 1 })
      .to(progress, { width: '100%', duration: 1.5, ease: "power2.inOut" }, "-=0.5")
      .to('.preloader-content', { y: -50, opacity: 0, duration: 0.8 })
      .to(preloader, { opacity: 0, duration: 1.5, onComplete: () => {
            preloader.style.display = 'none';
            document.body.classList.remove('is-locked');
        }}, "-=0.2")
      .to(heroImage, { opacity: 1, scale: 1, duration: 2 }, "-=1.5")
      .to('.line-content', { y: 0, stagger: 0.2, duration: 1 }, "-=1")
      .to(['.hero-subtitle', '.hero-desc', '.hero-cta'], { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, "-=0.5");
});

// --- 2. THEME SWITCHER ---
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const body = document.body;

toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        body.setAttribute('data-theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
});

// --- 3. CUSTOM CURSOR & TILT ---
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const hoverTriggers = document.querySelectorAll('.hover-trigger, a, button, input, textarea');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
});

hoverTriggers.forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

const tiltElements = document.querySelectorAll('[data-tilt]');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
});

// --- 4. BEFORE / AFTER SLIDER ---
const slider = document.getElementById("slider");
const imgAfter = document.getElementById("img-after");
const sliderHandle = document.querySelector(".slider-handle");

if(slider) {
    slider.addEventListener("input", (e) => {
        const val = e.target.value;
        imgAfter.style.width = `${val}%`;
        sliderHandle.style.left = `${val}%`;
    });
}

// --- 5. SCROLL TRIGGER ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

gsap.from('.service-card', {
    scrollTrigger: { trigger: '#services', start: 'top 80%' },
    y: 50, opacity: 0, duration: 0.8, stagger: 0.2
});
gsap.from('.grid-visual', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    x: -50, opacity: 0, duration: 1
});
gsap.from('.grid-content', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    x: 50, opacity: 0, duration: 1, delay: 0.2
});

// --- 6. MOBILE MENU ---
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-links a');

hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
closeBtn.addEventListener('click', () => mobileMenu.classList.remove('active'));
mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));

// Header Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});