import { Button, StyleSheet, Text, View } from 'react-native'
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
import FirstSoundButton from './components/SoundButtons/FirstSoundButton'
import ButtonContainer from './components/SoundButtons/ButtonContainer'
import SignInScreen from './components/SignIn'
import SignUpScreen from './components/SignUp'
import { auth } from './firebase/firebaseConfig'

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#060523',
      }}
    >
      <Text style={styles.white}>Home Screen</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="UserProfile"
        onPress={() => navigation.navigate('UserProfile')}
      />
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  )
}

function UserProfile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  )
}

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-apps' : 'ios-apps'
          }
          if (route.name === 'PlaylistsChoice') {
            iconName = focused ? 'ios-list' : 'ios-list'
          }
          if (route.name === 'SoundControllerScreen') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
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
      <Tab.Screen
        name="Home"
        component={SignUpScreen}
        options={{
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#060523',
          },
        }}
      />
      <Tab.Screen
        name="PlaylistsChoice"
        component={PlaylistsChoice}
        options={{ title: 'Sounds' }}
      />
      <Tab.Screen
        name="SoundControllerScreen"
        component={ButtonContainer}
        options={{ title: 'Mixer' }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="UserProfile" component={UserProfile} /> */}
    </Tab.Navigator>
  )
}

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
  }

  React.useEffect(() => {
    if (auth.currentUser) {
      setup()
    }
  }, [])
  // return (
  //   <Provider store={store}>
  //     <NavigationContainer>
  //       <Tab.Navigator>
  //         <Stack.Navigator
  //           screenOptions={{
  //             headerStyle: {
  //               backgroundColor: '#060523',
  //             },
  //             headerTintColor: '#F0EAD6',
  //           }}
  //         >
  //           <Stack.Screen
  //             name="Bottom"
  //             options={{
  //               title: '', // make user_name dynamic
  //             }}
  //             component={BottomTab}
  //           />
  //           <Stack.Screen
  //             name="Details"
  //             options={{ headerShown: false }}
  //             component={DetailsScreen}
  //           />
  //           <Tab.Screen
  //             name="Sign Up"
  //             options={{ headerShown: false }}
  //             component={SignUpScreen}
  //           />
  //           <Tab.Screen
  //             name="Sign In"
  //             options={{ headerShown: false }}
  //             component={SignInScreen}
  //           />
  //           <Stack.Screen name="Ambient" component={AmbientSoundsList} />
  //         </Stack.Navigator>
  //       </Tab.Navigator>
  //     </NavigationContainer>
  //   </Provider>
  // )
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'Auth') {
                iconName = focused ? 'ios-home' : 'ios-home-outline'
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-apps' : 'ios-apps'
              }
              if (route.name === 'Playlists') {
                iconName = focused ? 'ios-list' : 'ios-list'
              }
              if (route.name === 'SoundControllerScreen') {
                iconName = focused ? 'person-circle' : 'person-circle-outline'
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212124',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: '#F0EAD6', //"eggshell"
  },
})
