// import { useState, useEffect } from 'react';
import { v4 as uiidv4 } from 'uuid';
import { useSelector } from 'react-redux/es/exports';

import ArticleItem from '../articleItem/ArticleItem';

import './articleList.scss';

function ArticleList() {
  const articlesData = useSelector((state) => state.articleList.articlesData);

  const articleList = articlesData.map((article) => {
    return (
      <li>
        <ArticleItem key={uiidv4()} {...article} />
      </li>
    );
  });

  return <ul className="article-list">{articleList}</ul>;
}

export default ArticleList;
