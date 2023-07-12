import React, { PureComponent } from 'react';
import styles from './style.module.scss';
import { formatTrackDuration } from "../../utils/domUtils";
import { Link } from "react-router-dom";

export default class SuggestionItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id: identifier,
      title: trackTitle,
      duration,
      artist,
      album,
    } = this.props.data;

    const artistName = artist.name;
    const albumName = album.title;
    const albumCoverSmall = album.cover_small;

    return (
      <Link className={styles.trackAnchor} to={{
        pathname: "/lyrics",
        search: `?query=${this.props.searchQuery}&selected-item=${identifier}`
      }}>
        <div className={styles.suggestion} id={identifier}>
          <div className={styles.albumArt} style={{ backgroundImage: `url('${albumCoverSmall}')` }}></div>
          <div className={styles.trackDetails}>
            <span className={styles.trackTitle}>{trackTitle}</span>
            <div className={styles.trackOwnerInfo}>
              <span className={styles.artistTitle}>{artistName}</span> - <span className={styles.albumTitle}>{albumName}</span>
            </div>
            <span className={styles.trackDuration}>{formatTrackDuration(duration)}</span>
          </div>
        </div>
      </Link>
    );
  }
}
