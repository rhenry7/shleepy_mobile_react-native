import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Journal from '../../../components/Journal'

const journalStack = createNativeStackNavigator()

export function JournalStackScreen() {
  return (
    <journalStack.Navigator screenOptions={{ headerShown: false }}>
      <journalStack.Screen name="journal" component={Journal} />
    </journalStack.Navigator>
  )
}
