require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing products
  await Product.deleteMany({});

  const items = [
    { name: 'Laptop', description: 'High-performance laptop', priceCents: 99999, images: ['https://picsum.photos/400/300?random=1'], stock: 5 },
    { name: 'Mouse', description: 'Wireless mouse', priceCents: 2999, images: ['https://picsum.photos/400/300?random=2'], stock: 50 },
    { name: 'Keyboard', description: 'Mechanical keyboard', priceCents: 7999, images: ['https://picsum.photos/400/300?random=3'], stock: 20 },
    { name: 'Monitor', description: '4K Display', priceCents: 39999, images: ['https://picsum.photos/400/300?random=4'], stock: 10 },
  ];

  const created = await Product.insertMany(items);
  console.log(`Seeded ${created.length} products`);
  console.log(created);

  process.exit(0);
}

main().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});