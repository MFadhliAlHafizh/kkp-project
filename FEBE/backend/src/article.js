const { nanoid } = require('nanoid');

const articles = [
  {
    id: nanoid(16),
    date: '12 November 2025',
    image: 'images/placeholder-image.jpg',
    title: 'Judul Artikel 1',
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!<br><br>
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!
    `,
  },
  {
    id: nanoid(16),
    date: '5 Agustus 2025',
    image: 'images/placeholder-image.jpg',
    title: 'Judul Artikel 2',
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!<br><br>
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!
    `,
  },
  {
    id: nanoid(16),
    date: '28 Desember 2025',
    image: 'images/placeholder-image.jpg',
    title: 'Judul Artikel 3',
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!<br><br>
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!
    `,
  },
  {
    id: nanoid(16),
    date: '15 April 2026',
    image: 'images/placeholder-image.jpg',
    title: 'Judul Artikel 4',
    description: `
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!<br><br>
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Id harum consequuntur quisquam eaque. Quam, ea quasi vero facilis ducimus odit porro libero. Aliquid, accusamus. Molestias nihil unde illum aliquam!
    `,
  },
];

module.exports = articles;