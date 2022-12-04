import React, { useCallback, useState } from 'react'
import { Pressable, View } from 'react-native'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import { useToggle } from '../../../hooks'
import { RootState } from '../../../src/app/reducer/store'
import { styles } from '../../../styles'
import { SoundCard } from '../../SoundCard'
import { SoundController } from '../../SoundController'
import {
  rainSound,
  seagullsSound,
  spaceSound,
  windSound,
} from '../../../src/app/reducer/soundSlice'
import { useSound } from '../../../hooks/useSound'

const AmbientSoundsList = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  const onToggle = useToggle()

  const [play, setPlay] = useState(false)

  const dispatch = useDispatch()
  const spaceSoundStatus = useSelector(
    (state: RootState) => state.sounds.spaceSound,
  )
  const rainSoundStatus = useSelector(
    (state: RootState) => state.sounds.rainSound,
  )
  const windSoundStatus = useSelector(
    (state: RootState) => state.sounds.windSound,
  )
  const seagullsSoundStatus = useSelector(
    (state: RootState) => state.sounds.seagullsSound,
  )

  /*

  The purpose of this is to toggle the state of the sound that is currently being played,
  which will allow the UI to properly show the user what is active. 

  Ideally, the functionality below would be exported from a different file, but I am currently unsure if this is possible with useState - maybe if this was done with Redux, or a different state management. 

  */

  // TODO: Figure out how to move to separate folder to make code easier to read

  // maybe these should all be Hooks?

  const toggleSpaceState = () => {
    dispatch(rainSound(false))
    dispatch(spaceSound(true))
    dispatch(windSound(false))
    dispatch(seagullsSound(false))
  }

  const toggleWindState = () => {
    dispatch(rainSound(false))
    dispatch(spaceSound(false))
    dispatch(windSound(true))
    dispatch(seagullsSound(false))
  }

  const toggleRainState = () => {
    dispatch(rainSound(true))
    dispatch(spaceSound(false))
    dispatch(windSound(false))
    dispatch(seagullsSound(false))
  }

  const toggleSeagullsState = () => {
    dispatch(rainSound(false))
    dispatch(spaceSound(false))
    dispatch(windSound(false))
    dispatch(seagullsSound(true))
  }

  /*
This section handles the logic for toggling the sound on/off and for skipping to that specific track. 

Currently, there is a bug to fix the delay/lag of switching between the sounds previously played and the upcoming sound. 
  */

  // maybe these should all be Hooks?

  const playSpaceHook = useSound(
    spaceSoundStatus,
    isPlaying,
    toggleSpaceState,
    onToggle,
    play,
  )

  const playWind = () => {
    TrackPlayer.skip(1)
    TrackPlayer.play()
    toggleWindState()
    if (windSoundStatus) {
      TrackPlayer.pause()
    }
    if (!isPlaying) {
      onToggle()
    }
  }

  const playSoftRain = () => {
    TrackPlayer.skip(2)
    toggleRainState()
    if (rainSoundStatus) {
      TrackPlayer.pause()
    }
    if (!isPlaying) {
      onToggle()
    }
  }

  const playSeaGulls = () => {
    TrackPlayer.skip(3)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
    toggleSeagullsState()
    if (seagullsSoundStatus) {
      TrackPlayer.pause()
    }
    if (!isPlaying) {
      onToggle()
    }
  }

  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <Pressable onPress={playSpaceHook}>
            <SoundCard
              title="Deep Space"
              description="empty void of space"
              iconName="cloudy-night"
              status={spaceSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playWind()}>
            <SoundCard
              title="Vacuum"
              description="random whiff of machinery"
              iconName="cloudy-night"
              status={windSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSoftRain()}>
            <SoundCard
              title="Heavy Hum"
              description="obscure but familiar"
              iconName="cloudy-night"
              status={rainSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSeaGulls()}>
            <SoundCard
              title="Air Condition"
              description="interior background, office or lobby"
              iconName="cloudy-night"
              status={seagullsSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => console.log('sound controller clicked')}>
            <SoundController
              title="Sound Controller, Toggle"
              description="Place holder sound control"
              iconName="volume-mute"
              status={isPlaying}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AmbientSoundsList
