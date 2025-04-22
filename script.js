document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for the intro text
    const typingText = document.querySelector('.typing-text');
    const originalText = typingText.textContent;
    typingText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }
    
    // Start typing animation
    setTimeout(typeWriter, 1000);
    
    // Navigation functionality
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section and make it active
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
        });
    });
    
    // Keyboard navigation
    let currentIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        // Arrow right or down to go forward
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % sections.length;
            updateActiveSection();
        }
        
        // Arrow left or up to go backward
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + sections.length) % sections.length;
            updateActiveSection();
        }
    });
    
    function updateActiveSection() {
        // Remove active class from all sections and links
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to current section and corresponding link
        sections[currentIndex].classList.add('active');
        navLinks[currentIndex].classList.add('active');
    }
    
    // Handle scroll events for desktop
    let scrollTimeout;
    let isScrolling = false;
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        isScrolling = true;
        
        if (e.deltaY > 0) {
            // Scroll down
            currentIndex = (currentIndex + 1) % sections.length;
        } else {
            // Scroll up
            currentIndex = (currentIndex - 1 + sections.length) % sections.length;
        }
        
        updateActiveSection();
        
        // Reset scroll flag after animation completes
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 800); // Match this to your CSS transition time
    });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) < 50) return; // Minimum swipe distance
        
        isScrolling = true;
        
        if (diff > 0) {
            // Swipe up (go forward)
            currentIndex = (currentIndex + 1) % sections.length;
        } else {
            // Swipe down (go backward)
            currentIndex = (currentIndex - 1 + sections.length) % sections.length;
        }
        
        updateActiveSection();
        
        // Reset scroll flag after animation completes
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 800); // Match this to your CSS transition time
    });
});