// ===== Theme Toggle =====
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    
    // Save preference to local storage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('.theme-toggle i');
        icon.className = 'fas fa-sun';
    }
});

// ===== Mobile Menu Toggle =====
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// ===== Page Navigation =====
function showPage(pageName) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageName + 'Page').classList.add('active');
    window.scrollTo(0, 0);
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
}

// ===== Hero Image Slider =====
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetSlideInterval();
}

function currentSlide(index) {
    showSlide(index);
    resetSlideInterval();
}

function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    slideInterval = setInterval(autoSlide, 5000);
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ===== Intersection Observer for Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
});

// ===== Chatbot Functions =====
function toggleChatbot() {
    document.getElementById('chatbotWindow').classList.toggle('active');
}

function handleChatKey(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const messagesContainer = document.getElementById('chatMessages');
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-message user';
    userMsg.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(userMsg);

    input.value = '';

    // Simulate bot response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chatbot-message bot';
        
        const responses = {
            'admission': 'You can apply for admission through our online form. Visit the Admissions page for more details!',
            'school': 'The name of our school is New Beginning School.',
            'name': 'I am the New Beginning School Chatbot, here to assist you with any questions you may have.',
            'fee': 'Our fee structure varies by level. Please check the Admissions page for detailed information.',
            'contact': 'You can reach us at +256 0702138799 or email info@newbeginning.edu',
            'hours': 'Our school hours are Monday to Friday, 8:00 AM to 4:00 PM.',
            'default': 'Thank you for your question! For specific inquiries, please contact our admissions office or visit our Contact page.'
        };
        
        let response = responses.default;
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('admission') || lowerMsg.includes('apply')) {
            response = responses.admission;
        } else if (lowerMsg.includes('fee') || lowerMsg.includes('cost') || lowerMsg.includes('price')) {
            response = responses.fee;
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email')) {
            response = responses.contact;
        } else if (lowerMsg.includes('hours') || lowerMsg.includes('time') || lowerMsg.includes('open')) {
            response = responses.hours;
        }
        
        botMsg.innerHTML = `<p>${response}</p>`;
        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ===== Form Handlers =====
function handleAdmission(event) {
    event.preventDefault();
    alert('Thank you for your application! We will review your submission and contact you within 3-5 business days.');
    event.target.reset();
}

function handleContact(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    event.target.reset();
}

// ===== Smooth Scroll Animations =====
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
    } else {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// ===== Fade-in Animation on Scroll =====
const fadeElements = document.querySelectorAll('.quick-link-card, .news-card, .testimonial-card, .gallery-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===== Close mobile menu when clicking outside =====
document.addEventListener('click', (event) => {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(event.target) && 
        !mobileToggle.contains(event.target)) {
        toggleMenu();
    }
});

// ===== Prevent default anchor behavior for page navigation =====
document.querySelectorAll('a[onclick^="showPage"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});
