import { useCallback } from 'react'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player'

export const useMute = () => {
  return useCallback(() => {
    // need to Toggle volume
    TrackPlayer.setVolume(0)
  }, [])
}
