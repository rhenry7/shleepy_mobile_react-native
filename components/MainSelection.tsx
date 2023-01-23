import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../styles'
import Meditation from './Meditation'
import Playlists from './Playlists'

// export function Meditation() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#060523',
//       }}
//     >
//       <Text style={styles.white}>Meditation Screen</Text>
//     </View>
//   )
// }

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
