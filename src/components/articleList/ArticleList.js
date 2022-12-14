import { useState, useEffect } from 'react';
import { v4 as uiidv4 } from 'uuid';

import RealWorldService from '../../services/RealWorldService';
import ArticleItem from '../articleItem/ArticleItem';

import './articleList.scss';

function ArticleList() {
  const realWorldService = new RealWorldService();

  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    realWorldService.getArticles().then((res) => setArticlesData(res.articles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const articleList = articlesData.map((article) => {
    return <ArticleItem key={uiidv4()} {...article} />;
  });

  return <ul className="article-list">{articleList}</ul>;
}

export default ArticleList;
