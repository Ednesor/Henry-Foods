import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Startpage from './components/startpage/Startpage';
import Main from './components/main/Main';
import ErrorPage from './components/errorPage/ErrorPage';
import store from './redux/store/store';
import { Provider } from "react-redux";

function App() {
  const unsubscribe = store.subscribe(() => console.log(store.getState()))
  return (
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={"/"}>
          <Startpage />
        </Route>
        <Route path={"/home"}>
          <Main />
        </Route>
        <Route path={"*"}>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
