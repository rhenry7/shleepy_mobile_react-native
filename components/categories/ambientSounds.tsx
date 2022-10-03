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

export const tracks = [
  {
    id: 1,
    url: require('../../sounds/ambient/Deep_Space.wav'),
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

  const playSpace = () => {
    console.log('space is playing...')
    TrackPlayer.skip(0)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
    setRainToggle(false)
    setSpaceToggle(true)
    setWindToggle(false)
    setSeaGullsToggle(false)
  }

  const playWind = () => {
    console.log('wind is playing...')
    TrackPlayer.skip(1)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
    setRainToggle(false)
    setSpaceToggle(false)
    setWindToggle(true)
    setSeaGullsToggle(false)
  }

  const playSoftRain = async () => {
    console.log('soft rain is playing...')
    TrackPlayer.skip(2)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
    setRainToggle(true)
    setSpaceToggle(false)
    setWindToggle(false)
    setSeaGullsToggle(false)
    //rainToggler()
  }

  const playSeaGulls = () => {
    console.log('seagulls is playing...')
    TrackPlayer.skip(3)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
    setRainToggle(false)
    setSpaceToggle(false)
    setWindToggle(false)
    setSeaGullsToggle(true)
  }

  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <Pressable onPress={() => playSpace()}>
            <SoundCard
              title="Deep Space"
              description="empty void of space"
              iconName="color-filter-outline"
              status={spaceToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playWind()}>
            <SoundCard
              title="Vacuum"
              description="random whiff of machinery"
              iconName="color-filter-outline"
              status={windToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSoftRain()}>
            <SoundCard
              title="Heavy Hum"
              description="obscure but familiar"
              iconName="color-filter-outline"
              status={rainToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSeaGulls()}>
            <SoundCard
              title="Air Condition"
              description="interior background, office or lobby"
              iconName="color-filter-outline"
              status={seagullsToggle}
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={onToggle}>
            <SoundCard title="Stop Audio" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AmbientSoundsList
