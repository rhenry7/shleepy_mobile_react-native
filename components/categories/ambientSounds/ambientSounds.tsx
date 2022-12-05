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
} from '../../../src/app/reducer/soundSlice'
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
              title="Deep Space"
              description="empty void of space"
              iconName="cloudy-night"
              status={spaceSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          {
            // placeholder for new button
          }
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
          <Pressable onPress={playWindHook}>
            <SoundCard
              title="Vacuum"
              description="random whiff of machinery"
              iconName="cloudy-night"
              status={windSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={playRainHook}>
            <SoundCard
              title="Heavy Hum"
              description="obscure but familiar"
              iconName="cloudy-night"
              status={rainSoundStatus}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={playSeagullsHook}>
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
