const list = [...document.querySelectorAll(".who-persona-scrolled")];

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

list.map((el) => {
  const items = [...el.children];
  setInterval(() => {
    const idx = getRandomInt(0, items.length);
    el.style.transform = `translateY(-${idx * 20}px)`;
    items.forEach((el) => el.classList.remove("active"));
    items[idx].classList.add("active");
  }, 4000);
});
