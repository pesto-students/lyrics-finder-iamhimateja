import React, { Component } from 'react';
import styles from '../style.module.scss';
import { Link } from "react-router-dom";

export default class ShowAllResultsButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        className={`${styles.showAllResultsButton} ${this.props.isOpen ? styles.show : ""}`}
        to={{
          pathname: "/lyrics",
          search: `?query=${this.props.searchQuery}`
        }}
      >
        Show all results
      </Link>
    );
  }
}
