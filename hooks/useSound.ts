import { useCallback } from 'react'
import TrackPlayer from 'react-native-track-player'

/*

Old code to be kept for reference and to use as a back up
  const playSpace = () => {
    TrackPlayer.skip(0)
    TrackPlayer.play()
    toggleSpaceState()
    if (spaceSoundStatus) {
      TrackPlayer.pause()
    }
    if (!isPlaying) {
      onToggle()
    }
  }
*/

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
