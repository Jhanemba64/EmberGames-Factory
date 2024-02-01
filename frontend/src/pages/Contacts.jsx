import React from "react";
import okok from "../assets/okok.png";

export default function Contacts() {
  return (
    <div className=" flex min-h-screen  text-white mt-3 m-12">
      <div className="container my-10">
        <h1 className="text-4xl font-bold text-center mb-20">Contactez-Nous</h1>

        <div className="grid md:grid-cols-2 gap-64">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Restons en contact</h2>
            <p className="mb-4">
              Si vous avez des questions ou si vous souhaitez démarrer un projet
              ensemble, n'hésitez pas à nous contacter. Nous serions ravis de
              discuter de la manière dont nous pouvons vous aider à réaliser vos
              ou pour tout simplement faire connaissance.
            </p>
            <ul>
              <li className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                pierrick.onchalo@gmail.com
              </li>
              <li className="mb-2">
                <span className="font-semibold">Téléphone:</span> +1 234 567 890
              </li>
              <li>
                <span className="font-semibold">Adresse:</span> 123 Rue
                Imaginaire, Royaume des trucs
              </li>
            </ul>
          </div>

          <div>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Nom"
                className="p-2 bg-gray-800 rounded-lg text-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 bg-gray-800 rounded-lg text-white"
              />
              <textarea
                placeholder="Votre message"
                className="p-2 bg-gray-800 rounded-lg text-white h-32"
              />
              <button
                type="submit"
                className="p-2 bg-red-700 rounded-lg hover:bg-red-900 transition-colors w-[100px]"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center ">
          <h3 className="text-xl font-semibold mb-4">
            Suivez-nous sur nos réseaux
          </h3>
          <img className="w-[200px]" src={okok} alt="ok" />
        </div>
      </div>
    </div>
  );
}
