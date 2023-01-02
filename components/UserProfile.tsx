import { View, Text } from 'react-native'
import React from 'react'

export default function UserProfile() {
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <Text>Hi, UserProfile</Text>
      <Text>User Icon</Text>
    </View>
  )
}
