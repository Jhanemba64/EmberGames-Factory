import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function HomePage() {
  return (
    <div className="  h-screen text-center flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-white">
        Bienvenue sur EmberGames Factory
      </h1>
      <p className="text-l p-8 text-white">
        Que vous soyez fan de stratégie ou à la recherche <br />
        d'un jeu divertissant en famille, notre site offre un large éventail
        <br /> de jeux adaptés à tous les âges.
        <br />
        <br />
        <NavLink
          to="/register"
          className="text-red-500 font-extrabold hover:text-orange-800"
        >
          Inscrivez vous{" "}
        </NavLink>
        et faites votre sélection dans notre catalogue de jeux.
      </p>
      <img src={logo} alt="logo" className="w-1/2 max-w-xs object-contain" />
    </div>
  );
}
