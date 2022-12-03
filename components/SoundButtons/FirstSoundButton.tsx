import * as React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { Audio } from 'expo-av'
import { styles } from './MixerStyles'
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from 'expo-av/build/AV'
import Slider from '@react-native-community/slider'
import { PlayStateToggle } from './PlayStateToggle'

export default function FirstSoundButton() {
  const [sound, setSound] = React.useState<Audio.Sound | null>()
  const [soundState, setSoundState] = React.useState<boolean>()
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
      require('../../sounds/nature/seagulls.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
    const soundPlaying = await sound.playAsync()
    if (soundPlaying.isLoaded) {
      soundPlaying.isPlaying ? setSoundState(true) : setSoundState(false)
    }
  }

  async function stopSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/nature/Tropical.wav'),
      initialStatus,
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.stopAsync()
    setSoundState(false)
  }

  async function handleVolumeChange() {
    await sound.setVolumeAsync(sliderValue)
    console.log(sliderValue)
    const soundChange = await sound.setVolumeAsync(sliderValue)
    if (soundChange.isLoaded) {
      console.log(soundChange.volume)
      if (0.16 > soundChange.volume) {
        await sound.setVolumeAsync(0)
      }
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
            step={0.05}
            value={sliderValue}
            onValueChange={(sliderValue) => {
              setSliderValue(sliderValue), handleVolumeChange()
            }}
            thumbTintColor={'#fffc7100'}
          />
        </View>
      </SafeAreaView>
    )
  }
  console.log({ soundState })
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            playSound
          }}
        >
          <Text style={[styles.buttonTitle]}>Birds</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 250,
          }}
        >
          <VolumeSlider />
        </View>

        <View>
          <Pressable onPress={stopSound}>
            {soundState ? (
              <PlayStateToggle iconName={'ellipse'} color={'#fff7c1'} />
            ) : (
              <PlayStateToggle iconName={'moon'} color={'#463AA0'} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}

// then it needs to control the sound with individual on/off
