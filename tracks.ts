import React, { useEffect } from 'react'
import TrackPlayer from 'react-native-track-player'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

export const tracks = [
  {
    id: 1,
    url: require('./sounds/nature/Deep_Space.wav'),
    title: 'Blues Beat',
  },
  {
    id: 2,
    url: require('./sounds/nature/veil.mp3'),
    title: 'Blues Beat',
  },
]
