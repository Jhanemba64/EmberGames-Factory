import { NavLink } from "react-router-dom";
import cry from "../assets/cry.png";

export default function NotFoundPage() {
  return (
    <div className="text-center flex flex-col justify-center items-center h-screen ">
      <h1 className=" text-3xl font-bold m-8 text-white">
        Oups, tu n'es pas au bon endroit ...
      </h1>
      <img src={cry} alt={cry} className="w-36 md:w-48 lg:w-80" />
      <h1 className=" text-xl font-bold p-8 text-white ">
        Revenir à{" "}
        <NavLink
          to="/"
          className="text-red-500 font-extrabold hover:text-orange-800"
        >
          un lieu plus sur{" "}
        </NavLink>
      </h1>
    </div>
  );
}
