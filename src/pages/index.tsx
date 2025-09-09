import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProduct {
	id: string;
	title: string;
	image: string;
	price: number;
}

export default function Home() {
	const [showToast, setShowToast] = useState(false);
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
			setShowToast(true);
			setTimeout(() => {
				setShowToast(false);
			}, 3000);
		}
	}, [isSuccess]);

	return (
		<div className="container mx-auto p-8">
			{!fetchData && (
				<button onClick={() => setFetchData(true)} className="bg-blue-500 text-white px-4 py-2">
					Show Data
				</button>
			)}

			{showToast && <div className="fixed top-4 right-4 z-50 shadow-sm bg-green-300 p-4">Success Get Products Data</div>}

			{isLoading ? (
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
					{Array.from({ length: 5 }).map((_, index) => (
						<div className="shadow bg-gray-500 p-4 flex flex-col items-center animate-pulse aspect-square" key={`loading-${index}`} />
					))}
				</div>
			) : (
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
