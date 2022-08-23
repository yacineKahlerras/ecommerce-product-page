/**
 ********************************
 ********************************


 *        sidebar


 * *******************************
 * *****************************
 * **/
const sidebar = document.querySelector(".sidebar-container");
const toggleSideMenuBtns = [...document.querySelectorAll(".toggle-sidebar")];

// toggle menu
toggleSideMenuBtns.forEach((b) =>
  b.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
    showCart(false);
  })
);

/**
 ********************************
 ********************************


 *        cart
 * 
 * 
 * *******************************
 * *****************************
 * **/

// cart show
const cartBtn = document.querySelector(".cart-btn");
const cartElement = document.querySelector(".cart");

// cart content delete
const deleteBtn = document.querySelector(".delete-btn");
const cartContent = document.querySelector(".cart-content-holder");
const cartEmptyText = document.querySelector(".cart-empty-text");

// products amount
const minusBtn = document.getElementById("minus-btn");
const productAmountText = document.getElementById("product-amount");
const plusBtn = document.getElementById("plus-btn");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartProductAmount = document.querySelector(".cart-product-amount");
const cartTotalPrice = document.querySelector(".cart-total-price");
const cartBtnAmount = document.querySelector(".cart-button-amount");

/** increase/decrease product amount */
const editProductAmount = (increase) => {
  let amount = parseInt(productAmountText.textContent);
  if (increase) amount++;
  else amount--;

  amount = amount < 0 ? 0 : amount;
  productAmountText.textContent = amount;
  showCart(false);
};

/** add products to cart */
const addToCart = () => {
  showCart(false);
  let amount = parseInt(cartProductAmount.textContent);
  let newAmount = parseInt(productAmountText.textContent);
  if (newAmount > 0) showCartContent(true);
  else return;

  amount += newAmount;
  let totalPrice = 125 * amount;
  cartProductAmount.textContent = amount;
  cartTotalPrice.textContent = `$${totalPrice}`;
  productAmountText.textContent = 0;
  cartBtnAmount.textContent = amount;
  cartBtnAmount.classList.remove("hide-cart-btn-amount");
  localStorage.setItem("amount", amount);
};

/** init cart from local storage */
const initCart = () => {
  // cart amount and prices
  const amount = parseInt(localStorage.getItem("amount"));
  if (!amount) {
    amount = 0;
    localStorage.setItem("amount", amount);
  }
  if (amount < 1) cartBtnAmount.classList.add("hide-cart-btn-amount");
  else {
    cartBtnAmount.classList.remove("hide-cart-btn-amount");
    showCartContent(true);
  }
  let totalPrice = 125 * amount;
  cartProductAmount.textContent = amount;
  cartTotalPrice.textContent = `$${totalPrice}`;
  cartBtnAmount.textContent = amount;
};

/** shows the cart */
const showCart = (show) => {
  cartElement.classList.toggle("show-cart");
  if (show == false) cartElement.classList.remove("show-cart");
  else if (show == true) cartElement.classList.add("show-cart");

  const screenWidth =
    window.innerWidth /
    parseFloat(getComputedStyle(document.querySelector("body"))["font-size"]);
  const rect = cartBtn.getBoundingClientRect();
  if (screenWidth >= 62.5 && cartElement.classList.contains("show-cart")) {
    cartElement.style.top = rect.bottom + "px";
    cartElement.style.left = rect.left + "px";
    cartElement.style.transform = "translate(-50%, 10%)";
  } else if (
    screenWidth >= 62.5 &&
    !cartElement.classList.contains("show-cart")
  ) {
    cartElement.style.top = rect.bottom + "px";
    cartElement.style.left = rect.left + "px";
    cartElement.style.transform = "";
  } else if (screenWidth < 62.5) {
    cartElement.style = "";
  }
};

/** shows cart content */
const showCartContent = (show) => {
  if (show) {
    cartContent.classList.remove("hide-cart-content");
    cartEmptyText.classList.remove("show-cart-empty-text");
  } else {
    cartContent.classList.add("hide-cart-content");
    cartEmptyText.classList.add("show-cart-empty-text");
    cartProductAmount.textContent = 0;
    cartTotalPrice.textContent = `$0`;
    cartBtnAmount.textContent = 0;
    cartBtnAmount.classList.add("hide-cart-btn-amount");
    showCart(false);
    localStorage.setItem("amount", 0);
  }
};

// show/hide cart
cartBtn.addEventListener("click", () => showCart());

// delete cart content
deleteBtn.addEventListener("click", () => {
  showCartContent(false);
});

// increase/decrease product amount
minusBtn.addEventListener("click", () => editProductAmount(false));
plusBtn.addEventListener("click", () => editProductAmount(true));
document.addEventListener("DOMContentLoaded", initCart);

// add to cart
addToCartBtn.addEventListener("click", addToCart);

/**********************************
 **********************************


 *        image galery Slide
 * 

 *********************************
 *********************************
 * */
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const galery = [...document.querySelector(".galery").children];
let currentImgIndex = 0;

const slide = (forward) => {
  let translateAmount = 0;
  if (forward && currentImgIndex < galery.length - 1) {
    currentImgIndex++;
    prevBtn.classList.remove("hide-slide-btn");
    if (currentImgIndex == galery.length - 1)
      nextBtn.classList.add("hide-slide-btn");
  } else if (!forward && currentImgIndex > 0) {
    currentImgIndex--;
    nextBtn.classList.remove("hide-slide-btn");
    if (currentImgIndex == 0) prevBtn.classList.add("hide-slide-btn");
  }
  translateAmount = currentImgIndex * -100;
  galery.forEach((img) => {
    img.style.transform = `translateX(${translateAmount}%)`;
  });
  showCart(false);
};

prevBtn.addEventListener("click", () => slide(false));
nextBtn.addEventListener("click", () => slide(true));

/** SWIPING */

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      slide(true);
    } else {
      slide(false);
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

/**********************************
 **********************************


 *        image galery Modal


 *********************************
 *********************************
 * */
const modalDisplayedImage = document.querySelector(".modal-displayed-image");
const closeModalBtn = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const modalGaleryImgs = [...document.querySelectorAll(".modal-galery-img")];
const galeryImgs = [...document.querySelectorAll(".galery-img")];
const imgSources = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];
const modalNextBtn = document.getElementById("modal-next-btn");
const modalPrevBtn = document.getElementById("modal-prev-btn");
let currentDisplayIndex = 0;

/** display the clicked thumbnail image */
const displayImg = (index, element) => {
  modalDisplayedImage.src = imgSources[index];
  const oldSelectedThumbnail = document.querySelector(
    ".modal-selected-garely-img"
  );
  oldSelectedThumbnail.classList.remove("modal-selected-garely-img");
  element.classList.add("modal-selected-garely-img");
  currentDisplayIndex = index;
};

/** hides the modal */
const showModal = (show) => {
  if (show) {
    modal.classList.remove("hide-modal");
  } else {
    modal.classList.add("hide-modal");
  }
  showCart(false);
};

/** slides modal image left or right */
const slideModalImg = (right) => {
  if (right) {
    currentDisplayIndex++;
    currentDisplayIndex =
      currentDisplayIndex >= imgSources.length ? 0 : currentDisplayIndex;
    displayImg(currentDisplayIndex, modalGaleryImgs[currentDisplayIndex]);
  } else {
    currentDisplayIndex--;
    currentDisplayIndex =
      currentDisplayIndex < 0 ? imgSources.length - 1 : currentDisplayIndex;
    displayImg(currentDisplayIndex, modalGaleryImgs[currentDisplayIndex]);
  }
  showCart(false);
};

/** listener */
modalGaleryImgs.forEach((img, index) => {
  img.addEventListener("click", () => displayImg(index, img));
});
galeryImgs.forEach((img, index) => {
  img.addEventListener("click", () => {
    showModal(true);
    displayImg(index, modalGaleryImgs[index]);
  });
});
closeModalBtn.addEventListener("click", () => showModal(false));
modalNextBtn.addEventListener("click", () => slideModalImg(true));
modalPrevBtn.addEventListener("click", () => slideModalImg(false));
