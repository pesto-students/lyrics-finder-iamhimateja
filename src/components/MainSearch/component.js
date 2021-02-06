import React, { Component } from 'react';
import { debounce, isValidWordKey, wordCount, delay } from "../../utils/domUtils";
import LyricsApi from "../../utils/lyricsApi";
import styles from "./style.module.scss";
import SearchIcon from "../../icons/search-icon/searchIcon";
import Suggestions from "../Suggestions/component";
import SearchInput from '../SearchInput/component';

export default class MainSearch extends Component {
  state = {
    searchSuggestions: [],
    openSuggestionsDropdown: false,
    searchQuery: ""
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

  suggestionsFunction = (event) => {
    if (isValidWordKey(event.keyCode) && wordCount(event.target.value) >= 1) {
      this.lyricsApi.searchTracks(event.target.value)
        .then(results => {
          const data = results.data;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.setState({
              searchSuggestions: data,
              openSuggestionsDropdown: true,
              searchQuery: event.target.value
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  showSuggestionsDropdown = (event) => {
    if (this.state.searchSuggestions.length > 0 && this.is_mounted) {
      let stateCopy = Object.assign({}, this.state);
      stateCopy.openSuggestionsDropdown = true;
      this.setState(stateCopy);
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
          <span className={`${styles.icon} ${styles.primarySearchButton}`}>
            <SearchIcon />
          </span>
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
