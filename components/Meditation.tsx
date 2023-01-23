import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'

const Meditation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            {
              // @ts-ignore:next-line
              <IconButton
                icon="moon-full"
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
