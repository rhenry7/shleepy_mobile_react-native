import { useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'

export const useSound = (
  soundStatus: boolean,
  playingStatus: boolean,
  toggleSoundStatus: () => void,
  callToggle: () => void,
  soundLocation: number,
) => {
  return useCallback(async () => {
    await TrackPlayer.skip(soundLocation)
    await TrackPlayer.play()
    toggleSoundStatus()
    if (soundStatus) {
      TrackPlayer.reset()
    }
    if (!playingStatus) {
      callToggle()
    }
  }, [])
}
