import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface IProduct {
	id: string;
	title: string;
	image: string;
	price: number;
}

export default function Home() {
	const query = useQuery({
		queryKey: ["products"], // sebagai penanda untuk fetch data
		queryFn: async () => {
			// queryFn sebagai fungsi untuk fetch data
			const res = await fetch("https://fakestoreapi.com/products");
			return res.json();
		},
	});

	return (
		<div className="container mx-auto grid grid-cols-1 gap-4 lg:grid-cols-5">
			{query.data?.map((product: IProduct) => (
				<div key={`product-${product.id}`} className="shadow p-4 flex flex-col items-center">
					<Image src={product.image} alt={product.title} width={100} height={100} className="scale-50 h-40 w-fit" />
					<h4 className="text-center font-bold text-lg line-clamp-1">{product.title}</h4>
					<p className="text-sm">${product.price}</p>
				</div>
			))}
		</div>
	);
}
