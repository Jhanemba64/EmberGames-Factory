/* eslint-disable  */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sleep from "../assets/sleep.png";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // register pour enregistrer les inputs,
  // handleSubmit pour gérer la soumission du formulaire,
  // watch pour observer les valeurs des champs du formulaire,
  // errors pour gérer les erreurs de validation du formulaire.

  const navigate = useNavigate();

  // useNavigate pour naviguer entre les pages

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-40 h-screen">
      <img src={sleep} alt="logo" className="w-1/2 max-w-xs object-contain" />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Création de compte
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-2 rounded border border-gray-300"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className="text-red-600">Email invalide.</p>}

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="p-2 rounded border border-gray-300"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="text-red-600">Mot de passe invalide ou trop court.</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmez le mot de passe"
            className="p-2 rounded border border-gray-300"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-red-600">Veuillez confirmer le mot de passe.</p>
          )}

          <button
            type="submit"
            className="bg-gray-500 opacity-50 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Valider
          </button>
        </form>
        <div>
          <p>
            <br />
            <br />
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}
