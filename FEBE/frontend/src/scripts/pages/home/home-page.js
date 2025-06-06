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
            <h1>Lorem Ipsum Is Simply Dummy Text</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              pretium, odio vitae scelerisque aliquam, arcu dolor tempus tortor.
            </p>
            <div class="home-btn">
              <a href="#/" class="button green-button">Shop</a>
              <a href="#/" class="button white-button">Explore</a>
            </div>
          </div>

          <div class="home-img">
            <img src="images/biorezImages/biorezLogo-green.png" alt="hero image" />
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
              <h2>Scan</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>

            <div class="list-fitur">
              <i class="bx bx-store bx-lg"></i>
              <h2>Store</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>

            <div class="list-fitur">
              <i class="bx bx-leaf bx-lg"></i>
              <h2>Planting</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- VISION & MISSION -->
      <section id="vision-mission">
        <div class="visi-misi-container">
          <div class="vision-mission-image">
            <img src="images/biorezImages/biorezLogo-green.png" alt="image-content" />
          </div>

          <div class="vision-mission-body">
            <h1 class="vision-mission-title">Our Vision & Mission</h1>
            <div class="vision-mission-description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                laboriosam voluptatum, sed eveniet recusandae
              </p>
            
              <div class="vision-mission-content">
                <h2>Vision</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                  laboriosam voluptatum, sed eveniet recusandae
                </p>
              </div>

              <div class="vision-mission-content">
                <h2>Mission</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                  laboriosam voluptatum, sed eveniet recusandae
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
      this.#presenter = new HomePresenter ({
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
