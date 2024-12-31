document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        image: "static/pangsit5.jpg",
        name: "pangsit",
        text: "1. Pangcuy Dowerr 2. Pangcuy Chill oil 3. Pangcuy Goreng 4. Pangcuy Kuah",
        price: 13000,
      },
      {
        id: 2,
        image: "static/pangsit7.jpg",
        name: "mie dower",
        text: "Sensasi level pedas mulai dari level 1 sampai 3",
        price: 10000,
      },
      {
        id: 3,
        image: "static/basomini.png",
        text: "Ciri khas baso dengan ukuran kecil",
        name: "baso mini",
        price: 8000,
      },
      {
        id: 4,
        image: "static/basoberurat.png",
        text: "Baso berurat home made",
        name: "baso berurat",
        price: 13000,
      },
      {
        id: 4,
        image: "static/esteh.jpg",
        text: "ES Teh Manis Seger UKURAN KECIL 300 ML",
        name: "ES Teh Manis",
        price: 3000,
      },
      {
        id: 4,
        image: "static/esteh.jpg",
        text: "ES Teh Manis Seger UKURAN BESAR 500 ML",
        name: "ES Teh Manis",
        price: 5000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    // quantity == untuk semua jumlah produk di keranjang tampil angka di bawah icon keranjang
    quantity: 0,

    // search
    search() {
      const searchValueNavbar = document.querySelector("#searchKeyup");
      // ! filter
      let filterCartSearch = this.produk.filter((item) => {
        return item.name === searchValueNavbar.value.toLowerCase();
      });
      // ! find
      let FindcartSearch = this.itemSearch.find((item) => {
        return item.name === searchValueNavbar.value.toLowerCase();
      });

      // jika produk cart belum ada / masih kosong
      if (!FindcartSearch) {
        this.itemSearch.push(filterCartSearch);
      } else {
        this.items = this.itemSearch.map((item) => {
          // jika barang beda
          if (item.name !== searchValueNavbar.value.toLowerCase()) {
            // tambah element barang  yang ga sama di bawah element slide keranjang
            return item;
          } else {
            // jika barang sudah ada tambah quantity dan total
            item.quantity++;
            // ! isi array items
            // harga barang * jumlah quantity;
            item.total = item.price * item.quantity;
            //! ubah keseluruhan
            // this.total = di isi dengan hasil jumlah price dan quantity di cart
            this.quantity++;
            // this.total di tambah per item;
            this.total += item.price;
            return item;
          }
        });
      }

      console.log(this.itemSearch);
    },

    // Method untuk nambahin produk ke array items;
    add(newItem) {
      console.log(newItem);
      // cek produk apakah ada yang sama;
      let cartItem = this.items.find((elementItem) => {
        return elementItem.id === newItem.id;
      });
      // jika produk cart belum ada / masih kosong
      if (!cartItem) {
        // nambah elemen di array items
        // spread operator
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek barang sama atau beda dgn di cart
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            // tambah element barang  yang ga sama di bawah element slide keranjang
            return item;
          } else {
            // jika barang sudah ada tambah quantity dan total
            item.quantity++;
            // ! isi array items
            // harga barang * jumlah quantity;
            item.total = item.price * item.quantity;
            //! ubah keseluruhan
            // this.total = di isi dengan hasil jumlah price dan quantity di cart
            this.quantity++;
            // this.total di tambah per item;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      // ambil item yg mau di remove berdasarkan id;
      const cartItem = this.items.find((item) => {
        // mengembalikan data item berdasarkan id;
        return item.id === id;
      });

      // jika item > 1
      if (cartItem.quantity > 1) {
        // jika bukan barang yg di klik
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            // quantity di kurangin
            item.quantity--;
            // ! isi array items
            // total di isi dengan di kali quantity yang baru di kurangi tadi;
            item.total = item.price * item.quantity;

            //! keseluruhan jumlah item di kurang
            this.quantity--;
            // this.total di kurang per item;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika quantity di array items === 1
        // jika di klik barang yg tersisa 1
        // maka barang itu di remove
        // dan menampilkan sisa nya
        this.items = this.items.filter((item) => {
          return item.id !== id;
        });

        // ! jumlah keseluruhan berkurang
        this.quantity--;
        this.total -= cartItem.price;
      }
      console.log(cartItem);
    },
  });
});

// Form checkout validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

// cek jika form nya terisi atau masih kosong
// jika masih kosong checkoutButton.disabled = true;
const form = document.querySelector("#checkoutForm");
const inputNoHp = document.querySelector("#noHp");
form.addEventListener("keyup", function () {
  //! cek semua elemen di form
  for (let i = 0; i < form.elements.length; i++) {
    // jika setiap element[i] valuenya form ga kosong
    if (form.elements[i].value.length !== 0 && inputNoHp.value.length > 12) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data form ketika tombol button di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  // ambil data form menggunakan JS
  // parameter form == html yang udah di selection
  // ! kita masukan form ke method FormData
  // ! FormData memungkinkan membuat/mengirim data method GET,DELETE,SET
  const formData = new FormData(form);

  // secara default
  // form di kirim menggunakan method GET
  // jika di form ga menambahkan atribut method = POST / GET
  // ! ambil data semua element dari "FORM" dan di GET dari "URL" menggunakan JS new URLSearchParams
  // ! semua element form ada 4
  const data = new URLSearchParams(formData);

  // ubah 4 element dari "form" data string => object
  const objData = Object.fromEntries(data);
  // ! kirim objData ke function formatMessage
  const message = formatMessage(objData);
  // ! kirim ke WHATSAPP
  window.open(
    `https://wa.me/6285778444589?text=${encodeURIComponent(message)}`
  );
  console.log(message);
});

// ! format pesan whatsapp
const formatMessage = (obj) => {
  return `    PANGCUY 
PANGSIT AYAM CIHUY
V94Q+C7H Renged, 
Kabupaten Tangerang,Banten
-----------------------------------------------
Data Customer :
  Nama: ${obj.name}
  NoHp: ${obj.noHp}
  
Data Pesanan :
  ${JSON.parse(obj.items).map((item) => {
    return `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`;
  })}
TOTAL : ${rupiah(obj.total)}
  ---------------------------------------------       
  TERIMA KASIH TELAH BELANJA

Note :
  # Barang yang sudah di pesan tidak dapat di kembalikan
  # WAJIB SHARELOCK LOKASI ANDA SEBELUM ORDER
  # JIKA BELUM SHARELOCK PESANAN TIDAK DI KIRIM
  `;
};

// konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    // mata uang IDR conversi RP
    currency: "IDR",
    // menghilangkan 40.000,00
    minimumFractionDigits: 0,
  }).format(number);
};
