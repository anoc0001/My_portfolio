// ====== 1. Dynamic Typing Text (Hero Section) ======
const dynamicText = document.getElementById('dynamic-text');
const words = ['Web Developer', 'UX/UI Designer', 'Youtuber', 'Creative']; 
let wordIndex = 0;

function changeWord() {
    if (dynamicText) {
        dynamicText.textContent = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;
    }
}
setInterval(changeWord, 2000);

// for the nav bar

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        console.log("Menu clicked!"); // Check your browser console to see if this works
    });
}); // nav bar ends here


// == particul stars hereS

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.alpha = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.01; // Particles fade out
  }
  draw() {
    ctx.fillStyle = `rgba(255, 209, 227, ${this.alpha})`; // That pinkish hue you like
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles on mouse move
window.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle(e.x, e.y));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();

// == qote section animation starts here
gsap.registerPlugin(ScrollTrigger);

// --- STEP 1: Split the text into words automatically ---
const quoteElement = document.querySelector('.quote');
const quoteText = quoteElement.textContent; // Changed 'text' to 'quoteText' just to be safe
const quoteWords = quoteText.split(" "); // Changed 'words' to 'quoteWords'

// Clear the original text and inject words wrapped in spans
quoteElement.innerHTML = "";
quoteWords.forEach(word => { // Use the new name here
  const span = document.createElement("span");
  span.innerHTML = word + " "; 
  
  quoteElement.appendChild(span);
});

// --- STEP 2: The Animation Timeline ---
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".quote",
    start: "top 80%",   // Start when section is near the bottom
    end: "bottom 20%",  // End when section is near the top
    scrub: true,        // Smoothly follows your scroll
    markers: false      // Set to 'true' if you want to see the start/end lines for testing
  }
});

// A. Zoom and Fade the whole container in
tl.from(".quote", {
  scale: 0.7,
  duration: 5,
}, 0);

// B. Highlight words one by one (The "Scrub" effect)
tl.to(".quote span", {
  opacity: 1,
  color: "#black", // Change this to your highlight color (e.g., gold or bright white)
  stagger: 0.4,     // This creates the "one after another" timing
  duration: 3,
}, 0);

// C. Fade out as it leaves
tl.to(".quote", {
  opacity: 0,
  y: -10,
  duration: 1,
});

// Floating Circle moves up
// This makes the tag float on its own (Gentle breathing)
gsap.to(".icon-code", {
    y: -600,         /* Increased distance so it 'flies' away faster */
    opacity: 1,
    scale: 1.5,
    rotateZ: -35,
    
    scrollTrigger: {
        trigger: ".quote-wrapper",
        start: "top 20%",     /* Starts after the text begins zooming */
        end: "bottom top",    /* COMPLETELY ends when the section hits the top of screen */
        scrub: 1.5,           /* Makes the movement follow your scroll speed */
        toggleActions: "play none none reverse", /* Ensures it plays/reverses correctly */
    }
});

// 3. The Gear Rotation
gsap.to(".icon-setting", {
  rotation: 360,
  scrollTrigger: {
    trigger: ".quote-wrapper",
    scrub: 1
  }
});

// NOTE: We do NOT write a gsap.to for ".big-half-circle" 
// This keeps it perfectly fixed on the screen while everything else floats!

// ---For the digital archive, starts here ---

// This makes the flip happen ONLY when you scroll to the title
gsap.from(".word", {
  scrollTrigger: {
    trigger: ".playful-title",
    start: "top 85%", 
    // play = scroll down into it
    // reverse = reset and play backwards when scrolling up past it
    toggleActions: "play reverse play reverse" 
  },
  rotationX: -100,
  y: 100,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "back.out(2)",
  transformOrigin: "top center"
});

// Keep your mouse hover code (the .forEach loop) exactly as it is!

// 2. The "Playful" Interaction: Mouse Hover
const wordss = document.querySelectorAll('.word');

wordss.forEach(word => {
  word.addEventListener('mouseenter', () => {
    // Random playful colors: Blue, Red, Pink, Cyan
    const colors = ['#3498db', '#e74c3c', '#f368e0', '#00d2d3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    gsap.to(word, {
      color: randomColor,
      scale: 1.2,
      rotationZ: Math.random() * 10 - 5, // Random slight wiggle
      duration: 0.3,
      ease: "power2.out"
    });
  });

  word.addEventListener('mouseleave', () => {
    gsap.to(word, {
      color: "#ffffff",
      scale: 1,
      rotationZ: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  });
});


// ====== 2. Project Data Storage ======
const projectData = {
    peony: {
        title: "Project Peony",
        tagline: "E-Commerce Experience",
        description: "Crafted a premium, high-converting digital storefront for 'Peony,' a luxury floral brand. The core focus was translating the brand’s curated aesthetic into a seamless and intuitive user journey, making the client feel personalized care.",
        techUsedIcons: [
            "fa-brands fa-html5",
            "fa-brands fa-css3-alt",
            "fa-brands fa-js"
        ],
        features: [
            "Premium GSAP micro-interactions (e.g., product fade-ins).",
            "Complex category navigation with unique layout.",
            "Responsive 50/50 product-showcase layout.",
            "Integrated cohesive video storytelling sections."
        ],
        image: "./images/Untitled (600 x 800 px) (1).jpg", 
        liveLink: "Floralshop.html", 
        githubLink: "https://github.com/anoc0001/My_portfolio" 
    },
    uxui: {
        title: "Project UX/UI",
        tagline: "Interface Design Case Study",
        description: "A comprehensive case study demonstrating user research, wireframing, and hi-fidelity prototyping for a mobile application.",
        techUsedIcons: ["fa-brands fa-figma", "fa-solid fa-compass-drafting"],
        features: ["User Journey Mapping", "Wireframe iterations", "Responsive prototypes"],
        image: "./images/ux.jpg",
        liveLink: "#",
        githubLink: "#"
    },
    graphic: {
        title: "Project Graphic",
        tagline: "Brand Identity System",
        description: "Developing a complete visual language, color palette, and logo system for a startup brand.",
        techUsedIcons: ["fa-solid fa-palette", "fa-brands fa-adobe"],
        features: ["Logo design", "Type System development", "Brand guidelines"],
        image: "./images/graphics-cover.png",
        liveLink: "graphics.html",
        githubLink: "#"
    },
    motion: {
        title: "Project Motion",
        tagline: "Animation and Video",
        description: "Developing custom motion graphics, video intros, and logo animations to enhance digital storytelling.",
        techUsedIcons: ["fa-brands fa-adobe", "fa-solid fa-film"],
        features: ["Logo Sting creation", "GSAP sequences", "Video editing"],
        image: "./images/ux 3.jpg",
        liveLink: "#",
        githubLink: "#"
    }
};

// ====== 3. Modal Functions ======
function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const modalOverlay = document.getElementById('projectModal');
    
    // Fill text content
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalTagline').innerText = data.tagline;
    document.getElementById('modalDescription').innerText = data.description;
    
    // Fill image
    const modalImg = document.getElementById('modalImg');
    modalImg.src = data.image;
    modalImg.alt = data.title;
    
    // Update button links
    document.getElementById('liveDemoBtn').href = data.liveLink;
    document.getElementById('githubCodeBtn').href = data.githubLink;

    // Inject Tech Icons
    const techIconRow = document.getElementById('techIconsRow');
    techIconRow.innerHTML = ""; 
    data.techUsedIcons.forEach(iconClass => {
        const iconElement = document.createElement('i');
        iconElement.className = iconClass;
        techIconRow.appendChild(iconElement);
    });

    // Inject Features List
    const featureList = document.getElementById('modalFeatures');
    featureList.innerHTML = ""; 
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerText = feature;
        featureList.appendChild(li);
    });

    // Show Modal
    modalOverlay.classList.add('active');
    
    // GSAP Animation for smooth "Pop"
    gsap.from("#projectModal .modal-content", { 
        duration: 0.5, 
        y: 50, 
        opacity: 0, 
        ease: "power2.out" 
    });
}

function closeModal() {
    const modalOverlay = document.getElementById('projectModal');
    modalOverlay.classList.remove('active');
}
// Close modal on outside click
// 1. Define the overlay at the top level so it's globally accessible
const modalOverlay = document.getElementById('projectModal');

// 2. Add the "Click Outside to Close" listener
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        // If the user clicks the dark/blurred area (the overlay) 
        // and NOT the white box (the content), close it.
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Make functions globally available
window.openProject = openProject;
window.closeModal = closeModal;

// ---header button animation starts here ---//
const buttons = document.querySelectorAll('.home__button, .second-button'); 

buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,          // Increased from 0.15 for more movement
      y: y * 0.3, 
      rotationX: -y * 0.15, // Slightly more tilt
      rotationY: x * 0.15,
      duration: 0.1,       // Lowered from 0.3 to make it much faster/snappier
      ease: 'power2.out',
      transformPerspective: 500
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { 
      x: 0, 
      y: 0, 
      rotationX: 0, 
      rotationY: 0, 
      duration: 0.5,       // A bit slower on the return so it "settles" nicely
      ease: 'elastic.out(1, 0.3)' // Added a tiny bounce for extra polish
    });
  });
});

// for the pop up
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('construction-modal');
  const archiveSection = document.querySelector('.project-layout'); // Watches your welcome section
  const closeBtn = document.getElementById('close-popup');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the 'wel_come' section is visible on screen
      if (entry.isIntersecting) {
        
        // Delay it by 1 second so the user sees your header animation first
        setTimeout(() => {
          modal.style.visibility = 'visible';
          modal.style.opacity = '1';
        }, 1000);
        
        // 'unobserve' makes sure the pop-up only happens ONCE per visit
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1 }); // Trigger when 50% of the section is visible

  observer.observe(archiveSection);

  // Logic to close the modal when the button is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => { 
      modal.style.visibility = 'hidden'; 
    }, 500); 
  });
});

// ====== WORK WITH ME SECTION - SCROLL TRIGGERED ANIMATIONS ======
console.log('Script loaded, checking for GSAP...');
console.log('GSAP available:', typeof gsap);
console.log('ScrollTrigger available:', typeof ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

// Test if elements exist
const workContainer = document.querySelector('.work-with-me-container');
const workText = document.querySelector('.work-text');
const floatingCoil = document.querySelector('.floating-coil');

console.log('Work container found:', workContainer);
console.log('Work text found:', workText);
console.log('Floating coil found:', floatingCoil);

// Force the initial start state immediately
gsap.set('.work-text', {
  x: -200,
  scale: 1,
  autoAlpha: 0.2,
  transformOrigin: '50% 50%'
});
gsap.set('.floating-coil', {
  y: 180,
  rotation: -20,
  rotationX: 15,
  rotationY: -12,
  autoAlpha: 0.25,
  transformPerspective: 1200,
  transformOrigin: '50% 50%'
});

// Scroll-triggered animation
if (workContainer && workText && floatingCoil) {
  ScrollTrigger.create({
    trigger: '.work-with-me-container',
    start: 'top 85%',
    scrub: false,
    markers: false,
    onEnter: () => {
      gsap.fromTo('.work-text', {
        x: -200,
        scale: 1,
        autoAlpha: 0.2,
        transformOrigin: '50% 50%'
      }, {
        x: 0,
        scale: 3.5,
        autoAlpha: 1,
        duration: 2,
        ease: 'power3.out'
      });
      gsap.fromTo('.floating-coil', {
        y: 180,
        rotation: -20,
        rotationX: 15,
        rotationY: -12,
        autoAlpha: 0.25,
        transformPerspective: 1200,
        transformOrigin: '50% 50%'
      }, {
        y: 0,
        rotation: 5,
        rotationX: 10,
        rotationY: -8,
        autoAlpha: 1,
        duration: 2,
        ease: 'power3.out',
        delay: 0.2
      });
      console.log('Work section entered');
    },
    onLeave: () => {
      console.log('Work section left');
    }
  });
  
  console.log('Scroll trigger animation set up');
}


// --- RESET COLOR FOR TOP SECTIONS ---
// This ensures that when you scroll UP from projects, 
// the Hero, Quote, and Welcome sections go back to your pink.
/*ScrollTrigger.create({
    trigger: ".hero", // You can also use ".quote-wrapper"
    start: "top center",
    onEnter: () => gsap.to("body", { backgroundColor: "#ff9ec5d8", duration: 1 }),
    onEnterBack: () => gsap.to("body", { backgroundColor: "#ff9ec5d8", duration: 1 }),
});

// ====== Project Color Swapper & Smooth Entry ======
gsap.utils.toArray(".project-step").forEach((step) => {
  const color = step.getAttribute("data-color");

  ScrollTrigger.create({
    trigger: step,
    start: "top 50%", // Change color when the section is halfway up the screen
    end: "bottom 50%",
    onEnter: () => gsap.to("body", { backgroundColor: color, duration: 1 }),
    onEnterBack: () => gsap.to("body", { backgroundColor: color, duration: 1 }),
  });

  // Optional: Add a subtle fade-in for the images as they appear
 /* gsap.from(step.querySelector(".image-link"), {
    scrollTrigger: {
      trigger: step,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
}); */