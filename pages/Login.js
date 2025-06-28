import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';

export default function Login({navigation}) {
    const[nickname,setNickname] = useState();
    const[sala,setSala] = useState();  
    let width = Dimensions.get('window').width

    function proximaTela(){
      if(nickname != null && nickname != ''){
        if(sala != null && sala != ''){
          navigation.navigate('Chat',{
          usuarioNick:nickname,
          salaEntrada:sala
       })
      }}
    }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Digite seu Nik' onChangeText={(text) => setNickname(text)} />
      <TextInput placeholder='Digite a Sala' onChangeText={(text) => setSala(text)} />
      <Button title='Entrar na Sala' onPress={proximaTela}/>
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
