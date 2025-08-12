export default class ArticlePresenter {
  #view;
  #apiModel;
  #dbModel;
  #allItems = [];

  constructor({ view, apiModel, dbModel }) {
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async initialArticles() {
    this.#view.showLoading();
    try {
      const response = await this.#apiModel.getAllArticles();
      this.#allItems = response.data;
      this.#view.populateArticlesList(response.message, this.#allItems);
    } catch (error) {
      console.error('initialArticles: error:', error);
    } finally {
      this.#view.hideLoading();
    }
  }

  // article-page-presenter.js
  async searchArticles(searchTerm) {
    const filteredItems = this.#allItems.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
      return titleMatch || descriptionMatch;
    });

    this.#view.populateArticlesList(
      filteredItems.length > 0 ? 'success' : 'not found',
      filteredItems
    );
  }

  async saveArticles(itemId) {
    try {
      const article = await this.#apiModel.getArticleById(itemId);

      const articleData = {
        id: itemId,
        ...article.article,
      };

      await this.#dbModel.putArticle(articleData);
    } catch (error) {
      console.error('saveArticles: error:', error);
    }
  }

  async removeArticle(itemId) {
    try {
      await this.#dbModel.removeArticle(itemId);
    } catch (error) {
      console.error('removeArticle: error:', error);
    }
  }

  async isArticleSaved(itemId) {
    try {
      const item = await this.#dbModel.getArticleById(itemId);
      return !!item;
    } catch (error) {
      console.error('isArticleSaved: error:', error);
      return false;
    }
  }
}
