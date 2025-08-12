const articles = require("./article");
const { nanoid } = require("nanoid");

const addArticleHandler = (request, h) => {
  const { date, image, title, description } = request.payload;
  const id = nanoid(16);

  const newArticleItem = {
    id,
    date,
    image,
    title,
    description,
  };

  articles.push(newArticleItem);

  const isSuccess = articles.filter((item) => item.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Artikel berhasil ditambahkan",
      data: {
        itemId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Artikel gagal ditambahkan",
  });
  response.code(500);
  return response;  
};

const getAllArticlesHandler = () => ({
  status: "success",
  data: {
    articles,
  },
});

const getArticleByIdHandler = (request, h) => {
  const { id } = request.params;

  const article = articles.filter((n) => n.id === id)[0];

  if (article !== undefined) {
    return {
      status: "success",
      data: {
        article,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Artikel tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editArticleByIdHandler = (request, h) => {
  const { id } = request.params;
  const { date, image, title, description } = request.payload;

  const index = articles.findIndex((item) => item.id === id);

  if (index !== -1) {
    articles[index] = {
      ...articles[index],
      date,
      image,
      title,
      description,
    };

    const response = h.response({
      status: "success",
      message: "Artikel berhasil diperbaharui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbaharui artikel, id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteArticleByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = articles.findIndex((item) => item.id === id);

  if (index !== -1) {
    articles.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Artikel berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Artikel gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = { 
  addArticleHandler, 
  getAllArticlesHandler, 
  getArticleByIdHandler,
  editArticleByIdHandler,
  deleteArticleByIdHandler 
}