export default class ArticleDetailPresenter {
  #articleId;
  #view;
  #apiModel;
  #dbModel;

  constructor(articleId, { view, apiModel, dbModel }) {
    this.#articleId = articleId;
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async showArticleDetail() {
    this.#view.showLoading();
    try {
      const response = await this.#apiModel.getArticleById(this.#articleId);

      if (response.error) {
        console.error('showArticleDetail: response:', response);
        this.#view.populateArticleDetailError(response.message);
        return;
      }

      this.#view.populateArticleDetail(response.message, response.article);
    } catch (error) {
      console.error('showArticleDetail: error:', error);
      this.#view.populateArticleDetailError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }

  async saveReport() {
    try {
      const response = await this.#apiModel.getArticleById(this.#articleId);
      await this.#dbModel.putArticle(response.article);
      this.#view.saveToCollectionSuccessfully('Success to save to collection');
    } catch (error) {
      console.error('saveArticle: error:', error);
      this.#view.saveToCollectionFailed(error.message);
    }
  }

  async removeArticle() {
    try {
      await this.#dbModel.removeArticle(this.#articleId);
      this.#view.removeFromCollectionSuccessfully('Success to remove from bookmark');
    } catch (error) {
      console.error('removeArticle: error:', error);
      this.#view.removeFromCollectionFailed(error.message);
    }
  }

  async showSaveButton() {
    if (await this.#isArticleSaved()) {
      this.#view.renderRemoveButton();
      return;
    }
    this.#view.renderSaveButton();
  }

  async #isArticleSaved() {
    return !!(await this.#dbModel.getArticleById(this.#articleId));
  }
}
