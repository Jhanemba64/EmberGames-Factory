import { useBasket } from "../context/BasketContext";

export default function BasketPage() {
  const { basket, removeFromBasket } = useBasket();

  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className=" p-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-400 mb-6 text-center">
          Ma Sélection de jeux
        </h2>
        <div className="space-y-4">
          {basket.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center bg-white opacity-70 p-4 shadow-lg rounded-lg"
            >
              <h3 className="text-xl font-semibold">
                {item.nameProduct}{" "}
                <span className="text-gray-600">(x {item.quantity})</span>
              </h3>
              <div>
                <h4 className="text-lg font-semibold">
                  Total: {item.price * item.quantity} €
                </h4>
              </div>
              <button
                type="button"
                onClick={() => removeFromBasket(item.id)}
                className="bg-red-500 text-white px-4 py-2 mt-4 md:mt-0 rounded hover:bg-red-800 transition duration-300"
              >
                Supprimer
              </button>
            </div>
          ))}
          <div className="text-right mt-6">
            <h3 className="text-xl text-gray-400 font-semibold">
              Prix Total: {calculateTotalPrice()} €
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
