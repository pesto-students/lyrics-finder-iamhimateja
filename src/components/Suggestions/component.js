import React, { Component } from 'react';
import styles from './style.module.scss';
import SuggestionItem from '../SuggestionItem/component';

export default class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.homeScreenSuggestions}>
        {this.props.suggestions.map(suggestion => <SuggestionItem data={suggestion} />)}
      </div>
    );
  }
}
