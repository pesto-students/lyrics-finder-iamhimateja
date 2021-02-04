export default class LyricsApi {
  constructor() {
    this.baseURL = "https://api.lyrics.ovh";
    this.suggestionsURL = `${this.baseURL}/suggest`;
    this.corsHack = "https://cors-anywhere.herokuapp.com";
    this.deezerBaseURL = `${this.corsHack}/https://api.deezer.com`;
    this.searchURL = `${this.deezerBaseURL}/search?q=`;

    this.headers = new Headers();
    this.headers.append('pragma', 'no-store');
    this.headers.append('cache-control', 'no-store');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', '*');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.mode = "cors";
  }

  async searchTracks(searchQuery) {
    return await fetch(`${this.searchURL}${searchQuery}`, {
      method: "GET",
      headers: this.headers,
      mode: this.mode
    }).then(response => response.json());
  }
}
