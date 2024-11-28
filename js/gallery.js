import anime from "animejs";

const gallery = document.querySelector("#gallery");
const header = document.querySelector("header");
const w = gallery.clientWidth;
const containerW = gallery.parentElement.clientWidth;
const isMobile = window.matchMedia("(max-width: 1280px)").matches;

const inertia = 0.05;
let position = 0;
let progress = 0;
let mouseX = 0;
let allowAnimate = true;

// прогресс от 0 до 1
// двигая мышкой изменяем от -1 до 1
if (!isMobile) {
  header.addEventListener("mouseenter", (e) => (allowAnimate = true));
  header.addEventListener("mouseleave", (e) => {
    allowAnimate = false;
    mouseX = 0;
  });
  window.addEventListener("mousemove", (e) => {
    if (!allowAnimate) return;
    mouseX = e.pageX / window.innerWidth - 0.5;
  });

  function animate(draw) {
    requestAnimationFrame(function animate() {
      draw();
      requestAnimationFrame(animate);
    });
  }

  animate(() => {
    let p = 0 - progress + mouseX * 2 * -1;
    const abs = (p * (w - containerW)) / 2 - position;
    let next = position + abs * inertia;
    if (Math.abs(position - next) < 0.001) return;
    position = next;
    gallery.style.transform = `translateX(${position}px)`;
  });
}

Array.from([...document.querySelectorAll("#gallery img")]).map((img) => {
  if (img.complete) {
    anime({
      targets: img,
      rotateX: 0,
      duration: 1000,
    });
  }
  img.addEventListener("load", () => {
    anime({
      targets: img,
      rotateX: 0,
      duration: 1000,
    });
  });
});
