import anime from "animejs";
import { locomotive } from "./scroll.js";

const showBtn = document.querySelectorAll(".tours-open");
const closeBtn = document.querySelector(".tours-close");

const toursModal = document.querySelector(".modal-tours");
const toursContainer = document.querySelector(".modal-tours-content");
const thumb = document.querySelector(".scrollbar-tours-thumb");
const toursContainerScrolled = document.querySelector(
  ".modal-tours-content > div",
);
const toursLink = document.querySelector(".modal-tours nav");
const links = [...document.querySelectorAll(".tours-link")];
let selectedLinkIndex = 0;

const gap = 120 + 50;
let fullScrollHeight = 0;

let linksData = [];

let isAnimate = false;

function closeModal() {
  window.location.hash = "#";
  if (isAnimate) return;
  isAnimate = true;
  locomotive.start();
  toursModal.classList.remove("open");
  links.forEach((el) => el.classList.remove("active"));

  anime({
    targets: toursContainerScrolled,
    opacity: [1, 0],
    translateY: [0, 100],
    easing: "easeInQuart",
    duration: 300,
    complete() {
      toursModal.style.zIndex = "-1";
      toursContainer.scrollTo(0, 0);
      isAnimate = false;
    },
  });

  anime({
    targets: toursLink,
    opacity: [1, 0],
    translateY: [0, -100],
    duration: 300,
    easing: "easeInQuart",
  });
  anime({
    targets: ".scrollbar-tours",
    opacity: [1, 0],
    translateY: [0, -100],
    duration: 300,
    easing: "easeInQuart",
  });
}

closeBtn.addEventListener("click", closeModal);
toursModal.addEventListener("click", (e) => {
  if (e.target !== toursModal) return;
  closeModal();
});
showBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (isAnimate) return;
    isAnimate = true;

    e.preventDefault();
    locomotive.stop();
    toursModal.classList.add("open");
    toursModal.style.zIndex = "100";

    anime({
      targets: toursContainerScrolled,
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutQuart",
      complete() {
        isAnimate = false;

        fullScrollHeight =
          toursContainerScrolled.clientHeight - window.innerHeight + gap;
        linksData = links
          .map((link) => {
            const href = link.getAttribute("href");
            if (!document.querySelector(href)) return;
            return {
              el: link,
              data: document.querySelector(href).getBoundingClientRect(),
            };
          })
          .filter((el) => !!el);
      },
    });

    anime({
      targets: ".scrollbar-tours",
      opacity: [0, 1],
      translateY: [100, 0],
      delay: 300,
      easing: "easeOutQuart",
    });

    anime({
      targets: toursLink,
      opacity: [0, 1],
      translateY: [-100, 0],
      easing: "easeOutQuart",
    });
  });
});

function checkVisibleLink(scrollTop) {
  const windowHeight = window.innerHeight;
  const topScreenBorder = windowHeight * 0.5;
  const bottomScreenBorder = windowHeight * 1.5;
  linksData.forEach(({ data, el }, idx) => {
    if (
      scrollTop > data.top - topScreenBorder &&
      scrollTop < data.top + bottomScreenBorder
    ) {
      links[selectedLinkIndex].classList.remove("active");
      el.classList.add("active");
      selectedLinkIndex = idx;
    } else {
      el.classList.remove("active");
    }
  });
}

toursContainer.addEventListener("scroll", (e) => {
  const progress = toursContainer.scrollTop / fullScrollHeight;
  thumb.style.transform = `translate(-8px, ${progress * (window.innerHeight - gap - 100)}px)`;

  checkVisibleLink(toursContainer.scrollTop);
});
