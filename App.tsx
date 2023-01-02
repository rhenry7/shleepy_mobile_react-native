import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PlaylistsChoice } from './components/MainSelection'
import AmbientSoundsList from './components/categories/ambientSounds/ambientSounds'
import { Provider } from 'react-redux'
import { store } from './src/app/reducer/store'
import TrackPlayer, { RepeatMode, Capability } from 'react-native-track-player'
import ButtonContainer from './components/SoundButtons/ButtonContainer'
import SignInScreen from './components/SignIn'
import SignUpScreen from './components/SignUp'
import { getDownloadURL, ref } from 'firebase/storage'
import { auth, storage } from './firebase/firebaseConfig'
import { useEffect, useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { IconButton } from 'react-native-paper'

const PlaylistStack = createNativeStackNavigator()

console.log(auth.currentUser)

function LogoTitle() {
  return (
    // @ts-ignore:next-line
    <IconButton
      icon="account"
      mode="outlined"
      iconColor={'#463AA0ed'}
      containerColor={'#fff'}
      size={15}
    />
  )
}

function PlaylistStackScreen() {
  const [user, setUser] = useState('')
  async function getUserName() {
    const userName = await auth.currentUser.displayName
    setUser(userName)
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName)
      }
    })
    return unsubscribe
  }, [])
  getUserName()
  return (
    <PlaylistStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#060523',
        },
        headerTintColor: '#F0EAD6',
        headerTitleStyle: { color: '#F0EAD6' },
        headerRight: () => <LogoTitle />,
        headerTitle:
          'Goodnight, ' + ' ' + (user === null ? 'Shleepy Head' : user),
      }}
    >
      <PlaylistStack.Screen name={'playlists'} component={PlaylistsChoice} />
      <PlaylistStack.Screen
        name="SoundControllerScreen"
        component={ButtonContainer}
        options={{ title: 'Mixer' }}
      />
      <Stack.Screen name="Ambient" component={AmbientSoundsList} />
    </PlaylistStack.Navigator>
  )
}

const authStack = createNativeStackNavigator()

function AuthStackScreen() {
  return (
    <authStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#060523',
        },
        headerTintColor: '#F0EAD6',
        headerTitleStyle: { color: '#060523' },
      }}
    >
      <authStack.Screen name="Sign Up" component={SignUpScreen} />
      <authStack.Screen name="Sign In" component={SignInScreen} />
    </authStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function App() {
  interface Track {
    id: number
    url: string
    title: string
  }

  let playerInitialized = false

  async function setup() {
    if (!playerInitialized) {
      await TrackPlayer.setupPlayer({})
      let tracksTwo: Track[] = [
        {
          id: 1,
          url: '',
          title: 'Wind',
        },
        {
          id: 2,
          url: '',
          title: 'Rain',
        },
        {
          id: 3,
          url: '',
          title: 'Crickets',
        },
        {
          id: 4,
          url: '',
          title: 'Blues Beat',
        },
      ]
      try {
        tracksTwo[0].url = await getDownloadURL(
          ref(storage, 'sounds/nature/crickets.wav'),
        )
        tracksTwo[1].url = await getDownloadURL(
          ref(storage, 'sounds/nature/wind.wav'),
        )
        tracksTwo[2].url = await getDownloadURL(
          ref(storage, 'sounds/nature/heavy_rain.mp3'),
        )
        tracksTwo[3].url = await getDownloadURL(
          ref(storage, 'sounds/nature/seagulls.wav'),
        )

        console.log('TRACK ARRAY LENGTH', tracksTwo.length)
        await TrackPlayer.add(tracksTwo)
      } catch (error) {
        console.error(error)
      }

      playerInitialized = true
    }
    TrackPlayer.setRepeatMode(RepeatMode.Track)
    console.log('Tracks added')
    try {
      TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      })
    } catch {
      console.log('you have a set up track error')
    }
  }

  React.useEffect(() => {
    const onStart = async () => {
      await setup()
    }
    onStart()
  }, [])
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName

                if (route.name === 'Auth') {
                  iconName = focused ? 'person-circle' : 'person-circle-outline'
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-apps' : 'ios-apps'
                }
                if (route.name === 'Playlists') {
                  iconName = focused ? 'ios-list' : 'ios-list'
                }
                if (route.name === 'SoundControllerScreen') {
                  iconName = focused ? 'options' : 'options-outline'
                }

                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: '#FEF7C1',
              tabBarInactiveTintColor: '#949494',
              tabBarStyle: {
                backgroundColor: '#060523',
                borderTopColor: 'transparent',
              },
            })}
          >
            <Tab.Screen name="Auth" component={AuthStackScreen} />
            <Tab.Screen name="Playlists" component={PlaylistStackScreen} />
            <Tab.Screen
              name="SoundControllerScreen"
              component={ButtonContainer}
              options={{ title: 'Mixer' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
