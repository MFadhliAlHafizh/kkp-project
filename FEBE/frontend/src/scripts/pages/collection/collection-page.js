import {
  generateArticleItemsTemplate,
  generateLoaderAbsoluteTemplate,
} from "../../template";
import Database from "../../data/database";
import CollectionPresenter from "./collection-presenter";

export default class CollectionPage {
  #presenter = null;
  activeFilter = null;

  async render() {
    return `
      <section id="article" class="article background-section">
        <div class="article-container">
          <h1 class="section-title">Koleksi Artikel</h1>
          
          <div id="article-content-container" class="article-content-container">
            <div class="search-input-container">
                <input id="search-input" class="search-input" type="search" placeholder="Cari..."/>
            </div>
          
            <div id="article-list"></div>
            <div id="article-list-loading-container"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new CollectionPresenter({
      view: this,
      model: Database,
    });

    await this.#presenter.initialArticles();

    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.trim().toLowerCase();
      this.#presenter.searchArticles(searchTerm);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        const searchTerm = event.target.value.trim().toLowerCase();
        this.#presenter.searchArticles(searchTerm);
      }
    });
  }

  populateArticlesCollection(message, items) {
    if (!items || items.length === 0) {
      this.populateArticlesListEmpty();
      return;
    }

    const html = items.reduce((acc, item) => {
      return acc.concat(generateArticleItemsTemplate(item));
    }, "");

    document.getElementById("article-list").innerHTML = `
      <div class="article-list">${html}</div>
    `;
  }

  populateArticlesListEmpty() {
    document.getElementById('article-content-container').innerHTML = generateArticlesListEmptyTemplate();
  }

  populateArticlesNotFound() {
    document.getElementById('article-list').innerHTML = generateArticlesNotFoundTemplate();
  }
  
  populateArticlesListError() {
    document.getElementById('article-content-container').innerHTML = generateArticlesListErrorTemplate();
  }

  showLoading() {
    document.getElementById("article-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("article-list-loading-container").innerHTML = "";
  }
}
