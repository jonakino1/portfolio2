const toggle = document.getElementById('mode-toggle');
const body = document.body;

// 🌙 Dark mode toggle
toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    toggle.checked = true;
}

// 🧭 Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 👁️ Reveal sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    observer.observe(section);
});

// 💻 Project card click redirects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank'); // Opens in new tab
        }
    });
    card.style.cursor = 'pointer';
});

// 📩 Contact form (Formspree integration)
const contactForm = document.querySelector('.contact-form');
const confirmationMsg = document.getElementById('confirmation-msg');

// Replace this URL with your actual Formspree endpoint
const FORMSPREE_URL = 'https://formspree.io/f/yourFormID'; 

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);

    fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            confirmationMsg.textContent = '✅ Thank you for reaching out! Your message has been sent.';
            confirmationMsg.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                confirmationMsg.style.display = 'none';
            }, 4000);
        } else {
            confirmationMsg.textContent = '⚠️ Something went wrong. Please try again later.';
            confirmationMsg.style.display = 'block';
        }
    })
    .catch(() => {
        confirmationMsg.textContent = '⚠️ Unable to send message. Check your connection and try again.';
        confirmationMsg.style.display = 'block';
    });
});
