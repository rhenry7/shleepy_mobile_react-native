// import { getStorage, ref, getDownloadURL } from 'firebase/storage'

// const storage = getStorage()
// getDownloadURL(ref(storage)).then((url) => {
//   const soundFileLocations = url
//   console.log({ soundFileLocations })
// })

export const tracks = [
  {
    id: 1,
    url: require('./nature/crickets.wav'),
    title: 'Blues Beat',
  },
  {
    id: 2,
    url: require('./nature/wind.wav'),
    // url: https://firebasestorage.googleapis.com/v0/b/shleepy-app-react-native.appspot.com/o/sounds%2Fnature%2Fwind.wav?alt=media&token=8dbfa8ee-3aea-4e98-8e22-35becc67d964
    title: 'Blues Beat',
  },
  {
    id: 3,
    url: require('./nature/soft_rain.wav'),
    title: 'Blues Beat',
  },
  {
    id: 4,
    url: require('./nature/seagulls.wav'),
    title: 'Blues Beat',
  },
]
