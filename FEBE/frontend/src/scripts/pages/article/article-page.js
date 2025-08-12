import {
  generateArticleItemsTemplate,
  generateLoaderAbsoluteTemplate,
} from "../../template";
import * as BiorezAPI from "../../data/api";
import ArticlePresenter from "./article-presenter";
import Database from "../../database";

export default class ArticlePage {
  #presenter = null;
  activeFilter = null;

  async render() {
    return `
      <section id="article" class="article background-section">
        <div class="article-container">
          <h1 class="section-title">Article</h1>
          
          <div class="search-input-container">
              <input id="search-input" class="search-input" type="search" placeholder="Search..."/>
          </div>

          <div id="article-list"></div>
          <div id="article-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  // article-page.js
  async afterRender() {
    this.#presenter = new ArticlePresenter({
      view: this,
      apiModel: BiorezAPI,
      dbModel: Database,
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

  populateArticlesList(message, items) {
    if (!items || items.length === 0) {
      document.getElementById("article-list").innerHTML = `
            <p class="no-search-results">Artikel Tidak Ditemukan.</p>
        `;
      return;
    }

    const html = items.reduce((acc, item) => {
      return acc.concat(generateArticleItemsTemplate(item));
    }, "");

    document.getElementById("article-list").innerHTML = `
      <div class="article-list">${html}</div>
    `;
  }

  showLoading() {
    document.getElementById("article-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("article-list-loading-container").innerHTML = "";
  }
}
