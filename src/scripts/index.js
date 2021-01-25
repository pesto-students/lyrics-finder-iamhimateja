import '../styles/index.scss';
import { isMobileDevice } from "./helpers/helpers";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

window.addEventListener("load", function () {
  console.log("hello");
});
