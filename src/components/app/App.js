import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import Header from '../header/Header';
import {
  SingleArticlePage,
  MainPage,
  FormPage,
  CreateArticlePage,
} from '../pages';

import './app.scss';

function App() {
  const token = useSelector((state) => state.appSlice.token);

  return (
    <Router>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Switch>
            <Route path="/articles/:slug">
              <SingleArticlePage />
            </Route>
            <Route path="/sign-in">
              {token ? <Redirect to="/" /> : <FormPage signIn />}
            </Route>
            <Route path="/sign-up">
              {token ? <Redirect to="/" /> : <FormPage signUp />}
            </Route>
            <Route path="/profile">
              {!token ? <Redirect to="/" /> : <FormPage edit />}
            </Route>
            <Route path="/new-article">
              <CreateArticlePage />
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
