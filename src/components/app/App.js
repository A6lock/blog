import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import { SingleArticlePage, MainPage, FormPage } from '../pages';

import './app.scss';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Switch>
            <Route exact path="/articles/:slug">
              <SingleArticlePage />
            </Route>
            <Route exact path="/sign-in">
              <FormPage signIn />
            </Route>
            <Route exact path="/sign-up">
              <FormPage signUp />
            </Route>
            <Route exact path="/profile">
              <FormPage edit />
            </Route>
            <Route path={['/', '/articles']}>
              <MainPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
