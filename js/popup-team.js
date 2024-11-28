const popup = document.querySelector(".popup-team");
const buttons = document.querySelectorAll(".popup-team-button");
const buttonClose = document.querySelector(".popup-team-close");
const popupContents = document.querySelectorAll("[data-team-content]");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    popup.classList.add("opened");
    const targetName = button.getAttribute("data-name");
    if (!targetName) return;
    for (let i = 0; i < popupContents.length; i++) {
      const b =
        popupContents[i].getAttribute("data-team-content") === targetName;
      if (b) {
        popupContents[i].classList.add("active");
      } else {
        popupContents[i].classList.remove("active");
      }
    }
  });
});
buttonClose.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.remove("opened");
});
