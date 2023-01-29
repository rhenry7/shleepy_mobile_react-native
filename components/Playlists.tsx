import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { MenuButton } from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { modalVisibleAction } from '../src/app/reducer/slices/modalSlice'
import { RootState } from '../src/app/reducer/store'
import { styles } from '../styles'
import { Modal, Portal, Button, IconButton } from 'react-native-paper'
import { auth } from '../firebase/firebaseConfig'
import { setCurrentUser } from '../src/app/reducer/slices/userSlice'

// change name from "playlist" to "Home/Main Nav"
function Playlists({ navigation }) {
  const dispatch = useDispatch()
  const modalVisible = useSelector((state: RootState) => state.modal.modalState)

  const handleSignOut = async () => {
    await auth
      .signOut()
      .then(() => {
        if (auth.currentUser) {
          console.log(auth.currentUser.email)
        } else {
          console.log('User is not signed in.')
          alert('You cant be signed out because you arent signed in!')
          return
        }
        alert('Successfully signed out!')
        dispatch(
          setCurrentUser({
            email: '',
            displayName: '',
            id: '',
          }),
        )
        navigation.navigate('Playlists')
      })
      .catch((error) => {
        if (auth.currentUser) {
          console.log(auth.currentUser.email)
        } else {
          console.log('User is not signed in.')
        }
        alert(error.message)
      })
  }

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
            <View style={modalStyles.modalBody}>
              <Pressable
                onPress={() => {
                  dispatch(modalVisibleAction(false))
                  navigation.navigate('Sign Up')
                }}
              >
                <Button
                  style={modalStyles.authContent}
                  icon="plus"
                  mode="contained"
                  buttonColor={'#463AA0ed'}
                >
                  Sign Up
                </Button>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('Sign In')
                  dispatch(modalVisibleAction(false))
                }}
              >
                <Button
                  style={modalStyles.authContent}
                  icon="arrow-right"
                  mode="contained"
                  buttonColor={'#463AA0ed'}
                >
                  Sign In
                </Button>
              </Pressable>

              <Pressable
                onPress={() => {
                  handleSignOut()
                  dispatch(modalVisibleAction(false))
                }}
              >
                <Button
                  style={modalStyles.authContent}
                  icon="minus"
                  mode="contained"
                  buttonColor={'#463AA0ed'}
                >
                  Sign Out
                </Button>
              </Pressable>
            </View>
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

    justifyContent: 'flex-start',
    backgroundColor: '#060523',
    padding: 15,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 0.3,
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: [{ translateX: -20 }, { translateY: -380 }],
  },

  authContent: {
    display: 'flex',
    alignItems: 'center',
    margin: 15,
  },
  modalBody: {
    margin: 20,
  },

  modalContent: {
    color: '#000',
    backgroundColor: 'blue',
    display: 'flex',
    // alignContent: 'flex-start',
    // justifyContent: 'center',
    maxWidth: '9%',
    margin: 1,
    padding: 32,
    borderRadius: 8,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Playlists
