import React, { useEffect } from 'react'
import { Pressable, View } from 'react-native'
import TrackPlayer, { Capability } from 'react-native-track-player'
import { styles } from '../../styles'
import { MenuButton } from '../Button'

export const tracks = [
  {
    id: 1,
    url: require('../../sounds/ambient/Deep_Space.wav'),
    title: 'Blues Beat',
  },
  //   {
  //     id: 2,
  //     url: require('./sounds/nature/veil.mp3'),
  //     title: 'Blues Beat',
  //   },
]

//TrackPlayer.registerPlaybackService(() => require('./service'))

const AmbientSoundsList = () => {
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.add(tracks)
      console.log('Tracks added')
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
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
    setUpTrackPlayer()
    TrackPlayer.removeUpcomingTracks() // check if this works correctly
  }, [])

  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <Pressable
            onPress={() => {
              ;() => TrackPlayer.play()
            }}
          >
            <MenuButton
              title="Deep Space"
              description="empty void of space"
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>
        <View>
          <MenuButton
            title="Vacuum"
            description="random whiff of machinery"
            iconName="color-filter-outline"
          />
        </View>

        <View>
          <MenuButton
            title="Heavy Hum"
            description="obscure but familiar"
            iconName="color-filter-outline"
          />
        </View>
        <View>
          <MenuButton
            title="Air Condition"
            description="interior background, office or lobby"
            iconName="color-filter-outline"
          />
        </View>
      </View>
    </View>
  )
}

export default AmbientSoundsList
