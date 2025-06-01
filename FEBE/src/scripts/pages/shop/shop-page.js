export default class ShopPage {
  async render() {
    return `
    <section id="shop" class="shop background-section">
        <div class="shop-container">
          <h1>Our Shop</h1>

          <div class="search-btn">
            <input id="search-shop" class="search-shop" type="search" placeholder="Search..." />
          </div>

          <div class="filter-shop-button-container">
            <button class="filter-shop-button button filter-active">Filter 1</button>
            <button class="filter-shop-button button">Filter 2</button>
            <button class="filter-shop-button button">Filter 3</button>
            <button class="filter-shop-button button">Filter 4</button>
          </div>

          <div class="item-container">
            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image" />
              <h3 class="item-name">Barang Bekas 1</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image" />
              <h3 class="item-name">Barang Bekas 2</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image" />
              <h3 class="item-name">Barang Bekas 3</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image" />
              <h3 class="item-name">Barang Bekas 4</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image" />
              <h3 class="item-name">Barang Bekas 5</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {}
}
