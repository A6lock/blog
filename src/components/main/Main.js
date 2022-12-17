/* eslint-disable react/destructuring-assignment */
import { Pagination, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ArticleList from '../articleList/ArticleList';

import { changePage, fetchArticlesData } from './mainSlice';

import './main.scss';

function Main(props) {
  const page = useSelector((state) => state.main.page);
  const articlesCount = useSelector((state) => state.main.articlesCount);
  const loadingStatus = useSelector((state) => state.main.loadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticlesData(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const pagination = articlesCount ? (
    <Pagination
      className="main__pagination"
      defaultCurrent={page}
      total={articlesCount}
      onChange={(page) => dispatch(changePage(page))}
    />
  ) : null;

  const spin = <Spin size="large" style={{ marginTop: '20%' }} />;

  const error = <h2>Ашибка</h2>;

  const getLoadingStatus = (loadingStatus) => {
    switch (loadingStatus) {
      case 'loading':
        return spin;
      case 'error':
        return error;
      default:
        return <ArticleList />;
    }
  };

  const visibleData = getLoadingStatus(loadingStatus);

  return (
    <div className="main">
      {visibleData}
      {pagination}
      {props.children}
    </div>
  );
}

export default Main;
