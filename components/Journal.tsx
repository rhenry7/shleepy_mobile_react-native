import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'
import { Modal } from 'react-native-paper'

interface JournalProps {}

const Journal: React.FC<JournalProps> = () => {
  const [entry, setEntry] = useState([])
  const [newEntry, setNewEntry] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  const handleAddTodo = () => {
    if (newEntry !== '') {
      setEntry([
        ...entry,
        { text: newEntry, timestamp: moment().format('MM/DD/YYYY') },
      ])
      setNewEntry('')
    }
  }

  const handlePress = (entry) => {
    setModalVisible(true)
    setSelectedEntry(entry)
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.inputContainer]}>
        <TextInput
          placeholder="How was your sleep?"
          placeholderTextColor={'#463AA090'}
          value={newEntry}
          onChangeText={(text) => setNewEntry(text)}
          multiline={true}
          style={styles.inputText}
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
      </View>
      <ScrollView showsVerticalScrollIndicator={true} indicatorStyle={'white'}>
        <View style={styles.entries}>
          {entry.map((todo, index) => (
            <View key={index} style={styles.entry}>
              <Text style={colors.white} onPress={() => setSelectedEntry(todo)}>
                {todo.text.length < 100
                  ? todo.text
                  : `${todo.text.slice(0, 100)}...`}
              </Text>
              <Text style={colors.highlight}>{todo.timestamp}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {selectedEntry && (
        <Modal
          visible={selectedEntry !== null}
          onDismiss={() => setSelectedEntry(null)}
          contentContainerStyle={styles.modalContainer}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedEntry.text}</Text>
            <Text style={styles.modalText}>{selectedEntry.timestamp}</Text>
            <Button onPress={() => setSelectedEntry(null)}>Close</Button>
          </View>
        </Modal>
      )}
    </View>
  )
}

export const colors = StyleSheet.create({
  primary: {
    color: '#463AA0',
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
    backgroundColor: colors.secondary.color,
    color: '#fff',
    paddingVertical: 120,
    height: 1000,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary.color,
    color: '#fff',
  },
  modalText: {
    color: 'black',
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  modalContent: {
    color: '#fff',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-start',
    margin: 5,
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    margin: 20,
  },
  inputText: {
    color: colors.highlight.color,
    placeholderTextColor: '#000',
    fontWeight: '300',
    fontSize: 24,
    borderColor: colors.secondary.color,
    borderBottomColor: colors.primary.color,
    borderBottomWidth: 0.5,
    maxWidth: 300,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {},
  entries: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start',
    margin: 10,
    padding: 10,
    maxWidth: 400,
  },
  entry: {
    padding: 10,
  },
})

export default Journal
