// SLIDE MENU
const slideToggleMenu = document.querySelector(
  "body .navbar .container-fluid .navbar-toggler-icon"
);
const navSlideMenu = document.querySelector(
  "body .navbar .container-fluid .slidebar"
);

slideToggleMenu.addEventListener("click", () => {
  navSlideMenu.classList.add("menuslide");
});

// SLIDE KERANJANG

const keranjang = document.querySelector(
  "body .navbar .container-fluid #shopping-cart-btn"
);
const slideKerangjang = document.querySelector(
  ".navbar .container-fluid .keranjangSlide"
);
keranjang.addEventListener("click", (e) => {
  e.preventDefault();
  slideKerangjang.classList.add("keranjangActive");
});

document.addEventListener("click", function (event) {
  // satu false ga di eksekusi
  if (
    !slideToggleMenu.contains(event.target) &&
    !navSlideMenu.contains(event.target)
  ) {
    navSlideMenu.classList.remove("menuslide");
    navSlideMenu.classList.remove("show");
  }

  if (
    !keranjang.contains(event.target) &&
    !slideKerangjang.contains(event.target)
  ) {
    slideKerangjang.classList.remove("keranjangActive");
  }
});
