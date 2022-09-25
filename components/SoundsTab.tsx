import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Playlists from './Playlists'

const Tab = createMaterialTopTabNavigator()

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Playlists" component={Playlists} />
      {/* <Tab.Screen name="Favorites" component={Favorites} /> */}
    </Tab.Navigator>
  )
}
