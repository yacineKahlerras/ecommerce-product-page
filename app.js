/** vars */
const sidebar = document.querySelector(".sidebar-container");
const toggleSideMenuBtns = [...document.querySelectorAll(".toggle-sidebar")];

toggleSideMenuBtns.forEach((b) =>
  b.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
  })
);
