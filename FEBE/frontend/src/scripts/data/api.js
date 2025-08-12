import BASE_URL from "../config";

const ENDPOINTS = {
    ARTICLES: `${BASE_URL}/articles`,
    SPECIFIED_ARTICLES: (id) => `${BASE_URL}/articles/${id}`,
}

export async function getAllArticles() {
    const fetchResponse = await fetch(ENDPOINTS.ARTICLES);
    const json = await fetchResponse.json();

    console.log('getAllArticles response:', json);

    return {
      ok: fetchResponse.ok,
      message: json.status,
      data: json.data.articles,
    }
}

export async function getArticleById(id) {
  const fetchResponse = await fetch(ENDPOINTS.SPECIFIED_ARTICLES(id));
  const json = await fetchResponse.json();

  console.log('getArticleById response:', json);

  return {
    ok: fetchResponse.ok,
    article: json.data.article,
  };
}
