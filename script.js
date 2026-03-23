

// for span the chaning text

const dynamicText = document.getElementById('dynamic-text');
const words = ['web developer', 'UX/UI designer', 'youtuber', 'programmer', ]; //  words here
let wordIndex = 0;

function changeWord() {
  dynamicText.textContent = words[wordIndex];
  wordIndex = (wordIndex + 1) % words.length; // Cycle through the words
}

// Change the word every 2 seconds (adjust as needed)
setInterval(changeWord, 2000);

//optional click to change.
document.addEventListener('click', changeWord);
// endss....
/* ==
/*===== MENU SHOW Y HIDDEN =====*
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close')


// SHOW
toggleMenu.addEventListener('click', ()=>{
  navMenu.classList.toggle('show')
})

// HIDDEN
closeMenu.addEventListener('click', ()=>{
  navMenu.classList.remove('show')
})

== */

/*===== MOUSEMOVE HOME IMG =====
document.addEventListener('mousemove', move);
function move(e){
  this.querySelectorAll('.move').forEach(layer =>{
      const speed = layer.getAttribute('data-speed')

      const x = (window.innerWidth - e.pageX*speed)/120
      const y = (window.innerHeight - e.pageY*speed)/120

      layer.style.transform = `translateX(${x}px) translateY(${y}px)`
  })
}
== */



