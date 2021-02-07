import React, { Component } from 'react';
import { debounce, isValidWordKey, wordCount, delay } from "../../utils/domUtils";
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
    searchInputValue: ""
  };

  is_mounted = false;

  constructor(props) {
    super(props);
    this.lyricsApi = new LyricsApi();
    this.defaultDebounceTimer = 500; // milliseconds
  }

  componentDidMount() {
    this.is_mounted = true;
  }

  componentWillUnmount() {
    this.is_mounted = false;
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
      this.lyricsApi.searchTracks(searchQuery)
        .then(results => {
          const data = results.data;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.setState({
              searchSuggestions: data,
              openSuggestionsDropdown: true,
              searchQuery: searchQuery,
              searchInputValue: searchQuery
            });
          }
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
