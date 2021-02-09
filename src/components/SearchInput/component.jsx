import React, { Component } from 'react';
import styles from "./style.module.scss";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type="text"
        className={styles.primarySearchInput}
        placeholder="Search lyrics by artist or song name"
        {...this.props}
      />
    );
  }
}
