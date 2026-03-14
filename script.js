/**
 * Portfolio - Pink Dark Mode with Tailwind CSS
 * Enhanced interactivity maintaining all original functionality
 */

const DOM = {
    navbar: document.querySelector('.navbar'),
    navMenu: document.getElementById('navMenu'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    navLinks: document.querySelectorAll('.nav-link'),
    contactForm: document.getElementById('contactForm'),
    projectModal: document.getElementById('projectModal'),
    modalClose: document.getElementById('modalClose'),
    projectButtons: document.querySelectorAll('.project-btn'),
    formMessage: document.getElementById('formMessage')
};

/**
 * Utility functions
 */
const toggleClass = (element, className, force) => {
    if (force !== undefined) {
        element.classList.toggle(className, force);
    } else {
        element.classList.toggle(className);
    }
};

const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const throttle = (func, delay = 300) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func(...args);
            lastCall = now;
        }
    };
};

// Mobile Menu
const initMobileMenu = () => {
    if (!DOM.mobileMenuBtn) return;

    DOM.mobileMenuBtn.addEventListener('click', () => {
        toggleClass(DOM.mobileMenuBtn, 'active');
        toggleClass(DOM.navMenu, 'active');
        document.body.classList.toggle('no-scroll');
    });

    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.mobileMenuBtn.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!DOM.mobileMenuBtn.contains(e.target) && !DOM.navMenu.contains(e.target)) {
            DOM.mobileMenuBtn.classList.remove('active');
            DOM.navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
};

// Navbar Scroll Effect
const initNavbarScroll = () => {
    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
};

// Smooth Scroll & Active Nav
const initSmoothScroll = () => {
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
};

const updateActiveNavLink = throttle(() => {
    const sections = document.querySelectorAll('section[id], header[id]');
    let current = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.getAttribute('id');
        }
    });

    DOM.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 150);

// Contact Form
const initContactForm = () => {
    if (!DOM.contactForm) return;

    const validateForm = () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return false;
        }

        return { name, email, message };
    };

    const showFormMessage = (text, type) => {
        DOM.formMessage.textContent = text;
        DOM.formMessage.className = `form-message ${type}`;
        DOM.formMessage.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                DOM.formMessage.style.display = 'none';
            }, 5000);
        }
    };

    DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = validateForm();
        if (!formData) return;

        // Simulate API call
        const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form submitted:', formData);
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            DOM.contactForm.reset();
        } catch (error) {
            showFormMessage('Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
};

// Project Modal - Updated with Tailwind classes
const initProjectModal = () => {
    if (!DOM.projectModal) return;

    const projectDetails = {\n        'LMS System': {\n            title: 'LMS (Learning Management System)',\n
'LMS System': {\n            title: 'LMS (Learning Management System)',\n            description: 'Comprehensive Learning Management System for educational institutions with course creation, student tracking, and certification.',\n            technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js'],\n            features: ['Course Builder', 'Student Portal', 'Gradebook', 'Certification'],\n        },\n        \'IMS System\': {\n            title: \'IMS (Inventory Management System)\',\n            description: \'Advanced inventory management for businesses with stock tracking, order management, supplier portals, and real-time analytics.\',\n            details: \'Complete inventory solution with barcode scanning, low-stock alerts, multi-warehouse support, and POS integration.\',\n            technologies: [\'Python\', \'Django\', \'PostgreSQL\', \'React\'],\n            features: [\'Stock Tracking\', \'Order Management\', \'Supplier Portal\', \'Analytics Dashboard\']\n        }\n    };

    const openModal = (projectTitle) => {
        const project = projectDetails[projectTitle];
        if (!project) return;

        const html = `
bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent
            <p class="text-2xl text-slate-300 mb-12 leading-relaxed">${project.description}</p>
            
            <div class="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                    <h4 class="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-pink-dark-300 to-pink-dark-400 bg-clip-text text-transparent">Overview</h4>
                    <p class="text-lg text-slate-400 leading-relaxed">${project.details || 'Advanced project showcasing modern development practices.'}</p>
                </div>
                <div>
                    <h4 class="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-pink-dark-300 to-pink-dark-400 bg-clip-text text-transparent">Technologies</h4>
                    <div class="flex flex-wrap gap-3">
                        ${project.technologies.map(tech => `<span class="px-4 py-2 bg-gradient-to-r from-pink-dark-500/20 to-pink-dark-600/20 text-pink-dark-300 border border-pink-dark-400/50 rounded-xl text-sm font-medium backdrop-blur-sm">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-pink-dark-300 to-pink-dark-400 bg-clip-text text-transparent">Key Features</h4>
                <ul class="space-y-3 text-lg text-slate-300">
                    ${project.features.map(feature => `<li class="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-pink-dark-500/10 hover:border-pink-dark-400 transition-all duration-300"><i class="fas fa-check-circle text-pink-dark-400 text-xl flex-shrink-0"></i>${feature}</li>`).join('')}
                </ul>
            </div>
        `;

        document.getElementById('modalBody').innerHTML = html;
        DOM.projectModal.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        DOM.projectModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    // Event listeners
    DOM.projectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectCard = btn.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent.trim();
            openModal(projectTitle);
        });
    });

    DOM.modalClose.addEventListener('click', closeModal);
    DOM.projectModal.addEventListener('click', (e) => {
        if (e.target === DOM.projectModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && DOM.projectModal.classList.contains('active')) {
            closeModal();
        }
    });
};

// Intersection Observer for animations
const initIntersectionObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.skill-category, .project-card, .highlight-item').forEach(el => {
        observer.observe(el);
    });
};

// Scroll to Top
const initScrollToTop = () => {
    let scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) {
        scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollToTopBtn';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-indigo-500/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 opacity-0 translate-y-6 z-[999] w-16 h-16 flex items-center justify-center border-2 border-white/20 backdrop-blur-xl';
        document.body.appendChild(scrollBtn);
    }

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 800) {
            scrollBtn.classList.remove('opacity-0', 'translate-y-6');
            scrollBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            scrollBtn.classList.remove('opacity-100', 'translate-y-0');
            scrollBtn.classList.add('opacity-0', 'translate-y-6');
        }
    }, 100));

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Initialization
const init = () => {
console.log('🔵 Enterprise Systems Dashboard Initialized 🔵');
    
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initProjectModal();
    initIntersectionObserver();
    initScrollToTop();
    
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();
    
    // Performance log
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`💅 Page loaded in ${loadTime}ms`);
    }
};

// Prevent body scroll when mobile menu open
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark');
    init();
});

