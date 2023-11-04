// Nama: Aden Kesuma
// Nim: 221111805

import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";

import Product from './models/product';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// koneksi ke database mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Backend-M07', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as ConnectOptions ).then(() => {
  console.log('Berhasil terhubung ke mongodb');
}).catch((err) => {
  console.log(`Gagal terhubung ke mongodb ${err}`)
})

// get data products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data product' })
  }
});

// post data product
app.post('/products/tambah', async (req, res) => {
  const { nama, kat, harga } = req.body;

  // console.log(harga, nama, kat)

  if (typeof nama !== 'undefined' && nama !== '' && typeof kat !== 'undefined' && kat !== '' && !isNaN(Number(harga))) {
    const newProduct = new Product({ nama, kat, harga });
    const savedProduct = await newProduct.save();    

    res.status(201).json({ 
      message: 'Produk berhasil ditambahkan',
      data: savedProduct
    });
  } else {
    res.status(400).json({ message: 'Permintaan tidak valid' });
  }
});

// delete data product
app.delete('/products/delete/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (product) {
      res.status(204).send({
        message: 'Product berhasil dihapus'
      })
    } else {
      res.status(404).json({
        err: 'Product tidak ditemukan'
      })
    }
  } catch (err) {
    res.status(500).json({
      erro: 'Gagal menghapus product'
    })
  }
});


app.listen(port, () => {
  console.log(`Server berjalan di port http://localhost:${port}`);
});
