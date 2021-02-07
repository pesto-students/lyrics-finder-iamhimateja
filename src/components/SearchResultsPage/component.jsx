import React, { Component } from 'react';
import styles from "./style.module.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from '../Navigation/component';
import ThemeSwitch from "../ThemeSwitch/component";
import SearchResult from "../SearchResult/component";
import SuggestionItem from "../SuggestionItem/component";
import LyricsApi from '../../utils/lyricsApi';

export default class SearchResultsPage extends Component {
  is_mounted = false;
  constructor(props) {
    super(props);
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let tempState = {};

    if (searchParams.has("query"))
      tempState.searchQuery = searchParams.get("query");

    if (searchParams.has("selected-item"))
      tempState.selectedItem = searchParams.get("selected-item");

    tempState.searchSuggestions = [];
    tempState.currentLyrics = "";
    this.state = tempState;
    this.lyricsApi = new LyricsApi();
  }

  componentDidMount() {
    this.is_mounted = true;
    if (this.state.searchQuery) {
      this.lyricsApi.searchTracks(this.state.searchQuery)
        .then(results => {
          const data = results.data;
          if (Array.isArray(data) && data.length > 0 && this.is_mounted) {
            this.updateSingleStateProperty("searchSuggestions", data);
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

  componentDidUpdate() {
    console.log("updated");
  }

  updateSingleStateProperty = (property, value) => {
    if (this.is_mounted) {
      let stateCopy = Object.assign({}, this.state);
      stateCopy[property] = value;
      this.setState(stateCopy);
    }
  }

  updateHistoryState = () => {
    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: "?" + new URLSearchParams({ query: this.state.searchQuery, "selected-item": this.state.selectedItem }).toString()
    });
  }

  updateSelectedTrack = (trackIdentifier) => {
    this.updateSingleStateProperty("selectedItem", trackIdentifier);
    this.props.history.push({
      search: "?" + new URLSearchParams({ query: this.state.searchQuery, "selected-item": this.state.selectedItem }).toString()
    });
  }

  fetchLyrics = event => {
    const { artist, title } = event.currentTarget.dataset;
    const identifier = event.currentTarget.id;
    this.lyricsApi.fetchLyrics(artist, title)
      .then(results => {
        const { lyrics } = results;
        console.log(lyrics);
        this.updateSelectedTrack(identifier);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <Navigation searchQuery={this.state.searchQuery} />
        <div className={`${styles.container} ${this.state.selectedItem ? styles.lyricsOpen : ""}`}>
          <div className={styles.resultsContainer}>
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                Search Results
              </div>
              <div className={styles.resultsOverflow}>
                {this.state.searchSuggestions.map(suggestion => <SearchResult key={suggestion.id} data={suggestion} searchQuery={this.state.searchQuery} isSelected={this.state.selectedItem == suggestion.id} onClick={this.fetchLyrics} />)}
              </div>
              <div className={styles.pagination}>
                <div className={styles.next}>Previous</div>
                <div className={styles.next}>Next</div>
              </div>
            </div>
            <div className={styles.lyricsContainer}>
              <div className={styles.selectedTrackInfo}></div>
              <div className={styles.lyricsContainer}>
                <div className={styles.lyrics}>{this.state.currentLyrics}</div>
              </div>
              <div className={styles.playerContainer}></div>
            </div>
          </div>
        </div>
        <ThemeSwitch />
      </>
    );
  }
}
