import anime from "animejs";

const button = document.querySelector(".hamb");
const menu = document.querySelector(".menu");
let isOpened = false;

button.addEventListener("click", () => {
  button.classList.toggle("opened");
  menu.classList.toggle("opened");
  if (!isOpened) {
    isOpened = true;
    anime({
      targets: ".menu a",
      delay: anime.stagger(100, { direction: "reverse" }),
      translateY: 12,
      easing: "easeOutQuart",
      opacity: 1,
    });
    return;
  }
  isOpened = false;
  anime({
    targets: ".menu a",
    delay: anime.stagger(100),
    translateY: 0,
    opacity: 0,
  });
});
