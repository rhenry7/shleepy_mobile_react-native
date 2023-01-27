import React from 'react'
import { Pressable, View } from 'react-native'
import { usePlaybackState, State } from 'react-native-track-player'
import { useDispatch } from 'react-redux'
import { useToggle } from '../../../hooks'
import { styles } from '../../../styles'
import { SoundCard } from '../../SoundCard'
import { SoundController } from '../../SoundController'
import {
  rainSoundAction,
  seagullsSoundAction,
  spaceSoundAction,
  windSoundAction,
} from '../../../src/app/reducer/slices/soundSlice'
import { useSound } from '../../../hooks/useSound'
import useSoundStatus from '../../../hooks/useSoundStatus'
const AmbientSoundsList = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  const onToggle = useToggle()
  const dispatch = useDispatch()
  const { spaceSound, rainSound, windSound, seagullsSound } = useSoundStatus()
  const spaceSoundStatus = spaceSound
  const rainSoundStatus = rainSound
  const windSoundStatus = windSound
  const seagullsSoundStatus = seagullsSound

  // maybe these should all be Hooks?
  const toggleSpaceState = () => {
    dispatch(rainSoundAction(false))
    dispatch(spaceSoundAction(true))
    dispatch(windSoundAction(false))
    dispatch(seagullsSoundAction(false))
  }

  const toggleWindState = () => {
    dispatch(rainSoundAction(false))
    dispatch(spaceSoundAction(false))
    dispatch(windSoundAction(true))
    dispatch(seagullsSoundAction(false))
  }

  const toggleRainState = () => {
    dispatch(rainSoundAction(true))
    dispatch(spaceSoundAction(false))
    dispatch(windSoundAction(false))
    dispatch(seagullsSoundAction(false))
  }

  const toggleSeagullsState = () => {
    dispatch(rainSoundAction(false))
    dispatch(spaceSoundAction(false))
    dispatch(windSoundAction(false))
    dispatch(seagullsSoundAction(true))
  }

  /*
Currently, there is a bug to fix the delay/lag of switching between the sounds previously played and the upcoming sound. 
  */

  const playSpaceHook = useSound(
    spaceSoundStatus,
    isPlaying,
    toggleSpaceState,
    onToggle,
    0,
  )

  const playWindHook = useSound(
    windSoundStatus,
    isPlaying,
    toggleWindState,
    onToggle,
    1,
  )

  const playRainHook = useSound(
    rainSoundStatus,
    isPlaying,
    toggleRainState,
    onToggle,
    2,
  )

  const playSeagullsHook = useSound(
    seagullsSoundStatus,
    isPlaying,
    toggleSeagullsState,
    onToggle,
    3,
  )

  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <Pressable onPress={playSpaceHook}>
            <SoundCard
              title="Night Crickets"
              description="lorem ipsum dolor sit amet"
              iconName="cloudy-night"
              status={spaceSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={playWindHook}>
            <SoundCard
              title="Warm Wind"
              description="sound of a windy day"
              iconName="cloudy-night"
              status={windSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={playRainHook}>
            <SoundCard
              title="Rooftop Rain"
              description="Rain with a bit of wind"
              iconName="cloudy-night"
              status={rainSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={playSeagullsHook}>
            <SoundCard
              title="Sea Gulls"
              description="Ocean birds with a breeze"
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
