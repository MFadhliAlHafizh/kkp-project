export default class HomePresenter {
    #view;
    #model;
  
    constructor({ view, model }) {
      this.#view = view;
      this.#model = model;
    }

    async initialArticles() {
      this.#view.showLoading();
      try {  
        const response = await this.#model.getAllArticles();
  
        this.#view.populateArticlesList(response.status, response.data);
      } catch (error) {
        console.error('initialArticles: error:', error);
      } finally {
        this.#view.hideLoading();
      }
    }
}