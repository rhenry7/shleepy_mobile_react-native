import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AmbientSoundsList from '../../../components/categories/ambientSounds/ambientSounds'
import { PlaylistsChoice } from '../../../components/MainSelection'
import SoundMixer from '../../../components/SoundButtons/SoundMixer'
import { RootState } from '../reducer/store'
import { IconButton } from 'react-native-paper'
import { modalVisibleAction } from '../reducer/slices/modalSlice'
import SignUpScreen from '../../../components/auth/SignUp'
import SignInScreen from '../../../components/auth/SignIn'
import { auth } from '../../../firebase/firebaseConfig'
import CircleMeditation from '../../../components/meditationAnimations/CircleMeditation'

// TODO: consider renaming to "HomeStack" since this is basically the home screen for now

function UserIcon() {
  const dispatch = useDispatch()

  return (
    // @ts-ignore:next-line
    <IconButton
      icon="account"
      mode="contained"
      iconColor={'#fff'}
      containerColor={'#463AA0ed'}
      onPress={() => {
        dispatch(modalVisibleAction(true))
      }}
      size={15}
    />
  )
}

const PlaylistStack = createNativeStackNavigator()

export function PlaylistStackScreen() {
  const displayName = useSelector((state: RootState) => state.user.displayName)
  const currentUser = auth.currentUser

  console.log({ displayName, currentUser })

  return (
    <PlaylistStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#060523',
        },
        headerTintColor: '#F0EAD6',
        headerTitleStyle: { color: '#F0EAD6' },
        headerRight: () => <UserIcon />,
        headerTitle:
          'Goodnight, ' +
          ' ' +
          (currentUser === null ? 'Shleepy Head' : displayName),
      }}
    >
      <PlaylistStack.Group>
        <PlaylistStack.Screen name={'playlists'} component={PlaylistsChoice} />
        <PlaylistStack.Screen
          name="SoundControllerScreen"
          component={SoundMixer}
          options={{ title: 'Mixer' }}
        />
      </PlaylistStack.Group>
      <PlaylistStack.Screen name="Ambient" component={AmbientSoundsList} />
      <PlaylistStack.Screen name="Sign Up" component={SignUpScreen} />
      <PlaylistStack.Screen name="Sign In" component={SignInScreen} />
      <PlaylistStack.Screen
        name="CircleMeditation"
        component={CircleMeditation}
      />
    </PlaylistStack.Navigator>
  )
}
