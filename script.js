document.addEventListener("DOMContentLoaded", () => {
    // Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const siteNavigation = document.querySelector(".site-navigation")
  
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("menu-active")
      siteNavigation.classList.toggle("active")
    })
  
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !menuToggle.contains(e.target) &&
        !siteNavigation.contains(e.target) &&
        siteNavigation.classList.contains("active")
      ) {
        menuToggle.classList.remove("menu-active")
        siteNavigation.classList.remove("active")
      }
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Close menu if open
        menuToggle.classList.remove("menu-active")
        siteNavigation.classList.remove("active")
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Highlight active section on scroll
    const sections = document.querySelectorAll(".project-section")
    const navLinks = document.querySelectorAll(".menu a")
  
    function highlightNavigation() {
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        const sectionId = "#" + section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === sectionId) {
              link.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavigation)
  
    // Enhanced parallax effect for project images
    const projectImages = document.querySelectorAll(".project-image img")
  
    function parallaxScroll() {
      projectImages.forEach((image) => {
        const parent = image.parentElement
        const scrollPosition = window.pageYOffset
        const parentOffset = parent.offsetTop
        const distance = parentOffset - scrollPosition
  
        if (Math.abs(distance) < window.innerHeight) {
          image.style.transform = `translateY(${distance * 0.1}px)`
        }
      })
    }
  
    window.addEventListener("scroll", parallaxScroll)
  
    // Add animated background
    createAnimatedBackground()
  
    // Add scroll indicator to first section
    if (document.querySelector(".project-section")) {
      const firstSection = document.querySelector(".project-section")
      const scrollIndicator = document.createElement("div")
      scrollIndicator.className = "scroll-indicator"
      scrollIndicator.innerHTML = `
        <div class="scroll-text">Scroll</div>
        <div class="scroll-icon"></div>
      `
      firstSection.appendChild(scrollIndicator)
  
      // Hide scroll indicator on scroll
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = "0"
        } else {
          scrollIndicator.style.opacity = "0.7"
        }
      })
    }
  
    // Add decorative elements to project detail page
    if (document.querySelector(".project-detail-content")) {
      const detailContent = document.querySelector(".project-detail-content")
  
      const circle1 = document.createElement("div")
      circle1.className = "decorative-circle circle-1"
  
      const circle2 = document.createElement("div")
      circle2.className = "decorative-circle circle-2"
  
      detailContent.appendChild(circle1)
      detailContent.appendChild(circle2)
    }
  
    // Image hover effect for project detail images
    const projectDetailImages = document.querySelectorAll(".project-image-container img")
    projectDetailImages.forEach((img) => {
      img.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = img.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5
        const y = (e.clientY - top) / height - 0.5
  
        img.style.transform = `scale(1.05) perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`
      })
  
      img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1) rotateY(0) rotateX(0)"
      })
    })
  
    // Add image reveal animation on scroll
    const revealElements = document.querySelectorAll(".project-image, .project-image-container, .feature-item")
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight
      const revealPoint = 150
  
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
  
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("revealed")
        }
      })
    }
  
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll() // Check on initial load
  
    // Create animated background
    function createAnimatedBackground() {
      const animatedBg = document.createElement("div")
      animatedBg.className = "animated-bg"
      document.body.appendChild(animatedBg)
  
      // Create SVG pattern
      animatedBg.innerHTML = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L40 20 M20 0 L20 40" stroke="#0033ff" stroke-width="0.5" fill="none" />
            <circle cx="20" cy="20" r="1" fill="#0033ff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      `
    }
  
    // Add image gallery to project detail page if it exists
    if (document.querySelector(".project-detail-section")) {
      // Find a good section to add the gallery to
      const keyFindingsSection = document.querySelector(".project-detail-section:nth-child(3)")
  
      if (keyFindingsSection) {
        const galleryContainer = document.createElement("div")
        galleryContainer.className = "image-gallery"
  
        // Create 6 gallery items with different images
        for (let i = 1; i <= 6; i++) {
          const galleryItem = document.createElement("div")
          galleryItem.className = "gallery-item"
  
          const img = document.createElement("img")
          img.src = `/placeholder.svg?height=400&width=400&query=data visualization chart ${i} with blue overlay`
          img.alt = `Gallery Image ${i}`
  
          galleryItem.appendChild(img)
          galleryContainer.appendChild(galleryItem)
        }
  
        keyFindingsSection.appendChild(galleryContainer)
      }
    }
  })
  