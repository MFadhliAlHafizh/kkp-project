import { 
    generateLoaderAbsoluteTemplate,
    generateArticleDetailsTemplate,
    generateSaveArticleButtonTemplate,
    generateRemoveArticleButtonTemplate,
    generateArticleDetailErrorTemplate
 } from '../../template';
import ArticleDetailPresenter from './article-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import * as BiorezAPI from '../../data/api';
import Database from '../../data/database';

export default class ArticleDetailPage {
  #presenter = null;

  async render() {
    return `
        <section id="article-detail" class="article-detail">
            <div id="article-detail-container" class="article-detail-container"></div>
            <div id="article-loading-container"></div>
        </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ArticleDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: BiorezAPI,
      dbModel: Database,
    });

    this.#presenter.showArticleDetail();
  }

  async populateArticleDetail(message, article) {
    document.getElementById('article-detail-container').innerHTML = generateArticleDetailsTemplate({
      date: article.date,
      image: article.image,
      title: article.title,
      description: article.description,
    });

    this.#presenter.showSaveButton();
  }

  renderSaveButton() {
    document.getElementById('add-to-collection-button-container').innerHTML =
      generateSaveArticleButtonTemplate();

    document.getElementById('add-to-collection-button').addEventListener('click', async () => {
      await this.#presenter.saveReport();
      await this.#presenter.showSaveButton();
    });
  }

  renderRemoveButton() {
    document.getElementById('add-to-collection-button-container').innerHTML =
      generateRemoveArticleButtonTemplate();

    document.getElementById('add-to-collection-button').addEventListener('click', async () => {
      await this.#presenter.removeArticle();
        await this.#presenter.showSaveButton();
    });
  }

  populateArticleDetailError(message) {
    document.getElementById('article-detail-container').innerHTML = generateArticleDetailErrorTemplate(message);
  }

  saveToCollectionSuccessfully(message) {
    console.log(message);
  }

  saveToCollectionFailed(message) {
    alert(message);
  }

  removeFromCollectionSuccessfully(message) {
    console.log(message);
  }
  removeFromCollectionFailed(message) {
    alert(message);
  }

  showLoading() {
    document.getElementById('article-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('article-loading-container').innerHTML = '';
  }
}
