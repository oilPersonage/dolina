import LocomotiveScroll from "locomotive-scroll";
import "../css/locomotive.css";
import { animateLogo } from "./logo.js";

const isMobile = window.matchMedia("(max-width: 1280px)").matches;

export const locomotive = new LocomotiveScroll({
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

locomotive.on("scroll", isMobile ? () => null : animateLogo);
