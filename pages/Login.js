import { useState } from 'react';
import { Button, StyleSheet, StatusBar, TextInput, View } from 'react-native';

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
      <Button title="Entrar na Sala" onPress={proximaTela} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth:1,
    width: '80%',
    padding: 5,
    margin: 5,
  },
});
