import React, { Component } from 'react';
import { debounce, isValidWordKey, wordCount, delay, getRandomNumber } from "../../utils/domUtils";
import LyricsApi from "../../utils/lyricsApi";
import styles from "./style.module.scss";
import SearchIcon from "../../icons/search-icon/searchIcon";
import Suggestions from "../Suggestions/component";
import SearchInput from '../SearchInput/component';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class MainSearch extends Component {
  state = {
    searchSuggestions: [],
    openSuggestionsDropdown: false,
    searchQuery: "",
    searchInputValue: "",
    loader: {
      isLoading: false,
      percentage: 0
    }
  };

  is_mounted = false;

  constructor(props) {
    super(props);
    this.lyricsApi = new LyricsApi();
    this.defaultDebounceTimer = 500; // milliseconds
    this.loaderInterval = undefined;
  }

  componentDidMount() {
    this.is_mounted = true;
    document.body.classList.remove("search-results");
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  showLoader = () => {
    this.hideLoader();
    let initialWidth = 0,
      maxWidth = 10;
    this.loaderInterval = setInterval(() => {
      if ((initialWidth <= 90 && maxWidth <= 90)) {
        initialWidth = getRandomNumber(initialWidth, maxWidth);
        this.updateSingleStateProperty("loader", {
          isLoading: true,
          percentage: initialWidth
        });
        maxWidth = maxWidth + 10;
      } else {
        clearInterval(this.loaderInterval);
      }
    }, 100);
  }

  hideLoader = () => {
    clearInterval(this.loaderInterval);
    delay(250).then(() => {
      this.updateSingleStateProperty("loader", {
        isLoading: false,
        percentage: 0
      });
    });
  }

  updateSingleStateProperty = (property, value) => {
    if (this.is_mounted) {
      let stateCopy = Object.assign({}, this.state);
      stateCopy[property] = value;
      this.setState(stateCopy);
    }
  }

  fetchTracksData = (searchQuery) => {
    if (wordCount(searchQuery) >= 1) {
      this.showLoader();
      this.lyricsApi.searchTracks(searchQuery)
        .then(results => {
          const data = results.data;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.setState({
              searchSuggestions: data,
              openSuggestionsDropdown: true,
              searchQuery: searchQuery,
              searchInputValue: searchQuery,
              loader: {
                isLoading: true,
                percentage: 100
              }
            });
          }
        })
        .then(() => {
          this.hideLoader();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  suggestionsFunction = (event) => {
    this.updateSingleStateProperty("searchInputValue", event.target.value);
    if (isValidWordKey(event.keyCode)) {
      this.fetchTracksData(event.target.value);
    }
  }

  showSuggestionsDropdown = (event) => {
    if (this.state.searchSuggestions.length > 0 && this.is_mounted) {
      this.updateSingleStateProperty("openSuggestionsDropdown", true);
    }
  }

  hideSuggestionsDropdown = (event) => {
    if (this.is_mounted) {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.openSuggestionsDropdown = false;

      // Note to myself & you
      // Reason for the delay to hide the dropdown
      // When we try to click on ShowAllResultsButton, it won't be triggered
      // it took me a lot of time to realise that as the input loses it's focus, the button will be hidden from viewport before we click it
      // It may seem that we've clicked it, but it is just an illusion. it is literally BRAINF**K

      delay(100).then(() => {
        if (this.is_mounted) {
          this.setState(stateCopy);
        }
      });
    }
  }

  render() {
    const {
      isLoading,
      percentage
    } = this.state.loader;
    return (
      <>
        <section className={styles.primarySearch}>
          <SearchInput
            onKeyUp={debounce(this.suggestionsFunction, this.defaultDebounceTimer)}
            onFocus={this.showSuggestionsDropdown}
            onBlur={this.hideSuggestionsDropdown}
          />
          <Link
            to={{
              pathname: "/lyrics",
              search: `?query=${this.state.searchInputValue}`,
              state: {
                searchQuery: this.state.searchInputValue
              }
            }}
            className={`${styles.icon} ${styles.primarySearchButton} ${(wordCount(this.state.searchInputValue) >= 1) ? "" : styles.disabled}`}
          >
            <SearchIcon container="homeSearchIcon" />
          </Link>
          <div className={`${styles.loaderWrap} ${isLoading ? styles.show : ""}`}>
            <div className={`${styles.loader} ${styles[`load-${percentage}-width`]}`}></div>
          </div>
        </section>
        <Suggestions
          suggestions={this.state.searchSuggestions}
          isOpen={this.state.openSuggestionsDropdown}
          searchQuery={this.state.searchQuery}
        />
      </>
    );
  }
}
