/* eslint-disable react/destructuring-assignment */
// должен быть HOC

import './main.scss';

function Main(props) {
  return props.children;
}

export default Main;

// Всю логику перенести в артикал лист. Мейн будет тупо родителем-оберткой, обрабатывающий ошибки,
// показывающий спин и тд.
