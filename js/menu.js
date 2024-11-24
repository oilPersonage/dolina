import anime from "animejs";

const button = document.querySelector(".hamb");
const menuMobile = document.querySelector(".menu-mobile-wrapper");

const isMobile = window.matchMedia("(max-width: 1280px)").matches;
let isOpened = false;

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
  if (!isMobile) return;
  button.classList.toggle("opened");
  animateMobile();
}

button.addEventListener("click", listener);
menuMobile.addEventListener("click", ({ target }) => {
  if (target === menuMobile || target.nodeName === "A") {
    listener();
  }
});
