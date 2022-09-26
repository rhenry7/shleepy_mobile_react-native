import React from 'react'
import { View } from 'react-native'
import { styles } from '../../styles'
import { MenuButton } from '../Button'

const AmbientSoundsList = ({ navigation }) => {
  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <MenuButton title="Deep Space" description="empty void of space" />
        </View>
        <View>
          <MenuButton title="Vacuum" description="random whiff of machinery" />
        </View>

        <View>
          <MenuButton title="Heavy Hum" description="obscure but familiar" />
        </View>
        <View>
          <MenuButton
            title="Air Condition"
            description="interior background, office or lobby"
          />
        </View>
      </View>
    </View>
  )
}

export default AmbientSoundsList
