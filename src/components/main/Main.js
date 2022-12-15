import { Pagination } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import Article from '../article/Article';

import ArticleList from '../articleList/ArticleList';
import RealWorldService from '../../services/RealWorldService';

import { changePage, getArtList } from './mainSlice';

import './main.scss';

function Main() {
  const realWorldService = new RealWorldService();

  const articlesData = useSelector((state) => state.main.articlesData);
  const page = useSelector((state) => state.main.page);
  const articlesCount = useSelector((state) => state.main.articlesCount);

  const dispatch = useDispatch();

  useEffect(() => {
    realWorldService.getArticles(page).then((res) => dispatch(getArtList(res)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const pagination = articlesData.length ? (
    <Pagination
      className="main__pagination"
      defaultCurrent={page}
      total={articlesCount}
      onChange={(page) => dispatch(changePage(page))}
    />
  ) : null;

  return (
    <div className="main">
      <ArticleList articlesData={articlesData} />
      {/* <Article /> */}
      {pagination}
    </div>
  );
}

export default Main;
