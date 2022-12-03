// import {
//   rainSound,
//   seagullsSound,
//   spaceSound,
//   windSound,
// } from '../../../src/app/reducer/soundSlice'
// import { useToggle } from '../../../hooks'
// import { RootState } from '../../../src/app/reducer/store'
// import { useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'

export const useSound = (
  soundStatus: boolean,
  playingStatus: boolean,
  toggleSoundStatus: () => void,
  callToggle: () => void,
) => {
  return useEffect(() => {
    TrackPlayer.skip(0)
    TrackPlayer.play()
    toggleSoundStatus()
    if (soundStatus) {
      TrackPlayer.reset()
    }
    if (!playingStatus) {
      callToggle()
    }
  }, [])
}
