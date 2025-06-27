import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Login() {
    const[nickname,setNickname] = useState();
    const[sala,setSala] = useState();  
    let width = Dimensions.get('window').width
  return (
    <View style={styles.container}>
      <TextInput placeholder='Digite seu Nik' onChangeText={(text) => setNickname(text)} />
      <TextInput placeholder='Digite a Sala' onChangeText={(text) => setSala(text)} />
      <Button title='Entrar na Sala'/>
    </View>
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
