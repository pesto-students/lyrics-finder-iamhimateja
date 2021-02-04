const COLOR_SCHEMES = ["light-theme-dark-green", "light-theme-light-red", "light-theme-light-green", "light-theme-light-blue", "light-theme-light-green-2"];
const $id = element_id => {
  return document.getElementById(element_id);
};

const $class = (selector, scope = document) => {
  return scope.querySelector(selector);
};

const $classes = (selector, scope = document) => {
  return scope.querySelectorAll(selector);
};

const wordCount = (sentence) => {
  const sentenceAfterRemovingMultipleSpaces = sentence.replace(/\s\s+/g, ' ').split(' ');
  const validSentenceArray = sentenceAfterRemovingMultipleSpaces.filter(word => word.length >= 3);
  return validSentenceArray.length;
};

// Detecting the mobile device
// Reference: https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
const isMobileDevice = () => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

const isValidWordKey = (keyCode) => {
  const modifierKeys = [16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46, 8, 91, 93];
  if (modifierKeys.includes(keyCode)) {
    return false;
  }
  return true;
};

const debounce = function (fn, delay) {
  let timer;
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

const delay = async (seconds) => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, seconds)
  );
};

function formatTrackDuration(duration) {
  // ~~ => Shorthand for Math.floor
  // http://rocha.la/JavaScript-bitwise-operators-in-practice
  var hours = ~~(duration / 3600);
  var minutes = ~~((duration % 3600) / 60);
  var seconds = ~~duration % 60;

  var formattedDuration = "";
  if (hours > 0) {
    formattedDuration += "" + hours + ":" + (minutes < 10 ? "0" : "");
  }
  formattedDuration += "" + minutes + ":" + (seconds < 10 ? "0" : "");
  formattedDuration += "" + seconds;
  return formattedDuration;
}

function setInitialColorScheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.add(window.lightThemeClass);
  }
}

export {
  $id,
  $class,
  $classes,
  isMobileDevice,
  randomItem,
  wordCount,
  debounce,
  isValidWordKey,
  delay,
  formatTrackDuration,
  setInitialColorScheme,
  COLOR_SCHEMES
};
