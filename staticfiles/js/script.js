// Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Testimonial Slider
        let currentSlide = 0;
        const testimonials = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = testimonials.length;

        function showSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.remove('active');
                if (i === index) {
                    testimonial.classList.add('active');
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const message = document.getElementById('message').value;
                const submitBtn = contactForm.querySelector('.send-btn');
                
                // Disable submit button and show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                try {
                    const response = await fetch('/contact/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, message })
                    });
                    
                    const data = await response.json();
                    
                    if (data.status === 'success') {
                        alert('Thank you for your message! We will get back to you soon.');
                        contactForm.reset();
                    } else {
                        alert('Error sending message. Please try again.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error sending message. Please try again.');
                } finally {
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            });
        }

        // Gallery Slider
        let currentGallerySlide = 0;
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryDots = document.querySelectorAll('.gallery-dot');
        const galleryPrev = document.querySelector('.gallery-prev');
        const galleryNext = document.querySelector('.gallery-next');
        const totalGallerySlides = galleryItems.length;

        function showGallerySlide(index) {
            galleryItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });

            galleryDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }

        function nextGallerySlide() {
            currentGallerySlide = (currentGallerySlide + 1) % totalGallerySlides;
            showGallerySlide(currentGallerySlide);
        }

        function prevGallerySlide() {
            currentGallerySlide = (currentGallerySlide - 1 + totalGallerySlides) % totalGallerySlides;
            showGallerySlide(currentGallerySlide);
        }

        // Auto-advance gallery slides every 4 seconds
        if (galleryItems.length > 0) {
            setInterval(nextGallerySlide, 4000);
        }

        // Gallery navigation buttons
        if (galleryPrev) {
            galleryPrev.addEventListener('click', prevGallerySlide);
        }

        if (galleryNext) {
            galleryNext.addEventListener('click', nextGallerySlide);
        }

        // Gallery dot navigation
        galleryDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentGallerySlide = index;
                showGallerySlide(currentGallerySlide);
            });
        });

        // Skill Modal Functionality
        const skillModal = document.getElementById('skillModal');
        const skillModalTitle = document.getElementById('skillModalTitle');
        const skillModalContent = document.getElementById('skillModalContent');
        const skillModalClose = document.querySelector('.skill-modal-close');
        const skillTags = document.querySelectorAll('.skill-tag');

        // Skill descriptions with Zambian context
        const skillDescriptions = {
            'venture-capital': {
                title: 'Venture Capital in Zambia',
                content: `
                    <p>I help Zambian entrepreneurs access the capital they need to grow their businesses. From Lusaka startups to rural enterprises, I connect promising ideas with the right investors.</p>
                    <p><strong>How I can help you:</strong></p>
                    <ul>
                        <li>Connect you with local and international investors</li>
                        <li>Prepare your business for investment rounds</li>
                        <li>Structure deals that work for the Zambian market</li>
                        <li>Navigate regulatory requirements for foreign investment</li>
                        <li>Build relationships with development finance institutions</li>
                    </ul>
                    <p><em>Whether you're in agriculture, tech, or manufacturing, I understand the unique challenges and opportunities in Zambia's growing economy.</em></p>
                `
            },
            'financial-strategy': {
                title: 'Financial Strategy for Zambian Businesses',
                content: `
                    <p>I develop financial strategies that work specifically for the Zambian business environment, considering local market conditions, currency fluctuations, and economic policies.</p>
                    <p><strong>What I offer:</strong></p>
                    <ul>
                        <li>Kwacha management and forex risk strategies</li>
                        <li>Tax optimization for Zambian businesses</li>
                        <li>Cash flow management in challenging economic times</li>
                        <li>Investment strategies for local markets</li>
                        <li>Financial planning for family businesses</li>
                    </ul>
                    <p><em>From managing inflation impacts to navigating Bank of Zambia regulations, I help you build financial resilience.</em></p>
                `
            },
            'business-investment': {
                title: 'Business Investment in Zambia',
                content: `
                    <p>I guide both local and foreign investors through the complexities of investing in Zambia, from market entry strategies to exit planning.</p>
                    <p><strong>Investment areas I specialize in:</strong></p>
                    <ul>
                        <li>Mining and natural resources</li>
                        <li>Agriculture and agribusiness</li>
                        <li>Renewable energy projects</li>
                        <li>Tourism and hospitality</li>
                        <li>Manufacturing and value addition</li>
                    </ul>
                    <p><em>I understand the investment climate, from SEZ opportunities to PPP structures, and help you make informed decisions.</em></p>
                `
            },
            'financial-education': {
                title: 'Financial Education for Zambians',
                content: `
                    <p>I make complex financial concepts accessible to Zambians at all levels, from students to business owners, using local examples and real-world scenarios.</p>
                    <p><strong>Educational programs I offer:</strong></p>
                    <ul>
                        <li>Student financial literacy workshops</li>
                        <li>Small business financial management</li>
                        <li>Investment education for beginners</li>
                        <li>Retirement planning in Zambia</li>
                        <li>Digital banking and fintech adoption</li>
                    </ul>
                    <p><em>From understanding mobile money to planning for retirement, I help Zambians build financial confidence and independence.</em></p>
                `
            },
            'startup-mentorship': {
                title: 'Startup Mentorship in Zambia',
                content: `
                    <p>I mentor Zambian entrepreneurs through the startup journey, from idea validation to scaling, with deep understanding of local market dynamics.</p>
                    <p><strong>Mentorship areas:</strong></p>
                    <ul>
                        <li>Business model development for Zambian markets</li>
                        <li>Pitch deck creation and investor presentations</li>
                        <li>Team building and leadership development</li>
                        <li>Market research and customer validation</li>
                        <li>Scaling strategies for African markets</li>
                    </ul>
                    <p><em>Whether you're building the next big tech startup in Lusaka or expanding a rural business, I provide practical, locally-relevant guidance.</em></p>
                `
            },
            'public-speaking': {
                title: 'Public Speaking & Thought Leadership',
                content: `
                    <p>I speak at conferences, universities, and corporate events across Zambia, sharing insights on finance, entrepreneurship, and economic development.</p>
                    <p><strong>Speaking topics:</strong></p>
                    <ul>
                        <li>Zambia's economic outlook and opportunities</li>
                        <li>Youth entrepreneurship and job creation</li>
                        <li>Financial inclusion and digital transformation</li>
                        <li>Women in business and leadership</li>
                        <li>Sustainable business practices</li>
                    </ul>
                    <p><em>From university campuses to business conferences, I inspire and educate audiences with practical, actionable insights for the Zambian context.</em></p>
                `
            }
        };

        // Open skill modal
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const skillType = tag.getAttribute('data-skill');
                const skillData = skillDescriptions[skillType];
                
                if (skillData) {
                    skillModalTitle.textContent = skillData.title;
                    skillModalContent.innerHTML = skillData.content;
                    skillModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Add active class to clicked tag
                    skillTags.forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                }
            });
        });

        // Close skill modal
        skillModalClose.addEventListener('click', () => {
            skillModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            skillTags.forEach(t => t.classList.remove('active'));
        });

        // Close modal when clicking outside
        skillModal.addEventListener('click', (e) => {
            if (e.target === skillModal) {
                skillModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                skillTags.forEach(t => t.classList.remove('active'));
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && skillModal.style.display === 'block') {
                skillModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                skillTags.forEach(t => t.classList.remove('active'));
            }
        });