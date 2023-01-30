import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated, Easing, Text } from 'react-native'

const CircleMeditation = () => {
  const animation = new Animated.Value(1)
  useEffect(() => {
    startAnimation()
  }, [])

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animation, {
          toValue: 2,
          duration: 5000,
          useNativeDriver: true,
          easing: Easing.linear,
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
      <View style={{ padding: 20 }}>
        <Animated.View style={[styles.circle, circleStyle]} />
      </View>
      <Text
        style={{
          color: '#F0EAD6',
          paddingTop: 80,
          fontSize: 24,
          fontWeight: '400',
        }}
      >
        breathe in, breathe out
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
