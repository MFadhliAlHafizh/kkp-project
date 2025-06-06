import { generateShopItemsTemplate, AddToCartButtonTemplate, successAddToCartButtonTemplate } from '../../template';
import * as BiorezAPI from '../../data/api';
import ShopPresenter from './shop-presenter';
import Database from '../../database';

export default class ShopPage {
  #presenter = null;
  activeFilter = null;

  async render() {
    return `
      <section id="shop" class="shop background-section">
        <div class="shop-container">
          <h1>Our Shop</h1>

          <div class="search-btn">
            <input id="search-shop" class="search-shop" type="search" placeholder="Search..." />
          </div>

          <div class="filter-shop-button-container">
            <button class="filter-shop-button button filter-active">All Items</button>
            <button class="filter-shop-button button">Pakaian</button>
            <button class="filter-shop-button button">Elektronik</button>
            <button class="filter-shop-button button">Kendaraan</button>
          </div>

          <div id="shop-list"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ShopPresenter({
      view: this,
      apiModel: BiorezAPI,
      dbModel: Database,
    });

    await this.#presenter.initialGalleryAndMap();

    const searchInput = document.getElementById('search-shop');
    searchInput.addEventListener('input', (event) => {
      const searchTerm = event.target.value.trim().toLowerCase();
      this.#presenter.filterItems(searchTerm, this.activeFilter);
    });

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        const searchTerm = event.target.value.trim().toLowerCase();
        this.#presenter.filterItems(searchTerm, this.activeFilter);
      }
    });

    const filterButtons = document.querySelectorAll('.filter-shop-button');
    this.activeFilter = null;

    filterButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('filter-active'));
        button.classList.add('filter-active');

        const filterText = button.textContent.trim().toLowerCase();
        this.activeFilter = filterText === 'all items' ? null : filterText;

        const searchTerm = searchInput.value.trim().toLowerCase();
        this.#presenter.filterItems(searchTerm, this.activeFilter);
      });
    });
  }

  populateShopItemsList(message, items) {
    const html = items.reduce((acc, item) => {
      return acc.concat(generateShopItemsTemplate(item));
    }, '');

    document.getElementById('shop-list').innerHTML = `
      <div class="shop-list">${html}</div>
    `;

    this.renderSaveButton();
    this.updateAllCartButtonsState();
  }

  renderSaveButton() {
    const shopList = document.getElementById('shop-list');

    shopList.addEventListener('click', async (event) => {
      const cartButton = event.target.closest('.shop-item__cart-button');
      if (!cartButton || cartButton.disabled) return;

      const itemElement = cartButton.closest('.shop-item');
      const itemId = itemElement?.dataset.itemid;
      if (!itemId) return;

      alert("Berhasil menambahkan pesanan");
      const isSaved = await this.#presenter.isShopItemSaved(itemId);

      if (isSaved) {
        await this.#presenter.removeShopItem(itemId);
      } else {
        await this.#presenter.saveReport(itemId);
      }

      await this.updateCartButtonState(itemId);
    });
  }

  async updateCartButtonState(itemId) {
    const container = document.querySelector(
      `.shop-item[data-itemid="${itemId}"] #shop-item__cart-button-container`
    );
    if (!container) return;

    const isSaved = await this.#presenter.isShopItemSaved(itemId);

    container.innerHTML = isSaved
      ? successAddToCartButtonTemplate()
      : AddToCartButtonTemplate();
  }

  async updateAllCartButtonsState() {
    const itemElements = document.querySelectorAll('.shop-item');

    for (const itemEl of itemElements) {
      const itemId = itemEl.dataset.itemid;
      if (itemId) {
        await this.updateCartButtonState(itemId);
      }
    }
  }
}
