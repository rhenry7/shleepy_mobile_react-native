import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PlaylistsChoice } from './components/MainSelection'

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

function DetailsScreen({ navigation }) {
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
          if (route.name === 'UserProfile') {
            iconName = focused ? 'person-circle' : 'person-circle'
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
        component={HomeScreen}
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
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  )
}

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Bottom"
          options={{
            title: 'Good Night', // make user_name dynamic
            headerStyle: {
              backgroundColor: '#060523',
            },
            headerTintColor: '#F0EAD6',
          }}
          component={BottomTab}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#463AA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: '#F0EAD6', //"eggshell"
  },
})
