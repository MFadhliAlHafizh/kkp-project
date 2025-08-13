const {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  editArticleByIdHandler,
  deleteArticleByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/articles",
    handler: addArticleHandler,
  },
  {
    method: "GET",
    path: "/articles",
    handler: getAllArticlesHandler,
  },
  {
    method: "GET",
    path: "/articles/{id}",
    handler: getArticleByIdHandler,
  },
  {
    method: "PUT",
    path: "/articles/{id}",
    handler: editArticleByIdHandler,
  },
  {
    method: "DELETE",
    path: "/articles/{id}",
    handler: deleteArticleByIdHandler,
  },
];

module.exports = routes;