import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './MixerStyles'
import FirstSoundButton from './SoundComponents/FirstSoundButton'
import SecondSoundButton from './SoundComponents/SecondSoundButton'
import ThirdSoundButton from './SoundComponents/ThirdSoundButton'
import FourthSoundButton from './SoundComponents/FourthSoundButton'
import FifthSoundButton from './SoundComponents/FifthSoundButton'

export default function SoundMixer() {
  return (
    <View style={styles.SoundMixer}>
      <View style={styles.description}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '500',
            padding: 4,
            color: '#F0EAD6',
          }}
        >
          Create Your Mix.
        </Text>
        <Text style={{ color: '#F0EAD6', paddingTop: 10 }}>
          Mix and match sounds, customize volume levels and create your ideal
          soundscape.
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
