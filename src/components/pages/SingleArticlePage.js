import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import RealWorldService from '../../services/RealWorldService';
import Article from '../article/Article';

function SingleArticlePage() {
  const realWorldService = new RealWorldService();

  const { slug } = useParams();

  const [articleData, setArticleData] = useState(null);
  const [articleLoading, setArticleLoading] = useState(false);
  const [articleError, setArticleError] = useState(false);

  const onArticleLoaded = (articleData) => {
    setArticleLoading(() => false);
    setArticleData(() => articleData.article);
  };

  const onarticleError = () => {
    setArticleError(() => true);
  };

  useEffect(() => {
    setArticleLoading(() => true);
    realWorldService
      .getArticle(slug)
      .then(onArticleLoaded)
      .catch(onarticleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = articleError ? <span>Error</span> : null;
  const spin = articleLoading ? <Spin size="large" /> : null;
  const content = !(articleError || articleLoading || !articleData) ? (
    <View article={articleData} />
  ) : null;

  return (
    <>
      {error}
      {spin}
      {content}
    </>
  );
}

function View({ article }) {
  return <Article articleData={article} />;
}

export default SingleArticlePage;
