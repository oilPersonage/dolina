import anime from "animejs";

const loader = document.querySelectorAll(".loader");

anime({
  targets: loader,
  loop: true,
  keyframes: [{ translateY: 0 }, { translateY: -6 }, { translateY: 0 }],
  delay: anime.stagger(100),
  easing: "linear",
  duration: 800,
});
