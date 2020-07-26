
import React ,{useState} from 'react'
import {  View, Text ,StyleSheet,TouchableOpacity,AppState,Alert,Linking,Modal,TouchableHighlight,Image,ImageBackground,ScrollView,KeyboardAvoidingView,TextInput,I18nManager,BackHandler } from 'react-native';
//import DropdownMenu from 'react-native-dropdown-menu';
//import Dialog, { DialogContent,DialogFooter,DialogButton, DialogTitle } from 'react-native-popup-dialog';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem ,Form,Item,Label,Input,Button,Footer} from 'native-base'
//import PickerInputExample from './Components/PickerInputExample'
import { DrawerContentScrollView } from '@react-navigation/drawer';
//let DataBaseHandler = require('./AssitFunctions/DatabaseHandler');
//import Autocomplete from './Components/AutoComplete';
//import { ThemeConsumer } from 'react-native-elements';
//import Geocoder from 'react-native-geocoding';
//import { Dropdown } from 'react-native-material-dropdown';
//Geocoder.init('AIzaSyBRsUgG1Jssyfe7pGYDJHhHU4viezKhghA');
// import DateTimePicker from '@react-native-community/datetimepicker';
//import DatePicker from 'react-native-datepicker'
const dateFormat = require('dateformat');
import { StackActions } from '@react-navigation/native';
let DataBaseHandler = require('./DatabaseHandler');


function isFloat(n) {
  return n === +n && n !== (n|0);
}

function is_empty_or_null_delivery_field(deliv,field)
{
    try {
        return deliv[field] == null  ||  deliv[field] == ""
    }
    catch(e)
    {
        return true;
    }
  
}
let disable_button = false;
let arr_streets = null;
  class AddDelivery extends React.Component {

  constructor(props) {
    super(props);


   
  }

  
    state={
       
      delivery_guy:new Object,
      
       
    }


    
  
     
      

componentDidUpdate(prevProps) {
  console.warn("on componentDidUpdate")
  if (this.props.route.params.reload)
  {
    this.props.route.params.reload = false;
    console.warn("fff123 reload" )
  }
  else
  {
    console.warn("fff123 reload not" )
  }
  if (this.props.route.params.delivery_guy)
  {
    this.handleEdit();
  }

}
componentWillUnmount()
{

}
handleDataComponentDidMount = ()=>{
  console.warn("on handleDataComponentDidMount")
  
}
handleEdit = () => {
  this.setState({delivery_guy:this.props.route.params.delivery_guy})
}
 componentDidMount() 
 {
 //  console.warn("component mount " + this.props.route.params.reload)
  }




setText = (text,key) =>{
  
    let {delivery_guy} = this.state
    
    delivery_guy[key] = text;
}


onInputTextChange = (text,is_diff) => {
  if (is_diff)
   {
    this.setState({query_diff:text})
    this.setText(text,"different_street")
   }
   else{
    this.setState({query:text})
    this.setText(text,"street")
   }
 
}


getInputItem = (type,name,initial_value,key,is_mandatory,aditional_placeholder) =>
{
    if (initial_value == 1)
    initial_value = "1"
    let placeholder = is_mandatory? "שדה חובה" : ""
      placeholder  = placeholder != "" ? placeholder : aditional_placeholder
    return(
        <Item stackedLabel     style={{flex:1,flexDirection:"column",elevation:0}} onPress={()=>{this[name]? this[name]._root.focus():null}}>
               <Label style={{textAlign:'right',fontWeight:'bold',fontSize:18,color:'#151b54',flex:1,alignSelf:'flex-start',elevation:0}}>{name}</Label>
              <Input defaultValue={initial_value}  style={{flex:1,alignSelf: 'stretch',textAlign:'left',elevation:0}} autoFocus={true} selectionColor={"blue"}   onChangeText={text => this.setText(text,key)} 
              //  placeholder={placeholder} placeholderTextColor={aditional_placeholder ? "grey":"red"}
               autoFocus={false}
             
             
               keyboardType={type}/>
                         
                             </Item>         


    )
}
getLastLine = () =>{

    return (
        <View style={{marginBottom: 50}}></View>
    )
}
getInputLine = (zIndex2,first,second,third,fourth) =>{
  
    return(
        <Form style={{flexDirection:'row',flex:1,elevation:0}}>         
            {first} 
            {second}
            {third}
           {fourth} 
        </Form>
           
    )
}

 

 addDelivery()
 {
   if (disable_button)
   {
     return;
   }
   disable_button = true;
    let delivery_guy = this.state.delivery_guy
   //  console.warn( " addDelivery ()  " + delayed)
     let msg = "נא למלא את כל הפרטים :"

    if (is_empty_or_null_delivery_field(delivery_guy,"name"))
    {
        alert(msg + "שם" )
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(delivery_guy,"phone"))
    {
        alert(msg + "טלפון")
        disable_button = false;
        return;
    
    }
    else if (is_empty_or_null_delivery_field(delivery_guy,"pass"))
    {
        alert(msg + "סיסמא")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(delivery_guy,"area"))
    {
        alert(msg + "אזור")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(delivery_guy,"salary"))
    {
        alert(msg + "שכר")
        disable_button = false;
        return;
    }
    // if (this.props.route.params.delivery_guy)
    // {
    //   DataBaseHandler.editDelivery_Guy(delivery_guy, this.props.route.params.admin.area_num)
    //   .catch(error => alert(error.message))
    //       .then(()=>{
    //         this.props.navigation.navigate('Main');
    //       })
    // }
    // else{
      DataBaseHandler.add_Delivery_guy(delivery_guy, this.props.route.params.admin.area_num)
      .catch(error => alert(error.message))
          .then(()=>{
            this.props.navigation.navigate('Main');
          })
   // }
   

  
 


    
 }
 handleEndAddDeliveryFlow = (deliv,delayed) => {
  if (this.props.route.params.edit_delivery)
  {
      DataBaseHandler.edit_delivery(this.props.route.params.this_restoraunt,deliv,delayed)
  }
  else{
     
      DataBaseHandler.createDelivery(this.props.route.params.this_restoraunt,deliv,delayed)
  }
}


 handleError = (error) => {
  disable_button = false;
  console.warn("error " + error.message)
  alert("שגיאה בעת יצירת משלוח " + "בדוק האם הזנת רחוב ועיר תקינים" )
 }
 

 onAnotherAdressDialogClose = () =>{
  this.setState({dialog_visible_another_adress:false})
  this.setText("","different_address")
 }




getDate()
{
  

    let date_now = dateFormat(new Date(),"yyyy-mm-dd");
   let costomStyles=
   {
    placeholderText:{color:"red"}     
    }

    return (

    <View style={{flexDirection:'row'}}>
 <DatePicker
    style={{width: 200,marginTop:15,flex:1}}
    date={this.state.delayed_date}
    mode="date"
    placeholder="הכנס תאריך"
    format="YYYY-MM-DD"
    minDate={date_now}
    confirmBtnText="אישור"
    cancelBtnText="ביטול"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
      },
      dateInput: {
        marginLeft: 36
      }
      // ... You can check the source to find the other keys.
    }}
    onDateChange={(date) => {this.setState({delayed_date: date})}}
  />
   <DatePicker
  customStyles = {costomStyles}
    style={{width: 200,marginTop:15,flex:1}}
    date={this.state.delayed_hour}
    mode="time"
    placeholder="הכנס שעה"
    format="HH:mm" 
    is24Hour={true}
    confirmBtnText="אישור"
    cancelBtnText="ביטול"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
      },
      dateInput: {
        marginLeft: 36
      }
      // ... You can check the source to find the other keys.
    }}
    onDateChange={(date) => {this.setState({delayed_hour: date})}}
  />
    </View>
   
    )
   
}
show_content()
{
    
   
    let {delivery_guy} = this.state
   //let is_delayed =  (this.props.route.params && this.props.route.params.delayed)
    let text_add = "הכנס שליח"
    return (
<Container style={{marginHorizontal :40}} >


  <Header style={{height:80,backgroundColor:"white"}}>
       <Left style={{flex:1}}>

       </Left>
        <Body style={{flex:1,alignSelf:'center',alignItems:'center'}}>
    <Text style={{fontWeight:'bold'}}>{text_add}</Text>
         
        </Body>
        <Right style={{flex:1}}>
        <Icon name='three-bars' type='Octicons' onPress={()=>this.props.navigation.openDrawer()} />
     
        </Right>
        
        </Header>
  
       
      
      
       {this.getInputLine(2, this.getInputItem("default","שם שליח",delivery_guy.name,"name",true), this.getInputItem("default","טלפון",delivery_guy.phone,"phone",true),this.getInputItem("numeric","סיסמא",delivery_guy.pass,"pass",true))}
       {this.getInputLine(2, this.getInputItem("default","שכר",delivery_guy.salary,"salary",true), this.getInputItem("default","איזור",delivery_guy.area,"area",true))}
      
     
      

    {this.getLastLine()}


  
     
      
   </Container>

    )
}

  render ()
  {
    
  


  //  console.warn("on Render")
  //   if (Platform.OS !== 'android')
  //   {
  
  //       return (
  //           <KeyboardAvoidingView style={{flex:1,zIndex:1,marginTop:3,marginBottom:10}} behavior={"height"}> 
  //          <ScrollView scrollEnabled={this.state.enableScroll}>
  //          {this.show_content()}
  //          </ScrollView>
  //          {     <Button  color="#841584" style={{height:60,width:"100%",marginTop:10,justifyContent: "center",alignItems: "center",}} disable={this.state.disabled} onPress={()=>this.addDelivery()} >
  //       <Text style={{textAlign:'center',alignSelf:'center',fontSize:15,fontWeight:'bold'}}>סיים</Text>
  //   </Button>}
  //           </KeyboardAvoidingView>
  //       )
  //   }
  //   else
    {
        
       return (
        <KeyboardAvoidingView style={{flex:1}}  behavior={undefined} enabled > 
           <ScrollView  scrollEnabled={this.state.enableScroll}>
           {this.show_content()}
           </ScrollView>
           {     <Button  color="#841584" style={{height:60,width:"100%",marginTop:10,justifyContent: "center",alignItems: "center",}}  disable={this.state.disabled} onPress={()=>this.addDelivery()} >
        <Text style={{textAlign:'center',alignSelf:'center',fontSize:15,fontWeight:'bold'}}>סיים</Text>
                 </Button>}
            </KeyboardAvoidingView>
       )
        
    }  

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


 export default AddDelivery


