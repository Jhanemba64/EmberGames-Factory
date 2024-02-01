/* eslint-disable */
import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

const FavoritContext = createContext();

// Mise à disposition
export default function FavoritProvider({ children }) {
  const [favoritItems, setFavoritItems] = useState([]);

  const addToFavorit = (product) => {
    setFavoritItems((currentFavorits) => {
      // Vérifie si le produit est déjà dans les favoris
      const isProductAlreadyFavorit = currentFavorits.some(
        (favorit) => favorit.id === product.id
      );
      if (isProductAlreadyFavorit) {
        return currentFavorits; // Retourne les favoris existants si le produit est déjà ajouté
      }
      return [...currentFavorits, product]; // Ajoute le nouveau produit aux favoris
    });
  };

  const removeFromFavorit = (productId) => {
    setFavoritItems((currentFavorits) =>
      currentFavorits.filter((favorit) => favorit.id !== productId)
    );
  };

  // Prépare la valeur à fournir au contexte
  const value = { favorit: favoritItems, addToFavorit, removeFromFavorit };

  return (
    <FavoritContext.Provider value={value}>{children}</FavoritContext.Provider>
  );
}

// Utilisation
export const useFavorit = () => useContext(FavoritContext);

FavoritProvider.propTypes = {
  children: PropTypes.isRequired,
};
