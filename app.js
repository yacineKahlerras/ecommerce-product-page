/** vars */

// sidebar
const sidebar = document.querySelector(".sidebar-container");
const toggleSideMenuBtns = [...document.querySelectorAll(".toggle-sidebar")];

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

/**
 ********************************
 ********************************
 *        functions
 * *******************************
 * *****************************
 * **/

/** increase/decrease product amount */
const editProductAmount = (increase) => {
  let amount = parseInt(productAmountText.textContent);
  if (increase) amount++;
  else amount--;

  amount = amount < 0 ? 0 : amount;
  productAmountText.textContent = amount;
};

/** add products to cart */
const addToCart = () => {
  let amount = parseInt(cartProductAmount.textContent);
  let newAmount = parseInt(productAmountText.textContent);
  if (newAmount > 0) showCartContent(true);
  else return;

  amount += newAmount;
  let totalPrice = 125 * amount;
  cartProductAmount.textContent = amount;
  cartTotalPrice.textContent = `$${totalPrice}`;
  productAmountText.textContent = 0;
};

/** shows the cart */
const showCart = () => {
  cartElement.classList.toggle("show-cart");
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
  }
};

/**
 ********************************
 ********************************
 *        event listeners
 * *******************************
 * *****************************
 * **/

// toggle menu
toggleSideMenuBtns.forEach((b) =>
  b.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
  })
);

// show cart
cartBtn.addEventListener("click", showCart);

// delete cart content
deleteBtn.addEventListener("click", () => {
  showCartContent(false);
});

// increase/decrease product amount
minusBtn.addEventListener("click", () => editProductAmount(false));
plusBtn.addEventListener("click", () => editProductAmount(true));

// add to cart
addToCartBtn.addEventListener("click", addToCart);
