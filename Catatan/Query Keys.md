# Query Keys

Query keys adalah identitas unik (biasanya berupa array atau string) yang digunakan oleh React Query untuk membedakan setiap permintaan data (query) di aplikasi. Query key ini berfungsi seperti “label” atau “tag” yang menandai data tertentu di cache React Query.

Analogi sederhananya, query key bisa diibaratkan seperti nama folder di komputer. Jika Anda ingin menyimpan atau mengambil file tertentu, Anda harus tahu nama foldernya. Begitu juga dengan query key—React Query akan menyimpan, mengambil, dan mengelola data berdasarkan key ini.

## Struktur Query Key

Query key biasanya berupa array, di mana elemen pertama adalah nama utama dari query, dan elemen-elemen berikutnya bisa berupa parameter atau variabel yang mempengaruhi data yang di-fetch.

```js
const queryKey = ["products", { category: "electronics", sortBy: "price" }];
```

Dalam contoh di atas, "products" adalah nama utama query, dan objek berikutnya berisi parameter yang mempengaruhi data produk yang diambil.

## Fungsi Query Key

1. **Identifikasi Unik**: Setiap query key harus unik untuk setiap permintaan data. Ini memungkinkan React Query untuk membedakan antara berbagai permintaan data dan mengelola cache dengan benar.
2. **Caching**: React Query menggunakan query key untuk menyimpan data yang telah di-fetch di cache. Jika ada permintaan data dengan query key yang sama, React Query akan mengembalikan data dari cache, sehingga mengurangi kebutuhan untuk melakukan fetch ulang dari server.
3. **Refetching**: Ketika data di server berubah, Anda dapat memicu refetching data dengan menggunakan query key yang sama. React Query akan mengenali bahwa data perlu diperbarui berdasarkan key tersebut.
4. **Invalidasi**: Anda dapat menginvalidasi query tertentu menggunakan query key, yang akan memaksa React Query untuk mengambil data terbaru dari server pada permintaan berikutnya.

Contoh

```js
// get detail product
const {
	data: detailProduct,
	isLoading: isLoadingDetailProduct,
	isError: isErrorDetailProduct,
	isSuccess: isSuccessDetailProduct,
} = useQuery({
	queryKey: ["product", showProduct], // sebagai penanda untuk fetch data dan shwowProduct sebagai dependency untuk fetch data ulang ketika showProduct berubah
	queryFn: async () => {
		// queryFn sebagai fungsi untuk fetch data
		const res = await fetch(`https://fakestoreapi.com/products/${showProduct}`);
		return res.json();
	},
	enabled: showProduct !== null, // enabled, digunakan untuk menandai apakah query boleh dieksekusi atau tidak
});
```

Dalam contoh di atas, query key adalah `["product", showProduct]`. Ini berarti bahwa query ini akan diidentifikasi sebagai "product" dan akan bergantung pada nilai `showProduct`. Jika `showProduct` berubah, React Query akan mengenali bahwa ini adalah query yang berbeda dan akan melakukan fetch ulang data. Jika `showProduct` adalah `null`, query tidak akan dijalankan karena properti `enabled` diset ke `false`. Ini berguna untuk mengontrol kapan query harus dijalankan, misalnya hanya ketika ada produk yang ingin ditampilkan.

## Kesimpulan

Query keys adalah elemen penting dalam React Query yang memungkinkan pengelolaan data yang efisien melalui identifikasi unik, caching, refetching, dan invalidasi data. Dengan menggunakan query keys dengan benar, Anda dapat memastikan bahwa aplikasi Anda tetap responsif dan up-to-date dengan data terbaru dari server.
