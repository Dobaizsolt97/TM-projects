const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const openBtn = document.getElementById("open");
const modal = document.getElementById("modal");

//toggle nav
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});
// show modal
openBtn.addEventListener("click", () => modal.classList.add("show-modal"));
//remove show modal class
closeBtn.addEventListener("click", () => modal.classList.remove("show-modal"));

//hide modal on outside click
window.addEventListener("click", e =>
  e.target == modal ? modal.classList.remove("show-modal") : flase
);
