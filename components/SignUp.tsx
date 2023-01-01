import React, { useEffect } from 'react'
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

function SignUpScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
    name: '',
  })
  console.log(value)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Playlists')
      }
    })
    return unsubscribe
  }, [])

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      })
      alert('you must fill all fields')
      console.log('auth failure')
      return
    }

    if (value.error) alert(value.error)
    console.log(value)
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)

      await updateProfile(auth.currentUser, {
        displayName: value.name,
      }).catch((err) => console.log(err))
      setValue({ email: '', password: '', error: '', name: '' })
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={[styles.container]}>
      <Text style={styles.buttonText}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <View>
            <View>
              <TextInput
                placeholder="Name"
                placeholderTextColor={colors.primary.color}
                value={value.name}
                onChangeText={(text) => setValue({ ...value, name: text })}
                style={styles.inputText}
              />
            </View>
          </View>
        </View>
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
        <Pressable>
          <Text style={styles.legalInfo}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Text>
          <Text
            onPress={signUp}
            style={[styles.actionButton, styles.highlight]}
          >
            Sign Up
          </Text>
          <Text style={styles.actionButton}>
            Have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Sign In')}
              style={[styles.actionButton, styles.highlight]}
            >
              Sign In
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignUpScreen

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
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 32,
    alignItems: 'center',
  },
})
