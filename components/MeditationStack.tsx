import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CircleMeditation from './meditationAnimations/CircleMeditation'

const MeditationStack = createNativeStackNavigator()

export default function MeditationStackScreen({ navigation }) {
  return (
    <MeditationStack.Navigator>
      <MeditationStack.Screen
        name="CircleMeditation"
        component={CircleMeditation}
      />
    </MeditationStack.Navigator>
  )
}
