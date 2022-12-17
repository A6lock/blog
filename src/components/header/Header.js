/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          {/* Не рендерится только в артикл */}
          <Link to="/articles" className="header__link">
            Realworld Blog
          </Link>
        </div>
        <div className="header__authorization authorization">
          <NavLink exact to="/" className="authorization__link">
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/"
            className="authorization__link authorization__link--active"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
