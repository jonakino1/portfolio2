const toggle = document.getElementById('mode-toggle');
const body = document.body;

toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    toggle.checked = true;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    observer.observe(section);
});

// Contact form enhancement
const contactForm = document.querySelector('.contact-form');
const contactName = document.getElementById('contact-name');
const confirmationMsg = document.getElementById('confirmation-msg');

// Load stored names
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactName.value.trim();

    if (name) {
        contacts.push(name);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Show confirmation
        confirmationMsg.style.display = 'block';
        setTimeout(() => {
            confirmationMsg.style.display = 'none';
        }, 3000);

        // Reset form
        contactForm.reset();
    }
});
