export default class HomePresenter {
    #view;
    #model;
  
    constructor({ view, model }) {
      this.#view = view;
      this.#model = model;
    }

    async initialShopItems() {
      this.#view.showLoading();
      try {  
        const response = await this.#model.getAllShopItems();
  
        this.#view.populateShopItemsList(response.status, response.data);
      } catch (error) {
        console.error('initialShopItems: error:', error);
      } finally {
        this.#view.hideLoading();
      }
    }
}