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
  const dispatch = useDispatch()

  // figure out how to move these to a different folder
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
