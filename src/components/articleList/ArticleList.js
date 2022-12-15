// import { useState, useEffect } from 'react';
import { v4 as uiidv4 } from 'uuid';

import ArticleItem from '../articleItem/ArticleItem';

import './articleList.scss';

function ArticleList({ articlesData }) {
  const articleList = articlesData.map((article) => {
    return <ArticleItem key={uiidv4()} {...article} />;
  });

  return <ul className="article-list">{articleList}</ul>;
}

export default ArticleList;
