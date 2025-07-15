import { useEffect, useState,useRef } from 'react';
import { Dimensions, FlatList,PixelRatio,StatusBar,StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { io } from 'socket.io-client';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign'



const tamanhoFont = PixelRatio.getFontScale();
export default function Chat() {
 
  const route = useRoute();
  const navigation = useNavigation();
  const salaEntrada = route?.params?.salaEntrada || 'geral';
  const usuarioNick = route?.params?.usuarioNick || 'Anônimo';


  const[usuarioAtual,setUsuarioAtual] = useState(usuarioNick);
  const[sala,setSala]=useState(salaEntrada);
  const[conversas,setConversas] =useState([]);
  const[mensagemInput,setMensagemInput] = useState('');
  const[socketIo,setSocketIo] = useState(null);
  const flatlistref= useRef(null);
  const[controlador,setControlador] =useState(false);
  useEffect(()=>{
    try{
      const socket = io('https://servidorchat-t33w.onrender.com');
      
      setSocketIo(socket);
      
      socket.on('connect',()=>{
        console.log("conectado");
        socket.emit('entrarSala',salaEntrada);
      
      })


      socket.on('mensagem',(msg)=>{
        if(msg.mensagem != null && msg.mensagem != ''){  
          if(typeof msg === 'object' && msg !== null && !Array.isArray(msg)){
              let dados = {id:Date.now(),usuario:msg.usuario,mensagem:msg.mensagem}
              setConversas((prev)=>[
              ...prev,
              dados 
              ])
          }

        }
      })
      
      socket.on('disconnect',()=>{
        setSocketIo(null);
        console.log('Cliente foi deslogado');
        navigation.reset({
          index:0,
          routes:[{name:'Login'}]
        })
      })

      return ()=>{
        socket.disconnect();
        
      }
    }catch(error){
      console.log('ERROR:'+error)
    }

  },[])  
    
  function enviar(){
   if(socketIo != null){
      if(mensagemInput != null && mensagemInput != ''){
        try{
        socketIo.emit('mensagem',{sala,mensagemInput,usuarioAtual})
        }catch(error){
          console.error(error)
        }
      }
      setMensagemInput('')
    }else{
      
      setControlador(true);
    }
  }

  function retornar(){
    console.log('funcionou');
    
    socketIo.disconnect();
    navigation.reset({
      index:0,
      routes:[{name:'Login'}]
    })
  }
  let width = Dimensions.get('window').width
  return (
    <View style={styles.container}>
      <StatusBar />
      <View  style={styles.areaHeader}>
        <TouchableOpacity style={styles.headerItems} onPress={retornar}>
            <AntDesign name="arrowleft" size={32*tamanhoFont} color="black" />
        </TouchableOpacity> 
        <Text style={[styles.headerItems,{fontSize:36*tamanhoFont,textTransform:'capitalize' }]}>{salaEntrada}</Text>
      </View>
      <FlatList style={styles.scrollContainer}
          data={conversas}
          ref={flatlistref}
          scrollEnabled={true}
          keyExtractor={(item) =>item.id}
          renderItem={({item})=>{
            if (!item || !item.usuario || !item.mensagem) return null;
            return(
              <View style={[item.usuario === usuarioAtual ? styles.msgPrincipal : styles.msgOutros,{width:width/1.4}]}>
                <Text style={styles.textNickname}>{item.usuario}</Text>
                <Text style={styles.txtMenesagem}>
                  {item.mensagem}</Text>
              </View>
            )}}
          onContentSizeChange={()=>{
            //serve para fazer a lista descer toda vez que vai chegando mensagem
            //necessario passar a referencia para a lista com ref={}
            flatlistref.current?.scrollToEnd({animated:true})
          }}
            />

      <View style={[styles.areaInput,{maxHeight:'28%',width:'100%'}]}>
        <TextInput placeholder='Digite sua mensagem' style={[styles.input,{width:'89%',fontSize:24*tamanhoFont}]}
          multiline={true}
          value={mensagemInput}
          onChangeText={(text) => setMensagemInput(text)}
          />
        <TouchableOpacity style={{alignContent:'center',alignSelf:'center',marginLeft:'auto'}}
          onPress={enviar}>
          <AntDesign name="rightcircle" size={32*tamanhoFont} color="black" />
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
    backgroundColor:'#9de0ad'
  },
  msgOutros:{
    textAlign:'left',
    backgroundColor:'#45ada8',
    padding:5,
    marginTop:5
  },
  msgPrincipal:{
    textAlign:'left',
    backgroundColor:'#e5fcc2',
    marginTop:5,
    padding:5,
    marginLeft:"27%"
  },
  areaInput:{
    flexDirection:'row',
    fontSize:24 * tamanhoFont,
    backgroundColor:'#9de0ad'
  },
  textNickname:{
    textTransform:'capitalize',
    fontSize:12 *tamanhoFont
    
  },
  headerItems:{
    margin:5,
    padding:5
  },
  input:{
    backgroundColor:'#fff',
    borderRadius:5,
    margin:5
  },
  areaHeader:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#9de0ad'
  },
  txtMenesagem:{
    fontSize:18*tamanhoFont
  }
});
