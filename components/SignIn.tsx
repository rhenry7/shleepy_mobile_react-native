import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, provider } from '../firebase/firebaseConfig'

function SignInScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      })
      console.log('auth failure')
      return
    }

    try {
      console.log('auth success')
      await signInWithEmailAndPassword(auth, value.email, value.password)
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          // The signed-in user info.
          const user = result.user
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.customData.email
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        })
    } catch (error) {}
  }

  return (
    <View>
      <View>
        <Text>Sign In</Text>
        <View>
          <View>
            <View>
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View>
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={false}
              />
            </View>
          </View>
          <Pressable>
            <Text onPress={signIn}>Sign In</Text>
            <Text onPress={signInWithGoogle}>Sign In With Google</Text>
          </Pressable>
        </View>
        <Text>
          Don't Have an account?{' '}
          <Text onPress={() => navigation.navigate('Sign Up')}>Sign Up</Text>
        </Text>
      </View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
})
