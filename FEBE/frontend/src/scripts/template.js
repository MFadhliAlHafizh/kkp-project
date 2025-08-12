export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateArticleItemsTemplate(item) {
  const maxWords = 15; 
  const words = item.description.split(' ');
  const shortDescription = words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : item.description;

  return `
    <div class="article-item" data-itemId="${item.id}">
        <p class="description">${item.date}</p>
        <div class="article-image">
            <img src="${item.image}" alt="Article Image">
        </div>
        <h3 class="article-title">${item.title}</h3>
        <div class="article-line"></div>
        <div class="article-description">
            <p class="description">${shortDescription}</p>
        </div>
        <a href="" class="article-link">
            Read More
            <i class='bx bx-right-arrow-alt'></i>
        </a>
    </div>
  `
}

export function generateCartItemsTemplate(item) {
  return `
    <div class="cart-box cart-item" data-itemId="${item.id}">
      <div class="cart-item__close-button-container">
        <button class="cart-item__close-button">X</button>
      </div>
      <div class="cart-item__image">
        <img src="${item.imageUrl}" alt="${item.itemName} image" />
      </div>
        
      <div class="cart-item__body">
        <h3 class="cart-item__name">${item.itemName}</h3>
        <p class="cart-item-description">
          ${item.description}
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
  `;
}
