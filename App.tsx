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
import { tracks } from './sounds/Tracks'
import ButtonContainer from './components/SoundButtons/ButtonContainer'
import SignInScreen from './components/SignIn'
import SignUpScreen from './components/SignUp'

const PlaylistStack = createNativeStackNavigator()

function PlaylistStackScreen() {
  return (
    <PlaylistStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#060523',
        },
        headerTintColor: '#F0EAD6',
        headerTitleStyle: { color: '#060523' },
      }}
    >
      <PlaylistStack.Screen name="Playlist" component={PlaylistsChoice} />
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
  async function setup() {
    TrackPlayer.setupPlayer({})
    await TrackPlayer.add(tracks)
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
    </Provider>
  )
}
