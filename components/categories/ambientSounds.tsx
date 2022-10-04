import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'
import TrackPlayer, {
  Capability,
  usePlaybackState,
  State,
  RepeatMode,
} from 'react-native-track-player'
import { useToggle } from '../../hooks'
import { styles } from '../../styles'
import { SoundCard } from '../SoundCard'
import { SoundController } from '../SoundController'

export const tracks = [
  {
    id: 1,
    url: require('../../sounds/nature/crickets.wav'),
    title: 'Blues Beat',
  },
  {
    id: 2,
    url: require('../../sounds/nature/wind.wav'),
    title: 'Blues Beat',
  },
  {
    id: 3,
    url: require('../../sounds/nature/soft_rain.wav'),
    title: 'Blues Beat',
  },
  {
    id: 4,
    url: require('../../sounds/nature/seagulls.wav'),
    title: 'Blues Beat',
  },
]

const AmbientSoundsList = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  const onToggle = useToggle()
  const current = TrackPlayer.getCurrentTrack()
  const [spaceToggle, setSpaceToggle] = useState(false)
  const [windToggle, setWindToggle] = useState(false)
  const [rainToggle, setRainToggle] = useState(false)
  const [seagullsToggle, setSeaGullsToggle] = useState(false)

  async function setup() {
    TrackPlayer.setupPlayer({})
    await TrackPlayer.add(tracks)
    TrackPlayer.setRepeatMode(RepeatMode.Track)
    console.log('Tracks added')
    TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    })
  }

  useEffect(() => {
    setup()
  }, [])

  /*

  The purpose of this is to toggle the state of the sound that is currently being played,
  which will allow the UI to properly show the user what is active. 

  Ideally, the functionality below would be exported from a different file, but I am currently unsure if this is possible with useState - maybe if this was done with Redux, or a different state management. 

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

  const playSpace = () => {
    console.log('space is playing...')
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
    console.log('wind is playing...')
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
    console.log('soft rain is playing...')
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
    console.log('seagulls is playing...')
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
              //description="Place holder sound control"
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
