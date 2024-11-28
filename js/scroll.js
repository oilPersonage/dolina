import LocomotiveScroll from "locomotive-scroll";
import "../css/locomotive.css";
import { animateLogo } from "./logo.js";
import throttle from "lodash.throttle";
import anime from "animejs";

const menu = document.querySelector(".header-menu");
const logo = document.querySelector(".header-logo-invert");

// const isMobile = window.matchMedia("(max-width: 1280px)").matches;
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const links = [...document.querySelectorAll(".menu-desktop a")];
const linksHref = links.map((link) => ({
  href: link.getAttribute("href").slice(1),
  el: link,
}));
let currentLink = 0;

export let locomotive = null;

function shotTitle(selector) {
  anime({
    targets: selector,
    delay: anime.stagger(200),
    translateY: [50, 0],
    easing: "easeOutQuint",
    duration: 1000,
  });
}

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
    if (
      typeof e.currentElements["tours"] === "object" &&
      typeof e.currentElements["tours-trigger"] === "object"
    ) {
      menu.classList.add("hide");
      logo.classList.add("white");
      // ouput log example: 0.34
      // gsap example : myGsapAnimation.progress(progress);
    } else {
      menu.classList.remove("hide");
      logo.classList.remove("white");
    }
  }, 300);

  // function whoTitleAnimate(e) {
  //   const item = e.currentElements["heading"];
  //   if (typeof item === "object") {
  //     if (isAnimate) return;
  //     isAnimate = true;
  //
  //     console.log(title);
  //     title.play();
  //   } else {
  //     isAnimate = false;
  //   }
  // }

  locomotive.on(
    "scroll",
    isMobile
      ? () => null
      : (e) => {
          // whoTitleAnimate(e);
          checkVisibilityBlock(e);
          animateLogo(e);
        },
  );

  locomotive.on("call", (e) => {
    if (e === "headingTours") {
      shotTitle("#whoTitle span");
    }
    if (e === "headingGallery") {
      shotTitle("#galleryTitle span");
    }
    if (e === "headingReviews") {
      shotTitle("#reviewsTitle span");
    }
    if (e === "headingWhy") {
      shotTitle("#whyTitle .heading-line span");
    }
    if (e === "headingContacts") {
      shotTitle("#contactsTitle .heading-line span");
    }
    if (e === "who") {
      anime({
        targets: ".who-item a",
        delay: anime.stagger(300),
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: "linear",
      });
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const href = link.getAttribute("href");
      locomotive.scrollTo(href);
    });
  });
});
