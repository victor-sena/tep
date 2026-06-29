/* ==========================================================================
   THE ENGLISH PROFESSIONAL - INTERACTIVITY & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header Scroll Effect ---
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page starts scrolled

    // --- 2. Mobile Menu / Burger Menu ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Burger
            burger.classList.toggle('toggle');

            // Custom burger lines morph
            const lines = burger.querySelectorAll('div');
            if (burger.classList.contains('toggle')) {
                lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // --- 3. Home Hero Slider (Multi-slide) ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        };

        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 6000); // 6 seconds auto rotation
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                showSlide(index);
                startSlideShow();
            });
        });

        // Initialize Slider
        showSlide(0);
        startSlideShow();
    }

    // --- 4. Testimonial Carousel (Swipe / Drag / Auto-scroll) ---
    const track = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const carouselDotsContainer = document.querySelector('.carousel-dots');

    if (track && testimonialSlides.length > 0) {
        let currentIndex = 0;

        // Dynamic dots creation
        testimonialSlides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Testimonial page ${idx + 1}`);
            carouselDotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                goToTestimonial(idx);
            });
        });

        const carouselDots = document.querySelectorAll('.carousel-dot');

        const goToTestimonial = (index) => {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            carouselDots.forEach(dot => dot.classList.remove('active'));
            if (carouselDots[currentIndex]) {
                carouselDots[currentIndex].classList.add('active');
            }
        };

        // Auto-run carousel
        let carouselInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % testimonialSlides.length;
            goToTestimonial(nextIndex);
        }, 8000);

        // Pause on hover
        const carouselContainer = document.querySelector('.testimonial-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
            carouselContainer.addEventListener('mouseleave', () => {
                carouselInterval = setInterval(() => {
                    let nextIndex = (currentIndex + 1) % testimonialSlides.length;
                    goToTestimonial(nextIndex);
                }, 8000);
            });
        }
    }

    // --- 5. Accordion (FAQ) ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(header => {
        header.addEventListener('click', function () {
            const item = this.parentElement;
            const content = this.nextElementSibling;

            // Toggle active state on item
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }

            // Close other items (optional but clean)
            const siblingItems = Array.from(item.parentElement.children).filter(child => child !== item);
            siblingItems.forEach(sibling => {
                sibling.classList.remove('active');
                const siblingContent = sibling.querySelector('.accordion-content');
                if (siblingContent) siblingContent.style.maxHeight = '0';
            });
        });
    });

    // --- 6. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            if (rect.top <= viewHeight * 0.85) {
                el.classList.add('active');
            }
        });
    };

    // Support modern Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Trigger once initially
    }

    // --- 7. Services Category Highlight (Smooth Scroll Navigation) ---
    const serviceButtons = document.querySelectorAll('.services-nav-btn');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            serviceButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
