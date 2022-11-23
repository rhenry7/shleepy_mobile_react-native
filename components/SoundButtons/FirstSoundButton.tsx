import * as React from 'react'
import { View, Button } from 'react-native'
import { Audio } from 'expo-av'
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from 'expo-av/build/AV'

export default function FirstSoundButton() {
  const [sound, setSound] = React.useState<Audio.Sound | null>()

  const initialStatus = {
    progressUpdateIntervalMillis: 500,
    positionMillis: 0,
    shouldPlay: false,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 1.0,
    isMuted: false,
    isLooping: false,
  }
  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/nature/birds.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  async function stopSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/nature/birds.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.stopAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <View>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} />
    </View>
  )
}

// then it needs to control the sound with individual on/off
