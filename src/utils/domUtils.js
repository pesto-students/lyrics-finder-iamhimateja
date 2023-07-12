export const COLOR_SCHEMES = ["light-theme-dark-green", "light-theme-light-red", "light-theme-light-green", "light-theme-light-blue", "light-theme-light-green-2"];

export const $id = element_id => {
  return document.getElementById(element_id);
};

export const $class = (selector, scope = document) => {
  return scope.querySelector(selector);
};

export const $classes = (selector, scope = document) => {
  return scope.querySelectorAll(selector);
};

export const wordCount = (sentence) => {
  const sentenceAfterRemovingMultipleSpaces = sentence.replace(/\s\s+/g, ' ').split(' ');
  const validSentenceArray = sentenceAfterRemovingMultipleSpaces.filter(word => word.length >= 3);
  return validSentenceArray.length;
};

// Detecting the mobile device
// Reference: https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
export const isMobileDevice = () => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

export const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const isValidWordKey = (keyCode) => {
  const modifierKeys = [8, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46, 91, 93];
  if (modifierKeys.includes(keyCode)) {
    return false;
  }
  return true;
};

export const debounce = function (fn, delay) {
  let timer;
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export const delay = async (seconds) => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, seconds)
  );
};

export function formatTrackDuration(duration) {
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

export function setInitialColorScheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.add(window.lightThemeClass);
  }
}

export const getDescriptorData = (object, key) => Object.getOwnPropertyDescriptor(object, key);
export const isObject = input => (typeof input) === 'object';

export const deepClone = objToCopy => {
  if (typeof objToCopy === 'undefined') {
    throw new TypeError(`expected object, got ${typeof objToCopy}, For Example. {a: 1, b: 2}`);
  }
  if (isObject(objToCopy) && (objToCopy !== null)) {
    const deepCopiedObject = {};
    for (const [key] of Object.entries(objToCopy)) {
      if (isObject(objToCopy[key])) {
        deepCopiedObject[key] = deepClone(objToCopy[key]);
      } else {
        Object.defineProperty(deepCopiedObject, key, getDescriptorData(objToCopy, key));
      }
    }
    return deepCopiedObject;
  } else {
    return objToCopy;
  }
};

export const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
