import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import Playlists from './Playlists'

const Meditation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('CircleMeditation')}>
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              {
                // @ts-ignore:next-line
                <IconButton icon="moon-full" iconColor={'#fff'} size={35} />
              }
              <Text style={{ color: 'white' }}>
                Main sleep meditation thing
              </Text>
            </Card.Content>
          </Card>
        </Pressable>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            {
              // @ts-ignore:next-line
              <IconButton
                icon="flower-outline"
                iconColor={'#fff'}
                size={35}
                onPress={() => console.log('Pressed')}
              />
            }
            <Text style={{ color: 'white' }}>Main sleep meditation thing</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            {
              // @ts-ignore:next-line
              <IconButton
                icon="map"
                iconColor={'#fff'}
                size={35}
                onPress={() => console.log('Pressed')}
              />
            }
            <Text style={{ color: 'white' }}>Main sleep meditation thing</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            {
              // @ts-ignore:next-line
              <IconButton
                icon="waves"
                iconColor={'#fff'}
                size={35}
                onPress={() => console.log('Pressed')}
              />
            }
            <Text style={{ color: 'white' }}>Main sleep meditation thing</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const Tab = createMaterialTopTabNavigator()

export function PlaylistsChoice() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12, color: '#F0EAD6' },
        tabBarIndicatorStyle: {
          backgroundColor: '#463AA0ed',
        },
        tabBarStyle: { backgroundColor: '#060523' },
      }}
    >
      <Tab.Screen name="Playlists" component={Playlists} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#060523',
    //justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 150,
    height: 150,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#463AA0',
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    // paddingTop: 20,
    //backgroundColor: '#060523',
    justifyContent: 'center',
  },
})

export default Meditation
