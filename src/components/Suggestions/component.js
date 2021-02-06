import React, { Component } from 'react';
import styles from './style.module.scss';
import SuggestionItem from '../SuggestionItem/component';
import ShowAllResultsButton from './ShowAllResultsButton/component';

export default class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={`${styles.homeScreenSuggestions} ${this.props.isOpen ? styles.open : ""}`}>
        {this.props.suggestions.map(suggestion => <SuggestionItem key={suggestion.id} data={suggestion} />)}
        <ShowAllResultsButton handleClick={this.props.handleShowAllResults} isOpen={this.props.isOpen} />
      </div>
    );
  }
}
