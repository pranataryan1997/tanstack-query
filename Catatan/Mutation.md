# Mutations

Mutation adalah sebuah fungsi yang khusus digunakan untuk melakukuan create, update, dan delete data. Dan bisa melakukan server side effects. Tanstack Query menyediakan `useMutation` hook untuk melakukan hal tersebut.

```js
const { mutate, isPending } = useMutation({
	mutationFn: async (payload: any) => {
		return await fetch("https://fakestoreapi.com/products", {
			method: "POST",
			body: JSON.stringify(payload),
		});
	},
	onSuccess: () => {
		setShowToast("Success Add Product");
		setShowAddProduct(false);
		setTimeout(() => {
			setShowToast(null);
		}, 3000);
	},
});
```

Penjelasan kode di atas:

- `useMutation` menerima sebuah object yang berisi beberapa property.
- `mutationFn` adalah fungsi yang akan dijalankan ketika kita memanggil `mutate`. Fungsi ini menerima sebuah parameter `payload` yang berisi data yang akan dikirim ke server.
- `onSuccess` adalah callback function yang akan dijalankan ketika `mutationFn` berhasil dijalankan. Di sini kita bisa melakukan beberapa hal seperti menampilkan toast, menutup modal, dan lain-lain.
- `mutate` adalah fungsi yang digunakan untuk memanggil `mutationFn`. Fungsi ini menerima sebuah parameter yang akan diteruskan ke `mutationFn`.
- `isPending` adalah boolean yang menunjukkan apakah mutation sedang berjalan atau tidak. Kita bisa menggunakan ini untuk menampilkan loading state pada tombol submit.
