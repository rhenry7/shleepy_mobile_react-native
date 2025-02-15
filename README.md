# shleepy_mobile_react-native


View The Case Study: https://www.ramonehenry.work/shleepy-app 

Documentation

# Introduction:

_"Shleepy"_ is a mobile sleep aid application that utilizes Firebase, React Native, TypeScript, and Redux. Track sleep, journal, meditate and use white noise audio mixing. 

The app uses Firebase for authentication and database storage. The app is built with Expo and offers four main features: authentication, a dream journal where users can log their dreams each day, a mixer that plays multiple tracks of ambient noise with volume control, allowing the user to create their own audio landscape, and a sound library with React Native Navigation that allows users to pick the ideal sound for their comfort.

# Features:

1. **Authentication**: Firebase is used to authenticate users, allowing them to securely log in and access their personal journals and sound preferences.

2. **Journal/Dream Journal**: Users can log their dream daily, providing a personal and private space to reflect on their sleep and dreams. This feature is also linked to their authenticated account, ensuring that their journal entries are saved and accessible only to them.

3. **Mixer**: The Mixer feature allows users to play multiple tracks of ambient noise, with volume control, to create their own personalized audio landscape. This feature is particularly useful for users who have trouble sleeping and need a specific sound environment to fall asleep.

4. **Sound Library**: The sound library feature allows users to pick their ideal sound for falling asleep from a curated collection of sounds. Redux Toolkit is used to manage the state of the currently selected sound and its playback.

# Technologies Used:

1. **Firebase**: Firebase is used for authentication and database storage, ensuring that the app's user data is secure and accessible only to the authenticated user. Firebase also stores the audio files, making the file size of the app smaller and allowing the audio files to be retrieved from storage when the user initializes the app, making the app faster by not having ti store these larger files locally.

2. **React Native**: React Native allows for a native-like experience on both iOS and Android devices. Expo was also used to improve the development process.

3. **TypeScript**: TypeScript is used for type checking and improving code quality, making the development process more efficient and reducing the likelihood of runtime errors.

4. **Redux Toolkit**: Redux Toolkit is used for state management, allowing for the seamless management of the app's state, including authentication, global modal system and tracking playback of currently played sounds.

5. **React Native Navigation**: React Native Navigation is used to navigate between the app's features.
