import { format } from 'date-fns';
import { v4 as uiidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import heart from './heart.svg';

import './articleItem.scss';

function ArticleItem({
  title,
  favoritesCount,
  description,
  createdAt,
  tagList,
  author,
  slug,
  singleArticleBody,
}) {
  const body = singleArticleBody ? (
    <ReactMarkdown>{singleArticleBody}</ReactMarkdown>
  ) : null;

  const articleItemClass = singleArticleBody ? 'article-item--body' : null;

  return (
    <div className={`article-item ${articleItemClass}`}>
      <article className="article-item__wrapper">
        <div className="article-item__columns">
          <div className="article-item__content">
            <header className="article-item__header">
              <Link to={`/articles/${slug}`}>{title}</Link>
              <button type="button">
                <img src={heart} alt="Like bottom" />
              </button>
              <span className="article-item__likes">{favoritesCount}</span>
            </header>
            <ul className="article-item__tags-list">
              {tagList.map((tag) => {
                // Придумать че-то когда нет тегов
                return (
                  <li className="article-item__tag-item" key={uiidv4()}>
                    {tag}
                  </li>
                );
              })}
            </ul>
            <p className="article-item__text">{description}</p>
          </div>
          <div className="article-item__info">
            <div className="article-item__tech-info">
              <h3 className="article-item__author">{author.username}</h3>
              <span className="article-item__date">
                {format(new Date(createdAt), 'MMMM dd, yyyy')}
              </span>
            </div>
            <img
              className="article-item__avatar"
              src={author.image}
              alt="Author avatar"
            />
          </div>
        </div>
        {body}
      </article>
    </div>
  );
}

export default ArticleItem;
