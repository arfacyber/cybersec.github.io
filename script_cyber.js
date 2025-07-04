document.addEventListener('DOMContentLoaded', function() {
    // Terminal Loader
    const terminalLoader = document.querySelector('.terminal-loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            terminalLoader.style.opacity = '0';
            terminalLoader.style.visibility = 'hidden';
            setTimeout(() => {
                terminalLoader.style.display = 'none';
            }, 500);
        }, 4000); // Match this with the animation duration
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const professions = ['Penetration Tester', 'Security Architect', 'Ethical Hacker', 'Red Team Operator'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            typingText.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentProfession.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex++;
            if (professionIndex === professions.length) {
                professionIndex = 0;
            }
            setTimeout(type, 500);
        } else {
            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }
    }

    setTimeout(type, 1000);

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Matrix Background Effect
    const matrixBg = document.querySelector('.matrix-bg');
    if (matrixBg) {
        // Create matrix characters
        const chars = "01";
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        const rows = Math.floor(window.innerHeight / fontSize);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * fontSize}px`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            column.style.animationDuration = `${5 + Math.random() * 10}s`;
            
            for (let j = 0; j < rows; j++) {
                const char = document.createElement('span');
                char.textContent = chars.charAt(Math.floor(Math.random() * chars.length));
                char.style.opacity = Math.random();
                char.style.animationDelay = `${Math.random() * 5}s`;
                column.appendChild(char);
            }
            
            matrixBg.appendChild(column);
        }

        // Add styles for matrix
        const style = document.createElement('style');
        style.textContent = `
            .matrix-column {
                position: absolute;
                top: -100%;
                display: flex;
                flex-direction: column;
                font-family: var(--font-mono);
                color: var(--primary-color);
                font-size: ${fontSize}px;
                animation: matrix-fall linear infinite;
            }
            
            @keyframes matrix-fall {
                to {
                    transform: translateY(calc(100vh + 100%));
                }
            }
            
            .matrix-column span {
                transition: opacity 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('#backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const encrypt = document.querySelector('input[name="encrypt"]').checked;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you, ${name}! Your ${encrypt ? 'encrypted ' : ''}message has been sent via secure channel. I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Syntax Highlighting
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    // Animation on Scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-content, .service-card, .portfolio-item, .cert-card, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .service-card, .portfolio-item, .cert-card, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Lightbox for Portfolio Items
    const portfolioImages = document.querySelectorAll('.portfolio-img img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    portfolioImages.forEach(image => {
        image.addEventListener('click', function() {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = this.src;
            img.alt = this.alt;
            
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });

    // Add styles for lightbox
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        #lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        #lightbox.active {
            opacity: 1;
            pointer-events: all;
        }
        
        #lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border: 2px solid var(--primary-color);
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
        }
    `;
    document.head.appendChild(lightboxStyles);
});