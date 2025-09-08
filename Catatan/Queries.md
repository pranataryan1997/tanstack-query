# Queries

Query adalah sebuah deklratif dependensi di dalam source data yang terikat dengan unique key.
Sebuah Query bisa digunakan dengan promise GET method dan POST method untuk melakukan fethcing dari server.

Jika kita ingin memodifikasi data, kita bisa menggunakan Mutations.
Karena kalau disini, query hanya berfungsi untuk mengambil data saja.

untuk menggunakan nya, gunakan hook `useQuery` dengan minimal harus ada `unique key` dan juga fungsi `queryFn` yang berisi logic untuk fetching data.

fungsi `queryFn` ini harus mengembalikan sebuah promise. bisa berupa mengembalikan data, atau mengembalikan error.

`unique key` digunakan untuk melakukan refethcing data, caching data, dan sharing query di dalam aplikasi.

Ada beberapa moment/kondisi ketika kita menggunakan useQuery :

1. isPending, atau status === pending, yang artinya query sedang dalam proses fetching data (load data)
2. isError, atau status === error, yang artinya query gagal mendapatkan data
3. isSuccess, atau status === success, yang artinya query berhasil mendapatkan data

Ada beberapa state yang bisa kita manfaatkan dari useQuery, antara lain :

1. error, untuk mendapatkan error message
2. data, untuk mendapatkan data yang sudah di fetch
3. isFetching, untuk mengetahui apakah query sedang dalam proses fetching data
