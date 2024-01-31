import { useLoaderData } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function ProductsPage() {
  const { products, categories } = useLoaderData();

  return (
    <div>
      <div className=" flex flex-col text-center h-screen">
        <h2 className="  text-3xl font-bold p-8 text-white">Notre Catalogue</h2>
        <ProductList products={products.data} categories={categories.data} />
      </div>
    </div>
  );
}
