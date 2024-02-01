import React from "react";
import { useFavorit } from "../context/FavoritContext";

export default function FavoritList() {
  const { favorit, removeFromFavorit } = useFavorit();

  return (
    <div className="p-10 min-h-screen  w-auto">
      <h2 className="text-3xl font-bold text-gray-400 mb-6 text-center">
        Ma Liste de souhaits
      </h2>
      <div className="max-w-2xl mx-auto opacity-70 rounded-xl bg-gray-300 w-[400px]">
        {/* Vérifie si la liste des favoris contient des éléments */}
        {favorit.length > 0 ? (
          // Si oui, itère sur lrs produits favoris pour les afficher
          favorit.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4"
            >
              <span className="text-lg font-semibold ">
                {product.nameProduct}
              </span>
              <button
                type="button"
                className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-800 "
                onClick={() => removeFromFavorit(product.id)}
              >
                Retirer
              </button>
            </div>
          ))
        ) : (
          <p className="text-center p-4 ">Pas de favoris ajoutés.</p>
        )}
      </div>
    </div>
  );
}
