import { $id, $class, wordCount, isValidWordKey, debounce, $classes, delay } from "../utils/domUtils";
import LyricsApi from "../utils/lyricsApi";
import Suggestion from "./Suggestion";
export default class SearchBar {
  constructor() {
    this.primarySearchContainer = $class(".container");
    this.primarySearchInput = $class(".primary-search-input");
    this.primarySearchButton = $class(".primary-search-button");

    this.primarySuggestionsContainer = $class(".homeScreenSuggestions");

    this.searchContainer = $class('.search-container');
    this.searchHeader = $class(".header", this.searchContainer);
    this.searchInput = $class(".search-input");
    this.searchButton = $class(".search-button");

    this.themeSwitch = $id("themeSwitch");
    this.lyricsApi = new LyricsApi();
    this.defaultDebounceDelay = 1000;
  }

  async hidePrimarySearch() {
    $classes(".logo, .title, .primary-search", this.primarySearchContainer).forEach(element => element.classList.add("hide"));
    await delay(1000).then(() => {
      this.primarySearchContainer.classList.add("hide");
    });

    await delay(200).then(() => {
      this.showMainSearch();
      $classes(".icon", this.themeSwitch).forEach(icon => icon.classList.add("dark-blue"));
    });
  }

  async showMainSearch() {
    this.searchContainer.classList.add("show");
    await delay(20).then(() => {
      this.searchHeader.classList.add("show");
    });
  }

  bindEvents() {
    const primarySearchFunction = (event) => {
      if (isValidWordKey(event.keyCode) && wordCount(this.searchInput.value) >= 1) {
        this.lyricsApi.searchTracks(this.searchInput.value)
          .then(results => {
            console.log(results);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const suggestionsFunction = (event) => {
      this.searchInput.value = this.primarySearchInput.value;
      if (isValidWordKey(event.keyCode) && wordCount(this.primarySearchInput.value) >= 1) {
        this.lyricsApi.searchTracks(this.primarySearchInput.value)
          .then(results => {
            const data = results.data;
            if (Array.isArray(data) && data.length > 0) {
              this.primarySuggestionsContainer.innerHTML = "";
              for (const result of data) {
                let suggestion = new Suggestion(result);
                suggestion.appendTo(this.primarySuggestionsContainer);
              }
              this.primarySuggestionsContainer.innerHTML += `<div class="show-all-results-button" onClick="console.log("hello");">Show all results</div>`;
              this.showAllResultsButton = $class(".show-all-results-button", this.primarySuggestionsContainer);
              this.primarySuggestionsContainer.classList.add("open");
              this.showAllResultsButton.classList.add("show");
              // this.showAllResultsButton.addEventListener("click", event => {
              //   console.log("hello");
              // });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    const debounceSuggestFunction = debounce(suggestionsFunction, this.defaultDebounceDelay);
    const debounceSearchFunction = debounce(primarySearchFunction, this.defaultDebounceDelay);
    this.primarySearchInput.addEventListener("keyup", debounceSuggestFunction);
    this.searchInput.addEventListener("keyup", debounceSearchFunction);

    this.primarySearchInput.addEventListener('focusout', (event) => {
      if (this.primarySuggestionsContainer.childElementCount > 0) {
        if (this.primarySuggestionsContainer.classList.contains('open')) {
          this.primarySuggestionsContainer.classList.remove('open');
          if (this.showAllResultsButton) this.showAllResultsButton.classList.remove("show");
        }
      }
    });

    this.primarySearchInput.addEventListener('focusin', (event) => {
      if ($classes(".suggestion", this.primarySuggestionsContainer).length > 0) {
        this.primarySuggestionsContainer.classList.add('open');
        if (this.showAllResultsButton) this.showAllResultsButton.classList.add("show");
      } else {
        if (this.showAllResultsButton) this.showAllResultsButton.classList.remove("show");
      }
    });

    this.primarySearchButton.addEventListener("click", (event) => {
      // this.hidePrimarySearch();
      this.lyricsApi.searchTracks(this.primarySearchInput.value).then(data => console.log(data));
    });
  }
}
