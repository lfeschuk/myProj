
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
import GLOBAL from './globals.js'

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
       old_pass:"",
      restoraunt:new Object,
      
       
    }


     

componentDidUpdate(prevProps) {
  
  if (this.props.route.params.rest_edit)
  {
    console.warn("fff123 reload" )
    this.props.route.params.rest_edit = false;
    this.handleEdit();
  }
  else{
    console.warn("fff123 reload not" )
  }

}
handleEdit = () => {
  this.setState({old_pass:this.props.route.params.restoraunt.password})
  this.setState({restoraunt:this.props.route.params.restoraunt})
}
componentWillUnmount()
{

}
handleDataComponentDidMount = ()=>{
  console.warn("on handleDataComponentDidMount")
  
}
 componentDidMount() 
 {
  if (this.props.route.params.rest_edit)
  {
    console.warn("fff123 reload" )
    this.props.route.params.rest_edit = false;
    this.handleEdit();
  }
  else{
    console.warn("fff123 reload not" )
  }
  // console.warn("component mount " + this.props.route.params.reload)
  }




setText = (text,key) =>{
  
    let {restoraunt} = this.state
    
    restoraunt[key] = text;
}
getText = (key) =>{
   try{
    let {restoraunt} = this.state
    
    restoraunt[key] = text;
    return restoraunt[key].length
   } 
   catch(e)
   {
       return 0;
   }
   return 0;
    
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
 create_restoraunt = (rest) =>
 {
        //add delivery 
        
 

        let rest_out = { 
          "adress" : rest.street + " " + rest.building,
          "area" : rest.city,
          "areaNum" : GLOBAL.admin.area_num,
          "building" : rest.building,
          "city" : rest.city,
          "contact_name" : rest.contact_name == "" ? rest.name : rest.contact_name,
          "costumer_pswd" : "1234",
          "feature1" : true,
          "feature2" : true,
          "feature3" : true,
          "feature4" : true,
          email: rest.phone + "@gmail.com",
          "lat" : parseFloat(rest.lat),
          "longt" : parseFloat(rest.longt),
          "name" : rest.name,
          "password" : rest.password,
          "phone" : rest.phone,
          phone_to_call : rest.phone_to_call ? rest.phone_to_call : "",
          "street" :rest.street,
          "time_to_costumer" : 60,
          "time_to_prepare" : 20,
          "turn_off_notification" : false,
          "user_name" : rest.name,
          "was_approved" : true

        } 
        return rest_out;


 }
 

 addDelivery()
 {
   if (disable_button)
   {
     return;
   }
   console.warn("addDelivery0")
   disable_button = true;
     let restoraunt = this.create_restoraunt(this.state.restoraunt)
     
   //  console.warn("addDelivery1 " + restoraunt.password + " " + this.props.route.params.restoraunt.password)
   //  console.warn( " addDelivery ()  " + delayed)
     let msg = "נא למלא את כל הפרטים :"
    //  console.warn("addDelivery2 " + this.props.route.params)
    //  console.warn("addDelivery3 " + this.props.route.params.restoraunt)
    //  console.warn("addDeliv4 " + this.props.route.params.restoraunt.password);
    //  console.warn("addDelivery5 " + restoraunt)
    //  console.warn("addDelivery6 " + this.state.restoraunt)
     if (this.props.route.params.restoraunt && ( this.props.route.params.restoraunt.name != restoraunt.name) )
     {
      alert("לא ניתן לערוך שם משתמש ")
      disable_button = false;
      return;
     }
     console.warn("addDeliv5 " );
    if (is_empty_or_null_delivery_field(restoraunt,"building"))
    {
        alert(msg + "בניין" )
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"city"))
    {
        alert(msg + "עיר")
        disable_button = false;
        return;
    
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"street"))
    {
        alert(msg + "רחוב")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"name"))
    {
        alert(msg + "שם לקוח")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"contact_name"))
    {
        alert(msg + "איש קשר")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"phone"))
    {
        alert(msg + "טלפון זיהוי")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"phone"))
    {
        alert(msg + "טלפון זיהוי")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"lat") )
    {
        alert(msg + "latetude")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"longt") )
    {
        alert(msg + "longitude")
        disable_button = false;
        return;
    }
    else if (is_empty_or_null_delivery_field(restoraunt,"password"))
    {
        alert(msg + "סיסמא")
        disable_button = false;
        return;
    }
  if (this.props.route.params.restoraunt)
  {
    restoraunt.key= this.props.route.params.restoraunt.key
   // console.log("here 1234 ")
  //  console.log("here 123 " + this.props.route.params.restoraunt.password + " " + restoraunt.password + " " + (this.props.route.params.restoraunt.password != restoraunt.password) );
    DataBaseHandler.edit_rest(restoraunt,(this.state.old_pass.password != restoraunt.password))
    .catch(error => alert(error.message))
    .then(()=>{
      this.props.navigation.navigate('Main');
    })
  }
  else{
    console.log("here not 123");
    DataBaseHandler.create_new_rest(restoraunt)
    .catch(error => alert(error.message))
    .then(()=>{
      this.props.navigation.navigate('Main');
    })

  }
    

    
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
 create_costumer = (delivery) => {
let costumer = new Object;
  costumer.another_phone = delivery.another_phone?delivery.another_phone:"";
  costumer.apartment = delivery.apartment?delivery.apartment:""
  costumer.building = delivery.building? delivery.building:""
  costumer.city =  delivery.city?delivery.city:""
  costumer.comment =  delivery.comment?delivery.comment:""
  costumer.floor = delivery.floor?delivery.floor:""
  costumer.intercum_num =  delivery.intercum_num? delivery.intercum_num:""
  costumer.name = delivery.costumerName?delivery.costumerName:""
  costumer.phone =  delivery.costumer_phone?delivery.costumer_phone:""
  costumer.street = delivery.street?delivery.street:""
  return costumer;
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
    
    let delivery = new Object
   
    let {restoraunt} = this.state
   //let is_delayed =  (this.props.route.params && this.props.route.params.delayed)
    let text_add = "הכנס משתמש חדש"
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
  
       
        
      
       {this.getInputLine(2, this.getInputItem("default","שם לקוח",restoraunt.name,"name",true), this.getInputItem("default","איש קשר",restoraunt.contact_name,"contact_name",true),this.getInputItem("numeric","טלפון לצורך זיהוי",restoraunt.phone,"phone",true),this.getInputItem("numeric","טלפון יצירת קשר",restoraunt.phone_to_call,"phone_to_call",false))}
       {this.getInputLine(2, this.getInputItem("default","עיר",restoraunt.city,"city",true), this.getInputItem("default","רחוב",restoraunt.street,"street",true),this.getInputItem("numeric","בניין",restoraunt.building,"building",true))}
      
       {this.getInputLine(2, this.getInputItem("default","מיקום: latitude (31.94251)",restoraunt.lat,"lat",true), 
       this.getInputItem("default","מיקום: longitude (35.51365)",restoraunt.longt,"longt",true),
       this.getInputItem("default","סיסמא",restoraunt.password,"password",true))}
      

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


