const { nanoid } = require('nanoid');

const shopItems = [
  {
    id: nanoid(16),
    category: 'kendaraan',
    imageUrl: 'images/shopImages/kendaraan/sepeda.jpg',
    itemName: 'Sepeda',
    price: 1500000,
  },
  {
    id: nanoid(16),
    category: 'kendaraan',
    imageUrl: 'images/shopImages/kendaraan/motor.jpg',
    itemName: 'Motor',
    price: 1500000,
  },
  {
    id: nanoid(16),
    category: 'kendaraan',
    imageUrl: 'images/shopImages/kendaraan/mobil.jpeg',
    itemName: 'Mobil',
    price: 150000000,
  },
  {
    id: nanoid(16),
    category: 'elektronik',
    imageUrl: 'images/shopImages/elektronik/televisi.jpeg',
    itemName: 'TV Bekas',
    price: 2500000,
  },
  {
    id: nanoid(16),
    category: 'elektronik',
    imageUrl: 'images/shopImages/elektronik/handphone.jpg',
    itemName: 'Hp second',
    price: 2000000,
  },
  {
    id: nanoid(16),
    category: 'elektronik',
    imageUrl: 'images/shopImages/elektronik/leptop.jpeg',
    itemName: 'Leptop second',
    price: 3000000,
  },
  {
    id: nanoid(16),
    category: 'elektronik',
    imageUrl: 'images/shopImages/elektronik/kipas-angin.jpeg',
    itemName: 'Kipas second',
    price: 150000,
  },
  {
    id: nanoid(16),
    category: 'elektronik',
    imageUrl: 'images/shopImages/elektronik/mesin-cuci.jpeg',
    itemName: 'Mesin cuci second',
    price: 1500000,
  },
  {
    id: nanoid(16),
    category: 'pakaian',
    imageUrl: 'images/shopImages/pakaian/hoodie.jpg',
    itemName: 'Hoodie Second',
    price: 75000,
  },
  {
    id: nanoid(16),
    category: 'pakaian',
    imageUrl: 'images/shopImages/pakaian/baju.jpg',
    itemName: 'Baju Second',
    price: 55000,
  },
  {
    id: nanoid(16),
    category: 'pakaian',
    imageUrl: 'images/shopImages/pakaian/celana-levis.jpg',
    itemName: 'Celana levis Second',
    price: 65000,
  },
  {
    id: nanoid(16),
    category: 'pakaian',
    imageUrl: 'images/shopImages/pakaian/celana-pendek.jpeg',
    itemName: 'Celana pendek Second',
    price: 35000,
  },
  {
    id: nanoid(16),
    category: 'pakaian',
    imageUrl: 'images/shopImages/pakaian/jaket.jpeg',
    itemName: 'Jaket Second',
    price: 75000,
  },
  {
    id: nanoid(16),
    category: 'pakaian',
    imageUrl: 'images/shopImages/pakaian/kemeja.jpg',
    itemName: 'Kemeja Second',
    price: 65000,
  },
];

module.exports = shopItems;