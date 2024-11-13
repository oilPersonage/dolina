import throttle from "lodash.throttle";
import anime from "animejs";

const popup = document.querySelector("#popup");
const popupBody = document.querySelector("#popup > div");
const popupImg = document.getElementById("#popup-img");
const popupLoader = document.getElementById("popup-loader");
const popupLoaderItems = document.querySelectorAll("#popup-loader svg");
const gallery = document.querySelector("#gallery");

const w = document.body.clientWidth;
const h = document.body.clientHeight;
let currentHeight = 0;
let isAnimate = false;
const show = {
  gray: 0,
};

const getMeta = (url, cb) => {
  const img = new Image();
  img.onload = () => cb(img.width, img.height);
  // img.onerror = (err) => cb(err);
  img.src = url;
};

function setPopupSize(oW, oH) {
  const isHorizontal = w > h;
  const mainH = isHorizontal ? h - 160 : (w - 48) / (oW / oH);
  const mainW = isHorizontal ? (h - 160) * (oW / oH) : w - 48;
  popupBody.style.height = `${mainH}px`;
  popupBody.style.width = `${mainW}px`;
  currentHeight = popupBody.clientHeight;
  // console.log(currentHeight);
  return mainH;
}

setPopupSize(w - 160, h - 160);

const loaderAnime = anime({
  targets: popupLoaderItems,
  loop: true,
  keyframes: [{ translateY: 0 }, { translateY: -6 }, { translateY: 0 }],
  delay: anime.stagger(100),
  easing: "linear",
  autoplay: false,
  duration: 800,
});

window.addEventListener("resize", throttle(setPopupSize, 100));
// OPEN
gallery.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG" || isAnimate) return false;
  // START LOADER
  popupLoader.classList.add("show");
  loaderAnime.play();

  const src = e.target.getAttribute("data-img");
  getMeta(src, (w, h) => {
    // STOP LOADER
    popupLoader.classList.remove("show");
    loaderAnime.pause();

    const height = setPopupSize(w, h);
    isAnimate = true;

    anime({
      targets: show,
      gray: 0,
      easing: "linear",
      update(anim) {
        popup.style["backdrop-filter"] = `grayscale(${anim.progress / 100})`;
      },
      complete() {
        isAnimate = false;
      },
    });
    anime({
      targets: popupBody,
      height: [0, height],
      easing: "easeOutCubic",
    });
    popupImg.setAttribute("src", src);
    popup.classList.add("show");
  });
});

// CLOSE
popup.addEventListener("click", () => {
  if (isAnimate) return;
  isAnimate = true;
  anime({
    targets: show,
    gray: 0,
    easing: "linear",
    update(anim) {
      popup.style["backdrop-filter"] = `grayscale(${1 - anim.progress / 100})`;
    },
  });
  anime({
    targets: popupBody,
    height: 0,
    easing: "easeOutCirc",
    complete() {
      popup.classList.remove("show");
      popupImg.setAttribute("src", "#");
      isAnimate = false;
    },
  });
});
