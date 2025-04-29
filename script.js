document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNavigation = document.querySelector('.site-navigation');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('menu-active');
        siteNavigation.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !siteNavigation.contains(e.target) && siteNavigation.classList.contains('active')) {
            menuToggle.classList.remove('menu-active');
            siteNavigation.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close menu if open
            menuToggle.classList.remove('menu-active');
            siteNavigation.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('.project-section');
    const navLinks = document.querySelectorAll('.menu a');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Parallax effect for project images
    const projectImages = document.querySelectorAll('.project-image img');
    
    function parallaxScroll() {
        projectImages.forEach(image => {
            const parent = image.parentElement;
            const scrollPosition = window.pageYOffset;
            const parentOffset = parent.offsetTop;
            const distance = parentOffset - scrollPosition;
            
            if (Math.abs(distance) < window.innerHeight) {
                image.style.transform = `translateY(${distance * 0.1}px)`;
            }
        });
    }
    
    window.addEventListener('scroll', parallaxScroll);
});