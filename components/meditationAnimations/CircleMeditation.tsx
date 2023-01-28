import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

const CircleMeditation = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1))
  useEffect(() => {
    startAnimation()
  }, [])

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animation, {
          toValue: 0.5,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.elastic(1),
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ).start()
  }

  const circleStyle = {
    transform: [{ scale: animation }],
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, circleStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#060523',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#463AA0',
  },
})

export default CircleMeditation