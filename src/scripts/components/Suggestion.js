import { formatDuration } from "../utils/domUtils";
export default class Suggestion {
  constructor({
    id: identifier,
    title: trackTitle,
    duration,
    explicit_lyrics: explicitLyrics,
    preview: trackPreviewURL,
    artist,
    album,
    ...data
  }) {
    this.identifier = identifier;
    this.trackTitle = trackTitle;
    this.duration = formatDuration(duration);
    this.explicitLyrics = explicitLyrics;
    this.trackPreviewURL = trackPreviewURL;
    this.artistName = artist.name;
    this.artistAvatarSmall = artist.picture_small;
    this.albumName = album.title;
    this.albumCoverSmall = album.cover_small;
  }

  template() {
    return `
      <div class="suggestion" id="${this.identifier}">
        <div class="albumArt" style='background-image: url("${this.albumCoverSmall}")'></div>
        <div class="track-details">
          <span class="track-title">${this.trackTitle}</span>
          <div class="track-owner-info">
            <span class="artist-title">${this.artistName}</span> - <span class="album-title">${this.albumName}</span>
          </div>
          <span class="track-duration">${this.duration}</span>
        </div>
      </div>
    `;
  }

  appendTo(container) {
    const template = this.template();
    container.innerHTML += template;
  }

  bindEvents() {

  }
}
