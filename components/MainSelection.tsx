import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../styles'
import Playlists from './Playlists'

export function Favorites() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#060523',
      }}
    >
      <Text style={styles.white}>Favorites Screen</Text>
    </View>
  )
}

export function Recommended() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#060523',
      }}
    >
      <Text style={styles.white}>Recommended</Text>
    </View>
  )
}

export function PlaylistsChoice() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12, color: '#F0EAD6' },
        tabBarIndicatorStyle: {
          backgroundColor: '#463AA0ed',
        },
        tabBarStyle: { backgroundColor: '#060523' },
      }}
    >
      <Tab.Screen name="Playlists" component={Playlists} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Recommended" component={Recommended} />
    </Tab.Navigator>
  )
}

const Tab = createMaterialTopTabNavigator()
