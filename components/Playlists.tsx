import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { MenuButton } from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { modalVisibleAction } from '../src/app/reducer/slices/modalSlice'
import { RootState } from '../src/app/reducer/store'
import { styles } from '../styles'
import { Modal, Portal, Button, IconButton } from 'react-native-paper'

//TODO: add the Modal here, and also to state for a sort of "global modal?"

function Playlists({ navigation }) {
  const dispatch = useDispatch()
  const modalVisible = useSelector((state: RootState) => state.modal.modalState)

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
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            dispatch(modalVisibleAction(false))
          }}
          style={modalStyles.modalContainer}
        >
          <View>
            {
              // @ts-ignore:next-line
              <IconButton
                icon="close"
                mode="contained"
                iconColor={'#fff'}
                containerColor={'#463AA0ed'}
                onPress={() => {
                  dispatch(modalVisibleAction(false))
                  console.log(modalVisible)
                }}
                size={15}
              />
            }

            <Button
              style={modalStyles.buttonContainer}
              icon="plus"
              mode="contained"
              onPress={() => {
                navigation.navigate('Sign Up')
                dispatch(modalVisibleAction(false))
              }}
              buttonColor={'#463AA0ed'}
            >
              Sign Up
            </Button>
            <Button
              style={modalStyles.buttonContainer}
              icon="arrow-right"
              mode="contained"
              onPress={() => {
                navigation.navigate('Sign In')
                dispatch(modalVisibleAction(false))
              }}
              buttonColor={'#463AA0ed'}
            >
              Sign In
            </Button>
            <Button
              style={modalStyles.buttonContainer}
              icon="minus"
              mode="contained"
              onPress={() => {
                navigation.navigate('Sign Out')
                dispatch(modalVisibleAction(false))
              }}
              buttonColor={'#463AA0ed'}
            >
              Sign Out
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  )
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 2,
    flexDirection: 'column',
    //alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#060523',
    padding: 15,
    borderRadius: 8,
    zIndex: 10,
    borderColor: '#fff',
    borderWidth: 0.3,
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: [{ translateX: -20 }, { translateY: -380 }],
  },

  buttonContainer: {
    //margin: 20,
    display: 'flex',
    alignItems: 'flex-start',
    margin: 13,
  },

  modalContent: {
    color: '#000',
    backgroundColor: 'blue',
    display: 'flex',
    // alignContent: 'flex-start',
    // justifyContent: 'center',
    maxWidth: '98%',
    margin: 10,
    padding: 32,
    borderRadius: 8,
  },
  modalMainContent: {},
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Playlists
