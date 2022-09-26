import React from 'react'
import { Pressable, View } from 'react-native'
import { styles } from '../../styles'
import { MenuButton } from '../Button'
import { Audio } from 'expo-av'

const AmbientSoundsList = ({ navigation }) => {
  const [sound, setSound] = React.useState<Audio.Sound | null>(null)

  async function playSound() {
    console.log('Loading Sound...')
    const { sound } = await Audio.Sound.createAsync(
      require('../../sounds/ambient/Deep_Space.wav'),
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])
  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <Pressable onPress={playSound}>
            <MenuButton
              title="Deep Space"
              description="empty void of space"
              iconName="color-filter-outline"
            />
          </Pressable>
        </View>
        <View>
          <MenuButton
            title="Vacuum"
            description="random whiff of machinery"
            iconName="color-filter-outline"
          />
        </View>

        <View>
          <MenuButton
            title="Heavy Hum"
            description="obscure but familiar"
            iconName="color-filter-outline"
          />
        </View>
        <View>
          <MenuButton
            title="Air Condition"
            description="interior background, office or lobby"
            iconName="color-filter-outline"
          />
        </View>
      </View>
    </View>
  )
}

export default AmbientSoundsList
