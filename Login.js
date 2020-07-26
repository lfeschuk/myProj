


import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,KeyboardAvoidingView, ImageBackground,Dimensions   } from 'react-native';
 //import firebase from './firebase';

 import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem  } from 'native-base'
  let DataBaseHandler = require('./DatabaseHandler');
  import firebase from './firebase';
  import GLOBAL from './globals.js'

  import HTML from 'react-native-render-html';

  const htmlContent = `
  <h1>This HTML snippet is now rendered with native components !</h1>
  <h2>Enjoy a webview-free and blazing fast application</h2>
  <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
  <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

export default class Login extends React.Component {
  constructor(props) {
        super(props);
        this.sign_in = this.sign_in.bind(this);
  }
 
  state={
    phone:"",
    password:"",
    admin:null,
    
  }
  set_state_on_rest_change = (fff)=>{

  }
  handle_admin = () => {
    GLOBAL.admin = this.state.admin;
    this.props.navigation.navigate('Main',{
      reload:true,
      admin:this.state.admin
   })
  }
  sign_in()
  { 

//     const headerString = 'event,timestamp\n';
// const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
// const csvString = `${headerString}${rowString}`;

// // write the current list of answers to a local csv file
// const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
// console.log('pathToWrite', pathToWrite);
// // pathToWrite /storage/emulated/0/Download/data.csv
// RNFetchBlob.fs
//   .writeFile(pathToWrite, csvString, 'utf8')
//   .then(() => {
//     console.log(`wrote file ${pathToWrite}`);
//     // wrote file /storage/emulated/0/Download/data.csv
//   })
//   .catch(error => console.error(error));


   console.warn("sign_in" + this.state)
    let email = this.state.phone + "@admin.com"
    firebase
    .auth()
    .signInWithEmailAndPassword(email, this.state.password)
   .then(() => DataBaseHandler.getAdmin(firebase.auth().currentUser,this.set_state_on_admin))
    .then(()=>this.handle_admin()) 
   .catch(error =>  alert("שגיאה: " + error),firebase.auth().signOut() )
    // Handle Errors here.
  };
  set_state_on_admin = (admin)=>{
    this.setState({admin})
  }


 
  render(){
    console.log("fff123 " + Math.round(Dimensions.get('window').width))
   
//    return (
// {/* <ScrollView style={{ flex: 1 }}>
//                 <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
//             </ScrollView>
//    ); */}
   
    return (
      <View style={styles.container}  >
              {/* <Header style={[{ backgroundColor: '#000', height: 90 }, styles.androidHeader]}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="person" style={{ color: 'white' } }  onPress={()=>this.props.navigation.openDrawer()} />
          <Text style={{ marginLeft: 5, fontSize: 22, color: 'white', fontStyle: 'italic' }}>פתח סרגל כלים</Text>
      
        </Left>
        
      </Header> */}
        <Image style={styles.image}
       
         
       source={require('./images/image1.png')}
        />
        
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="טלפון" 
            placeholderTextColor="#003f5c"
           
            onChangeText={text => this.setState({phone:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="סיסמא" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
      
        <TouchableOpacity style={styles.loginBtn} onPress={this.sign_in}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
       

  
      </View>
    );
  }
}
//Math.round(Dimensions.get('window').width) > 500 ? Math.round(Dimensions.get('window').width)/2 :Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Math.round(Dimensions.get('window').height) > 500 ? Math.round(Dimensions.get('window').height)/3 :Math.round(Dimensions.get('window').height) ,
    width: "100%" ,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
   // fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    
  },
  inputView:{
    width: Math.round(Dimensions.get('window').width) > 500 ? "40%" : "80%",
    backgroundColor:"#71e026",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black",
    textAlign:'left'

  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width: Math.round(Dimensions.get('window').width) > 500 ? "40%" :"80%",
    backgroundColor:"#325e99",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
  
    marginBottom:20
  },
  loginText:{
    color:"white"
  },
  image:{
    flex:1,
    height:400,
    width:400,
  }
});










