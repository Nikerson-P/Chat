import { useState } from 'react';
import { Text,Image, StyleSheet, StatusBar, TextInput, View, PixelRatio, TouchableOpacity } from 'react-native';



const fontScale = PixelRatio.getFontScale();

export default function Login({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [sala, setSala] = useState('');
  
  function proximaTela() {
    if (nickname.trim() && sala.trim()) {
      navigation.navigate('Chat', {
        usuarioNick: nickname,
        salaEntrada: sala,
      });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Image 
        source={require('../assets/icon.png')}
        style={styles.img}
        resizeMode="contain"
        />
      <TextInput
        style={styles.input}
        placeholder="Digite seu Nik"
        onChangeText={setNickname}
        value={nickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a Sala"
        onChangeText={setSala}
        value={sala}
      />
      <TouchableOpacity onPress={proximaTela} >
        <Text style={styles.btnProximo}>Começar a conversa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9de0ad',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth:1,
    width: '70%',
    padding: 5,
    margin: 5,
    fontSize: 24 * fontScale
  },
  btnProximo:{
    fontSize:24*fontScale,
    margin:5,
    padding:10,
    backgroundColor:'#45ada8',
    borderRadius:5,

  },
  img:{
    width:'40%',
    height:'40%'
  }
});
