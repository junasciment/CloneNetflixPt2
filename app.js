
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.navbar-container,.toggle,.sidebar,.left-menu-icon"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

