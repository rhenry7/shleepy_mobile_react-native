import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../../../components/auth/SignIn'
import SignUpScreen from '../../../components/auth/SignUp'

const authStack = createNativeStackNavigator()

export function AuthStackScreen() {
  return (
    <authStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#060523',
        },
        headerTintColor: '#F0EAD6',
        headerTitleStyle: { color: '#060523' },
      }}
    >
      <authStack.Screen name="Sign Up" component={SignUpScreen} />
      <authStack.Screen name="Sign In" component={SignInScreen} />
    </authStack.Navigator>
  )
}
