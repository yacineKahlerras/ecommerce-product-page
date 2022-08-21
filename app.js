/** vars */
const sidebar = document.querySelector(".sidebar-container");
const toggleSideMenuBtns = [...document.querySelectorAll(".toggle-sidebar")];
const cartBtn = document.querySelector(".cart-btn");
const cartElement = document.querySelector(".cart");

/** event listeners */
toggleSideMenuBtns.forEach((b) =>
  b.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
  })
);
cartBtn.addEventListener("click", () => {
  cartElement.classList.toggle("show-cart");
});
