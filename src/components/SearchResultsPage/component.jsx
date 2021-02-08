import React, { Component } from 'react';
import styles from "./style.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { wordCount, getRandomNumber } from '../../utils/domUtils';
import Navigation from '../Navigation/component';
import ThemeSwitch from "../ThemeSwitch/component";
import SearchResult from "../SearchResult/component";
import LyricsApi from '../../utils/lyricsApi';
import Lyrics from '../Lyrics/component';

export default class SearchResultsPage extends Component {
  is_mounted = false;

  constructor(props) {
    super(props);
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let tempState = {};

    if (searchParams.has("query"))
      tempState.searchQuery = searchParams.get("query");

    if (searchParams.has("selected-item")) {
      tempState.selectedItem = searchParams.get("selected-item");
    }

    tempState.searchSuggestions = [];
    tempState.isLyricsOpen = false;
    tempState.currentLyrics = "";
    tempState.searchInputValue = "";
    tempState.nextPage = "";
    tempState.prevPage = "";
    tempState.totalResults = "";

    tempState.loader = {
      isLoading: false,
      percentage: 0
    };

    this.state = tempState;
    this.lyricsApi = new LyricsApi();
    this.loaderInterval = undefined;
  }

  componentDidMount() {
    this.is_mounted = true;
    document.body.classList.add('search-results');
    if (this.state.searchQuery) {
      this.showLoader();
      this.lyricsApi.searchTracks(this.state.searchQuery)
        .then(results => {
          const { data, next, prev, total } = results;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.updateMultipleStateProperties({
              searchSuggestions: data,
              nextPage: next,
              prevPage: prev,
              totalResults: total,
              loader: {
                isLoading: true,
                percentage: 100
              }
            });
          }
        })
        .then(() => {
          this.hideLoader();
          if (this.state.selectedItem) {
            this.fetchLyrics(this.state.selectedItem);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
    this.updateSingleStateProperty("loader", {
      isLoading: false,
      percentage: 0
    });
  }

  updateSingleStateProperty = (property, value) => {
    if (this.is_mounted) {
      let stateCopy = Object.assign({}, this.state);
      stateCopy[property] = value;
      this.setState(stateCopy);
    }
  }

  updateMultipleStateProperties = (propertyList) => {
    if (this.is_mounted) {
      let stateCopy = Object.assign({}, this.state);
      for (let [property, value] of Object.entries(propertyList)) {
        stateCopy[property] = value;
      }
      this.setState(stateCopy);
    }
  }

  updateHistoryState = () => {
    this.props.history.push({
      search: "?" + new URLSearchParams({ query: this.state.searchQuery, "selected-item": this.state.selectedItem }).toString()
    });
  }

  removeParamFromSearchHistory = (param) => {
    let historyParams = new URLSearchParams(this.props.location.search);
    historyParams.delete(param);
    this.props.history.push({
      search: "?" + historyParams.toString()
    });
  }

  getTrackDetails = id => {
    const results = this.state.searchSuggestions.filter(result => result.id == id);
    return (results.length == 1) ? results[0] : false;
  }

  updateSearchQuery = event => {
    this.updateSingleStateProperty("searchInputValue", event.currentTarget.value);
    if (event.key == "Enter") {
      this.performSearch();
    }
  }

  updateSelectedTrack = (trackIdentifier) => {
    this.updateSingleStateProperty("selectedItem", trackIdentifier);
    this.updateHistoryState();
  }

  performSearch = () => {
    if (wordCount(this.state.searchInputValue) >= 1) {
      this.showLoader();
      this.lyricsApi.searchTracks(this.state.searchInputValue)
        .then(results => {
          const { data, next, prev, total } = results;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.updateMultipleStateProperties({
              searchSuggestions: data,
              searchQuery: this.state.searchInputValue,
              isLyricsOpen: false,
              currentLyrics: "",
              selectedItem: "",
              nextPage: next,
              prevPage: prev,
              totalResults: total,
              loader: {
                isLoading: true,
                percentage: 100
              }
            });
            this.updateHistoryState();
          }
        }).then(() => {
          this.hideLoader();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  fetchLyrics = (id) => {
    const currentTrack = this.getTrackDetails(id);
    if (currentTrack) {
      const {
        id: identifier,
        title: trackTitle,
        artist,
        ...data
      } = currentTrack;

      const artistName = artist.name;
      this.showLoader();
      this.lyricsApi.fetchLyrics(artistName, trackTitle)
        .then(results => {
          const { lyrics } = results;
          this.updateMultipleStateProperties({
            currentTrack: currentTrack,
            currentLyrics: lyrics,
            isLyricsOpen: true
          });
          this.updateSelectedTrack(identifier);
        }).then(() => {
          this.hideLoader();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleSearchResultClick = event => {
    const identifier = event.currentTarget.id;
    this.fetchLyrics(identifier);
  }

  handleCloseLyrics = () => {
    this.updateMultipleStateProperties({
      isLyricsOpen: false,
      currentLyrics: "",
      selectedItem: ""
    });
    this.removeParamFromSearchHistory("selected-item");
  }

  fetchPreviousPage = (event) => {
    this.paginateSearchResults(this.state.prevPage);
  }

  fetchNextPage = (event) => {
    this.paginateSearchResults(this.state.nextPage);
  }

  paginateSearchResults = async (pageURL) => {
    this.showLoader();
    return await fetch(`https://cors-anywhere.herokuapp.com/${pageURL}`, {
      method: "GET",
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(response => response.json())
      .then(results => {
        const { data, next, prev, total } = results;
        if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
          this.updateMultipleStateProperties({
            searchSuggestions: data,
            searchQuery: this.state.searchInputValue || this.state.searchQuery,
            isLyricsOpen: false,
            currentLyrics: "",
            selectedItem: "",
            nextPage: next,
            prevPage: prev,
            totalResults: total
          });
          this.updateHistoryState();
        }
      })
      .then(() => {
        this.hideLoader();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.searchSuggestions.length == 0) {
      return (
        <>
          <Navigation
            searchQuery={this.state.searchQuery}
            updateSearchQuery={this.updateSearchQuery}
            onClick={this.performSearch}
            loader={this.state.loader}
          />
          <div className={styles.defaultDiv}>
            <div className={styles.info}>
              <span className={styles.emoticon}>☝️</span>
              You can search tracks from search bar.
            </div>
          </div>
          <ThemeSwitch />
        </>
      );
    } else {
      return (
        <>
          <Navigation
            searchQuery={this.state.searchQuery}
            updateSearchQuery={this.updateSearchQuery}
            onClick={this.performSearch}
            loader={this.state.loader}
          />
          <div className={`${styles.container} ${this.state.isLyricsOpen ? styles.lyricsOpen : ""}`}>
            <div className={`${styles.resultsContainer} ${(this.state.searchSuggestions.length == 0) ? styles.hideResults : ""}`}>
              <div className={styles.results}>
                <div className={styles.resultsHeader}>
                  Search Results
                </div>
                <div className={styles.resultsOverflow}>
                  {this.state.searchSuggestions.map(suggestion => <SearchResult key={suggestion.id} data={suggestion} searchQuery={this.state.searchQuery} isSelected={this.state.selectedItem == suggestion.id} onClick={this.handleSearchResultClick} />)}
                </div>
                <div className={styles.pagination}>
                  <button disabled={this.state.loader.isLoading} className={`${styles.previous} ${this.state.prevPage ? "" : styles.disable}`} onClick={this.fetchPreviousPage}>Previous</button>
                  <button disabled={this.state.loader.isLoading} className={`${styles.next} ${this.state.nextPage ? "" : styles.disable}`} onClick={this.fetchNextPage}>Next</button>
                </div>
              </div>
              <Lyrics
                currentTrack={this.state.currentTrack}
                currentLyrics={this.state.currentLyrics}
                isLyricsOpen={this.state.isLyricsOpen}
                closeLyrics={this.handleCloseLyrics}
              />
            </div>
          </div>
          <ThemeSwitch />
        </>
      );
    }
  }
}
