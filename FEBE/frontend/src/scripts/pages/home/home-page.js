import { generateShopItemsTemplate, generateLoaderAbsoluteTemplate } from '../../template';
import * as BiorezAPI from '../../data/api';
import HomePresenter from './home-presenter';

export default class HomePage {
  #presenter = null;

  async render() {
    return `
    <!-- HOME -->
      <section id="home">
        <div class="home-container">
          <div class="home-description">
            <h1>BIOPORE & <br><span>RECYCLE ZONE</span></h1>
            <p>
              BIOREZ merupakan sebuah platform berbasis website yang dirancang untuk mendukung gaya hidup ramah lingkungan melalui pengelolaan sampah dan pemanfaatan teknologi biopori.
            </p>
            <div class="home-btn">
              <a href="#services" class="button green-button">Explore</a>
            </div>
          </div>

          <div class="home-img">
            <img src="images/homePageImages/heroImage.png" alt="hero image" />
          </div>
        </div>
      </section>

      <!-- OUR SERVICES -->
      <section id="services" class="services background-section">
        <div class="service-container">
          <h1 class="section-title">Our Services</h1>

          <div class="fitur">
            <div class="list-fitur">
              <i class="bx bx-scan bx-lg"></i>
              <h3>Scanner</h3>
              <p>Klasifikasi sampah organik dan anorganik</p>
            </div>

            <div class="list-fitur">
              <i class="bx bx-store bx-lg"></i>
              <h3>Shop</h3>
              <p>Jual beli barang bekas layak pakai</p>
            </div>

            <div class="list-fitur">
              <i class="bx bx-leaf bx-lg"></i>
              <h3>Biopore</h3>
              <p>Menawarkan pembelian, dan pemasangan Biopori</p>
            </div>
          </div>
        </div>
      </section>

      <!-- VISION & MISSION -->
      <section id="vision-mission">
        <div class="vision-mission-container">
          <div class="vision-mission-image">
            <img src="images/homePageImages/visionMissionImage.png" alt="vision Mission Image" />
          </div>

          <div class="vision-mission-body">
              <div class="vision-mission-content">
                <h2>Visi</h2>
                <p class="vision-description">
                  Menjadi platform digital terdepan dalam mendorong gaya hidup ramah lingkungan melalui inovasi pemilahan sampah, pemanfaatan limbah, dan pemasyarakatan biopori secara berkelanjutan di Indonesia.
                </p>
              </div>

              <div class="vision-mission-content">
                <h2>Misi</h2>
                <p class="mission-description">
                  BIOREZ bertujuan untuk meningkatkan kesadaran dan partisipasi masyarakat dalam pengelolaan sampah dan pelestarian lingkungan melalui fitur pemindai sampah, marketplace barang bekas, serta layanan biopori. Melalui edukasi dan kolaborasi komunitas, BIOREZ membangun ekosistem digital yang mendukung gaya hidup ramah lingkungan secara berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SHOP -->
      <section id="shop" class="shop background-section">
        <div class="shop-container">
          <h1 class="section-title">Our Shop</h1>

          <div id="shop-list"></div>
          <div class="shop-item__button">
            <a href="#/shop" class="button green-button">All Items</a>
          </div>
          <div id="shop-list-loading-container"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: BiorezAPI,
    });

    await this.#presenter.initialShopItems();
  }

  populateShopItemsList(message, items) {
    const limitedItems = items.slice(0, 6);

    const html = limitedItems.reduce((acc, item) => {
      return acc.concat(generateShopItemsTemplate(item, false));
    }, '');

    document.getElementById('shop-list').innerHTML = `
        <div class="shop-list">${html}</div>
      `;
  }

  showLoading() {
    document.getElementById('shop-list-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('shop-list-loading-container').innerHTML = '';
  }
}
