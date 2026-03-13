import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JobListScreen from '../screens/JobListScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import ApplicationStatusScreen from '../screens/ApplicationStatusScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create Account' }} />
      <Stack.Screen name="Jobs" component={JobListScreen} options={{ title: 'Available Jobs' }} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} options={{ title: 'Job Details' }} />
      <Stack.Screen name="Applications" component={ApplicationStatusScreen} options={{ title: 'My Applications' }} />
    </Stack.Navigator>
  );
}
