import ArticleItem from '../articleItem/ArticleItem';

import './articleList.scss';

function ArticleList() {
  return (
    <ul className="article-list">
      <ArticleItem key={Math.trunc(Math.random() * new Date().getTime())} />
      <ArticleItem key={Math.trunc(Math.random() * new Date().getTime())} />
      <ArticleItem key={Math.trunc(Math.random() * new Date().getTime())} />
      <ArticleItem key={Math.trunc(Math.random() * new Date().getTime())} />
      <ArticleItem key={Math.trunc(Math.random() * new Date().getTime())} />
    </ul>
  );
}

export default ArticleList;
