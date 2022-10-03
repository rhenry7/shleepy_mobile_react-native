import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import TrackPlayer, {
  Capability,
  usePlaybackState,
  State,
  RepeatMode,
} from 'react-native-track-player'
import { useToggle } from '../../hooks'
import { styles } from '../../styles'
import { MenuButton } from '../Button'
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

  useEffect(() => {
    setup()
  }, [])

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

  const playSpace = () => {
    console.log('space is playing...')
    TrackPlayer.skip(0)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
  }

  const playWind = () => {
    console.log('wind is playing...')
    TrackPlayer.skip(1)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
  }

  const playSoftRain = () => {
    console.log('soft rain is playing...')
    TrackPlayer.skip(2)
    TrackPlayer.play()
    if (!isPlaying) {
      onToggle()
    }
  }

  const playSeaGulls = () => {
    console.log('space is playing...')
    TrackPlayer.skip(3)
    TrackPlayer.play()
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
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playWind()}>
            <SoundCard
              title="Vacuum"
              description="random whiff of machinery"
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>

        <View>
          <Pressable onPress={() => playSoftRain()}>
            <SoundCard
              title="Heavy Hum"
              description="obscure but familiar"
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => playSeaGulls()}>
            <SoundCard
              title="Air Condition"
              description="interior background, office or lobby"
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={onToggle}>
            <SoundCard
              title="Stop"
              description="stop play back"
              iconName="ios-pause"
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AmbientSoundsList
