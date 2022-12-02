import * as React from 'react'
import { View, Button, SafeAreaView, Text } from 'react-native'
import { Audio } from 'expo-av'
import { styles } from './MixerStyles'
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from 'expo-av/build/AV'
import Slider from '@react-native-community/slider'

export default function SecondSoundButton() {
  const [sound, setSound] = React.useState<Audio.Sound | null>()
  const [sliderValue, setSliderValue] = React.useState<number>()

  const initialStatus = {
    progressUpdateIntervalMillis: 500,
    positionMillis: 0,
    shouldPlay: false,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: sliderValue,
    isMuted: false,
    isLooping: true,
  }
  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/nature/rain_02.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  async function stopSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/nature/rain_02.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.stopAsync()
  }

  async function handleVolumeChange() {
    await sound.setVolumeAsync(sliderValue)
    const soundChange = await sound.setVolumeAsync(sliderValue)
    if (soundChange.isLoaded) {
      console.log(soundChange.volume)
      if (soundChange.volume > 0.16) await sound.setVolumeAsync(0)
    }
    console.log(await sound.setVolumeAsync(sliderValue))
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
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[{ flexDirection: 'column' }]}>
          <Slider
            maximumValue={1}
            minimumValue={0}
            minimumTrackTintColor="#fff7c1"
            maximumTrackTintColor="#463AA0"
            step={0.15}
            value={sliderValue}
            onValueChange={(sliderValue) => {
              setSliderValue(sliderValue), handleVolumeChange()
            }}
            thumbTintColor={'#fffc710'}
          />
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
        <Button title="Rain" onPress={playSound} />
        <VolumeSlider />
        <Button title="Stop" onPress={stopSound} />
      </View>
    </View>
  )
}

// then it needs to control the sound with individual on/off
