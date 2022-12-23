/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

import avatar from '../../assets/images/defaultAvatar.svg';

const signIn = (
  <NavLink exact to="/sign-in" className="authorization__link">
    Sign In
  </NavLink>
);

const user = <User data="John Doe" img={avatar} />;

const signUp = (
  <NavLink
    exact
    to="/sign-up"
    className="authorization__link authorization__link--active"
  >
    Sign Up
  </NavLink>
);

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
          {signIn}
          {user}
          {signUp}
        </div>
      </div>
    </header>
  );
}

function User({ data, img }) {
  return (
    <Link className="user" to="/profile">
      <p className="user__name">{data}</p>
      <img className="user__avatr" src={img} alt="" />
    </Link>
  );
}

export default Header;
