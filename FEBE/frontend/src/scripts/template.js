export function generateShopItemsTemplate(item, showCartButton = true) {
  return `
    <div class="shop-item" data-itemId="${item.id}">
      <div class="shop-item__image">
        <img src="${item.imageUrl}" alt="image-shop" />
      </div>
      <div class="shop-item__body">
        <h3 class="shop-item__name">${item.itemName}</h3>
        <p class="shop-item__description">Lorem ipsum dolor sit amet.</p>
        <h3 class="shop-item__price">Rp${item.price.toLocaleString('id-ID')}</h3>
        ${showCartButton ? `
        <div id="shop-item__cart-button-container" class="shop-item__cart-button-container">
          <button class="shop-item__cart-button button green-button">
            <i class="bx bx-cart"></i>
            Add to Cart
          </button>
        </div>` : ''}
      </div>
    </div>
  `;
}

export function generateCartItemsTemplate(item) {
  return `
    <div class="cart-box cart-item" data-itemId="${item.id}">
      <div class="cart-item__close-button-container">
        <button class="cart-item__close-button">X</button>
      </div>
      <div class="cart-item__image">
        <img src="${item.imageUrl}" alt="image-shop" />
      </div>
        
      <div class="cart-item__body">
        <h3 class="cart-item__name">${item.itemName}</h3>
        <p class="cart-item-description">
          Lorem ipsum dolor sit amet.
        </p>
        <h2 class="cart-item__price">Rp${item.price.toLocaleString('id-ID')}</h3>
      </div>
    </div>
  `;
}

export function generateCartDetailsOrderTemplate(item) {
  return `
    <div class="cart-details-order">
      <p class="cart-details__name">${item.itemName}</p>
      <p class="cart-details__price">Rp${item.price.toLocaleString('id-ID')}</p>
    </div>
  `
}

export function AddToCartButtonTemplate() {
  return `
    <button class="shop-item__cart-button button green-button">
      <i class="bx bx-cart"></i>
      Add to Cart
    </button>
  `
}

export function successAddToCartButtonTemplate() {
  return `
    <button class="shop-item__cart-button button green-button" disabled>
      <i class="bx bx-cart"></i>
      Success
    </button>
  `
}