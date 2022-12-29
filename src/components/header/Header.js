/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useState } from 'react';

import './header.scss';

import { clearData } from '../app/appSlice';
import avatar from '../../assets/images/defaultAvatar.svg';

function Header() {
  const username = useSelector((state) => state.appSlice.username);
  const image = useSelector((state) => state.appSlice.image);
  const history = useHistory();

  const [avatarIsError, setAvatarIsError] = useState(false);

  const dispatch = useDispatch();

  const clearUserData = () => {
    dispatch(clearData()) && localStorage.clear();
    history.push('/articles');
  };

  const signIn = (
    <Link to="/sign-in" className="authorization__link">
      Sign In
    </Link>
  );

  const user = (
    <User
      name={username}
      image={avatarIsError ? image : avatar}
      setAvatarIsError={setAvatarIsError}
    />
  );

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
      to="/new-article"
      className="authorization__link authorization__link--active"
      style={{ height: '31px', display: 'flex', alignItems: 'center' }}
    >
      Create article
    </Link>
  );

  const logOut = (
    <button
      className="authorization__link authorization__link--active"
      onClick={() => clearUserData()}
      style={{
        color: 'black',
        border: '1px solid black',
        background: 'inherit',
        cursor: 'pointer',
      }}
    >
      Log out
    </button>
  );

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link tabIndex={1} to="/articles">
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

function User({ name, image, setAvatarIsError }) {
  return (
    <Link className="user" to="/profile">
      <p className="user__name">{name}</p>
      <img
        className="user__avatar"
        src={image}
        alt="avatar"
        onError={() => setAvatarIsError(() => true)}
      />
    </Link>
  );
}

export default Header;
