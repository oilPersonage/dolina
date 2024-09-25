import anime from "animejs";
import throttle from "lodash.throttle";

const logo = document.getElementById("header-logo");
const logoB = document.querySelector(".logo-b");
const logoT = document.querySelector(".logo-t");

const logoD = document.querySelector(".logo-d");
const logoO = document.querySelector(".logo-o");
const logoL = document.querySelector(".logo-l");
const logoI = document.querySelector(".logo-i");
const logoN = document.querySelector(".logo-n");
const logoA = document.querySelector(".logo-a");

let isScrolled = false;
let isAnimate = false;

let animateProgress = {
  percent: 0,
};

const mainTo = anime({
  targets: animateProgress,
  percent: [0, 1],
  duration: 2200,
  autoplay: false,
  direction: "reverse",
  change: (e) => {
    tlTop.seek((e.progress / 100) * tlTop.duration);
    tlBottom.seek((e.progress / 100) * tlTop.duration);
  },
  complete: (e) => {
    isAnimate = false;
  },
});

const tlBottom = anime.timeline({
  duration: 1000, // Can be inherited
  autoplay: false, // Can be inherited
});
const tlTop = anime.timeline({
  duration: 1000, // Can be inherited
  autoplay: false, // Can be inherited
});

const symbolEasing = "easeOutQuad";

tlBottom
  .add({
    targets: logoB,
    easing: "easeInOutQuint",
    top: 10,
  })
  .add(
    {
      targets: logoD,
      translateX: -21,
      easing: symbolEasing,
      opacity: 0,
      duration: 1000,
    },
    "-=1000",
  )
  .add(
    {
      targets: logoO,
      translateY: -21,
      easing: symbolEasing,
      opacity: 0,
      duration: 1000,
    },
    "-=1000",
  )
  .add(
    {
      targets: logoL,
      translateY: 21,
      easing: symbolEasing,
      opacity: 0,
      duration: 1000,
    },
    "-=1000",
  )
  .add({
    targets: logoB,
    scale: 1.5,
    duration: 200,
    easing: "easeInOutQuad",
  })
  .add({
    targets: logoB,
    rotate: 45,
    duration: 1000,
    left: 54,
  });

tlTop
  .add({
    targets: logoT,
    easing: "easeInOutQuint",
    top: 10,
  })
  .add(
    {
      targets: logoI,
      translateY: 21,
      easing: symbolEasing,
      opacity: 0,
      duration: 1000,
    },
    "-=1000",
  )
  .add(
    {
      targets: logoN,
      translateY: -21,
      easing: symbolEasing,
      opacity: 0,
      duration: 1000,
    },
    "-=1000",
  )
  .add(
    {
      targets: logoA,
      translateX: 21,
      easing: symbolEasing,
      opacity: 0,
      duration: 1000,
    },
    "-=1000",
  )
  .add({
    targets: logoT,
    scale: 1.5,
    duration: 200,
    easing: "easeInOutQuad",
  })
  .add({
    targets: logoT,
    rotate: 45,
    duration: 1000,
    left: 68,
  });

window.addEventListener(
  "scroll",
  throttle(function () {
    if (window.scrollY > 200 && !isScrolled) {
      isScrolled = true;

      mainTo.pause();
      mainTo.reverse();
      mainTo.play();
      isAnimate = true;
    } else if (window.scrollY < 200 && isScrolled) {
      isScrolled = false;
      mainTo.pause();
      mainTo.reverse();
      mainTo.play();
      isAnimate = true;
    }
  }, 100),
);
