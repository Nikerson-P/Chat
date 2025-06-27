import { useEffect, useState,useRef } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { Dimensions, FlatList,StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';

export default function Chat() {
 
  
  const[usuarioAtual,setUsuarioAtual] = useState('nik');
  const[sala,setSala]=useState('1234')
  const[conversas,setConversas] =useState([]);
  const[mensagemInput,setMensagemInput] = useState();
  const[socketIo,setSocketIo] = useState(null);
  const flatlistref= useRef(null);
  useEffect(()=>{
    try{
      const socket = io('http://192.168.0.104:3000')
      socket.emit('entrarSala',sala);
      setSocketIo(socket);
        
      
      socketIo.on('mensagem',(msg)=>{
        console.log(msg)  
        console.log('Estou dentro do recebimento')
        
          
      })
      console.log("funcionou")

      return ()=>{
        socketIo.disconnect();
      }
    }catch(error){
      console.log('ERROR:'+error)
    }

  },[])  
    
  function enviar(){
   
    if(mensagemInput != null && mensagemInput != ''){
      try{
      socketIo.emit('mensagem',{sala,mensagemInput,usuarioAtual})
      }catch(error){
        console.error(error)
      }
    }
    setMensagemInput('')
  }

  let width = Dimensions.get('window').width
  return (
    <View style={styles.container}>
      <FlatList style={styles.scrollContainer}
          data={conversas}
          ref={flatlistref}
          scrollEnabled={true}
          scrollToOverflowEnabled={true}
          StickyHeaderComponent={styles.scrollContainer}
          keyExtractor={(item) =>item.id}
          renderItem={({item})=>{
            const result = usuarioAtual === item.usuario;
            return(
              <Text style={[result? styles.msgPrincipal: styles.msgOutros,{width:width/1.4}]}>
                {item.mensagem}</Text>
            )}}
          onContentSizeChange={()=>{
            //serve para fazer a lista descer toda vez que vai chegando mensagem
            //necessario passar a referencia para a lista com ref={}
            flatlistref.current?.scrollToEnd({animated:true})
          }}
            />

      <View style={[styles.areaInput,{maxHeight:'20%'}]}>
        <TextInput placeholder='Digite sua mensagem' style={{width:width/1.11}}
          multiline={true}
          value={mensagemInput}
          onChangeText={(text) => setMensagemInput(text)}
          />
        <TouchableOpacity style={{alignContent:'center',alignSelf:'center'}}
          onPress={enviar}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  scrollContainer:{
    flex:1,
    width:'100%',
    backgroundColor:'blue'
  },
  msgOutros:{
    textAlign:'left',
    backgroundColor:'red',
    padding:5,
    marginTop:5
  },
  msgPrincipal:{
    textAlign:'left',
    backgroundColor:'green',
    marginTop:5,
    padding:5,
    marginLeft:"27%"
  },
  areaInput:{
    flexDirection:'row'
  }
});
