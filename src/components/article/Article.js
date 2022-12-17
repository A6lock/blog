import ArticleItem from '../articleItem/ArticleItem';

import './article.scss';

function Article({ articleData }) {
  const { body: singleArticleBody } = articleData;
  return (
    <div className="article__wrapper">
      <div className="article__content">
        <ArticleItem {...articleData} singleArticleBody={singleArticleBody} />
      </div>
    </div>
  );
}

export default Article;
