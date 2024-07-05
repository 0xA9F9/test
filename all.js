//confetti

import confetti from 'https://cdn.skypack.dev/canvas-confetti';

function launchConfetti(event) {
    const el = event.currentTarget;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (left + width / 2) / window.innerWidth;
    const y = (top + height / 2) / window.innerHeight;

     confetti({
        particleCount: 100,
        spread: 70, 
        startVelocity: 30,
        angle: -270, 
        origin: { x, y },
        disableForReducedMotion: true
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.rdv').forEach(element => {
        element.addEventListener('click', launchConfetti);
    });
});



// spark

class ClickSpark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = document.documentElement;
    this.svg;
  }

  get activeEls() {
    return this.getAttribute("active-on");
  }

  connectedCallback() {
    this.setupSpark();

    this.root.addEventListener("click", (e) => {
      if (this.activeEls && !e.target.matches(this.activeEls)) return;

      this.setSparkPosition(e);
      this.animateSpark();
    });
  }

  animateSpark() {
    let sparks = [...this.svg.children];
    let size = parseInt(sparks[0].getAttribute("y1"));
    let offset = size / 2 + "px";

    let keyframes = (i) => {
      let deg = `calc(${i} * (360deg / ${sparks.length}))`;

      return [
        {
          strokeDashoffset: size * 3,
          transform: `rotate(${deg}) translateY(${offset})`
        },
        {
          strokeDashoffset: size,
          transform: `rotate(${deg}) translateY(0)`
        }
      ];
    };

    let options = {
      duration: 660,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      fill: "forwards"
    };

    sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
  }

  setSparkPosition(e) {
    let rect = this.root.getBoundingClientRect();

    this.svg.style.left =
      e.clientX - rect.left - this.svg.clientWidth / 2 + "px";
    this.svg.style.top =
      e.clientY - rect.top - this.svg.clientHeight / 2 + "px";
  }

  setupSpark() {
    let template = `
      <style>
        :host {
          display: contents;
        }
        
        svg {
          pointer-events: none;
          position: absolute;
          rotate: -20deg;
          z-index:9999
        }

        line {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          transform-origin: center;
          stroke: red; 
        }
      </style>
      <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        ${Array.from(
          { length: 8 },
          (_) => `<line x1="50" y1="30" x2="50" y2="4"/>`
        ).join("")}
      </svg>
    `;

    this.shadowRoot.innerHTML = template;
    this.svg = this.shadowRoot.querySelector("svg");
  }
}

customElements.define("click-spark", ClickSpark);



//menu 

    const icons = document.querySelectorAll('.line');
  const menu = document.querySelector('.menu');

  icons.forEach(icon => {  
    icon.addEventListener('click', (event) => {
      icon.classList.toggle("open");
      menu.classList.toggle("active");
    });
  });


// play button and modal

 
document.addEventListener('DOMContentLoaded', () => {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("play");
    var span = document.getElementsByClassName("close")[0];
    var video = document.querySelector("#myModal video");

    btn.onclick = function() {
        modal.style.display = "block";
        modal.querySelector('.modal-content').classList.remove('bounceOut');
        modal.querySelector('.modal-content').classList.add('bounceIn');
        video.play();
        btn.classList.add('played'); 
    }

    span.onclick = function() {
        modal.querySelector('.modal-content').classList.remove('bounceIn');
        modal.querySelector('.modal-content').classList.add('bounceOut');
        setTimeout(() => {
            modal.style.display = "none";
            video.pause(); 
            btn.classList.remove('played'); 
        }, 600);
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.querySelector('.modal-content').classList.remove('bounceIn');
            modal.querySelector('.modal-content').classList.add('bounceOut');
            setTimeout(() => {
                modal.style.display = "none";
                video.pause(); 
                btn.classList.remove('played'); 
            }, 600);
        }
    }
});




//video 


    const ua = navigator.userAgent;

const isSafariMobile = () => {
  if (/Mobile(\/.*)? Safari/i.test(ua)) return true;
  else return false;
}
const isSafari = () =>{
    if (!isSafariMobile()) {
      if (/Safari/i.test(ua)) {
        if (/Chrome/i.test(ua)) return false;
        else return true;
      } else return false;
    } else return false;
  }

const isSafariBrowser = isSafari();
console.log(isSafariBrowser)

const path =  document.querySelector('svg path');
const video =  document.querySelector('.video');
TweenMax.set(path, { transformOrigin: '50% 50%', scale: 0 });

const onUpdate = isSafariBrowser
? () => {
  video.style.clipPath = video.style.webkitClipPath = 'none';
  video.offsetWidth; // force repaint
  video.style.clipPath = video.style.webkitClipPath = 'url(#video-clip)';
}
: () => {};

const anim = TweenMax.to(path, {
  rotation: 360,
  ease: 'none',
  duration: 5,
  repeat: -1,
  onUpdate
});

TweenMax.to(path, {
  scale: 1,
  ease: 'inout.sine',
  duration: 0.6,
  delay: 0.5
});


// slider

  $(document).ready(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        adaptiveHeight: false,
        autoplay: true, 
        autoplaySpeed: 1000, 
        pauseOnHover: true,
        arrows: false
    });
});