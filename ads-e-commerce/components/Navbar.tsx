import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./Navbar.css";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <div className="navbar-left">
        <Link
          href="/"
          className="uppercase font-bold text-md h-12 flex items-center"
        >
          ADS STORE
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/products">Produtos</a>
          </li>
          <li>
            <a href="/categories">Categorias</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/cart" className="cart-icon">
          <span className="cart-count">0</span>
          <FontAwesomeIcon icon={faShoppingCart} size="2x" color="white" />
        </a>
        <a href="/usuario" className="user-icon" color="white">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </a>
      </div>
    </nav>
  );
}

// <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
//   <div className="navbar-left">
//     <a href="/" className="logo">
//       ADS STORE
//     </a>
//   </div>
//   <div className="navbar-center">
//
//   </div>
//   <div className="navbar-right">
//
//   </div>
// </nav>
