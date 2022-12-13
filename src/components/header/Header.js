/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.scss';

function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="#" className="header__link">
            Realworld Blog
          </a>
        </div>
        <div className="header__authorization authorization">
          <a href="#" className="authorization__link">
            Sign In
          </a>
          <a
            href="#"
            className="authorization__link authorization__link--active"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
