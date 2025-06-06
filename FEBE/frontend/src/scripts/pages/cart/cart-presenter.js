export default class CartPresenter {
  #view;
  #dbModel;
 
  constructor({ view, dbModel }) {
    this.#view = view;
    this.#dbModel = dbModel;
  }
 
  async initialGalleryAndMap() {
    // this.#view.showReportsListLoading();
 
    try {
      const listOfShopItems = await this.#dbModel.getAllShopItems();
      //   const shopItems = await Promise.all(listOfShopItems.map(reportMapper));
      const message = 'Berhasil menambahkan pesanan.';
      
      this.#view.populateShopItemsList(message, listOfShopItems);
      //   this.#view.populateBookmarkedReports(message, shopItems);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
    //   this.#view.populateBookmarkedReportsError(error.message);
    } finally {
    //   this.#view.hideReportsListLoading();
    }
  }

  async removeShopItem(itemId) {
    try {
      await this.#dbModel.removeShopItem(itemId);
      console.log(`Item dengan ID ${itemId} berhasil dihapus.`);
    } catch (error) {
      console.error('removeShopItem: error:', error);
    }
  }
}