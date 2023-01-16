import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { auth } from '../firebase/firebaseConfig'

export default function SignOut({ navigation }) {
  console.log(auth.currentUser.email)
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log(auth.currentUser.email)
        navigation.navigate('Playlists')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <View>
      <Button
        icon="account-plus-outline"
        mode="contained"
        onPress={() => {
          handleSignOut
        }}
        buttonColor={'#463AA0ed'}
      >
        Sign Up
      </Button>
      <Text>SignOut</Text>
    </View>
  )
}
