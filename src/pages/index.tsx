import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

interface IProduct {
	id: string;
	title: string;
	image: string;
	price: number;
}

export default function Home() {
	const [showToast, setShowToast] = useState<string | null>(null);
	const [showAddProduct, setShowAddProduct] = useState(false);
	const [fetchData, setFetchData] = useState(false);
	const [showProduct, setShowProduct] = useState<string | null>(null);

	const { data, isLoading, isError, isSuccess } = useQuery({
		queryKey: ["products"], // sebagai penanda untuk fetch data
		queryFn: async () => {
			// queryFn sebagai fungsi untuk fetch data
			const res = await fetch("https://fakestoreapi.com/products");
			return res.json();
		},
		enabled: fetchData, // enabled, digunakan untuk menandai apakah query boleh dieksekusi atau tidak
	});

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

	// set toast ketika data berhasil di fetch
	useEffect(() => {
		if (isSuccess) {
			setShowToast("Success Get Product");
			setTimeout(() => {
				setShowToast(null);
			}, 3000);
		}
	}, [isSuccess]);

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

	const onSubmitProduct = (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const payload = {
			id: parseInt((form.elements.namedItem("id") as HTMLInputElement).value), // namedItem digunakan untuk mengambil inputan berdasarkan name attribute
			title: (form.elements.namedItem("title") as HTMLInputElement).value,
			price: parseInt((form.elements.namedItem("price") as HTMLInputElement).value),
			description: (form.elements.namedItem("description") as HTMLInputElement).value,
			category: (form.elements.namedItem("category") as HTMLInputElement).value,
			image: (form.elements.namedItem("image") as HTMLInputElement).value,
		};
		mutate(payload);
		form.reset(); // reset semua inputan form setelah submit
	};

	return (
		<div className="container mx-auto p-8">
			{!fetchData && (
				<button onClick={() => setFetchData(true)} className="bg-blue-500 text-white px-4 py-2">
					Show Data
				</button>
			)}

			{showToast !== null && <div className="fixed top-4 right-4 z-50 shadow-sm bg-green-300 p-4">{showToast}</div>}

			{isLoading ? (
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
					{Array.from({ length: 5 }).map((_, index) => (
						<div className="shadow bg-gray-500 p-4 flex flex-col items-center animate-pulse aspect-square" key={`loading-${index}`} />
					))}
				</div>
			) : (
				<div>
					{/* Add Product */}
					<div className="mb-4">
						<button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => setShowAddProduct(true)}>
							Add Product
						</button>

						{/* popup Add Product */}
						<div className={`fixed h-screen w-screen top-0 bg-black/50 left-0 z-50 ${showAddProduct ? "flex justify-center items-center" : "hidden"}`}>
							<div className="w-1/4 bg-white relative flex items-center gap-8 p-8">
								<button className="absolute top-5 right-5" onClick={() => setShowAddProduct(false)}>
									X
								</button>
								<form className="w-full space-y-4" onSubmit={onSubmitProduct}>
									<label className="flex flex-col" htmlFor="id">
										ID:
										<input type="number" id="id" name="id" className="border-2 w-full p-2" />
									</label>
									<label className="flex flex-col" htmlFor="title">
										Title:
										<input type="text" id="title" name="title" className="border-2 w-full p-2" />
									</label>
									<label className="flex flex-col" htmlFor="price">
										Price:
										<input type="number" id="price" name="price" className="border-2 w-full p-2" />
									</label>
									<label className="flex flex-col" htmlFor="description">
										Description:
										<input type="text" id="description" name="description" className="border-2 w-full p-2" />
									</label>
									<label className="flex flex-col" htmlFor="category">
										Category:
										<input type="text" id="category" name="category" className="border-2 w-full p-2" />
									</label>
									<label className="flex flex-col" htmlFor="image">
										Image:
										<input type="text" id="image" name="image" className="border-2 w-full p-2" />
									</label>
									<button className="w-full bg-black text-white px-4 py-2 font-bold">{isPending ? "Loading..." : "Submit"}</button>
								</form>
							</div>
						</div>
					</div>
					{/* End Add Product */}

					{/* Show Product */}
					<div>
						{isError ? (
							<div className="text-red-500 text-3xl font-bold">Data Not Found</div>
						) : (
							<div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
								{data?.map((product: IProduct) => (
									<div key={`product-${product.id}`} className="shadow p-4 flex flex-col items-center" onClick={() => setShowProduct(product.id)}>
										<Image src={product.image} alt={product.title} width={100} height={100} className="scale-50 h-40 w-fit" />
										<h4 className="text-center font-bold text-lg line-clamp-1">{product.title}</h4>
										<p className="text-sm">${product.price}</p>
									</div>
								))}
							</div>
						)}
					</div>
					{/* End Show Product */}
				</div>
			)}

			{/* popup detail */}
			<div className={`fixed h-screen w-screen top-0 bg-black/50 left-0 ${showProduct ? "flex justify-center items-center" : "hidden"}`}>
				<div className="w-1/2 h-1/2 bg-white relative flex items-center gap-8 p-8">
					<button className="absolute top-5 right-5" onClick={() => setShowProduct(null)}>
						X
					</button>

					<img src={detailProduct?.image} alt={detailProduct?.title} className="w-1/4" />
					<div className="w-3/4 space-y-4">
						<h1 className="text-3xl font-bold">{detailProduct?.title}</h1>
						<p className="text-xl">{detailProduct?.description && detailProduct.description.length > 100 ? detailProduct.description.slice(0, 100) + "..." : detailProduct?.description}</p>
						<p className="text-2xl font-bold">${detailProduct?.price}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
