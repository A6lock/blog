import avatar from './avatar.svg';

import './articleItem.scss';

function ArticleItem() {
  return (
    <li className="article-item">
      <article className="article-item__wrapper">
        <div className="article-item__columns">
          <div className="article-item__content">
            <header className="article-item__header">
              <h2>Some article title ♡</h2>
            </header>
            <div className="article-item__tags">Tag1</div>
            <div className="article-item__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
          <div className="article-item__info">
            <div className="article-item__tech-info">
              <h3 className="article-item__author">John Doe</h3>
              <span className="article-item__date">March 5, 2020</span>
            </div>
            <img
              className="article-item__avatar"
              src={avatar}
              alt="Author avatar"
            />
          </div>
        </div>
      </article>
    </li>
  );
}

export default ArticleItem;
