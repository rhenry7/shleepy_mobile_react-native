import React from 'react'
import { View } from 'react-native'
import FirstSoundButton from './FirstSoundButton'
import { styles } from './MixerStyles'
import SecondSoundButton from './SecondSoundButton'

export default function ButtonContainer() {
  return (
    <View style={styles.buttonContainer}>
      <FirstSoundButton />
      <SecondSoundButton />
    </View>
  )
}
