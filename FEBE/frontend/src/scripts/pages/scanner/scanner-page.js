import { nanoid } from "nanoid";
import { convertBase64ToBlob } from "../../utils";
import Camera from "../../utils/camera";

export default class Scanner {
  #form;
  #isCameraOpen = false;
  #takenDocumentations = [];
  #camera;

  async render() {
    return `
      <section id="scanner" class="scanner background-section">
        <form id="new-form" class="new-form">
          <div class="scanner-container">
            <h1>Klasifikasi Sampah</h1>
            <div class="new-form__documentations__container">
              <div id="camera-container" class="new-form__camera__container">
                <video id="camera-video" class="new-form__camera__video">
                  Video stream not available.
                </video>
                <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>
                <div id="camera-tools" class="new-form__camera__tools">
                  <select id="camera-select"></select>
                </div>
                <div class="new-form__documentations__buttons">
                  <div class="camera-btn-container">
                    <div class="documentations-buttons-container">
                      <button id="documentations-input-button" class="button white-button" type="button">
                        Ambil Gambar
                      </button>
                      <input
                        id="documentations-input"
                        class="new-form__documentations__input"
                        name="documentations"
                        type="file"
                        accept="image/*"
                        multiple
                        aria-multiline="true"
                        aria-describedby="documentations-more-info"
                      />
                      <button id="open-documentations-camera-button" class="button white-button" type="button">
                        Buka Kamera
                      </button>
                    </div>

                    <div class="camera-take-button-container">
                      <button id="camera-take-button" class="button green-button" type="button">
                        Tangkap Gambar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="camera-line"></div>
              <ul id="documentations-taken-list" class="new-form__documentations__outputs"></ul>
            </div>
          </div>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this.#setupForm();
  }

  #setupForm() {
    this.#form = document.getElementById("new-form");

    document
      .getElementById("documentations-input")
      .addEventListener("change", async (event) => {
        const insertingPicturesPromises = Object.values(event.target.files).map(
          async (file) => {
            return await this.#addTakenPicture(file);
          }
        );
        await Promise.all(insertingPicturesPromises);

        await this.#populateTakenPictures();
      });

    document
      .getElementById("documentations-input-button")
      .addEventListener("click", () => {
        this.#form.elements.namedItem("documentations-input").click();
      });

    const cameraTools = document.getElementById("camera-tools");
    document
      .getElementById("open-documentations-camera-button")
      .addEventListener("click", async (event) => {
        cameraTools.classList.toggle("open");

        this.#isCameraOpen = cameraTools.classList.contains("open");
        if (this.#isCameraOpen) {
          event.currentTarget.textContent = "Tutup Kamera";
          this.#setupCamera();
          this.#camera.launch();

          return;
        }

        event.currentTarget.textContent = "Buka Kamera";
        this.#camera.stop();
      });
  }

  #setupCamera() {
    if (this.#camera) {
      return;
    }
    this.#camera = new Camera({
      video: document.getElementById('camera-video'),
      cameraSelect: document.getElementById('camera-select'),
      canvas: document.getElementById('camera-canvas'),
    });

    this.#camera.addCheeseButtonListener('#camera-take-button', async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPictures();
    });
  }

  async #addTakenPicture(image) {
    let blob = image;

    if (image instanceof String) {
      blob = await convertBase64ToBlob(image, 'image/png');
    }

    const newDocumentation = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,
    };
    this.#takenDocumentations = [...this.#takenDocumentations, newDocumentation];
  }

  async #populateTakenPictures() {
    const html = this.#takenDocumentations.reduce((accumulator, picture, currentIndex) => {
      const imageUrl = URL.createObjectURL(picture.blob);
      return accumulator.concat(`
        <li class="new-form__documentations__outputs-item" data-itemId="${nanoid(16)}">
            <div class="scan-results-image">
              <img src="${imageUrl}" alt="Dokumentasi ke-${currentIndex + 1}" />
            </div>
            <div class="scan-results-description">
              <h3>Nama Sampah</h3>
              <p class="trash-type">Organik</p>
              <p class="trash-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent pretium, odio vitae scelerisque
              </p>
              <div class="delete-btn-container">
                <button class="delete-btn">Hapus</button>
              </div>
            </div>
        </li>
      `);
    }, '');

    document.getElementById('documentations-taken-list').innerHTML = html;

    document.querySelectorAll('button[data-deletepictureid]').forEach((button) =>
      button.addEventListener('click', (event) => {
        const pictureId = event.currentTarget.dataset.deletepictureid;

        // const deleted = this.#removePicture(pictureId);
        // if (!deleted) {
        //   console.log(`Picture with id ${pictureId} was not found`);
        // }

        // Updating taken pictures
        this.#populateTakenPictures();
      }),
    );
  }
}
