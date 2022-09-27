import React from 'react'
import { Pressable, View } from 'react-native'
import { styles } from '../../styles'
import { MenuButton } from '../Button'
//import { Audio } from 'expo-av'
import { connect } from 'react-redux'
import { soundToggled } from '../../src/app/soundSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../src/app/store'

const AmbientSoundsList = () => {
  const sound = useSelector((state: RootState) => state.sounds.soundState)
  // where does the  selected sound go?
  const dispatch = useDispatch()

  // const [sound, setSound] = React.useState<Audio.Sound | null>(null)
  //   async function playSound() {
  //     console.log('Loading Sound...')
  //     const { sound } = await Audio.Sound.createAsync(
  //       require('../../sounds/ambient/Deep_Space.wav'),
  //     )
  //     setSound(sound)

  //     console.log('Playing Sound')
  //     await sound.playAsync()
  //   }

  //   React.useEffect(() => {
  //     return sound
  //       ? () => {
  //           console.log('Unloading Sound')
  //           sound.unloadAsync()
  //         }
  //       : undefined
  //   }, [sound])

  return (
    <View style={styles.container_list}>
      <View>
        <View>
          <Pressable
            onPress={() => {
              dispatch(soundToggled)
            }}
          >
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

const mapStateToProps = (state) => {
  const { sound } = state
  return { sound }
}

//export default connect(mapStateToProps)(HomeScreen);
export default connect(mapStateToProps)(AmbientSoundsList)
