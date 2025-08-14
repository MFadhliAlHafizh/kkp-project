export default class ArticlePresenter {
  #view;
  #apiModel;
  #allItems = [];

  constructor({ view, apiModel }) {
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async initialArticles() {
    this.#view.showLoading();
    try {
      const response = await this.#apiModel.getAllArticles();
      this.#allItems = response.data;

      if (!response.ok) {
        console.error('initialArticles: response:', response);
        this.#view.populateArticlesListError(response.message);
        return;
      }

      this.#view.populateArticlesList(response.message, this.#allItems);
    } catch (error) {
      console.error('initialArticles: error:', error);
      this.#view.populateArticlesListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  async searchArticles(searchTerm) {
    const filteredItems = this.#allItems.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
      return titleMatch || descriptionMatch;
    });

    if (filteredItems.length === 0) {
      this.#view.populateArticlesNotFound();
    } else {
      this.#view.populateArticlesList('success', filteredItems);
    }
  }
}
