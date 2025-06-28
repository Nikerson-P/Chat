import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Chat from './pages/Chat';
import Login from './pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
 
  let width = Dimensions.get('window').width
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="Login" component={Login}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent:'center',
    alignItems:'center'
  },

});
