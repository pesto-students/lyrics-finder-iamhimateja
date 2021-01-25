import '../styles/index.scss';
import { $class, randomItem, COLOR_SCHEMES } from "./utils/domUtils";
import ThemeSwitch from "./components/ThemeSwitch";
import SearchBar from "./components/SearchBar";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

window.addEventListener("load", function () {
  window.lightThemeClass = randomItem(COLOR_SCHEMES);

  //! DOM ELEMENTS DECLARATION
  const container = $class(".container");

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.add(window.lightThemeClass);
  }

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

  const themeSwitch = new ThemeSwitch();
  themeSwitch.appendTo(document.body);

  const searchBar = new SearchBar();
  searchBar.bindEvents();
});
