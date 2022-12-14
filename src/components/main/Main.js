import { Pagination } from 'antd';

import ArticleList from '../articleList/ArticleList';
// import Article from '../article/Article';

import './main.scss';

function Main() {
  return (
    <div className="main">
      <ArticleList />
      {/* <Article /> */}
      <Pagination className="main__pagination" defaultCurrent={1} total={50} />
    </div>
  );
}

export default Main;
