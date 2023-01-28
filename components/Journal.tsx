import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import moment from 'moment'
import { Modal } from 'react-native-paper'
import { auth, db } from '../firebase/firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { useFocusEffect } from '@react-navigation/native'
import { Rating, AirbnbRating } from 'react-native-ratings'

type EntryDataResponse = {
  text: string
  timeStamp: string
  rating: number
}

const Journal: React.FC = () => {
  const [entry, setEntry] = useState([])
  const [newEntry, setNewEntry] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [rating, setRating] = useState(0)

  const userId = auth.currentUser?.uid

  const getEntries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'userEntries'))
      let userEntries = []
      querySnapshot.forEach((doc) => {
        if (doc.data().userId === userId) {
          userEntries.push(doc.data().entry)
        }
      })
      setEntry(userEntries)
    } catch (error) {
      console.error(error)
    }
  }
  console.log({ userId })

  // useFocusEffect instead of useEffect to get entries when navigating with RNN
  useFocusEffect(
    React.useCallback(() => {
      if (auth.currentUser !== null) {
        getEntries()
      } else {
        setEntry([])
      }
    }, [auth.currentUser]),
  )

  // adds entry to firestore collection
  const addJournalEntry = async (entryData) => {
    try {
      // Get the current user's ID
      const userId = auth.currentUser.uid
      alert(userId)

      // Add the entry data to the "journal" collection, under the user's document
      if (userId) {
        const docRef = await addDoc(collection(db, 'userEntries'), {
          userId,
          entry: entryData,
        })
        alert('should be in the collection!')
        console.log('Journal entry written with ID: ', docRef.id)
      }
    } catch (error) {
      console.error('Error adding journal entry: ', error)
      alert(error)
    }
  }

  const handleAddEntry = () => {
    if (auth.currentUser !== null && newEntry !== '') {
      ;``
      setNewEntry('')
      setRating(0)
      addJournalEntry({
        text: newEntry,
        timestamp: moment().format('MM/DD/YYYY'),
        rating: rating,
      })
    } else if (auth.currentUser === null) {
      // Show an error message or alert to the user
      alert('You must be logged in to add an entry')
    }
  }

  console.log({ entry })
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
        <View style={{ paddingTop: 10 }}>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={28}
            showRating={false}
            onFinishRating={(rating) => setRating(rating)}
          />
        </View>
        <Button
          style={styles.SoundMixer}
          icon="plus"
          mode="contained"
          onPress={handleAddEntry}
          buttonColor={'#463AA0ed'}
        >
          Add Entry
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={true} indicatorStyle={'white'}>
        <View style={styles.entries}>
          {entry.map((entryData: EntryDataResponse, index) => (
            <View key={index} style={styles.entry}>
              <Text
                style={colors.highlight}
                onPress={() => setSelectedEntry(entryData)}
              >
                {entryData.text.length < 100
                  ? entryData.text
                  : `${entryData.text.slice(0, 100)}...`}
              </Text>

              <Text style={colors.highlight}>{entryData.timeStamp}</Text>
              {/* <View style={{ paddingTop: 10 }}></View> */}
              <AirbnbRating
                count={5}
                defaultRating={entryData.rating}
                size={14}
                showRating={false}
                onFinishRating={(rating) => setRating(rating)}
              />
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
    color: '#F0EAD6',
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
  SoundMixer: {
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
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    maxWidth: 400,
  },
  entry: {
    padding: 10,
  },
})

export default Journal
