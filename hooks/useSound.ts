import { useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'

export const useSound = (
  soundStatus: boolean,
  playingStatus: boolean,
  toggleSoundStatus: () => void,
  callToggle: () => void,
  soundLocation: number,
) => {
  return useCallback(() => {
    TrackPlayer.skip(soundLocation)
    TrackPlayer.play()
    toggleSoundStatus()
    if (soundStatus) {
      TrackPlayer.pause()
    }
    if (!playingStatus) {
      callToggle()
    }
  }, [])
}
