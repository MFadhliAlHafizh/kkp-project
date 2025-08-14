export default class CollectionPresenter {
  #view;
  #model;
  #allItems = [];

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialArticles() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getAllArticles();
      this.#allItems = response;
      const message = "Berhasil mendapatkan daftar koleksi artikel.";

      this.#view.populateArticlesCollection(message, this.#allItems);
    } catch (error) {
      console.error('initialArticles: error:', error);
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
