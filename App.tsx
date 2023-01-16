import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Provider } from 'react-redux'
import { RootState, store } from './src/app/reducer/store'
import TrackPlayer, { RepeatMode, Capability } from 'react-native-track-player'
import ButtonContainer from './components/SoundButtons/ButtonContainer'
import { auth } from './firebase/firebaseConfig'
import { Provider as PaperProvider } from 'react-native-paper'
import { PlaylistStackScreen } from './src/app/Stacks/PlaylistStack'
import { JournalStackScreen } from './src/app/Stacks/JournalStack'
import { AuthStackScreen } from './src/app/Stacks/AuthStack'

const Tab = createBottomTabNavigator()
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
      // Temporarily disabling the get for url to save on data usage from Firebase
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
