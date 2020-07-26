


import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image,KeyboardAvoidingView, ImageBackground,Dimensions   } from 'react-native';
 //import firebase from './firebase';
 import GLOBAL from './globals.js'
 import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
 import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem  } from 'native-base'
//  let DataBaseHandler = require('./AssitFunctions/DatabaseHandler');

export default class Main extends React.Component {
  constructor(props) {
        super(props);
        this.sign_in = this.sign_in.bind(this);
  }
 
  state={
    phone:"",
    password:"",
    
  }
  set_state_on_rest_change = (fff)=>{

  }
  sign_in()
  { 
 //   console.warn("sign_in" + this.state)
    // let email = this.state.phone + "@gmail.com"
    // firebase
    // .auth()
    // .signInWithEmailAndPassword(email, this.state.password)
  //  .then(() => DataBaseHandler.getRestoraunt(firebase.auth().currentUser,this.set_state_on_rest_change))
    //.then(()=>this.props.navigation.navigate('Main',{
      //reload:true,
   // })) 
   // .catch(error =>  alert("שגיאה: " + error),firebase.auth().signOut() )
   
    // Handle Errors here.
  };

  
 
  render(){
    console.log("fff123 " + GLOBAL.admin.username)
    return (
      
        <View style={styles.container}  >
              <Header style={[{ backgroundColor: '#000', height: 90 }, styles.androidHeader]}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="person" style={{ color: 'white' } }  onPress={()=>this.props.navigation.openDrawer()} />
          <Text style={{ marginLeft: 5, fontSize: 22, color: 'white', fontStyle: 'italic' }}>פתח סרגל כלים</Text>
      
        </Left>
        
      </Header>
        <Image style={styles.image}
       
         
       source={require('./images/image1.png')}
        />
        
        <View style={styles.inputView} >
        <Text style={styles.loginText}>Jetpack משלוחים </Text>
    <Text style={styles.loginText}>ברוך הבא {this.props.route.params.admin.username}</Text>

  
      </View>





        {/* <BarChart
          data={{
            labels: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
        
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        /> */}
      </View>
    );
  }
}

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
  inputView:{
    width: Math.round(Dimensions.get('window').width) > 500 ? "40%" : "80%",
    
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
    color:"black",
    textAlign:'center',
    fontSize:'30',
    fontWeight:'bold'
    
  },
  image:{
    flex:1,
    height:400,
    width:400,
  }
});










