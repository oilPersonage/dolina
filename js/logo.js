import anime from "animejs";
import throttle from "lodash.throttle";

const isMobile = window.matchMedia("(max-width: 1280px)").matches;

const logo = document.querySelector(".header-logo-def");
const logoInvert = document.querySelector(".header-logo-invert");

let isScrolled = false;
let isAnimate = false;

export const animateLogo = throttle(function ({ scroll }) {
  if (scroll.y > 200 && !isScrolled) {
    isScrolled = true;
    isAnimate = true;
    anime({
      targets: logo,
      opacity: [1, 0],
      easing: "easeInOutCubic",
      duration: 1000,
    });
    anime({
      targets: logoInvert,
      opacity: [0, 1],
      easing: "easeInOutCubic",
      duration: 1000,
    });
    console.log(logo);
  } else if (scroll.y < 200 && isScrolled) {
    isScrolled = false;
    anime({
      targets: logo,
      opacity: [0, 1],
      easing: "easeInOutCubic",
      duration: 1000,
    });
    anime({
      targets: logoInvert,
      opacity: [1, 0],
      easing: "easeInOutCubic",
      duration: 1000,
    });
    isAnimate = true;
  }
}, 100);
