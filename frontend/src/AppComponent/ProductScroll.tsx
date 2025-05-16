export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    rating: number | null; // Rating could be null
    imageurl: string;
    quantity: string;
    sellerName: string;
    expirydate: string;
    category: string;
    specialmsg: string;
    offers: string;
    sellerid: string;
}

interface ProductScrollerProps {
    title: string;
    data: Product[];
    onClick: (id: string) => void;
}
import Charger from "../../public/Charger.png";
import Image from "next/image";
import { Button } from "react-day-picker";

export const ProductScroller : React.FC<ProductScrollerProps> = ({ title, data, onClick }) => (
  <div>
    <div className="flex flex-row justify-between m-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <h2 className="text-2xl font-bold">See All</h2>
    </div>
    <div className="flex flex-row overflow-x-scroll whitespace-nowrap">
      {data.map((product, index) => (
        <div key={index} className="min-w-[220px] border-2 border-black p-4 m-1 flex-shrink-0">
          <Image src={Charger} alt={product.name} className="h-[140px] w-[200px] object-contain" />
          <div>
            <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
            <p>{product.quantity}</p>
            <p>{product.sellerName}</p>
            <div className="flex justify-between mt-2">
              <strong>{product.price}</strong>
              <Button onClick={() => onClick(product.id)} className="bg-pink-400 w-[90px]">Add</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
   