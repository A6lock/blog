import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import { SingleArticlePage, MainPage } from '../pages';

import './app.scss';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Switch>
          <Route exact path="/articles/:slug">
            <SingleArticlePage />
          </Route>
          <Route path={['/', '/articles']}>
            <MainPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
