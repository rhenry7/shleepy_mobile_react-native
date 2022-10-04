import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PlayPauseButton } from './PlayPauseButton'

export const SoundCard: React.FC<{
  title: string
  description?: string
  iconName?: string
  status?: boolean
}> = ({ description, title, iconName, status }) => {
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
          backgroundColor: status ? '#2c2278' : '#463AA0',
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
                padding: 10,
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
          <View>{status ? <PlayPauseButton /> : null}</View>
        </View>
      </View>
    </View>
  )
}
