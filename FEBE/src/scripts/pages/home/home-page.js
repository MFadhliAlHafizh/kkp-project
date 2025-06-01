export default class HomePage {
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
            <img src="images/biorezLogo.png" alt="hero image" />
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
            <img src="images/biorezLogo.png" alt="image-content" />
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

          <div class="item-container">
            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image"/>
              <h3 class="item-name">Barang Bekas 1</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image"/>
              <h3 class="item-name">Barang Bekas 2</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image"/>
              <h3 class="item-name">Barang Bekas 3</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image"/>
              <h3 class="item-name">Barang Bekas 4</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>

            <div class="card">
              <img src="images/biorezLogo.png" alt="image-shop" class="item-image"/>
              <h3 class="item-name">Barang Bekas 5</h3>
              <p class="item-description">Lorem ipsum dolor sit amet.</p>
              <h3 class="item-price">Rp 50.000</h3>
            </div>
          </div>
          <div class="shop-btn">
            <a href="#/" class="button green-button">All Item</a>
          </div>
      </section>
    `;
  }

  async afterRender() {}
}
