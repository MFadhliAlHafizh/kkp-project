import { openDB } from 'idb';
 
const DATABASE_NAME = 'biorez';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'saved-article';
 
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (database) => {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const Database = {
  async putArticle(article) {
    if (!Object.hasOwn(article, 'id')) {
      throw new Error('`id` is required to save.');
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, article);
  },

  async getAllArticles() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async getArticleById(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async removeArticle(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};
export default Database;