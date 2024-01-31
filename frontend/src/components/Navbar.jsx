import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  const baseLinks = [
    { id: 1, path: "/", link: "Accueil" },
    { id: 4, path: "/login", link: "Connexion" },
    { id: 5, path: "/register", link: "Inscription" },
  ];

  const userLinks = [
    { id: 2, path: "/products", link: "Produits" },
    { id: 3, path: "/panier", link: "Panier" },
  ];

  const navLinks = user ? [...baseLinks, ...userLinks] : baseLinks;

  return (
    <nav className="bg-gray-800 p-7 text-white">
      <ul className="flex space-x-4">
        {navLinks.map(({ path, link }) => (
          <li key={path}>
            <NavLink className="hover:text-black" to={path}>
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.isRequired,
};
