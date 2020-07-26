
import React from 'react'
import {  View, Text ,StyleSheet,TouchableOpacity,AppState,Alert,Linking,Modal,TouchableHighlight,Image,ImageBackground,ScrollView,KeyboardAvoidingView,TextInput,I18nManager,BackHandler } from 'react-native';

let DataBaseHandler = require('./DatabaseHandler');

import ListThumbnailExample from './ListThumbnailExample'


  class DisplayCotsumers extends React.Component {

  constructor(props) {
    super(props);


   
  }

  
    state={
       
      objects_to_display:null
      
       
    }


  
     
      

componentDidUpdate(prevProps) {
  
  if (this.props.route.params.reload)
  {
    this.props.route.params.reload = false;
   
  }
  

}
componentWillUnmount()
{

}
handleDataComponentDidMount = ()=>{
  console.warn("on handleDataComponentDidMount")
  
}
 componentDidMount() 
 {
   DataBaseHandler.getListOfGuys(this.set_objects)
  // console.warn("component mount " + this.props.route.params.reload)
  }

set_objects = (objects_to_display) => {
  console.warn("set_objects " + objects_to_display.length)
  this.setState({objects_to_display});
}

  createListElement = (item) => {
     return(
       <ListThumbnailExample style={styles.item} delivery={item}></ListThumbnailExample>
  
     )
   };


 

  render ()
  {
    
    let elements = this.state.objects_to_display? this.state.objects_to_display.map(deliv =>{    
     
       
      //   console.warn("fff deliv  here2 " + deliv.indexString + " " + this.props.route.params.delayed)
         return this.createListElement(deliv)
       
     
     }) : null

     console.warn("fff deliv  here2 " + (elements?elements.length:null))
    
        
       return (
       <ScrollView>
         <Text>פירוט שליחים</Text>
         {elements}
       </ScrollView>
       )
        
     

}
}
                  
                    

Date.prototype.addHours = function(h) {
   // console.warn("fff1 " + 1)
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }     

var styles = StyleSheet.create({
    main_container: {
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        flex: 1,
        backgroundColor:'white'
   
    },
    input: {maxHeight: 40},
    inputContainer: {
      display: "flex",
      flexShrink: 0,
      flexGrow: 0,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "#c7c6c1",
      paddingVertical: 13,
      paddingLeft: 12,
      paddingRight: "5%",
      width: "100%",
      justifyContent: "flex-start",
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1

       
        
      },
      container: {
        backgroundColor: '#fcfdff',
        flex: 1,
        paddingTop: 25
      },
      itemText: {
        fontSize: 15,
        margin: 2
      },
      descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        marginTop: 10
      },
      infoText: {
        textAlign: 'center'
      },
      titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
      },
      directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
      },
      openingText: {
        textAlign: 'center'
      },
      buttonContainer: { flex: 1, alignSelf: 'center', paddingTop: 20 },
      centerButton: { margin: 10, alignSelf: 'center' }
    
   
     
 });


 export default DisplayCotsumers


