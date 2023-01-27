import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CircleMeditation from '../../../components/meditationAnimations/CircleMeditation'

const MeditationStack = createNativeStackNavigator()

export default function MeditationStackScreen() {
  return (
    <MeditationStack.Navigator>
      <MeditationStack.Screen
        name="CircleMeditation"
        component={CircleMeditation}
      />
    </MeditationStack.Navigator>
  )
}
