import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Provider } from 'react-redux'
import { store } from './src/app/reducer/store'
import TrackPlayer, { RepeatMode, Capability } from 'react-native-track-player'
import SoundMixer from './components/SoundButtons/SoundMixer'
import { auth, storage } from './firebase/firebaseConfig'
import { Provider as PaperProvider } from 'react-native-paper'
import { PlaylistStackScreen } from './src/app/Stacks/PlaylistStack'
import { JournalStackScreen } from './src/app/Stacks/JournalStack'
import { AuthStackScreen } from './src/app/Stacks/AuthStack'
import { getDownloadURL, ref } from 'firebase/storage'
import { LineChart } from 'react-native-chart-kit'
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes'
import { View, Dimensions, Text } from 'react-native'

export function MyLineChart(props: { data: ChartData }) {
  return (
    <View>
      <Text>My Line Chart</Text>
      {
        //@ts-ignore:next-line
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      }
    </View>
  )
}

/*
The App component sets up and initializes the player.It defines an async function setup() which is used to set up the player if it has not been initialized yet. The function creates an array of tracks with properties id, url and title and temporarily disables the retrieval of the url property to save on data usage from Firebase.

The function then uses the TrackPlayer.setupPlayer() method to set up the player and the TrackPlayer.add() method to add the tracks to the player.

It then sets the repeat mode to Track and updates the player options to include capabilities such as play, pause, skip to next and previous, and stop.

The useEffect() hook is used to call the onStart() function when the component is loaded and it in turn calls the setup() function. This ensures that the player is set up and initialized when the app is first loaded.
*/

const Tab = createBottomTabNavigator()
export default function App() {
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
      let trackList: Track[] = [
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
      // TODO: Temporarily disabling the get for url to save on data usage from Firebase
      try {
        // trackList[0].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/crickets.wav'),
        // )
        // trackList[1].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/wind.wav'),
        // )
        // trackList[2].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/heavy_rain.mp3'),
        // )
        // trackList[3].url = await getDownloadURL(
        //   ref(storage, 'sounds/nature/seagulls.wav'),
        // )
        await TrackPlayer.add(trackList)
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
                component={SoundMixer}
                options={{ title: 'Mixer' }}
              />
              <Tab.Screen
                name="DreamJournal"
                component={JournalStackScreen}
                options={{ title: 'Journal' }}
              />
              <Tab.Screen name="Settings" component={MyLineChart} />
            </Tab.Group>
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  )
}
