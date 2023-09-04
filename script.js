// DOM elements declarations
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenuCloseButton = document.querySelector(
  ".mobile-menu-close-button"
);
const mobileMenu = document.querySelector(".mobile-menu");
const bodyVignet = document.querySelector(".body-vignet");
const mobileImages = document.querySelector(
  ".app main .mobile-main-left .image"
);
const mobilePreviousArrow = document.querySelector(
  ".app main .mobile-main-left .mobile-previous-arrow"
);
const mobileNextArrow = document.querySelector(
  ".app main .mobile-main-left .mobile-next-arrow"
);
const desktopThumbnail = document.querySelectorAll(".thumbnails li");
const desktopImage = document.querySelector(".main-left .image img");
const lightBox = document.querySelector(".lightbox");
const lightBoxCloseButton = document.querySelector(".lightbox-close-button");
const lightBoxThumbnail = document.querySelectorAll(".lightbox-thumbnails li");
const lightBoxImage = document.querySelector(".lightbox-image img");
const lightBoxPreviousArrow = document.querySelector(
  ".lightbox-previous-arrow"
);
const lightBoxNextArrow = document.querySelector(".lightbox-next-arrow");
const quantityValue = document.querySelector(".quantity-value");
const incrementButton = document.querySelector(".increment-quantity");
const decrementButton = document.querySelector(".decrement-quantity");
const addToCartButton = document.querySelector(".add-to-cart");
const cartItemNumber = document.querySelector(".cart-item-number");
const cart = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const emptyCart = document.querySelector(".empty-cart");
const cartContentBody = document.querySelector(".cart-content-body");
const deleteProduct = document.querySelector(".delete-product");
const productQuantityInput = document.querySelector(".product-quantity");
const productTotalPrice = document.querySelector(".product-total-price");

// Initialize the quantity and total price value
let quantity = 0;
let totalPrice = 0;

// list of images url and index
let imageIndex = 1;
const imageUrls = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}

// show mobile menu
mobileMenuButton.onclick = () => {
  mobileMenu.classList.add("show-mobile-menu");
  mobileMenu.classList.remove("hide-mobile-menu");
  bodyVignet.style.display = "block";
  disableScroll();
};

// hide mobile menu
mobileMenuCloseButton.onclick = () => {
  mobileMenu.classList.add("hide-mobile-menu");
  mobileMenu.classList.remove("show-mobile-menu");
  bodyVignet.style.display = "none";
  enableScroll();
};

// mobile images slide
mobilePreviousArrow.onclick = () => {
  var left = getComputedStyle(mobileImages).getPropertyValue("left");
  if (left == "-1125px") {
    mobileImages.style.left = "-750px";
  } else if (left == "-750px") {
    mobileImages.style.left = "-375px";
  } else if (left == "-375px") {
    mobileImages.style.left = "0px";
  } else if (left == "0px") {
    mobileImages.style.left = "-1125px";
  }
};

mobileNextArrow.onclick = () => {
  var left = getComputedStyle(mobileImages).getPropertyValue("left");
  if (left == "0px") {
    mobileImages.style.left = "-375px";
  } else if (left == "-375px") {
    mobileImages.style.left = "-750px";
  } else if (left == "-750px") {
    mobileImages.style.left = "-1125px";
  } else if (left == "-1125px") {
    mobileImages.style.left = "0px";
  }
};

// desktop thumbnail
for (let i = 0; i < desktopThumbnail.length; i++) {
  desktopThumbnail[i].onclick = () => {
    desktopImage.src = `images/image-product-${i + 1}.jpg`;
    for (let j = 0; j < desktopThumbnail.length; j++) {
      if (j == i) {
        desktopThumbnail[j].classList.add("active");
      } else {
        desktopThumbnail[j].classList.remove("active");
      }
    }
  };
}

// show lightBox
desktopImage.onclick = () => {
  lightBox.style.display = "flex";
};

// close lightBox
lightBoxCloseButton.onclick = () => {
  lightBox.style.display = "none";
};

// lightBox thumbnail
for (let i = 0; i < lightBoxThumbnail.length; i++) {
  lightBoxThumbnail[i].onclick = () => {
    lightBoxImage.src = `images/image-product-${i + 1}.jpg`;
    for (let j = 0; j < lightBoxThumbnail.length; j++) {
      if (j == i) {
        lightBoxThumbnail[j].classList.add("active");
      } else {
        lightBoxThumbnail[j].classList.remove("active");
      }
    }
  };
}

// lightBox images slide
function updateImage() {
  if (imageIndex >= 0 && imageIndex < imageUrls.length) {
    lightBoxImage.src = imageUrls[imageIndex];
  }
}

// Next arrow click event
lightBoxNextArrow.onclick = () => {
  imageIndex++;
  if (imageIndex >= imageUrls.length) {
    imageIndex = 0;
  }
  updateImage();
};

// Previous arrow click event
lightBoxPreviousArrow.onclick = () => {
  imageIndex--;
  if (imageIndex < 0) {
    imageIndex = imageUrls.length - 1;
  }
  updateImage();
};

// Function to update the quantity value in the DOM
function updateQuantity() {
  if (quantity === 0) {
    emptyCart.style.display = "flex";
    cartContentBody.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartContentBody.style.display = "flex";
  }
}

// Increment the quantity when the increment button is clicked
incrementButton.onclick = () => {
  quantity++;
  quantityValue.textContent = quantity;
};

// Decrement the quantity when the decrement button is clicked
decrementButton.onclick = () => {
  if (quantity == 0) {
    quantity = 0;
    quantityValue.textContent = quantity;
  } else if (quantity > 0) {
    quantity--;
    quantityValue.textContent = quantity;
  }
};

// Initial update of the quantity
updateQuantity();

// Update the cart item number with the current quantity
addToCartButton.onclick = () => {
  if (quantity >= 1) {
    cartItemNumber.style.display = "block";
    cartItemNumber.textContent = quantity;
    totalPrice = 125 * quantity;
    productQuantityInput.textContent = quantity;
    productTotalPrice.textContent = "$" + totalPrice + ".00";
    quantityValue.textContent = quantity;
    updateQuantity();
  } else if (quantity <= 0) {
    cartItemNumber.style.display = "block";
    updateQuantity();
  }
};

// Toggle the visibility of the cart content
cart.onclick = () => {
  if (
    cartContent.style.display === "none" ||
    cartContent.style.display === ""
  ) {
    cartContent.style.display = "block";
  } else {
    cartContent.style.display = "none";
  }
};

deleteProduct.onclick = () => {
  quantity = 0;
  quantityValue.textContent = quantity;
  cartItemNumber.style.display = "none";
  updateQuantity();
};
