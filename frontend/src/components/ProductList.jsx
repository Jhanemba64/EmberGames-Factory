/* eslint-disable */

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import PropTypes from "prop-types";

import SingleProduct from "./SingleProduct";

export default function ProductList({ products }) {
  const [filteredData, setFilteredData] = useState(products);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchName, setSearchName] = useState("");

  // Filtre en fonction de ce que j'écris
  useEffect(() => {
    setFilteredData(
      products.filter((product) =>
        product.name.toLowerCase().startsWith(searchName.toLowerCase())
      )
    );
  }, [products, searchName]);

  useEffect(() => {
    if (isUpdated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          setFilteredData(res.data);
          setIsUpdated(false);
        })
        .catch((e) => console.error(e));
    }
  }, [isUpdated]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="m-10 ">
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={searchName}
        onChange={handleSearchChange}
        className="mb-4 p-2 border-2 border-gray-300"
      />
      <Slider
        speed={500}
        slidesToShow={3}
        slidesToScroll={3}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {filteredData.map((e) => (
          <div key={e.id} className="p-4">
            <SingleProduct
              nameProduct={e.name}
              price={e.price}
              quantityProduct={e.quantity}
              category={e.category}
              isFavorite={e.is_fav}
              id={e.id}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.isRequired,
};
