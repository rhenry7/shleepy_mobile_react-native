import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import React, { useEffect } from 'react'

const auth = getAuth()

export function useAuth() {
  const [user, setUser] = React.useState<User>()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        setUser(user)
        // ...
      } else {
        setUser(undefined)
        // User is signed out
        // ...
      }
    })
  })
}
