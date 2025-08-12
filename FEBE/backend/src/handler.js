const shopItems = require("./shop");
const { nanoid } = require("nanoid");

const addShopItem = (request, h) => {
  const { category, imageUrl, itemName, description, price } = request.payload;
  const id = nanoid(16);

  const newShopItem = {
    id,
    category,
    imageUrl,
    itemName,
    description,
    price,
  };

  shopItems.push(newShopItem);

  const isSuccess = shopItems.filter((item) => item.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Produk berhasil ditambahkan",
      data: {
        itemId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Produk gagal ditambahkan",
  });
  response.code(500);
  return response;  
};

const getAllShopItemsHandler = () => ({
  status: "success",
  data: {
    shopItems,
  },
});

const getShopItemByIdHandler = (request, h) => {
  const { id } = request.params;

  const shopItem = shopItems.filter((n) => n.id === id)[0];

  if (shopItem !== undefined) {
    return {
      status: "success",
      data: {
        shopItem,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Produk tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editShopItemByIdHandler = (request, h) => {
  const { id } = request.params;
  const { category, imageUrl, itemName, description, price } = request.payload;

  const index = shopItems.findIndex((item) => item.id === id);

  if (index !== -1) {
    shopItems[index] = {
      ...shopItems[index],
      category,
      imageUrl,
      itemName,
      description,
      price,
    };

    const response = h.response({
      status: "success",
      message: "Produk berhasil diperbaharui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbaharui produk, id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteShopItemByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = shopItems.findIndex((item) => item.id === id);

  if (index !== -1) {
    shopItems.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Produk berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Produk gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = { 
  addShopItem, 
  getAllShopItemsHandler, 
  getShopItemByIdHandler,
  editShopItemByIdHandler,
  deleteShopItemByIdHandler 
}