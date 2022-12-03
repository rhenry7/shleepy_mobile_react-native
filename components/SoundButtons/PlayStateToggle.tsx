import React from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const PlayStateToggle: React.FC<{ iconName: string; color: string }> = ({
  iconName = 'ios-play',
  color = 'white',
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ padding: 10, paddingTop: 10, justifyContent: 'center' }}>
          <Ionicons name={iconName} size={20} color={color}></Ionicons>
        </View>
      </View>
    </View>
  )
}
