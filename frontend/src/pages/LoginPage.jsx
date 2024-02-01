/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import parchemin from "../assets/parch.png";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth`, data)
      .then((res) => setUser(res.data));
    navigate("/products");
  };
  return (
    <div
      className="flex items-center justify-center h-screen mb-4 max-h-[value] "
      style={{
        backgroundImage: `url(${parchemin})`,
        backgroundSize: "24%",
        backgroundOpacity: 0.5,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-2 mb-8 ">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Se connecter</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-2 rounded border opacity-70 border-gray-300"
            {...register("email")}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="p-2 rounded border opacity-70 border-gray-300"
            {...register("password")}
          />
          <button
            type="submit"
            className="bg-gray-500 opacity-70 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}
