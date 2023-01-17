import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AmbientSoundsList from '../../../components/categories/ambientSounds/ambientSounds'
import { PlaylistsChoice } from '../../../components/MainSelection'
import ButtonContainer from '../../../components/SoundButtons/ButtonContainer'
import { RootState } from '../reducer/store'
import { View, Text } from 'react-native'
import { Button, IconButton, Modal } from 'react-native-paper'
import { modalVisibleAction } from '../reducer/slices/modalSlice'
import SignUpScreen from '../../../components/auth/SignUp'
import SignInScreen from '../../../components/auth/SignIn'
import SignOut from '../../../components/auth/SignOut'
import SignOutScreen from '../../../components/auth/SignOut'

// TODO: consider renaming to "HomeStack" since this is basically the home screen for now

export function UserIcon({ navigation }) {
  const dispatch = useDispatch()
  const modalVisible = useSelector((state: RootState) => state.modal.modalState)
  console.log(modalVisible)

  return (
    // @ts-ignore:next-line
    <IconButton
      icon="account"
      mode="contained"
      iconColor={'#fff'}
      containerColor={'#463AA0ed'}
      onPress={() => {
        dispatch(modalVisibleAction(true))
        console.log(modalVisible)
      }}
      size={15}
    />
  )
}

// TODO: Replace modal from RN-Navigation, with modal from RN-paper
export function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button icon="plus" mode="contained" onPress={() => navigation.goBack()}>
        Go back
      </Button>
    </View>
  )
}

const PlaylistStack = createNativeStackNavigator()
export function PlaylistStackScreen({ navigation }) {
  const displayName = useSelector((state: RootState) => state.user.displayName)
  console.log({ displayName })

  return (
    <PlaylistStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#060523',
        },
        headerTintColor: '#F0EAD6',
        headerTitleStyle: { color: '#F0EAD6' },
        headerRight: () => <UserIcon navigation={navigation} />,
        headerTitle:
          'Goodnight, ' +
          ' ' +
          (displayName === null ? 'Shleepy Head' : displayName),
      }}
    >
      <PlaylistStack.Group>
        <PlaylistStack.Screen name={'playlists'} component={PlaylistsChoice} />
        <PlaylistStack.Screen
          name="SoundControllerScreen"
          component={ButtonContainer}
          options={{ title: 'Mixer' }}
        />
      </PlaylistStack.Group>
      <PlaylistStack.Group>
        <PlaylistStack.Screen name="Modal" component={ModalScreen} />
      </PlaylistStack.Group>
      <PlaylistStack.Screen name="Ambient" component={AmbientSoundsList} />
      <PlaylistStack.Screen name="Sign Up" component={SignUpScreen} />
      <PlaylistStack.Screen name="Sign In" component={SignInScreen} />
      <PlaylistStack.Screen name="Sign Out" component={SignOutScreen} />
    </PlaylistStack.Navigator>
  )
}
