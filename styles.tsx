import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sectionContainer: {
    width: 350,
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 24,
    margin: 0,
    padding: 0,
    borderRadius: 10,
    height: 80,
    backgroundColor: '#463AA0',
  },
  soundCardContainer: {
    width: 350,
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 24,
    margin: 0,
    padding: 0,
    borderRadius: 10,
    height: 80,
  },
  sectionTitle: {
    fontSize: 34,
    margin: 0,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#060523',
    paddingTop: 20,
    maxHeight: '100%',
  },
  container_list: {
    flex: 1,
    // alignContent: 'center',
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#060523',
    paddingTop: 20,
  },
  topBarContainer: {
    flex: 1,
    backgroundColor: '#060523',
    padding: 20,
  },
  description: {
    color: '#F0EAD6',
    fontSize: 14,
    fontWeight: '300',
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '400',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 2,
    color: '#F0EAD6',
  },
  SoundMixer: {
    //flex: 1,
    height: 100,
    //borderRadius: 8,
    //marginBottom: 20,
    color: 'black',
    backgroundColor: '#463AA0',
  },
  MainNavContainer: {
    // marginTop: 32,
    marginBottom: 0,
    paddingStart: 24,
    color: '#F0EAD6',
  },
  subNavContainer: {
    paddingStart: 24,
    paddingRight: 1,
  },
  subNavTitle: {
    fontSize: 14,
    margin: 0,
    fontWeight: '400',
    color: '#F0EAD6',
  },
  mainNavTitle: {
    fontSize: 34,
    margin: 0,
    fontWeight: '600',
    color: '#F0EAD6',
  },
  white: {
    color: '#F0EAD6',
  },
  background: {
    color: '#393281',
  },
})

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
})
