import { $id } from "../utils/domUtils";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";
export default class ThemeSwitch {
  constructor() {
    this.identifier = "themeSwitch";
  }

  template() {
    return `
      <div id="${this.identifier}">
        <span class="icon lightThemeIcon">
          ${SunIcon("#fff")}
        </span>
        <span class="icon darkThemeIcon">
          ${MoonIcon("#fff")}
        </span>
      </div>
    `;
  }

  appendTo(container) {
    const template = this.template();
    container.innerHTML += template;

    $id(this.identifier).addEventListener("click", function (event) {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add(window.lightThemeClass);
      } else {
        document.body.classList.remove(window.lightThemeClass);
        document.body.classList.add("dark-theme");
      }
    });
  }
}
