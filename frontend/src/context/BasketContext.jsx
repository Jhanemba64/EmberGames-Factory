import { useState, createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

// creation
const BasketContext = createContext();

// Mise a dispo
export default function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  const addToBasket = (product) => {
    // Vérifie si le produit est déja dans le panier
    const existingProduct = basket.find((item) => item.id === product.id);
    if (existingProduct) {
      // Mettre à jour la quantité
      setBasket(
        basket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Ajouter le nouveau produit avec quantity 1
      setBasket([...basket, { ...product, quantity: 1, price: product.price }]);
    }
  };

  const removeFromBasket = (productId) => {
    // Supprime ou décrémente la quantité
    setBasket(
      basket.reduce((result, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            // Décrémente la quantité
            result.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          result.push(item);
        }
        return result;
      }, [])
    );
  };

  // useMemo pour éviter que ESlint soit pas content et éviter trop de rerender
  const value = useMemo(
    () => ({
      basket,
      addToBasket,
      removeFromBasket,
    }),
    [basket]
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

// Utilisation
export const useBasket = () => useContext(BasketContext);

BasketProvider.propTypes = {
  children: PropTypes.isRequired,
};
