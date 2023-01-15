import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PlaylistsChoice } from './components/MainSelection'
import AmbientSoundsList from './components/categories/ambientSounds/ambientSounds'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from './src/app/reducer/store'
import TrackPlayer, { RepeatMode, Capability } from 'react-native-track-player'
import ButtonContainer from './components/SoundButtons/ButtonContainer'
import SignInScreen from './components/SignIn'
import SignUpScreen from './components/SignUp'
import { getDownloadURL, ref } from 'firebase/storage'
import { auth, storage } from './firebase/firebaseConfig'
import { useEffect, useState } from 'react'
import { Button, Provider as PaperProvider } from 'react-native-paper'
import { IconButton } from 'react-native-paper'
import Journal from './components/Journal'
import { View, Text } from 'react-native'

const PlaylistStack = createNativeStackNavigator()

function UserIcon({ navigation }) {
  return (
    // @ts-ignore:next-line
    <IconButton
      icon="account"
      mode="contained"
      iconColor={'#fff'}
      containerColor={'#463AA0ed'}
      onPress={() => navigation.navigate('Modal')}
      size={15}
    />
  )
}

function PlaylistStackScreen({ navigation }) {
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

const journalStack = createNativeStackNavigator()

function JournalStackScreen() {
  return (
    <journalStack.Navigator screenOptions={{ headerShown: false }}>
      <journalStack.Screen name="journal" component={Journal} />
    </journalStack.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button icon="plus" mode="contained" onPress={() => navigation.goBack()}>
        Go back
      </Button>
    </View>
  )
}

export default function App(state: RootState) {
  console.log({ auth: auth.currentUser })
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
        // tracksTwo[0].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/crickets.wav'),
        // )
        // tracksTwo[1].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/wind.wav'),
        // )
        // tracksTwo[2].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/heavy_rain.mp3'),
        // )
        // tracksTwo[3].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/seagulls.wav'),
        // )
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

                if (route.name === 'Settings') {
                  iconName = 'person-circle-outline'
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-apps' : 'ios-apps'
                }
                if (route.name === 'Playlists') {
                  iconName = focused ? 'ios-list' : 'ios-list'
                }
                if (route.name === 'SoundControllerScreen') {
                  iconName = focused ? 'options' : 'options-outline'
                }
                if (route.name === 'DreamJournal') {
                  iconName = focused ? 'book' : 'book-outline'
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
            <Tab.Group>
              <Tab.Screen name="Playlists" component={PlaylistStackScreen} />
              <Tab.Screen
                name="SoundControllerScreen"
                component={ButtonContainer}
                options={{ title: 'Mixer' }}
              />
              <Tab.Screen
                name="DreamJournal"
                component={JournalStackScreen}
                options={{ title: 'Journal' }}
              />
              <Tab.Screen name="Settings" component={AuthStackScreen} />
            </Tab.Group>
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
