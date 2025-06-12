import { nanoid } from 'nanoid';
import { convertBase64ToBlob } from '../../utils';
import Camera from '../../utils/camera';
import * as tf from '@tensorflow/tfjs';
import { saveData, loadData } from '../../data/localstorage.js';

export default class Scanner {
  #form;
  #isCameraOpen = false;
  #takenDocumentations = [];
  #camera;
  #model = null;
  #isModelLoading = false;
  #isModelLoaded = false;
  #trashClasses = ['Anorganik', 'Organik'] 

  constructor() {
    this.#loadFromLocalStorage();
    this.#loadModel();
  }

  #loadFromLocalStorage() {
    const savedData = loadData();
    this.#takenDocumentations = savedData.map((item) => {
      const blob = this.#base64ToBlob(item.base64, 'image/png');
      return {
        id: item.id,
        blob: blob,
        base64: item.base64,
        classification: item.classification,
      };
    });
  }

  async #loadModel() {
    try {
      this.#isModelLoading = true;
      console.log('Loading TensorFlow.js model...');

      this.#model = await tf.loadGraphModel('/models/tfjs_model/model.json');
      console.log('Model loaded successfully!');

      this.#isModelLoaded = true;
      this.#isModelLoading = false;
      console.log('Model loaded successfully!');

      // Warm up model dengan prediksi dummy
      const dummyInput = tf.zeros([1, 224, 224, 3]);
      await this.#model.execute({ inputs: dummyInput });
      dummyInput.dispose();
    } catch (error) {
      console.error('Error loading model:', error);
      this.#isModelLoading = false;
    }
  }

  async #classifyImage(imageElement) {
    if (!this.#isModelLoaded) {
      console.warn('Model not loaded yet');
      return {
        className: 'Unknown',
        confidence: 0,
        description: 'Model belum dimuat',
      };
    }

    try {
      // Preprocess gambar
      const tensor = tf.tidy(() => tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(255.0)
        .expandDims(0)); // Normalisasi

      // Prediksi
      const predictions = await this.#model.predict(tensor).data();
      console.log('Raw predictions:', predictions);

      // Bersihkan tensor
      tensor.dispose();

      // Cari kelas dengan confidence tertinggi
      const maxIndex = predictions.indexOf(Math.max(...predictions));
      const confidence = predictions[maxIndex];
      const className = this.#trashClasses[maxIndex] || 'Unknown';

      // Generate deskripsi berdasarkan kelas
      const description = this.#generateDescription(className, confidence);

      return {
        className,
        confidence: Math.round(confidence * 100),
        description,
      };
    } catch (error) {
      console.error('Error during classification:', error);
      return {
        className: 'Error',
        confidence: 0,
        description: 'Terjadi kesalahan saat klasifikasi',
      };
    }
  }

  #generateDescription(className, confidence) {
    const descriptions = {
      Anorganik: 'Sampah yang tidak dapat terurai. Perlu penanganan khusus.',
      Organik: 'Sampah yang dapat terurai secara alami. Cocok untuk kompos.',
      Error: 'Terjadi kesalahan dalam proses klasifikasi.',
    };

    const baseDescription = descriptions[className] || descriptions['Unknown'];

    if (confidence > 0.8) {
      return `${baseDescription} (Tingkat kepercayaan: Tinggi)`;
    } else if (confidence > 0.6) {
      return `${baseDescription} (Tingkat kepercayaan: Sedang)`;
    } else {
      return `${baseDescription} (Tingkat kepercayaan: Rendah)`;
    }
  }

  async render() {
    return `
      <section id="scanner" class="scanner background-section">
        <form id="new-form" class="new-form">
          <div class="scanner-container">
            <h1>Klasifikasi Sampah</h1>
            ${this.#isModelLoading ? '<div class="loading-indicator">Memuat model AI...</div>' : ''}
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
                        Upload Gambar
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
                        Ambil Gambar
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
    await this.#populateTakenPictures();
  }

  #setupForm() {
    this.#form = document.getElementById('new-form');

    document.getElementById('documentations-input').addEventListener('change', async (event) => {
      const insertingPicturesPromises = Object.values(event.target.files).map(async (file) => {
        const base64 = await this.#fileToBase64(file);
        return await this.#addTakenPicture(file, base64);
      });
      await Promise.all(insertingPicturesPromises);
      await this.#populateTakenPictures();
      saveData(this.#takenDocumentations);
    });

    document.getElementById('documentations-input-button').addEventListener('click', () => {
      this.#form.elements.namedItem('documentations-input').click();
    });

    const cameraTools = document.getElementById('camera-tools');
    document.getElementById('open-documentations-camera-button').addEventListener('click', async (event) => {
      cameraTools.classList.toggle('open');

      this.#isCameraOpen = cameraTools.classList.contains('open');
      if (this.#isCameraOpen) {
        event.currentTarget.textContent = 'Tutup Kamera';
        this.#setupCamera();
        this.#camera.launch();

        return;
      }

      event.currentTarget.textContent = 'Buka Kamera';
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
      const base64 = await this.#blobToBase64(image);
      await this.#addTakenPicture(image, base64);
      await this.#populateTakenPictures();
      saveData(this.#takenDocumentations);
    });
  }

  async #addTakenPicture(image, base64 = null) {
    let blob = image;

    if (image instanceof String) {
      blob = await convertBase64ToBlob(image, 'image/png');
    }

    // Buat temporary image element untuk klasifikasi
    const imageElement = new Image();
    const imageUrl = URL.createObjectURL(blob);

    const classification = await new Promise((resolve) => {
      imageElement.onload = async () => {
        const result = await this.#classifyImage(imageElement);
        URL.revokeObjectURL(imageUrl);
        resolve(result);
      };
      imageElement.src = imageUrl;
    });

    const newDocumentation = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,

      base64: base64,

      classification: classification,
    };

    this.#takenDocumentations = [...this.#takenDocumentations, newDocumentation];
  }

  async #populateTakenPictures() {
    const html = this.#takenDocumentations.reduce((accumulator, picture, currentIndex) => {
      const imageUrl = URL.createObjectURL(picture.blob);
      const { className, confidence, description } = picture.classification;

      return accumulator.concat(`
        <li class="new-form__documentations__outputs-item" data-itemId="${picture.id}">
            <div class="scan-results-image">
              <img src="${imageUrl}" alt="Dokumentasi ke-${currentIndex + 1}" />
            </div>
            <div class="scan-results-description">
              <h3>${className}</h3>
              <p class="trash-type">${className} (${confidence}%)</p>
              <p class="trash-description">
                ${description}
              </p>
              <div class="delete-btn-container">
                <button class="delete-btn" data-deletepictureid="${picture.id}">Hapus</button>
              </div>
            </div>
        </li>
      `);
    }, '');

    document.getElementById('documentations-taken-list').innerHTML = html;

    // Setup delete button listeners
    document.querySelectorAll('button[data-deletepictureid]').forEach((button) =>
      button.addEventListener('click', (event) => {
        const pictureId = event.currentTarget.dataset.deletepictureid;
        this.#removePicture(pictureId);
        this.#populateTakenPictures();
        saveData(this.#takenDocumentations);
      })
    );
  }

  #removePicture(pictureId) {
    const initialLength = this.#takenDocumentations.length;
    this.#takenDocumentations = this.#takenDocumentations.filter((doc) => doc.id !== pictureId);
    return this.#takenDocumentations.length < initialLength;
  }

  #base64ToBlob(base64, mimeType) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  }

  #fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  #blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  // Method untuk cleanup saat component di-destroy
  destroy() {
    if (this.#model) {
      this.#model.dispose();
    }
  }
}
