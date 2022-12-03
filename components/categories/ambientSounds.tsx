import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player'
import { useToggle } from '../../hooks'
import { styles } from '../../styles'
import { SoundCard } from '../SoundCard'
import { SoundController } from '../SoundController'

const AmbientSoundsList = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  const onToggle = useToggle()
  const [spaceToggle, setSpaceToggle] = useState(false)
  const [windToggle, setWindToggle] = useState(false)
  const [rainToggle, setRainToggle] = useState(false)
  const [seagullsToggle, setSeaGullsToggle] = useState(false)

  /*

  The purpose of this is to toggle the state of the sound that is currently being played,
  which will allow the UI to properly show the user what is active. 

  Ideally, the functionality below would be exported from a different file, but I am currently unsure if this is possible with useState - maybe if this was done with Redux, or a different state management. 

  */

  /*
Todo: his area needs to be factored to possible use something else to manage state
probably need to use something Zustand or MobX, probably won't want to use Redux

*/

  const toggleSpaceState = () => {
    setRainToggle(false)
    setSpaceToggle(true)
    setWindToggle(false)
    setSeaGullsToggle(false)
  }

  const toggleWindState = () => {
    setRainToggle(false)
    setSpaceToggle(false)
    setWindToggle(true)
    setSeaGullsToggle(false)
  }

  const toggleRainState = () => {
    setRainToggle(true)
    setSpaceToggle(false)
    setWindToggle(false)
    setSeaGullsToggle(false)
  }

  const toggleSeagullsState = () => {
    setRainToggle(false)
    setSpaceToggle(false)
    setWindToggle(false)
    setSeaGullsToggle(true)
  }

  /*
This section handles the logic for toggling the sound on/off and for skipping to that specific track. 

Currently, there is a bug to fix the delay/lag of switching between the sounds previously played and the upcoming sound. 
  */
  const playSpace = () => {
    TrackPlayer.skip(0)
    TrackPlayer.play()
    toggleSpaceState()
    if (spaceToggle) {
      TrackPlayer.pause()
    }
    if (!isPlaying) {
      onToggle()
    }
  }

  const playWind = () => {
    TrackPlayer.skip(1)
    TrackPlayer.play()
    toggleWindState()
    if (windToggle) {
      TrackPlayer.pause()
    }
    if (!isPlaying) {
      onToggle()
    }
  }

  const playSoftRain = () => {
    TrackPlayer.skip(2)
    toggleRainState()
    if (rainToggle) {
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
    if (seagullsToggle) {
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
          <Pressable onPress={() => playSpace()}>
            <SoundCard
              title="Deep Space"
              description="empty void of space"
              iconName="cloudy-night"
              status={spaceToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playWind()}>
            <SoundCard
              title="Vacuum"
              description="random whiff of machinery"
              iconName="cloudy-night"
              status={windToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSoftRain()}>
            <SoundCard
              title="Heavy Hum"
              description="obscure but familiar"
              iconName="cloudy-night"
              status={rainToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSeaGulls()}>
            <SoundCard
              title="Air Condition"
              description="interior background, office or lobby"
              iconName="cloudy-night"
              status={seagullsToggle}
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
