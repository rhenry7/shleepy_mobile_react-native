import * as React from 'react'
import { View, Button, SafeAreaView, Text } from 'react-native'
import { Audio } from 'expo-av'
import { styles } from './MixerStyles'
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from 'expo-av/build/AV'
import Slider from '@react-native-community/slider'

export default function FirstSoundButton() {
  const [sound, setSound] = React.useState<Audio.Sound | null>()
  const [sliderValue, setSliderValue] = React.useState<number>()
  //const [volume, setVolume] = React.useState<number>(sliderValue)

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
    //await sound.setVolumeAsync(volume)
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

  async function setVolume(volume: number) {
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/nature/birds.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.setVolumeAsync(volume)
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const VolumeSlider = () => {
    setVolume(sliderValue)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[{ flexDirection: 'column' }]}>
          <Slider
            maximumValue={1}
            minimumValue={0}
            minimumTrackTintColor="#fff7c1"
            maximumTrackTintColor="#463AA0"
            step={0.1}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
            thumbTintColor={'#fffc710'}
          />
          <Text>Value of slider is : {sliderValue}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button title="Play Sound" onPress={playSound} />
        <Button title="Stop Sound" onPress={stopSound} />
      </View>
      <VolumeSlider />
    </View>
  )
}

// then it needs to control the sound with individual on/off
