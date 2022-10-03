//import {NavigationContainer} from '@react-navigation/native';
import React from 'react'
import { View, Text, Pressable, Button } from 'react-native'
import { styles } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PlayPauseButton } from './PlayPauseButton'

export const SoundCard: React.FC<{
  title: string
  description?: string
  iconName?: string
}> = ({ description, title, iconName }) => {
  return (
    <View style={styles.sectionContainer}>
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
        {/*
          The toggle audio button will have to go here, but the problem will be mapping the audio only for if the sound if playing.
        
        */}
        <View>
          <PlayPauseButton />
        </View>
      </View>
    </View>
  )
}
