import React, { Component } from 'react';
import styles from "./style.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { wordCount } from '../../utils/domUtils';
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
    this.state = tempState;
    this.lyricsApi = new LyricsApi();
  }

  componentDidMount() {
    this.is_mounted = true;
    if (this.state.searchQuery) {
      this.lyricsApi.searchTracks(this.state.searchQuery)
        .then(results => {
          const { data, next, prev, total } = results;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.updateMultipleStateProperties({
              searchSuggestions: data,
              nextPage: next,
              prevPage: prev,
              totalResults: total
            });
          }
        })
        .then(() => {
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

  componentDidUpdate() { }

  updateSearchQuery = event => {
    this.updateSingleStateProperty("searchInputValue", event.currentTarget.value);
  }

  performSearch = event => {
    if (wordCount(this.state.searchInputValue) >= 1) {
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
              totalResults: total
            });
            this.updateHistoryState();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  updateSelectedTrack = (trackIdentifier) => {
    this.updateSingleStateProperty("selectedItem", trackIdentifier);
    this.updateHistoryState();
  }

  getTrackDetails = id => {
    const results = this.state.searchSuggestions.filter(result => result.id == id);
    return (results.length == 1) ? results[0] : false;
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
      this.lyricsApi.fetchLyrics(artistName, trackTitle)
        .then(results => {
          const { lyrics } = results;
          this.updateMultipleStateProperties({
            currentTrack: currentTrack,
            currentLyrics: lyrics,
            isLyricsOpen: true
          });
          this.updateSelectedTrack(identifier);
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

  paginateResults = async (event) => {
    return await fetch(`https://cors-anywhere.herokuapp.com/${this.state.nextPage}`, {
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
            searchQuery: this.state.searchInputValue,
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
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <>
        <Navigation
          searchQuery={this.state.searchQuery}
          updateSearchQuery={this.updateSearchQuery}
          onClick={this.performSearch}
        />
        <div className={`${styles.container} ${this.state.isLyricsOpen ? styles.lyricsOpen : ""}`}>
          <div className={styles.resultsContainer}>
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                Search Results
              </div>
              <div className={styles.resultsOverflow}>
                {this.state.searchSuggestions.map(suggestion => <SearchResult key={suggestion.id} data={suggestion} searchQuery={this.state.searchQuery} isSelected={this.state.selectedItem == suggestion.id} onClick={this.handleSearchResultClick} />)}
              </div>
              <div className={styles.pagination}>
                <button className={`${styles.previous} ${this.state.prevPage ? "" : styles.disable}`} onClick={this.paginateResults}>Previous</button>
                <button className={`${styles.next} ${this.state.nextPage ? "" : styles.disable}`} onClick={this.paginateResults}>Next</button>
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
