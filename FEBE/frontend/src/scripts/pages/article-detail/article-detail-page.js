import { 
    generateLoaderAbsoluteTemplate,
    generateArticleDetailsTemplate,
    generateArticleDetailErrorTemplate
 } from '../../template';
import ArticleDetailPresenter from './article-detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';
import * as BiorezAPI from '../../data/api';

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

    // Actions buttons
    // this.#presenter.showSaveButton();
  }

  populateArticleDetailError(message) {
    document.getElementById('article-detail-container').innerHTML = generateArticleDetailErrorTemplate(message);
  }

//   renderSaveButton() {
//     document.getElementById('save-actions-container').innerHTML =
//       generateSaveReportButtonTemplate();

//     document.getElementById('report-detail-save').addEventListener('click', async () => {
//       alert('Fitur simpan laporan akan segera hadir!');
//     });
//   }

//   renderRemoveButton() {
//     document.getElementById('save-actions-container').innerHTML =
//       generateRemoveReportButtonTemplate();

//     document.getElementById('report-detail-remove').addEventListener('click', async () => {
//       alert('Fitur simpan laporan akan segera hadir!');
//     });
//   }

  showLoading() {
    document.getElementById('article-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('article-loading-container').innerHTML = '';
  }
}
