import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'

const Meditation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={{ color: '#F0EAD6' }}>
          Choose a type of meditation that will help you relax, feel calm and go
          to sleep. Watch the animation and match your breathing to the pattern.
        </Text>
      </View>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('CircleMeditation')}>
          <Card style={styles.card}>
            <Card.Content style={styles.content}>
              {
                // @ts-ignore:next-line
                <IconButton icon="moon-full" iconColor={'#F0EAD6'} size={35} />
              }
              <Text style={{ color: '#F0EAD6' }}>
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
                iconColor={'#F0EAD6'}
                size={35}
                onPress={() => console.log('Pressed')}
              />
            }
            <Text style={{ color: '#F0EAD6' }}>
              Main sleep meditation thing
            </Text>
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
                iconColor={'#F0EAD6'}
                size={35}
                onPress={() => console.log('Pressed')}
              />
            }
            <Text style={{ color: '#F0EAD6' }}>
              Main sleep meditation thing
            </Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            {
              // @ts-ignore:next-line
              <IconButton
                icon="waves"
                iconColor={'#F0EAD6'}
                size={35}
                onPress={() => console.log('Pressed')}
              />
            }
            <Text style={{ color: '#F0EAD6' }}>
              Main sleep meditation thing
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#060523',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  card: {
    width: 150,
    height: 150,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#463AA0',
    color: '#F0EAD6',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Meditation
