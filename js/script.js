/* =====================================================
   ELEMENTS
===================================================== */

const openSurprise =
  document.getElementById("openSurprise");

const openingScreen =
  document.getElementById("openingScreen");

const birthdayReveal =
  document.getElementById("birthdayReveal");

const backgroundMusic =
  document.getElementById("backgroundMusic");

const heartExplosion =
  document.getElementById("heartExplosion");



/* =====================================================
   OPEN SURPRISE
===================================================== */

if (openSurprise) {

  openSurprise.addEventListener("click", () => {

    /* ---------------------------------------------
       MUSIC
    --------------------------------------------- */

    if (backgroundMusic) {

      backgroundMusic.volume = 0.35;

      backgroundMusic
        .play()
        .catch(() => {
          console.log(
            "Music could not start automatically."
          );
        });

    }


    /* ---------------------------------------------
       BUTTON CLICK FEEDBACK
    --------------------------------------------- */

    openSurprise.style.transform =
      "scale(0.96)";


    setTimeout(() => {

      openSurprise.style.transform =
        "";

    }, 180);


    /* ---------------------------------------------
       MASSIVE HEART EXPLOSION
    --------------------------------------------- */

    createMassiveHeartExplosion();


    /* ---------------------------------------------
       HIDE OPENING
    --------------------------------------------- */

    if (openingScreen) {

      openingScreen.classList.add("hide");

    }


    /* ---------------------------------------------
       REVEAL MAIN PAGE
    --------------------------------------------- */

    setTimeout(() => {

      if (birthdayReveal) {

        birthdayReveal.classList.add(
          "show"
        );

      }

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 650);

  });

}



/* =====================================================
   MASSIVE HEART EXPLOSION
===================================================== */

function createMassiveHeartExplosion() {

  if (!heartExplosion) {
    return;
  }


  /*
    Clear any previous hearts
  */

  heartExplosion.innerHTML = "";


  /*
    Create LOTS of hearts
  */

  const heartCount =
    window.innerWidth < 600
      ? 70
      : 110;


  for (
    let i = 0;
    i < heartCount;
    i++
  ) {

    const heart =
      document.createElement("span");


    heart.className =
      "explosion-heart";


    /*
      Mix of heart characters
    */

    const heartTypes = [
      "♡",
      "♥",
      "♡",
      "♥",
      "♡"
    ];


    heart.textContent =
      heartTypes[
        Math.floor(
          Math.random() *
          heartTypes.length
        )
      ];


    /*
      HUGE explosion direction
    */

    const angle =
      Math.random() *
      Math.PI *
      2;


    /*
      Distance is intentionally large
    */

    const distance =
      Math.random() *
      850 +
      350;


    let x =
      Math.cos(angle) *
      distance;


    let y =
      Math.sin(angle) *
      distance;


    /*
      Make some hearts fly
      much farther vertically
    */

    if (
      Math.random() >
      0.65
    ) {

      y *= 1.35;

    }


    /*
      Large hearts
    */

    const size =
      Math.random() *
      42 +
      18;


    /*
      Different animation speeds
    */

    const duration =
      Math.random() *
      1.5 +
      1.8;


    /*
      Different rotations
    */

    const rotation =
      Math.random() *
      160 -
      80;


    /*
      Different final scale
    */

    const scale =
      Math.random() *
      1.3 +
      0.8;


    heart.style.setProperty(
      "--heart-x",
      `${x}px`
    );


    heart.style.setProperty(
      "--heart-y",
      `${y}px`
    );


    heart.style.setProperty(
      "--heart-size",
      `${size}px`
    );


    heart.style.setProperty(
      "--heart-duration",
      `${duration}s`
    );


    heart.style.setProperty(
      "--heart-rotate",
      `${rotation}deg`
    );


    heart.style.setProperty(
      "--heart-scale",
      scale
    );


    /*
      Random starting position
      around the center
    */

    const startX =
      (Math.random() - 0.5) *
      80;


    const startY =
      (Math.random() - 0.5) *
      80;


    heart.style.marginLeft =
      `${startX}px`;


    heart.style.marginTop =
      `${startY}px`;


    /*
      Small random delay
    */

    heart.style.animationDelay =
      `${Math.random() * 0.25}s`;


    heartExplosion.appendChild(
      heart
    );

  }


  /*
    Add a second wave
    after the main explosion
  */

  setTimeout(() => {

    createSecondHeartWave();

  }, 250);


  /*
    Remove hearts later
  */

  setTimeout(() => {

    heartExplosion.innerHTML =
      "";

  }, 4500);

}



/* =====================================================
   SECOND HEART WAVE
===================================================== */

function createSecondHeartWave() {

  if (!heartExplosion) {
    return;
  }


  const waveCount =
    window.innerWidth < 600
      ? 35
      : 55;


  for (
    let i = 0;
    i < waveCount;
    i++
  ) {

    const heart =
      document.createElement("span");


    heart.className =
      "explosion-heart";


    heart.textContent =
      Math.random() > 0.35
        ? "♡"
        : "♥";


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      Math.random() *
      650 +
      200;


    const x =
      Math.cos(angle) *
      distance;


    const y =
      Math.sin(angle) *
      distance;


    const size =
      Math.random() *
      28 +
      12;


    const duration =
      Math.random() *
      1.2 +
      1.8;


    heart.style.setProperty(
      "--heart-x",
      `${x}px`
    );


    heart.style.setProperty(
      "--heart-y",
      `${y}px`
    );


    heart.style.setProperty(
      "--heart-size",
      `${size}px`
    );


    heart.style.setProperty(
      "--heart-duration",
      `${duration}s`
    );


    heart.style.setProperty(
      "--heart-rotate",
      `${Math.random() * 180 - 90}deg`
    );


    heart.style.setProperty(
      "--heart-scale",
      Math.random() * 1.1 + 0.7
    );


    heart.style.animationDelay =
      `${Math.random() * 0.2}s`;


    heartExplosion.appendChild(
      heart
    );

  }

}



/* =====================================================
   STORY SCROLL ANIMATION
===================================================== */

const storyItems =
  document.querySelectorAll(
    ".story-item"
  );


if (
  "IntersectionObserver" in window
) {

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.18
      }
    );


  storyItems.forEach(
    (item) => {

      observer.observe(item);

    }
  );

} else {

  storyItems.forEach(
    (item) => {

      item.classList.add(
        "visible"
      );

    }
  );

}



/* =====================================================
   MOUSE GLOW
===================================================== */

const mouseGlow =
  document.getElementById(
    "mouseGlow"
  );


if (
  mouseGlow &&
  window.innerWidth > 768
) {

  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;

  let currentX = mouseX;

  let currentY = mouseY;


  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

    }
  );


  function animateMouseGlow() {

    currentX +=
      (mouseX - currentX) *
      0.08;

    currentY +=
      (mouseY - currentY) *
      0.08;


    mouseGlow.style.left =
      `${currentX}px`;

    mouseGlow.style.top =
      `${currentY}px`;


    requestAnimationFrame(
      animateMouseGlow
    );

  }


  animateMouseGlow();

}



/* =====================================================
   HEART PARTICLE CANVAS
===================================================== */

const canvas =
  document.getElementById(
    "particleCanvas"
  );


let ctx = null;

let particles = [];


if (canvas) {

  ctx =
    canvas.getContext("2d");

}



/* =====================================================
   RESIZE CANVAS
===================================================== */

function resizeCanvas() {

  if (!canvas) {
    return;
  }


  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

}


resizeCanvas();


window.addEventListener(
  "resize",
  resizeCanvas
);



/* =====================================================
   HEART PARTICLE
===================================================== */

class HeartParticle {

  constructor(
    x =
      Math.random() *
      canvas.width,

    y =
      canvas.height +
      Math.random() * 100
  ) {

    this.x = x;

    this.y = y;

    this.size =
      Math.random() * 8 + 3;

    this.speed =
      Math.random() * 0.7 + 0.25;

    this.opacity =
      Math.random() * 0.45 + 0.12;

    this.swing =
      Math.random() * 1.5 + 0.5;

    this.swingOffset =
      Math.random() *
      Math.PI *
      2;

    this.rotation =
      Math.random() *
      Math.PI;

    this.rotationSpeed =
      (Math.random() - 0.5) *
      0.015;

    this.life =
      Math.random() *
      300 +
      200;

    this.age = 0;

  }


  update() {

    this.age++;


    this.y -=
      this.speed;


    this.x +=
      Math.sin(
        this.age * 0.012 +
        this.swingOffset
      ) *
      this.swing *
      0.25;


    this.rotation +=
      this.rotationSpeed;


    if (
      this.y < -30 ||
      this.age > this.life
    ) {

      this.reset();

    }

  }


  reset() {

    this.x =
      Math.random() *
      canvas.width;


    this.y =
      canvas.height +
      20;


    this.age = 0;


    this.size =
      Math.random() *
      8 +
      3;


    this.opacity =
      Math.random() *
      0.45 +
      0.12;

  }


  draw() {

    ctx.save();


    ctx.translate(
      this.x,
      this.y
    );


    ctx.rotate(
      this.rotation
    );


    ctx.globalAlpha =
      this.opacity;


    ctx.fillStyle =
      "rgba(244,120,140,1)";


    ctx.shadowBlur =
      12;


    ctx.shadowColor =
      "rgba(244,63,94,0.45)";


    const s =
      this.size;


    ctx.beginPath();


    ctx.moveTo(
      0,
      s * 0.35
    );


    ctx.bezierCurveTo(
      -s * 1.2,
      -s * 0.35,
      -s * 0.55,
      -s * 1.05,
      0,
      -s * 0.45
    );


    ctx.bezierCurveTo(
      s * 0.55,
      -s * 1.05,
      s * 1.2,
      -s * 0.35,
      0,
      s * 0.35
    );


    ctx.fill();


    ctx.restore();

  }

}



/* =====================================================
   INITIAL PARTICLES
===================================================== */

if (
  canvas &&
  ctx
) {

  const particleCount =
    window.innerWidth < 640
      ? 55
      : 95;


  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const particle =
      new HeartParticle();


    particle.y =
      Math.random() *
      canvas.height;


    particles.push(
      particle
    );

  }

}



/* =====================================================
   ANIMATE PARTICLES
===================================================== */

function animateParticles() {

  if (
    !canvas ||
    !ctx
  ) {
    return;
  }


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  particles.forEach(
    (particle) => {

      particle.update();

      particle.draw();

    }
  );


  requestAnimationFrame(
    animateParticles
  );

}


if (
  canvas &&
  ctx
) {

  animateParticles();

}



/* =====================================================
   PREMIUM BUTTON 3D EFFECT
===================================================== */

if (openSurprise) {

  openSurprise.addEventListener(
    "mousemove",
    (event) => {

      if (
        window.innerWidth <= 768
      ) {
        return;
      }


      const rect =
        openSurprise.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;


      const y =
        event.clientY -
        rect.top;


      const rotateX =
        ((y / rect.height) - 0.5) *
        -3;


      const rotateY =
        ((x / rect.width) - 0.5) *
        3;


      openSurprise.style.transform =
        `
        translateY(-4px)
        perspective(700px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        `;

    }
  );


  openSurprise.addEventListener(
    "mouseleave",
    () => {

      openSurprise.style.transform =
        "";

    }
  );

}



/* =====================================================
   REDUCED MOTION
===================================================== */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );


if (
  prefersReducedMotion.matches
) {

  particles = [];

}