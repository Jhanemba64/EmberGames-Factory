import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const baseLinks = [
    { id: 1, path: "/", link: "Accueil" },
    { id: 4, path: "/login", link: "Connexion" },
    { id: 5, path: "/register", link: "Inscription" },
  ];

  const userLinks = [
    { id: 2, path: "/products", link: "Produits" },
    { id: 6, path: "/favoris", link: "Favoris" },
    { id: 3, path: "/panier", link: "Panier" },
  ];

  const navLinks = user ? [...baseLinks, ...userLinks] : baseLinks;

  return (
    <nav className="bg-gray-800 p-7 text-white flex justify-between">
      <ul className="flex space-x-4">
        {navLinks.map(({ path, link }) => (
          <li key={path}>
            <NavLink
              className="hover:text-[#F5CCA0] hover:bg-gray-600 rounded-lg duration-200 hover:duration-200 px-2 hover:px-2"
              to={path}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
      {user && (
        <div>
          <NavLink
            className="hover:text-[#F5CCA0] hover:bg-gray-600 rounded-lg duration-200 hover:duration-200 px-2 hover:px-2"
            to="/contact"
          >
            Contact
          </NavLink>{" "}
          <button
            type="button"
            className="hover:text-[#F5CCA0] hover:bg-black rounded-lg duration-200 hover:duration-200 px-4 hover:px-3"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.isRequired,
  setUser: PropTypes.isRequired,
};
