// ini adalah bagian get data product
async function getData() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
      displayProducts(data);
    } else {
      console.error("Gagal mendapatkan data produk");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById("product-list");

  productList.innerHTML = "";

  products.forEach(product => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `<ul id="product">
      <li>Nama product: <span>${product.nama}</span></li>
      <li>Kategori product: <span>${product.kat}</span></li>
      <li>Harga Product: <span>Rp ${product.harga}</span></li>
      <button id="delete" onclick="deleteProduct('${product._id}')">Hapus</button>
    </ul>`

    productList.appendChild(listItem)
  });
}

getData();


// ini adalah bagian delete data product
async function deleteProduct(productId) {
  try {
    const response = await fetch(`http://localhost:3000/products/delete/${productId}`, {
      method: "DELETE"
    });
    if (response.status === 204) {
      // Penghapusan berhasil, perbarui daftar produk
      getData();
    } else {
      console.error("Gagal menghapus produk");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}


// ini adalah bagian post data atau masukan data product baru
const buttonTambahProduct = document.getElementById("tambah-product");

buttonTambahProduct.addEventListener("click", async () => {
  const nama = document.getElementById("nama").value;
  const kat = document.getElementById("tipe").value;
  const harga = document.getElementById("harga").value;

  const data = {
    nama,
    kat,
    harga: parseFloat(harga) 
  };

  try {
    const response = await fetch("http://localhost:3000/products/tambah", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (response.status === 201) {
      alert("Produk berhasil ditambahkan");
    } else {
      alert("Gagal menambahkan produk");
    }
  } catch (error) {
      console.error("Terjadi kesalahan:", error);
  }
});
