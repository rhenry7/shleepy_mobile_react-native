import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import Meditation from './Meditation'
import CircleAnimation from './meditationAnimations/CircleMeditation'
import MeditationStackScreen from '../src/app/Stacks/MeditationStack'
import Playlists from './Playlists'

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
      <Tab.Screen name="Meditation" component={Meditation} />
    </Tab.Navigator>
  )
}

const Tab = createMaterialTopTabNavigator()
