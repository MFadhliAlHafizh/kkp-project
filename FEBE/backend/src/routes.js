const {
  addShopItem,
  getAllShopItemsHandler,
  deleteShopItemByIdHandler,
  getShopItemByIdHandler,
  editShopItemByIdHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/shopItems",
    handler: addShopItem,
  },
  {
    method: "GET",
    path: "/shopItems",
    handler: getAllShopItemsHandler,
  },
  {
    method: "GET",
    path: "/shopItems/{id}",
    handler: getShopItemByIdHandler,
  },
  {
    method: "PUT",
    path: "/shopItems/{id}",
    handler: editShopItemByIdHandler,
  },
  {
    method: "DELETE",
    path: "/shopItems/{id}",
    handler: deleteShopItemByIdHandler,
  },
];

module.exports = routes;