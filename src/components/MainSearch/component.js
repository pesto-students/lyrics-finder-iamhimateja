import React from "react";
import { debounce, isValidWordKey, wordCount } from "../../utils/domUtils";
import LyricsApi from "../../utils/lyricsApi";
import styles from "./style.module.scss";
import SearchIcon from "../../icons/search-icon/searchIcon";
import Suggestion from "../Suggestions/component";

export default class MainSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.lyricsApi = new LyricsApi();
    this.defaultDebounceDelay = 1000;
    this.suggestionsFunction = this.suggestionsFunction.bind(this);
  }

  suggestionsFunction(event) {
    if (isValidWordKey(event.keyCode) && wordCount(event.target.value) >= 1) {
      this.lyricsApi.searchTracks(event.target.value)
        .then(results => {
          const data = results.data;
          if (Array.isArray(data) && data.length > 0) {
            console.log(data);
            // this.primarySuggestionsContainer.innerHTML = "";
            // for (const result of data) {
            // let suggestion = new Suggestion(result);
            // suggestion.appendTo(this.primarySuggestionsContainer);
            // }
            // this.primarySuggestionsContainer.innerHTML += `<div class="show-all-results-button" onClick="console.log("hello");">Show all results</div>`;
            // this.showAllResultsButton = $class(".show-all-results-button", this.primarySuggestionsContainer);
            // this.primarySuggestionsContainer.classList.add("open");
            // this.showAllResultsButton.classList.add("show");
            // this.showAllResultsButton.addEventListener("click", event => {
            //   console.log("hello");
            // });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <>
        <section className={styles.primarySearch}>
          <input type="text" className={styles.primarySearchInput} placeholder="Search lyrics by artist or song name" onKeyUp={debounce(this.suggestionsFunction, this.defaultDebounceDelay)} />
          <span className={`${styles.icon} ${styles.primarySearchButton}`}>
            <SearchIcon />
          </span>
        </section>
        <Suggestion />
      </>
    );
  }
}
