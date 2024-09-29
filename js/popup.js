import throttle from "lodash.throttle";
import anime from "animejs";

const popup = document.querySelector("#popup");
const popupBody = document.querySelector("#popup > div");
const popupImg = document.getElementById("#popup-img");
const gallery = document.querySelector("#gallery");
let currentHeight = 0;
let isAnimate = false;
const defaultSize = 85;

function setPopupSize() {
  const w = document.body.clientWidth;
  const h = document.body.clientHeight;
  const isHorizontal = w > h;
  currentHeight = popupBody.clientHeight;

  popupBody.style.height = isHorizontal
    ? defaultSize + "vh"
    : defaultSize + "vw";
  popupBody.style.width = isHorizontal
    ? defaultSize + "vh"
    : defaultSize + "vw";
}

setPopupSize();

window.addEventListener("resize", throttle(setPopupSize, 100));

gallery.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG" && isAnimate) return false;
  const src = e.target.getAttribute("data-img");
  isAnimate = true;
  anime({
    targets: popup,
    opacity: 1,
    easing: "easeOutExpo",
    complete() {
      isAnimate = false;
    },
  });
  anime({
    targets: popupBody,
    height: currentHeight + "px",
    easing: "easeOutExpo",
  });
  popupImg.setAttribute("src", src);
  popup.classList.add("show");
});
popup.addEventListener("click", () => {
  if (isAnimate) return;
  isAnimate = true;
  anime({
    targets: popup,
    opacity: 0,
    easing: "easeInExpo",
    complete() {
      popup.classList.remove("show");
      isAnimate = false;
    },
  });
  anime({
    targets: popupBody,
    height: "0px",
    easing: "easeOutExpo",
  });
});
