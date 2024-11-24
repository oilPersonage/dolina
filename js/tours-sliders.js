import { tns } from "tiny-slider/src/tiny-slider";

const sliders = document.querySelectorAll(".tours-slider");
sliders.forEach((slider) => {
  tns({
    container: slider,
    items: 1,
    gutter: 12,
    // slideBy: "page",
    prevButton: slider.previousElementSibling.previousElementSibling,
    nextButton: slider.previousElementSibling,
    navContainer: slider.nextElementSibling,
    autoplay: false,
    nav: true,
    speed: 1000,
    controls: true,
  });
});
