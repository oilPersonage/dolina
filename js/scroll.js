import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.min.css";
import { animateLogo } from "./logo.js";

const isMobile = window.matchMedia("(max-width: 1280px)").matches;

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

const locomotive = new LocomotiveScroll({
  // el: document.querySelector("#main"),
  el: document.querySelector(".scroll-container"),
  duration: 800,
  orientation: "vertical",
  gestureOrientation: "vertical",
  scrollbarContainer: document.querySelector(".scrollbar"),
  scrollbarClass: "scrollbar",
  smooth: true,
  smartphone: {
    getSpeed: true,
    smooth: true,
    duration: 200,
  },
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  normalizeWheel: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  // scrollCallback: onScroll,
});

locomotive.on("scroll", isMobile ? null : animateLogo);
