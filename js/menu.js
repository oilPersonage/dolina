import anime from "animejs";

const button = document.querySelector(".hamb");
const menu = document.querySelector(".menu-desktop");
const menuMobile = document.querySelector(".menu-mobile-wrapper");

const isMobile = window.matchMedia("(max-width: 1280px)").matches;
let isOpened = false;

function animateDesktop() {
  menu.classList.toggle("opened");
  if (!isOpened) {
    isOpened = true;
    anime({
      targets: ".menu-desktop a",
      delay: anime.stagger(100, { direction: "reverse" }),
      translateY: 12,
      easing: "easeOutQuart",
      opacity: 1,
    });
    return;
  }
  isOpened = false;
  anime({
    targets: ".menu-desktop a",
    delay: anime.stagger(100),
    translateY: 0,
    opacity: 0,
  });
}

function animateMobile() {
  menuMobile.classList.toggle("opened");
  if (!isOpened) {
    isOpened = true;
    anime({
      targets: ".menu-mobile",
      translateY: ["-100%", "0%"],
      easing: "easeOutQuart",
    });
    anime({
      targets: ".menu-mobile a",
      delay: anime.stagger(100, { start: 300 }),
      translateY: -12,
      easing: "easeOutQuart",
      opacity: 1,
    });
    return;
  }
  isOpened = false;
  anime({
    targets: ".menu-mobile",
    translateY: ["0", "-100%"],
    easing: "easeOutQuart",
    delay: 300,
  });
  anime({
    targets: ".menu-mobile a",
    delay: anime.stagger(100),
    translateY: 12,
    opacity: 0,
  });
}

function listener() {
  button.classList.toggle("opened");
  if (isMobile) {
    animateMobile();
    return;
  }
  animateDesktop();
}

button.addEventListener("click", listener);
menuMobile.addEventListener("click", ({ target }) => {
  if (target === menuMobile || target.nodeName === "A") {
    listener();
  }
});
