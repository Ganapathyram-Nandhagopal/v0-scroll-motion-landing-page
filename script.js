// State
let activeSection = 0
const sections = document.querySelectorAll(".section")
const scrollContainer = document.getElementById("scrollContainer")
const progressBar = document.getElementById("progressBar")
const navDotsContainer = document.getElementById("navDots")

// Create navigation dots
function createNavDots() {
  sections.forEach((_, index) => {
    const dot = document.createElement("button")
    dot.className = "nav-dot"
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => scrollToSection(index))
    navDotsContainer.appendChild(dot)
  })
}

// Scroll to specific section
function scrollToSection(index) {
  const targetPosition = index * window.innerHeight
  scrollContainer.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  })
}

// Update active section
function updateActiveSection() {
  const scrollPosition = scrollContainer.scrollTop
  const windowHeight = window.innerHeight
  const newActiveSection = Math.round(scrollPosition / windowHeight)

  if (newActiveSection !== activeSection) {
    activeSection = newActiveSection

    // Update navigation dots
    const dots = document.querySelectorAll(".nav-dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeSection)
    })

    // Update section active state for animations
    sections.forEach((section, index) => {
      section.classList.toggle("active", index === activeSection)
    })
  }
}

// Update progress bar
function updateProgressBar() {
  const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight
  const scrolled = scrollContainer.scrollTop
  const progress = (scrolled / scrollHeight) * 100
  progressBar.style.width = `${progress}%`
}

// Animated background with grid
function initBackground() {
  const canvas = document.getElementById("backgroundCanvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  const squareSize = 40
  const cols = Math.ceil(canvas.width / squareSize)
  const rows = Math.ceil(canvas.height / squareSize)

  // Draw grid
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 1

    for (let i = 0; i <= cols; i++) {
      ctx.beginPath()
      ctx.moveTo(i * squareSize, 0)
      ctx.lineTo(i * squareSize, canvas.height)
      ctx.stroke()
    }

    for (let i = 0; i <= rows; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * squareSize)
      ctx.lineTo(canvas.width, i * squareSize)
      ctx.stroke()
    }
  }

  drawGrid()

  // Animate grid on mouse move
  let mouseX = 0
  let mouseY = 0

  canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    const col = Math.floor(mouseX / squareSize)
    const row = Math.floor(mouseY / squareSize)

    drawGrid()

    // Highlight square under mouse
    ctx.fillStyle = "#222"
    ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
  })
}

// Initialize
function init() {
  createNavDots()
  initBackground()

  // Set first section as active
  sections[0].classList.add("active")

  // Add scroll listener
  scrollContainer.addEventListener("scroll", () => {
    updateActiveSection()
    updateProgressBar()
  })

  // Initial progress bar update
  updateProgressBar()
}

// Run on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
