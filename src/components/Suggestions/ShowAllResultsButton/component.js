import React, { Component } from 'react';
import styles from '../style.module.scss';

export default class ShowAllResultsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`${styles.showAllResultsButton} ${this.props.isOpen ? styles.show : ""}`}
        onClick={this.props.handleClick}
      >
        Show all results
      </div>
    );
  }
}
