import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

const heightThumb = 126;
const offsetTopScrollbar = 24;

// const scrollbarThumb = document.querySelector(".scrollbar-thumb");
// const scrollbar = document.querySelector(".scrollbar");
// const scrollbarHeight = scrollbar.offsetHeight - heightThumb;
let position = 0;
let drag = false;
const scrollbarThumbCenter = heightThumb / 2 - offsetTopScrollbar;

// function onScroll({ scroll, limit, velocity, direction, progress }) {
//   scrollbarThumb.style.transform = `translateY(${progress * scrollbarHeight}px)`;
//   scrollbarThumb.style.opacity = Math.ceil(Math.abs(velocity)).toString();
//   // console.log( scroll)
// }

const locomotiveScroll = new LocomotiveScroll({
  // el: document.querySelector("#main"),
  el: document.querySelector(".scroll-container"),
  lerp: 0.1,
  duration: 1.2,
  orientation: "vertical",
  gestureOrientation: "vertical",
  scrollbarContainer: document.querySelector(".scrollbar"),
  scrollbarClass: "scrollbar",
  smooth: true,
  smartphone: {
    smooth: true,
  },
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  normalizeWheel: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  // scrollCallback: onScroll,
});
//
// scrollbarThumb.ondragstart = function (e) {
//   return false;
// };
//
// scrollbarThumb.addEventListener("mousedown", (e) => {
//   pauseEvent(e);
//   drag = true;
// });
// document.addEventListener("mouseup", (e) => {
//   drag = false;
// });
// document.addEventListener("mouseleave", (e) => {
//   drag = false;
// });
// document.addEventListener(
//   "mousemove",
//   throttle((e) => {
//     if (!drag) return;
//     const progress = (
//       (e.clientY - scrollbarThumbCenter) /
//       window.innerHeight
//     ).clamp(0, 1);
//     position = progress * document.body.scrollHeight;
//     locomotiveScroll.scrollTo(position);
//   }, 100),
// );

function animateH2(e) {
  console.log(e);
}
