import { generateShopItemsTemplate } from '../../template';
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
            <h1>BIOPORI & <br><span>RECYCLE ZONE</span></h1>
            <p>
              Biorez merupakan aplikasi berbasis web untuk memilah sampah secara digital hanya dengan menggunakan smartphone.
              Biorez menggunakan teknologi pengenalan gambar untuk mengenali jenis sampah dan mengklasifikasikannya.
            </p>
            <div class="home-btn">
              <a href="#/shop" class="button green-button">Shop</a>
              <a href="#/scanner" class="button white-button">Scan</a>
            </div>
          </div>

          <div class="home-img">
            <img src="images/homePagesImages/heroImage.png" alt="hero image" />
          </div>
        </div>
      </section>

      <!-- OUR SERVICES -->
      <section id="services" class="services background-section">
        <div class="service-container">
          <h1>Our Service</h1>

          <div class="fitur">
            <div class="list-fitur">
              <i class="bx bx-scan bx-lg"></i>
              <h2>Pemindai</h2>
              <p>Klasifikasi sampah organik dan anorganik</p>
            </div>

            <div class="list-fitur">
              <i class="bx bx-store bx-lg"></i>
              <h2>Toko</h2>
              <p>Jual beli barang bekas layak pakai</p>
            </div>

            <div class="list-fitur">
              <i class="bx bx-leaf bx-lg"></i>
              <h2>Biopori</h2>
              <p>Menawarkan pembelian, dan pemasangan Biopori</p>
            </div>
          </div>
        </div>
      </section>

      <!-- VISION & MISSION -->
      <section id="vision-mission">
        <div class="vision-mission-container">
          <div class="vision-mission-image">
            <img src="images/homePagesImages/visionMissionImage.png" alt="image-content" />
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
                  BIOREZ bertujuan meningkatkan kesadaran masyarakat tentang pemilahan sampah melalui fitur pemindai pintar dan menyediakan solusi daur ulang lewat marketplace barang bekas serta layanan biopori. Platform ini juga menghadirkan edukasi berkelanjutan terkait perawatan dan pengisian ulang biopori. Dengan pendekatan kolaboratif, BIOREZ membangun ekosistem digital yang mendukung gaya hidup ramah lingkungan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SHOP -->
      <section id="shop" class="shop background-section">
        <div class="shop-container">
          <h1>Our Shop</h1>

          <div id="shop-list"></div>
          <div class="shop-item__button">
            <a href="#/shop" class="button green-button">All Items</a>
          </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: BiorezAPI,
    });

    await this.#presenter.initialGalleryAndMap();
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
}
