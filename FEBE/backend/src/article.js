const { nanoid } = require('nanoid');

const articles = [
  {
    id: nanoid(16),
    date: '12 November 2025',
    image: 'kendaraan',
    title: 'Lorem ipsum dolor sit amet consectetur elit.',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero',
  },
];

module.exports = articles;