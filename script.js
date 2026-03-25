// --- 1. Mobile Menu Toggle ---
const mobileMenu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');

mobileMenu.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');

    // Animate Links
    navLinksLi.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    mobileMenu.classList.toggle('toggle');
});

// --- 2. Close Mobile Menu on Link Click ---
navLinksLi.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('toggle');
            navLinksLi.forEach(l => l.style.animation = '');
        }
    });
});

// --- 3. Scroll Reveal Animation (Simple) ---
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target all cards for reveal animation
document.querySelectorAll('.spec-card, .project-card').forEach(card => {
    card.classList.add('reveal');
    observer.observe(card);
});

// --- 4. CSS for Reveal Animation (Added via JS) ---
const style = document.createElement('style');
style.innerHTML = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0px);
    }
`;
document.head.appendChild(style);