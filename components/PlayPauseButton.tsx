import React from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { usePlaybackState, State } from 'react-native-track-player'

export const PlayPauseButton: React.FC<{}> = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  let iconName = isPlaying ? 'ios-pause' : 'ios-play'

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ padding: 5, paddingTop: 25, justifyContent: 'center' }}>
          <Ionicons name={iconName} size={24} color={'white'}></Ionicons>
        </View>
      </View>
    </View>
  )
}
