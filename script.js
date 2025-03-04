// Navigation menu toggle for mobile
const menuToggle = document.querySelector(".menu-toggle")
const navbar = document.getElementById("navbar")

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active")
})

// Close menu when clicking on a navigation link
const navLinks = document.querySelectorAll("#navbar ul li a")

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active")

    // Set active link
    navLinks.forEach((link) => link.classList.remove("active"))
    link.classList.add("active")
  })
})

// Set active nav link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const scrollPosition = window.scrollY

  // Change header background on scroll
  const header = document.getElementById("header")
  if (scrollPosition > 100) {
    header.style.backgroundColor = "white"
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.backgroundColor = "white"
    header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
  }

  // Back to top button visibility
  const backToTop = document.querySelector(".back-to-top")
  if (scrollPosition > 300) {
    backToTop.classList.add("show")
  } else {
    backToTop.classList.remove("show")
  }

  // Update active nav link
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionBottom = sectionTop + section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Testimonial slider
const testimonials = document.querySelectorAll(".testimonial")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
let currentSlide = 0

function showSlide(index) {
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active")
  })

  dots.forEach((dot) => {
    dot.classList.remove("active")
  })

  testimonials[index].classList.add("active")
  dots[index].classList.add("active")
  currentSlide = index
}

// Dot navigation
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number.parseInt(dot.getAttribute("data-index"))
    showSlide(slideIndex)
  })
})

// Previous and next buttons
prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length
  showSlide(currentSlide)
})

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % testimonials.length
  showSlide(currentSlide)
})

// Auto slide change
let slideInterval = setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonials.length
  showSlide(currentSlide)
}, 5000)

// Pause auto slide on hover
const testimonialSlider = document.querySelector(".testimonial-slider")
testimonialSlider.addEventListener("mouseenter", () => {
  clearInterval(slideInterval)
})

testimonialSlider.addEventListener("mouseleave", () => {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length
    showSlide(currentSlide)
  }, 5000)
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("form-message")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // In a real application, you would send the form data to a server
  // For this demo, we'll just show a success message

  const formData = new FormData(contactForm)
  const formObject = {}

  formData.forEach((value, key) => {
    formObject[key] = value
  })

  // Simulate form submission
  setTimeout(() => {
    formMessage.textContent = "Mensaje enviado con éxito. Nos pondremos en contacto con usted pronto."
    formMessage.classList.add("success")
    formMessage.style.display = "block"

    // Reset form
    contactForm.reset()

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }, 1000)
})

