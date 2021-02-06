import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/App/App';
import SearchResultsPage from "./components/SearchResultsPage/component";
import { $id, setInitialColorScheme, randomItem, COLOR_SCHEMES } from "./utils/domUtils";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={App}></Route>
        <Route path="/search" exact component={SearchResultsPage}></Route>
        <Route path="/lyrics" exact component={SearchResultsPage}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  $id('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
