import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sectionContainer: {
    width: 100,
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 24,
    margin: 0,
    padding: 0,
    borderRadius: 10,
    height: 80,
    backgroundColor: '#463AA0',
  },
  SoundMixer: {
    backgroundColor: '#060523',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    paddingVertical: 120,
  },
  description: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },

  buttonTitle: {
    fontSize: 18,
    fontWeight: '300',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 0,
    padding: 8,
    color: '#F0EAD6',
  },
  container: {
    width: 380,
    marginTop: 10,
    paddingHorizontal: 18,
    margin: 0,
    padding: 0,
    alignItems: 'flex-start',
  },
  volumeSlider: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
})
