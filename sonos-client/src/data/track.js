import { playbackStatus, metadataStatus } from "./sources";

const IDLE = "PLAYBACK_STATE_IDLE";
const PLAYING = "PLAYBACK_STATE_PLAYING";

const EMPTY = {
  album: "",
  artist: "None",
  canDisplay: false,
  canSkip: false,
  canSkipBack: false,
  duration: 0,
  images: [],
  isPlaying: false,
  position: 0,
  service: "",
  status: IDLE,
  title: "No Track"
};

export class Track {
  static empty() {
    return EMPTY;
  }

  constructor() {
    this.payload = EMPTY;
  }

  toJSON() {
    return this.payload;
  }

  open(id, socket, callback) {
    this.playback = socket.subscribe(playbackStatus(id));
    this.metadata = socket.subscribe(metadataStatus(id));

    this.playback.bind("update", status => {
      callback(this.applyStatus(status));
    });

    this.metadata.bind("update", meta => {
      callback(this.applyMeta(meta));
    });
  }

  close() {
    this.playback.disconnect();
    this.metadata.disconnect();
  }

  applyStatus(status) {
    let next = {
      isPlaying: status.playbackState === PLAYING,
      canSkip: status.availablePlaybackActions.canSkip,
      canSkipBack: status.availablePlaybackActions.canSkipBack,
      position: status.positionMillis,
      status: status.playbackState
    };

    this.payload = Object.assign({}, this.payload, next);

    return this.payload;
  }

  applyMeta(meta) {
    const { track } = meta.currentItem;

    let next = {
      canDisplay: meta !== null,
      title: track.name,
      artist: track.artist.name,
      album: track.album.name,
      duration: track.durationMillis,
      service: track.service.name,
      images: [track.imageUrl, meta.container.imageUrl]
    };

    this.payload = Object.assign({}, this.payload, next);

    return this.payload;
  }
}