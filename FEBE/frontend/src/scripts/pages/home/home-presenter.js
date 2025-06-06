export default class HomePresenter {
    #view;
    #model;
  
    constructor({ view, model }) {
      this.#view = view;
      this.#model = model;
    }

    async initialGalleryAndMap() {
      try {  
        const response = await this.#model.getAllShopItems();
  
        // if (response.error) {
        //   console.error('initialGalleryAndMap: response:', response);
        //   this.#view.populateReportsListError(response.message);
        //   return;
        // }
  
        this.#view.populateShopItemsList(response.status, response.data);
      } catch (error) {
        console.error('initialGalleryAndMap: error:', error);
        // this.#view.populateReportsListError(error.status);
      } finally {
        // this.#view.hideLoading();
      }
    }
}