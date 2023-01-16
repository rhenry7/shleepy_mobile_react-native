import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { MenuButton } from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { modalVisibleAction } from '../src/app/reducer/slices/modalSlice'
import { RootState } from '../src/app/reducer/store'
import { styles } from '../styles'
import { Modal } from 'react-native-paper'

//TODO: add the Modal here, and also to state for a sort of "global modal?"

function Playlists({ navigation }) {
  const dispatch = useDispatch()
  const modalVisible = useSelector((state: RootState) => state.modal.modalState)
  console.log(modalVisible)

  return (
    <>
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
      <Modal
        visible={modalVisible}
        onDismiss={() => {
          dispatch(modalVisibleAction(false))
        }}
        contentContainerStyle={modalStyles.modalContainer}
        style={modalStyles.modalContainer}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </>
  )
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // zIndex: 10,
  },
})

export default Playlists
