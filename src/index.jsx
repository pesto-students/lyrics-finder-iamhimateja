import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { $id, setInitialColorScheme, randomItem, COLOR_SCHEMES } from "./utils/domUtils";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
document.body.classList.remove("search-results");
window.lightThemeClass = randomItem(COLOR_SCHEMES);
setInitialColorScheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const changedColorScheme = e.matches ? "dark" : "light";
  if (changedColorScheme == "dark") {
    document.body.classList.remove(window.lightThemeClass);
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add(window.lightThemeClass);
  }
});

const App = lazy(() => import('./components/App/App'));
const SearchResultsPage = lazy(() => import('./components/SearchResultsPage/component'));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={App}></Route>
          <Route path="/lyrics" exact component={SearchResultsPage}></Route>
          <Route component={() => <h2>404: Page not Found</h2>}></Route>
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>,
  $id('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
