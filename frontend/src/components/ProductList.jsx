/* eslint-disable */

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import PropTypes from "prop-types";

import SingleProduct from "./SingleProduct";

export default function ProductList({ products, categories }) {
  const [filteredData, setFilteredData] = useState(products);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const filterData = () => {
      const filteredByCategory = products.filter((product) =>
        currentFilter ? product.category === currentFilter : true
      );

      const filteredByName = filteredByCategory.filter((product) =>
        product.name.toLowerCase().startsWith(searchName.toLowerCase())
      );

      const filteredByPrice = filteredByName.filter((product) => {
        const price = product.price;
        const maxPriceCondition = maxPrice ? price <= maxPrice : true;
        return maxPriceCondition;
      });

      return filteredByPrice;
    };

    setFilteredData(filterData());
  }, [products, searchName, currentFilter, maxPrice, isUpdated]);

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

  const handleChange = (e) => {
    setCurrentFilter(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="max-price-slider  p-3 ">
          <input
            type="range"
            max="70"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="slider"
          />
          <p className="text-white">Prix maximum : {maxPrice} €</p>
        </div>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={searchName}
          onChange={handleSearchChange}
          className="m-4 p-2 border-2 border-gray-300"
        />
        <select
          className="m-4 p-2 border-2 border-gray-300"
          value={currentFilter}
          onChange={handleChange}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      is_fav: PropTypes.bool.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
