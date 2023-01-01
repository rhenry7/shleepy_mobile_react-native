import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './MixerStyles'
import FirstSoundButton from './SoundComponents/FirstSoundButton'
import SecondSoundButton from './SoundComponents/SecondSoundButton'
import ThirdSoundButton from './SoundComponents/ThirdSoundButton'
import FourthSoundButton from './SoundComponents/FourthSoundButton'
import FifthSoundButton from './SoundComponents/FifthSoundButton'

export default function ButtonContainer() {
  return (
    <View style={styles.buttonContainer}>
      <View>
        <Text
          style={{
            fontSize: 34,
            fontWeight: '200',
            padding: 4,
            color: '#F0EAD6',
          }}
        >
          Create Your Mix.
        </Text>
      </View>
      <FirstSoundButton />
      <SecondSoundButton />
      <ThirdSoundButton />
      <FourthSoundButton />
      <FifthSoundButton />
    </View>
  )
}
