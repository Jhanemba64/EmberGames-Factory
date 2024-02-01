/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BasketPage from "./pages/BasketPage";
import NotFoundPage from "./pages/NotFoundPage";
import FavoritList from "./pages/FavoritList";
import Contacts from "./pages/Contacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
        loader: async () => {
          const products = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products`
          );
          const categories = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/categories`
          );
          return { products, categories };
        },
      },
      {
        path: "/panier",
        element: <BasketPage />,
        loader: async () => {
          const data = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products`
          );
          return data;
        },
      },
      {
        path: "/favoris",
        element: <FavoritList />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
