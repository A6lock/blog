// import { useState, useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { v4 as uiidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';

import { changePage, fetchArticlesData } from '../main/mainSlice';
import ArticleItem from '../articleItem/ArticleItem';

import './articleList.scss';

function ArticleList() {
  const articlesData = useSelector((state) => state.articleList.articlesData);
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

  const articleList = articlesData.map((article) => {
    return (
      <li>
        <ArticleItem key={uiidv4()} {...article} />
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
