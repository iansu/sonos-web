const { gql } = require("apollo-server");

module.exports = gql`
  """
  Sonos API Version 1 Schema
  See https://developer.sonos.com/reference/types/
  """
  type Household {
    id: ID
    groups: [Group]
    players: [Player]
    favorites: [Favorite]
  }

  """
  Describes the current set of logical players and groups in the
  household.

  See https://developer.sonos.com/reference/control-api/groups/groups/
  """
  type Group {
    id: ID
    name: String
    playback: GroupPlayback
    playbackState: PlaybackState
    isPlaying: Boolean
    coordinator: Player
    players: [Player]
    volume: Volume
  }

  type GroupPlayback {
    playbackState: PlaybackState
    isDucking: Boolean
    positionMillis: Int
    previousPositionMillis: Int
    playModes: PlayModes
    availablePlaybackActions: PlaybackActions
  }

  """
  Indicates changes to group or player volume, the group mute state and
  whether the group volume is fixed or can be changed.

  See https://developer.sonos.com/reference/control-api/group-volume/group-volume/
  """
  type Volume {
    volume: Int
    fixed: Boolean
    muted: Boolean
  }

  """
  The music service identifier or a pseudo-service identifier in the case of local library.
  See https://developer.sonos.com/reference/types/playback-objects/#service
  """
  type Service {
    id: ID
    name: String
    imageUrl: String
  }

  """
  The music object identifier for the item in a music service. This
  identifies the content within a music service, the music service,
  and the account associated with the content.

  See https://developer.sonos.com/reference/types/playback-objects/#MusicObjectId
  """
  type MusicObjectId {
    serviceId: ID
    objectId: ID
    accountId: ID
  }

  type Playback {
    playbackState: PlaybackState
    queueVersion: Int
    positionMillis: Int
    playModes: PlayModes
    availablePlaybackActions: PlaybackActions
    itemId: ID
  }

  """
  A single music track or audio file.

  See https://github.com/bencevans/node-sonos#api
  """
  type Track {
    title: String
    artist: String
    album: String
    albumArtURI: String
    position: Int
    duration: Int
    albumArtURL: String
    queuePosition: Int
  }

  type PlaybackActions {
    canSkip: Boolean
    canSkipBack: Boolean
    canSeek: Boolean
    canRepeat: Boolean
    canRepeatOne: Boolean
    canCrossfade: Boolean
    canShuffle: Boolean
  }

  """
  Sonos players support audio play modes including shuffle, repeat, and
  crossfade. Your app can receive notifications for changes with the
  playbackStatus event and set the current play modes with the
  setPlayModes command.

  See https://developer.sonos.com/reference/types/play-modes/
  """
  type PlayModes {
    repeat: Boolean
    repeatOne: Boolean
    crossfade: Boolean
    shuffle: Boolean
  }

  """
  An actual device.
  """
  type Player {
    id: ID
    name: String
    websocketUrl: String
    restUrl: String
    deviceIds: [ID]
    minApiVersion: String
    softwareVersion: String
    volume: Volume
    deviceDescription: DeviceDescription
  }

  type DeviceDescription {
    deviceType: String
    friendlyName: String
    manufacturer: String
    manufacturerURL: String
    modelNumber: String
    modelDescription: String
    modelName: String
    modelURL: String
    softwareVersion: String
    hardwareVersion: String
    serialNum: String
    UDN: String
    iconList: IconList
    minCompatibleVersion: String
    legacyCompatibileVersion: String
    apiVersion: String
    minApiVersion: String
    displayVersion: String
    extraVersion: String
    roomName: String
    displayName: String
    zoneType: String
    feature1: String
    feature2: String
    feature3: String
    seriesid: String
    variant: String
    internalSpeakerSize: String
    bassExtension: String
    satGainOffset: String
    memory: String
    ampOnTime: String
    retailMode: String
    serviceList: DeviceServiceList
    deviceList: DeviceList
  }

  type IconList {
    icon: [Icon]
  }

  type Icon {
    id: ID
    mimetype: String
    width: String
    height: String
    depth: String
    url: String
  }

  type DeviceServiceList {
    service: [DeviceService]
  }

  type DeviceService {
    serviceId: ID
    serviceType: String
    controlURL: String
    eventSubURL: String
    SCPDURL: String
  }

  type DeviceList {
    device: [DeviceDescription]
  }

  type Favorite {
    id: ID
    name: String
    description: String
    imageUrl: String
    service: Service
  }

  """
  Indicates changes to the group playback state, such as idle,
  buffering, paused, or playing, and the current playback position in
  the track.

  See https://developer.sonos.com/reference/control-api/playback/playback-status/
  """
  enum PlaybackState {
    PLAYBACK_STATE_IDLE
    PLAYBACK_STATE_BUFFERING
    PLAYBACK_STATE_PLAYING
  }

  type Query {
    households: [Household]
    groups(household: ID): [Group]
    favorites(household: ID): [Favorite]
  }

  type Mutation {
    play(group: ID): Boolean
    pause(group: ID): Boolean
    next(group: ID): Boolean
    previous(group: ID): Boolean
  }
`;
