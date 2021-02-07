import React, { Component } from 'react';
import styles from "./style.module.scss";
import Logo from "../../icons/logo/logo";
import SearchIcon from "../../icons/search-icon/searchIcon";
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          <Logo container="mainContainer" />
        </Link>
        <div className={styles.searchWrap}>
          <input type="text" placeholder="Search lyrics by artist or song name" className={styles.searchInput} defaultValue={this.props.searchQuery || ""} onKeyUp={this.props.updateSearchQuery} />
          <button className={styles.searchButton} onClick={this.props.onClick}>
            <SearchIcon container="homeSearchIcon" />
          </button>
        </div>
      </div>
    );
  }
}
