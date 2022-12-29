/* eslint-disable no-nested-ternary */
import { format } from 'date-fns';
import { v4 as uiidv4 } from 'uuid';
import { Link, useHistory } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';

import RealWorldService from '../../services/RealWorldService';
import Error from '../error/Error';
import heartActive from '../../assets/images/likeActive.svg';
import defaultAvatar from '../../assets/images/defaultAvatar.svg';

import heart from './heart.svg';

import './articleItem.scss';

function ArticleItem({
  title,
  favoritesCount,
  favorited,
  description,
  createdAt,
  tagList,
  author,
  slug,
  singleArticleBody,
}) {
  const [error, setError] = useState(false);
  const [avatarIsError, setAvatarIsError] = useState(false);

  const realWorldService = new RealWorldService();

  const username = useSelector((state) => state.appSlice.username);
  const token = useSelector((state) => state.appSlice.token);

  const [likes, setLikes] = useState(favoritesCount);
  const [isLike, setIslike] = useState(favorited);

  const history = useHistory();

  const articleItemClass = singleArticleBody ? 'article-item--body' : null;

  const onDeleteArticle = () => {
    realWorldService
      .deleteArticle(slug, token)
      .then(() => {
        history.push('/articles');
      })
      .catch(() => setError(() => true));
  };

  const toggleLike = () => {
    if (!isLike) {
      setLikes(() => likes + 1);
      realWorldService.likeArticle(slug, token).then(() => {
        setIslike(() => true);
      });
    } else {
      setLikes(() => likes - 1);
      realWorldService.unLikeArticle(slug, token).then(() => {
        setIslike(() => false);
      });
    }
  };

  const isError = error ? <Error /> : null;

  const linkStyle = {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fonSize: '20px',
    lineHeight: '28px',
    color: '#1890ff',
  };

  const buttons =
    username === author.username && singleArticleBody ? (
      <div className="article-item__buttons">
        <Popconfirm
          title="Are you sure to delete this article?"
          okText="Yes"
          cancelText="No"
          placement="rightTop"
          onConfirm={onDeleteArticle}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
        <Link to={`/articles/${slug}/edit`}>
          <Button style={{ color: '#52C41A', borderColor: '#52C41A' }}>
            Edit
          </Button>
        </Link>
      </div>
    ) : null;

  const content = (
    <div className={`article-item ${articleItemClass}`}>
      <article className="article-item__wrapper">
        <div className="article-item__columns">
          <div className="article-item__content">
            <header className="article-item__header">
              <Link to={`/articles/${slug}`} style={linkStyle}>
                {title}
              </Link>
              <button
                className="article-item__button article-item__button--active"
                type="button"
                onClick={() => (token ? toggleLike() : () => {})}
              >
                <img src={isLike ? heartActive : heart} alt="Like bottom" />
              </button>
              <span className="article-item__likes">{likes}</span>
            </header>
            <ul className="article-item__tags-list">
              {tagList.map((tag) => {
                return (
                  <li className="article-item__tag-item" key={uiidv4()}>
                    {tag.length > 50 ? `${tag.slice(0, 50)}...` : tag}
                  </li>
                );
              })}
            </ul>
            <p className="article-item__text">{description}</p>
          </div>
          <div>
            <div className="article-item__info">
              <div className="article-item__tech-info">
                <h3 className="article-item__author">{author.username}</h3>
                <span className="article-item__date">
                  {format(new Date(createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>
              <img
                className="article-item__avatar"
                src={avatarIsError ? defaultAvatar : author.image}
                alt="Author avatar"
                onError={() => setAvatarIsError(() => true)}
              />
            </div>
            {buttons}
          </div>
        </div>
        {singleArticleBody ? (
          <ReactMarkdown>{singleArticleBody}</ReactMarkdown>
        ) : null}
      </article>
    </div>
  );

  const visibleContent = error ? isError : content;

  return visibleContent;
}

export default ArticleItem;
