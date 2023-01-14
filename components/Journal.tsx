import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'

interface JournalProps {}

const Journal: React.FC<JournalProps> = () => {
  const [entry, setEntry] = useState([])
  const [newEntry, setNewEntry] = useState('')

  const handleAddTodo = () => {
    if (newEntry !== '') {
      setEntry([...entry, { text: newEntry, timestamp: moment().format() }])
      setNewEntry('')
    }
  }

  return (
    <View style={[styles.container]}>
      <View>
        <TextInput
          placeholder="How was your sleep?"
          placeholderTextColor={'#463AA090'}
          style={styles.inputText}
          value={newEntry}
          onChangeText={(text) => setNewEntry(text)}
        />
        <Button
          style={styles.buttonContainer}
          icon="plus"
          mode="contained"
          onPress={handleAddTodo}
          buttonColor={'#463AA0ed'}
        >
          Add Entry
        </Button>
        {entry.map((todo, index) => (
          <View key={index}>
            <Text style={colors.white}>{todo.text}</Text>
            <Text style={colors.white}>{todo.timestamp}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export const colors = StyleSheet.create({
  primary: {
    color: '#463AA00',
  },
  secondary: {
    color: '#060523',
  },
  highlight: {
    color: '#fff7c1',
  },
  white: {
    color: '#fff',
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.secondary.color,
    color: '#fff',
    paddingVertical: 120,
  },
  buttonContainer: {
    margin: 20,
  },
  inputText: {
    color: colors.highlight.color,
    placeholderTextColor: '#000',
    fontWeight: '300',
    fontSize: 24,
    borderColor: colors.primary.color,
    borderBottomWidth: 1,
  },
})

export default Journal
