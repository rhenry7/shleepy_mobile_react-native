import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { State, usePlaybackState } from 'react-native-track-player'
import { useToggle } from '../hooks'
import VolumeSlider from './Slider'

export const ControllerIcon: React.FC<{ iconName: string; color: string }> = ({
  iconName = 'ios-play',
  color = 'white',
}) => {
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
          <Ionicons name={iconName} size={24} color={color}></Ionicons>
        </View>
      </View>
    </View>
  )
}

export const SoundController: React.FC<{
  title?: string
  description?: string
  iconName?: string
  status?: boolean
}> = ({ description, title, iconName, status }) => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  const onToggle = useToggle()

  return (
    <View>
      <View
        style={{
          width: 350,
          marginTop: 10,
          marginBottom: 24,
          paddingHorizontal: 24,
          margin: 0,
          padding: 0,
          borderRadius: 10,
          height: 80,
          //backgroundColor: '#3022a1',
          borderColor: '#3022a1',
          borderWidth: 2,
        }}
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
            }}
          >
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name={iconName} size={24} color={'white'}></Ionicons>
            </View>
            <View
              style={{
                paddingTop: 10,
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <Text style={[styles.buttonTitle]}>{title}</Text> */}
              <VolumeSlider />
            </View>
            <View
              style={{
                alignContent: 'space-between',
                justifyContent: 'center',
              }}
            ></View>
          </View>
          <View>
            <Pressable onPress={onToggle}>
              {status && isPlaying ? (
                <ControllerIcon iconName={'ellipse'} color={'#fff7c1'} />
              ) : (
                <ControllerIcon iconName={'moon'} color={'#463AA0'} />
              )}
            </Pressable>
          </View>
          <View>
            <ControllerIcon iconName={'ios-star-outline'} color={'white'} />
          </View>
        </View>
      </View>
    </View>
  )
}
