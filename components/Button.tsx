//import {NavigationContainer} from '@react-navigation/native';
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { styles } from '../styles'

export const MenuButton: React.FC<{
  title: string
  description: string
}> = ({ description, title }) => {
  return (
    <Pressable
      onPress={() => alert("i've been clicked!")}
      hitSlop={{ bottom: 35 }}
    >
      <View style={styles.sectionContainer}>
        <View style={styles.textButtonStyle}>
          <Text style={[styles.buttonTitle]}>{title}</Text>
          <Text style={[styles.buttonTitle]}>{description}</Text>
        </View>
      </View>
    </Pressable>
  )
}
