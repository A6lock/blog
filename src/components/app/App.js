import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import {
  SingleArticlePage,
  MainPage,
  SignInPage,
  SignUpPage,
  EditProfilePage,
} from '../pages';

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
              <SignInPage />
            </Route>
            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>
            <Route>
              <EditProfilePage exact path="/profile" />
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
