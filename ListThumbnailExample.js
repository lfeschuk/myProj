import React, { Component } from 'react';
import {StyleSheet,Alert} from 'react-native';
import firebase from './firebase';


const dateFormat = require('dateformat');
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,SwipeRow, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

let DataBaseHandler = require('./DatabaseHandler');
let temp = null;
let color_main = undefined;
import { Dimensions } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
const {height, width} = Dimensions.get('window'); 
const aspectRatio = height/width;
export default class ListThumbnailExample extends Component {

  constructor(props)
  {
    super(props)
   
  }
state= {

    delivery:null,
    backgroundColor: undefined,

}


componentDidUpdate(prevProps, prevState)
{
 
}

    async componentDidMount()
 {

 }


 getMainText= (item) =>{
if (this.props.is_rest)
{
  return (
    <Text style={styles.main_text}>

    
    <Text style={styles.main_text_bold}>{item.building}</Text>
    <Text style={styles.main_text}>{" בניין:"}</Text>
    <Text style={styles.main_text_bold}>{item.city}</Text>
    <Text style={styles.main_text}>{" עיר:"}</Text>
    <Text style={styles.main_text_bold}>{item.street}</Text>
    <Text style={styles.main_text}>{" רחוב:"}</Text>
    <Text style={styles.main_text_bold}>{item.phone}</Text>
    <Text style={styles.main_text}>{" טלפון:"}</Text>
    <Text style={styles.main_text_bold}>{ item.contact_name  }</Text>
    <Text style={styles.main_text}>{" איש קשר:"}</Text>
    
   
    <Text style={styles.main_text}>{" latitude:"}</Text>
    <Text style={styles.main_text_bold}>{ item.lat  }</Text>
  
    <Text style={styles.main_text}>{" longitude:"}</Text>
    <Text style={styles.main_text_bold}>{ item.longt  }</Text>
    <Text style={styles.main_text_bold}>{ item.password  }</Text>

<Text style={styles.main_text}>{" סיסמא:"}</Text>
    <Text style={styles.main_text_bold}>{ item.name  }</Text>

<Text style={styles.main_text}>{" שם לקוח:"}</Text>

   
  </Text>
  )
}
else{
  return (
    <Text style={styles.main_text}>

    
    <Text style={styles.main_text_bold}>{item.salary}</Text>
    <Text style={styles.main_text}>{" שכר:"}</Text>
    <Text style={styles.main_text_bold}>{item.password}</Text>
    <Text style={styles.main_text}>{" סיסמא:"}</Text>
    <Text style={styles.main_text_bold}>{item.phone}</Text>
    <Text style={styles.main_text}>{" טלפון:"}</Text>
    <Text style={styles.main_text_bold}>{ item.username  }</Text>

<Text style={styles.main_text}>{" שם:"}</Text>
   
  </Text>
 )
}
   
  }
    
 
  onContainerClick = (user) =>
{
  if (this.props.is_rest)
  {
    const res = window.confirm("  האם לערוך משתמש זה " + user.name)
    if (res)
    {
      this.props.navigation.navigate("InsertCostumer",{
        restoraunt:user,
        rest_edit:true
       })
    }
  }
  
  }

  onContainerLongClick = (user) =>
{
  const res = window.confirm(" האם למחוק משתמש זה" + user.name)
    if (res)
    {
      if (this.props.is_rest)
      {
        DataBaseHandler.deleteRestoraunt(user)
        .then(()=>{alert("מחיקה בוצעה בהצלחה")})
        .catch(err => console.error("error on deletion: " + err.message));
      }
      else{
        DataBaseHandler.deleteUser(user)
        .then(()=>{alert("מחיקה בוצעה בהצלחה")})
        .catch(err => console.error("error on deletion: " + err.message));
      }
     
    }
  }
 
mainContainerStyle = function() {
    return {
        flex:1,
        flexDirection:"row",
        alignItems:'flex-start',
        justifyContent: 'flex-end',
      borderWidth:2,
        borderBottomColor:'black',
        borderColor:'black',
        backgroundColor:this.state.backgroundColor,
        marginBottom:5,
        shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84,

elevation: 5,
      
    }
  }



    render() {
       
 let deliv = this.props.delivery;


        return (
    
      <View style={this.mainContainerStyle()}>
            <View style={styles.middle_text_body}> 
                <TouchableOpacity onPress={()=>this.onContainerClick(deliv)} onLongPress={()=>this.onContainerLongClick(deliv)}>
                    {this.props.delivery != null && this.getMainText(deliv)}
                        {/* {this.props.delivery != null && this.getSecondaryText(deliv,rest)}
                            {
                            this.props.delivery != null && this.props.delivery.comment !== "" &&
                            this.props.delivery != null && this.getComment(deliv,rest)
                            }
                             {this.props.delivery != null && this.getStatusText(deliv,rest)}

                            {
                            this.props.delivery != null && this.props.delivery.status !== "A" &&
                            this.getDelivInfo(deliv,rest)
                            }  */}
                </TouchableOpacity>
                  
              

            </View>
        
        
              

      </View>
     
       
    );
  }
}


var styles = StyleSheet.create({
    
   
        
    body:{
  flex:1,
  flexDirection:"row",
  alignItems:'flex-start',
  justifyContent: 'flex-end',
borderWidth:2,
  borderBottomColor:'black',
  borderColor:'black',


    },
    body_right:{
      alignSelf:'center',
      marginLeft:10
       //backgroundColor:"red"
      
          },
    middle_text_body:{
        flex:1,
        flexDirection:"column",
        marginLeft:10
          },
   
  text_empty:{
      fontSize:40,
      color:'red',
      alignSelf:'center'
  },
  main_text:{
   textAlign:'left',
   marginTop:4
  
  },
  modalContent:{
    justifyContent: 'center',
    alignItems: 'center',
    
    margin: 0
  },
 
  buttons:{
    flex:1,
    flexDirection:'row',
    alignItems:"center",
    justifyContent: 'flex-start',
  
  },
  statusA_text:{
    textAlign:'center',
    marginLeft:35,
   
    color:'red',
    fontSize:25,
    fontWeight: "bold"
   
   },
   statusB_text:{
    textAlign:'center',
    
    marginLeft:35,
    color:'blue',
    fontSize:25,
    fontWeight: "bold"
   
   },
   statusC_text:{
    textAlign:'center',
   
    marginLeft:35,
    color:'green',
    fontSize:25,
    fontWeight: "bold"
   
   },
 second_text:{
    textAlign:'left'
   
   },
   second_text_bold:{
    textAlign:'left',
    fontWeight: "bold"
   
   },
  main_text_bold:{
    textAlign:'left',
    fontWeight: "bold"
   },
  
 
  
      
     
 });
