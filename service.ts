import TrackPlayer from 'react-native-track-player'
module.exports = async function () {
  TrackPlayer.addEventListener('remote-play' as any, () => TrackPlayer.play())
  TrackPlayer.addEventListener('remote-pause' as any, () => TrackPlayer.pause())
}
