//https://aboutreact.com/react-native-slider/
import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider'

const VolumeSlider = () => {
  const [sliderValue, setSliderValue] = useState(15)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Text to show slider value*/}
        <Text style={{ color: 'black' }}>
          Value of slider is : {sliderValue}
        </Text>

        {/*Slider with max, min, step and initial value*/}
        <Slider
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="#fffc71"
          maximumTrackTintColor="#463AA0"
          step={1}
          value={sliderValue}
          onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          thumbTintColor={'#fffc7100'}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
})

export default VolumeSlider
