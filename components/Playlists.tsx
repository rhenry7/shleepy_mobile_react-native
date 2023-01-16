import React from 'react'
import { Pressable, View } from 'react-native'
import { MenuButton } from './Button'
import { styles } from '../styles'

//TODO: add the Modal here, and also to state for a sort of "global modal?"

function Playlists({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Pressable onPress={() => navigation.navigate('Ambient')}>
            <MenuButton
              title="Ambient"
              description="White Noise & Ambient Sounds"
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>
        <View>
          <MenuButton
            title="Nature"
            description="Sounds of the outdoors"
            iconName="leaf"
          />
        </View>

        <View>
          <MenuButton
            title="ASMR"
            description="Relaxing obscure noises"
            iconName="planet"
          />
        </View>
        <View>
          <MenuButton
            title="City"
            description="Sounds of the urban life"
            iconName="business-outline"
          />
        </View>
      </View>
    </View>
  )
}

export default Playlists
