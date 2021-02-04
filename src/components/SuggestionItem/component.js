import React, { PureComponent } from 'react';
import styles from './style.module.scss';
import { formatTrackDuration } from "../../utils/domUtils";

export default class SuggestionItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id: identifier,
      title: trackTitle,
      duration,
      explicit_lyrics: explicitLyrics,
      preview: trackPreviewURL,
      artist,
      album,
      ...data
    } = this.props.data;

    const artistName = artist.name;
    const artistAvatarSmall = artist.picture_small;
    const albumName = album.title;
    const albumCoverSmall = album.cover_small;

    return (
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
    );
  }
}
