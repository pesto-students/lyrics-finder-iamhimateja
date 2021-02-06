import React, { Component } from 'react';
import styles from './style.module.scss';
import SuggestionItem from '../SuggestionItem/component';
import ShowAllResultsButton from './ShowAllResultsButton/component';

export default class Suggestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${styles.homeScreenSuggestions} ${this.props.isOpen ? styles.open : ""}`}>
        {this.props.suggestions.map(suggestion => <SuggestionItem key={suggestion.id} data={suggestion} searchQuery={this.props.searchQuery} />)}
        <ShowAllResultsButton searchQuery={this.props.searchQuery} isOpen={this.props.isOpen} />
      </div>
    );
  }
}
