import React from 'react'
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native'
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

  console.log({ auth: auth.currentUser })

  async function Login() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      })
      alert('you must enter an email and password')
      console.log('auth failure')
      return
    }

    try {
      console.log('auth success')
      await signInWithEmailAndPassword(auth, value.email, value.password)
      setValue({ email: '', password: '', error: '' })
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
    <View style={[styles.container]}>
      <Text style={styles.buttonText}>Login</Text>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <View>
            <View>
              <TextInput
                placeholder="Email"
                placeholderTextColor={colors.primary.color}
                value={value.email}
                onChangeText={(text) => setValue({ ...value, email: text })}
                style={styles.inputText}
              />
            </View>
          </View>
        </View>
        <View style={styles.input}>
          <View>
            <View>
              <TextInput
                placeholder="Password"
                placeholderTextColor={colors.primary.color}
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
                style={styles.inputText}
              />
            </View>
          </View>
        </View>
        <Pressable style={styles.extraPaddedSpace}>
          <Text onPress={Login} style={[styles.actionButton, styles.highlight]}>
            Login
          </Text>
          <Text style={styles.actionButton}>
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Sign Up')}
              style={[styles.actionButton, styles.highlight]}
            >
              Sign Up
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignInScreen

export const colors = StyleSheet.create({
  primary: {
    color: '#463AA0',
  },
  secondary: {
    color: '#060523',
  },
  highlight: {
    color: '#fff7c1',
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary.color,
    color: '#fff',
    paddingVertical: 120,
  },
  highlight: {
    color: '#fff',
    fontWeight: '500',
  },
  inputContainer: {
    paddingVertical: 30,
    width: '90%',
  },
  legalInfo: {
    color: '#fff7',
    fontSize: 8,
    paddingLeft: 15,
    padding: 10,
  },
  actionButton: {
    color: 'white',
    fontWeight: '300',
    fontSize: 18,
    paddingLeft: 15,
    paddingVertical: 3,
  },
  input: {
    color: colors.primary.color,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputText: {
    color: colors.highlight.color,
    placeholderTextColor: '#000',
    fontWeight: '300',
    fontSize: 24,
    borderBottomColor: colors.primary.color,
    borderBottomWidth: 1,
  },
  extraPaddedSpace: {
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 32,
    alignItems: 'center',
  },
})
