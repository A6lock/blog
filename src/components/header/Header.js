/* eslint-disable */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { clearData } from '../app/appSlice';

import './header.scss';

import avatar from '../../assets/images/defaultAvatar.svg';

function Header() {
  const username = useSelector((state) => state.appSlice.username);

  const dispatch = useDispatch();

  console.log(clearData);

  const clearUserData = () => {
    localStorage.clear() && dispatch(clearData());
  };

  const signIn = (
    <Link to="/sign-in" className="authorization__link">
      Sign In
    </Link>
  );

  const user = <User name={username} img={avatar} />;

  const signUp = (
    <Link
      to="/sign-up"
      className="authorization__link authorization__link--active"
    >
      Sign Up
    </Link>
  );

  const createArticle = (
    <Link
      to="/"
      className="authorization__link authorization__link--active"
      style={{ height: '31px', display: 'flex', alignItems: 'center' }}
    >
      Create article
    </Link>
  );

  const logOut = (
    <Link
      to="/"
      className="authorization__link authorization__link--active"
      onClick={() => clearUserData()}
      style={{ color: 'black', border: '1px solid black' }}
    >
      Log out
    </Link>
  );

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/articles" className="header__link">
            Realworld Blog
          </Link>
        </div>
        <div className="header__authorization authorization">
          {username ? createArticle : signIn}
          {username && user}
          {username ? logOut : signUp}
        </div>
      </div>
    </header>
  );
}

function User({ name, img }) {
  return (
    <Link className="user" to="/profile">
      <p className="user__name">{name}</p>
      <img className="user__avatr" src={img} alt="avatar" />
    </Link>
  );
}

export default Header;
