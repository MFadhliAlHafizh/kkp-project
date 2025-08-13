export default class ArticleDetailPresenter {
  #articleId;
  #view;
  #apiModel;

  constructor(articleId, { view, apiModel }) {
    this.#articleId = articleId;
    this.#view = view;
    this.#apiModel = apiModel;
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

//   showSaveButton() {
//     if (this.#isReportSaved()) {
//       this.#view.renderRemoveButton();
//       return;
//     }

//     this.#view.renderSaveButton();
//   }

//   #isReportSaved() {
//     return false;
//   }
}
