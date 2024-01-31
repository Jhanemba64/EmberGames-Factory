import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useBasket } from "../context/BasketContext";
import ashe from "../assets/ashe.png";

export default function SingleProduct({
  id,
  nameProduct,
  price,
  category,
  quantityProduct,
}) {
  const [count, setCount] = useState(0);
  const [randomImage, setRandomImage] = useState("");
  useEffect(() => {
    // Générez une URL d'image aléatoire, par exemple depuis Lorem Picsum
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
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div
      className="border-2 opacity-70 p-8 rounded-xl"
      style={{
        backgroundImage: `url(${ashe})`,
        backgroundSize: "cover",
        backgroundOpacity: 0.5, // Vous pouvez ajuster l'opacité ici
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
        <button
          type="button"
          className="px-2 font-bold p-3 mt-1 rounded-lg hover:text-white"
          onClick={() => {
            addToBasket({ id, nameProduct, price, category, quantityProduct });
            handleIncrement();
          }}
        >
          Ajouter au panier : {count}
        </button>
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
};
