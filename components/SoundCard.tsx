import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { State, usePlaybackState } from 'react-native-track-player'

export const SoundCard: React.FC<{
  title: string
  description?: string
  iconName?: string
  status?: boolean
}> = ({ description, title, iconName, status }) => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing

  return (
    <View>
      <View
        style={[
          styles.soundCardContainer,
          { backgroundColor: status && isPlaying ? '#463AA070' : '#463AA0' },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: 10,
              paddingLeft: 0,
            }}
          >
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name={iconName}
                size={20}
                color={status && isPlaying ? '#fff7c1' : 'white'}
              ></Ionicons>
            </View>
            <View
              style={{
                padding: 10,
                paddingLeft: 15,
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.buttonTitle]}>{title}</Text>
              <Text style={[styles.buttonTitle]}>{description}</Text>
            </View>
            <View
              style={{
                alignContent: 'space-between',
                justifyContent: 'center',
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  )
}
