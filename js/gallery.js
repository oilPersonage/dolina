const gallery = document.querySelector("#gallery");
const header = document.querySelector("header");
const w = gallery.clientWidth;
const containerW = gallery.parentElement.clientWidth;

const inertia = 0.1;
let position = 0;
let progress = 0;
let mouseX = 0;
let allowAnimate = true;

// прогресс от 0 до 1
// двигая мышкой изменяем от -1 до 1

header.addEventListener("mouseenter", (e) => (allowAnimate = true));
header.addEventListener("mouseleave", (e) => (allowAnimate = false));
window.addEventListener("mousemove", (e) => {
  if (!allowAnimate) return;
  mouseX = e.pageX / window.innerWidth - 0.5;
});

function animate(draw) {
  requestAnimationFrame(function animate(time) {
    draw();
    requestAnimationFrame(animate);
  });
}

animate(() => {
  let p = 0 - progress + mouseX * 2 * -1;
  const abs = (p * (w - containerW)) / 2 - position;
  position = position + abs * inertia;
  // const finalProgress = easeInOutCubic(pInertia);
  gallery.style.transform = `translateX(${position}px)`;
});
