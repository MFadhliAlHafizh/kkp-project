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
            <img src="${item.image}" alt="Article Cover Image">
        </div>
        <h3 class="article-title">${item.title}</h3>
        <div class="article-line"></div>
        <div class="article-description">
            <p class="description">${shortDescription}</p>
        </div>
        <a href="#/articles/${item.id}" class="read-more-link">
            Read More
            <i class='bx bx-right-arrow-alt'></i>
        </a>
    </div>
  `
}

export function generateArticleDetailsTemplate({
  date,
  image,
  title,
  description,
}) {
  return `
    <div class="article-detail-header">
      <div class="article-image">
        <img src="${image}" alt="Article Cover Image"/>
      </div>
      
      <div class="article-detail-header-content">
        <div class="article-detail-header-link">
          <p class="description">${date}</p>
          <div class="add-to-collection-button">
            <a href="" class="white-button">
              <i class="bx bx-book-bookmark"></i>Tambah ke Koleksi
            </a>
          </div>
        </div>
        <h2 class="article-detail-title">${title}</h2>
      </div>
    </div>
    <div class="article-detail-body">
      <p class="description">${description}</p>
      <div class="back-to-article-link-container">
        <a href="#/article" class="back-to-article-link">
          <i class='bx bx-left-arrow-alt'></i>
          Kembali
        </a>
      </div>
    </div>
  `;
}

export function generateArticleDetailErrorTemplate(message) {
  return `
    <div id="article-detail-error" class="article-detail__error">
      <h2>Terjadi kesalahan pengambilan detail artikel</h2>
      <p>
        ${message ? message : "Gunakan jaringan lain atau laporkan error ini."}</p>
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
