let produk = JSON.parse(localStorage.getItem("produk")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveData() {
  localStorage.setItem("produk", JSON.stringify(produk));
  localStorage.setItem("cart", JSON.stringify(cart));
}

function tambahProduk() {
  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;

  if (!nama || !harga) return alert("Isi semua field");

  produk.push({ nama, harga });
  saveData();
  renderProduk();
}

function renderProduk() {
  const list = document.getElementById("produkList");
  list.innerHTML = "";

  produk.forEach((item, index) => {
    list.innerHTML += `
      <div class="card">
        <strong>${item.nama}</strong><br>
        Rp ${item.harga}<br><br>
        <button onclick="addToCart(${index})">Tambah ke Keranjang</button>
        <button class="danger" onclick="hapusProduk(${index})">Hapus</button>
      </div>
    `;
  });
}

function hapusProduk(index) {
  produk.splice(index, 1);
  saveData();
  renderProduk();
}

function addToCart(index) {
  cart.push(produk[index]);
  saveData();
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach((item) => {
    list.innerHTML += `
      <div class="card">
        ${item.nama} - Rp ${item.harga}
      </div>
    `;
  });
}

function checkoutWA() {
  if (cart.length === 0) return alert("Keranjang kosong");

  let pesan = "Halo, saya ingin order:%0A";

  cart.forEach((item) => {
    pesan += `- ${item.nama} (Rp ${item.harga})%0A`;
  });

  window.open(`https://wa.me/62895406066609?text=${pesan}`, "_blank");
}

function showAdmin() {
  document.getElementById("adminPanel").scrollIntoView({ behavior: "smooth" });
}

function showCart() {
  document.getElementById("cartList").scrollIntoView({ behavior: "smooth" });
}

renderProduk();
renderCart();
