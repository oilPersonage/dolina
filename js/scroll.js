import LocomotiveScroll from "locomotive-scroll";
import "../css/locomotive.css";
import { animateLogo } from "./logo.js";
import throttle from "lodash.throttle";
import anime from "animejs";

const menu = document.querySelector(".header-menu");

// const isMobile = window.matchMedia("(max-width: 1280px)").matches;
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const links = [...document.querySelectorAll(".menu-desktop a")];
const linksHref = links.map((link) => ({
  href: link.getAttribute("href").slice(1),
  el: link,
}));
let currentLink = 0;

export let locomotive = null;

window.addEventListener("load", (e) => {
  locomotive = new LocomotiveScroll({
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
  });

  const checkVisibilityBlock = throttle((e) => {
    for (let i = 0; i < linksHref.length; i++) {
      if (
        typeof e.currentElements[linksHref[i].href] === "object" &&
        e.currentElements[linksHref[i].href].progress > 0.1 &&
        !linksHref[i].el.classList.contains("active")
      ) {
        linksHref[i].el.classList.add("active");
        linksHref[currentLink].el.classList.remove("active");
        currentLink = i;
      }
    }

    if (typeof e.currentElements["tours"] === "object") {
      menu.classList.add("hide");
      // ouput log example: 0.34
      // gsap example : myGsapAnimation.progress(progress);
    } else {
      menu.classList.remove("hide");
    }
  }, 300);

  const whoAnim = anime({
    targets: '[data-scroll-id="whoTitle"]',
    opacity: [0, 1],
    autoplay: false,
    duration: 1000,
  });

  function whoTitleAnimate(e) {
    const item = e.currentElements["whoTitle"];
    if (typeof item === "object") {
      whoAnim.seek((whoAnim.duration / 10) * (item.progress * 1.4));
    }
  }

  locomotive.on(
    "scroll",
    isMobile
      ? () => null
      : (e) => {
          whoTitleAnimate(e);
          checkVisibilityBlock(e);
          animateLogo(e);
        },
  );

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      locomotive.scrollTo(href);
    });
  });
});
