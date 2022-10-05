// import { useCallback } from 'react'
// import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player'

// export const useMute = () => {
//   const state = usePlaybackState()
//   const isPlaying = state === State.Playing
//   const volume = volumeGetter()

//   return useCallback(() => {
//     if (volume > 0) {
//       TrackPlayer.setVolume(0)
//     } else {
//       TrackPlayer.setVolume(15)
//     }
//   }, [volume])
// }
