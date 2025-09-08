# 3 Konsep utama pada React Query

- Queries
- Mutations
- Query Invalidation

Step by Step :

1. Create Query Client pada file app.jsx

`const queryClient = new QueryClient();`

2. lalu bungkus dengan Query Client Provider

```js
export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
```

## Penggunaan useQUery

```js
const query = useQuery({
	queryKey: ["products"], // sebagai penanda untuk fetch data
	queryFn: async () => {
		// queryFn sebagai fungsi untuk fetch data
		const res = await fetch("https://fakestoreapi.com/products");
		return res.json();
	},
});
```

- queryKey: ["products"] berfungsi sebagai identitas unik query ini. React Query akan menggunakan key ini untuk caching, refetch, dan invalidasi data, sehingga data produk yang sudah di-fetch tidak perlu diambil ulang jika sudah ada di cache.
- queryFn adalah fungsi async yang menjalankan proses fetch ke endpoint

## Insight penting dari penggunaan kode ini:

1. Dengan useQuery, Anda tidak perlu lagi menulis state loading, error, atau cache secara manual—semua sudah di-handle otomatis oleh React Query.
2. Data yang di-fetch akan otomatis di-cache, sehingga jika ada komponen lain yang membutuhkan data yang sama (dengan queryKey yang sama), data tidak perlu diambil ulang dari server.
3. Jika terjadi perubahan data di server, Anda bisa melakukan invalidasi query agar data di-refresh secara otomatis.
4. React Query juga menyediakan fitur seperti refetch otomatis, polling, dan pengelolaan status query (loading, error, success) yang sangat membantu dalam pengembangan aplikasi React modern.
