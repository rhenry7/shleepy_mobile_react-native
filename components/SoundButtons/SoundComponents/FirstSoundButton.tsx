import * as React from 'react'
import {
  View,
  Button,
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native'
import { Audio } from 'expo-av'
import { styles } from '../MixerStyles'
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from 'expo-av/build/AV'
import { PlayStateToggle } from '../PlayStateToggle'
import VolumeSlider from '../../Slider'
import Slider from '@react-native-community/slider'

export default function SecondSoundButton() {
  const [sound, setSound] = React.useState<Audio.Sound | null>()
  const [soundState, setSoundState] = React.useState<boolean>()

  const initialStatus = {
    progressUpdateIntervalMillis: 500,
    positionMillis: 0,
    shouldPlay: false,
    rate: 1.0,
    shouldCorrectPitch: false,
    volume: 0,
    isMuted: false,
    isLooping: true,
  }
  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../../sounds/nature/forrest.mp3'),
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

  const VolumeSlider = () => {
    const [sliderValue, setSliderValue] = React.useState<number>()
    const changeVolume = async () => {
      await sound.setVolumeAsync(sliderValue)
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[sliderStyle.container, { flexDirection: 'column' }]}>
          <Text style={{ color: 'black' }}>
            Value of slider is : {sliderValue}
          </Text>
          <Slider
            maximumValue={1}
            minimumValue={0}
            minimumTrackTintColor="#F0EAD6"
            maximumTrackTintColor="#463AA0"
            step={0.1}
            value={sliderValue}
            onValueChange={(sliderValue) => setSliderValue(sliderValue)}
            onSlidingComplete={changeVolume}
            thumbTintColor={'#fffc7100'}
          />
        </View>
      </SafeAreaView>
    )
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Pressable onPress={playSound}>
          <Text style={[styles.buttonTitle]}>Brook</Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 250,
          }}
        >
          <VolumeSlider />
        </View>

        <View></View>
      </View>
    </View>
  )
}

const sliderStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
})
