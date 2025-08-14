import { generateArticleItemsTemplate, generateLoaderAbsoluteTemplate } from '../../template';
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
            <p class="description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia eius, id vitae quibusdam quod numquam facilis! Voluptatem nostrum itaque laboriosam, veritatis tenetur autem repellat error eos, velit explicabo molestias doloribus?
            </p>
            <div class="home-btn">
              <a href="#services" class="button green-button">Mulai Memindai</a>
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
          <h1 class="section-title">Layanan Kami</h1>

          <div class="main-services">
            <div class="services-list">
              <i class="bx bx-scan bx-lg"></i>
              <h3>Pemindai</h3>
              <p class="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>

            <div class="services-list">
              <i class="bx bx-book bx-lg"></i>
              <h3>Artikel</h3>
              <p class="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
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
                <h3>Visi</h3>
                <p class="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, dolorum asperiores, doloribus aliquid culpa a dolores itaque reprehenderit animi placeat magnam ipsam nemo minus architecto nesciunt quis! Maiores, fuga repellat.
              </div>

              <div class="vision-mission-content">
                <h3>Misi</h3>
                <p class="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, pariatur perferendis? Ratione officia perferendis dicta voluptates mollitia in eius. Quis amet sapiente sit explicabo id tempora dolore ipsam quia, temporibus quo vero rerum provident nostrum quidem deserunt ipsa aut? Molestias?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ARTICLE PREVIEW -->
      <section id="article" class="article background-section">
        <div class="article-container">
          <h1 class="section-title">Artikel</h1>

          <div id="article-list"></div>
          <div class="all-articles__button">
            <a href="#/article" class="button green-button">Semua Artikel</a>
          </div>
          <div id="article-list-loading-container"></div>
        </div>
      </section>

      <!-- CONTACT US -->
      <section id="contact-us" class="contact-us">
        <div class="contact-us-container">
          <div class="contact-us-information">
            <div class="contact-us-information__header">
              <p class="contact-us-information__header-title">Hubungi Kami</p>
              <h2 class="contact-us-information__header-sub-title">Ayo Terhubung</h2>
              <p class="description">
                corporis! Dolores, eos nulla soluta voluptate neque expedita
                dolorum cupiditate sunt nostrum.
              </p>
            </div>
            <div class="contact-us-information__body">
              <div class="contact-us-information__social-media">
                <div class="contact-us-information__icon-container">
                  <a href="" class="contact-us-information__icon">
                    <i class="bx bxl-youtube"></i>
                  </a>
                </div>
                <div class="contact-us-information__description">
                  <p class="contact-us-information__heading-description">
                    Lorem ipsum, dolor sit amet
                  </p>
                  <p class="contact-us-information__sub-heading-description">
                    Youtube Channel
                  </p>
                </div>
              </div>

              <div class="contact-us-information-line"></div>

              <div class="contact-us-information__social-media">
                <div class="contact-us-information__icon-container">
                  <a href="" class="contact-us-information__icon">
                    <i class="bx bxl-gmail"></i>
                  </a>
                </div>
                <div class="contact-us-information__description">
                  <p class="contact-us-information__heading-description">
                    Lorem ipsum, dolor sit amet
                  </p>
                  <p class="contact-us-information__sub-heading-description">
                    company123@gmail.com
                  </p>
                </div>
              </div>

              <div class="contact-us-information-line"></div>

              <div class="contact-us-information__social-media">
                <div class="contact-us-information__icon-container">
                  <a href="" class="contact-us-information__icon">
                    <i class="bx bx-current-location"></i>
                  </a>
                </div>
                <div class="contact-us-information__description">
                  <p class="contact-us-information__heading-description">
                    Lorem ipsum, dolor sit amet
                  </p>
                  <p class="contact-us-information__sub-heading-description">
                    Jl. Raya Bogor Km. 100
                  </p>
                </div>
              </div>

              <div class="contact-us-information-line"></div>
              
            </div>
          </div>

          <div class="contact-us-form__container">
            <form class="contact-us-form">
              <div class="contact-us-input__container">
                <label for="username">Nama Anda</label>
                <input type="text" name="username" id="username" placeholder="Budi Hermawan" required/>
              </div>

              <div class="contact-us-input__container">
                <label for="email">Email Anda</label>
                <input type="email" name="email" id="email" placeholder="budi123@gmail.com" required/>
              </div>

              <div class="contact-us-input__container">
                <label for="subject">Subjek</label>
                <input type="text" name="subject" id="subject" placeholder="Krtik & Saran" required/>
              </div>

              <div class="contact-us-input__container">
                <label for="description" class="input-label">Deskripsi</label>
                <textarea
                  name="description"
                  placeholder="Pesan..."
                  class="description-input"
                  id="description-input"
                  required
                ></textarea>
              </div>
              <button type="submit" class="contact-us__submit-button button green-button">
                Kirim
              </button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: BiorezAPI,
    });

    await this.#presenter.initialArticles();
  }

  populateArticlesList(message, items) {
    const limitedItems = items.slice(0, 2);

    const html = limitedItems.reduce((acc, item) => {
      return acc.concat(generateArticleItemsTemplate(item, false));
    }, '');

    document.getElementById('article-list').innerHTML = `
        <div class="article-list">${html}</div>
      `;
  }

  showLoading() {
    document.getElementById('article-list-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('article-list-loading-container').innerHTML = '';
  }
}
