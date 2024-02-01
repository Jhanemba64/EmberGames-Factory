import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useBasket } from "../context/BasketContext";
import { useFavorit } from "../context/FavoritContext";
import ashe from "../assets/ashe.png";

export default function SingleProduct({
  id,
  nameProduct,
  price,
  category,
  quantityProduct,
  isFavorite,
}) {
  const [count, setCount] = useState(0);
  const [randomImage, setRandomImage] = useState("");
  const [starFavorite, setStarFavorite] = useState(isFavorite);

  useEffect(() => {
    // Générez une URL d'image aléatoire
    const generateRandomImage = () => {
      const width = 600;
      const height = 300;
      const randomImageURL = `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
      return randomImageURL;
    };

    const randomImageURL = generateRandomImage();
    setRandomImage(randomImageURL);
  }, []);

  const { addToBasket } = useBasket();
  const { addToFavorit, removeFromFavorit } = useFavorit(); // Utilisation des hook de contexte

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const changeFavorite = () => {
    setStarFavorite(!starFavorite);
    if (!starFavorite) {
      addToFavorit({ id, nameProduct, price, category, quantityProduct }); // Ajoute aux favoris si pas déjà favori
    } else {
      removeFromFavorit(id); // Supprime des favoris si déjà favori
    }
  };

  return (
    <div
      className="border-2 opacity-70 p-8 rounded-xl"
      style={{
        backgroundImage: `url(${ashe})`,
        backgroundSize: "cover",
        backgroundOpacity: 0.5,
      }}
    >
      <h4 className="text-2xl p-4 font-extrabold">{nameProduct}</h4>
      <img src={randomImage} alt="aleatoire" className=" p-2" />
      <div className="product-info">
        <p>Catégorie : {category}</p>
        <p>Stock : {quantityProduct}</p>
        <p>Prix : {price} €</p>
      </div>
      <div>
        <div className="flex justify-center ">
          <button
            type="button"
            className=" font-bold p-3 mt-1 rounded-lg hover:text-white"
            onClick={() => {
              addToBasket({
                id,
                nameProduct,
                price,
                category,
                quantityProduct,
              });
              handleIncrement();
            }}
          >
            Ajouter au panier : {count}
          </button>
          <button type="button" className="p-3 mt-1" onClick={changeFavorite}>
            {starFavorite ? "⭐" : "★"}
          </button>
        </div>
      </div>
    </div>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.number.isRequired,
  nameProduct: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  quantityProduct: PropTypes.number.isRequired,
  isFavorite: PropTypes.number.isRequired,
};
