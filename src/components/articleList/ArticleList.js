// import { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { v4 as uiidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';

import ArticleItem from '../articleItem/ArticleItem';

import { changePage, fetchArticlesData } from './articleListSlice';

import './articleList.scss';

function ArticleList() {
  const token = useSelector((state) => state.appSlice.token);
  const articlesData = useSelector((state) => state.articleList.articlesData);
  const page = useSelector((state) => state.articleList.page);
  const articlesCount = useSelector((state) => state.articleList.articlesCount);
  const loadingStatus = useSelector((state) => state.articleList.loadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticlesData(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, token]);

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

  const articleList = articlesData.map((article) => {
    return (
      <li key={uiidv4()}>
        <ArticleItem {...article} />
      </li>
    );
  });

  const getLoadingStatus = (loadingStatus) => {
    switch (loadingStatus) {
      case 'loading':
        return spin;
      case 'error':
        return error;
      default:
        return <ul className="article-list">{articleList}</ul>;
    }
  };

  const visibleData = getLoadingStatus(loadingStatus);

  return (
    <>
      {visibleData}
      {pagination}
    </>
  );
}

export default ArticleList;
