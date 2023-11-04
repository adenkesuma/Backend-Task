import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nama: String,
  kat: String,
  harga: Number,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
