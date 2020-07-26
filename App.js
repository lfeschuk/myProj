import React from 'react'
import { StyleSheet, Platform, Image, Text, View, FlatList,AppRegistry,I18nManager, StatusBar} from 'react-native'
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem  } from 'native-base'

import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import firebase from './firebase';
import Login from './Login'
import Main from './Main'
import InsertCostumer from './InsertCostumer'
import InsertDelivGuy from './InsertDelivGuy'
import DisplayCotsumers from './DisplayCotsumers'
import DisplayRestoraunts from './DisplayRestoraunts'
import GLOBALS from './globals.js'

import { createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
I18nManager.forceRTL(true)
I18nManager.allowRTL(true)
//const Stack = createStackNavigator();
// import { name as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);

// import the different screens


// create our app's navigation stack
export default class App extends React.Component {
render()
{
  return (


    <NavigationContainer>

    <Drawer.Navigator initialRouteName={"Login"} drawerPosition={"left"} drawerType={'slide'}  drawerContent={(props)=>CustomDrawerContentComponent(props)}>
   
         
    <Drawer.Screen
              name="InsertCostumer"
              component={InsertCostumer}
            />
            <Drawer.Screen
              name="InsertDelivGuy"
              component={InsertDelivGuy}
            />
       <Drawer.Screen
              name="Main"
              component={Main}
            />
             <Drawer.Screen
              name="Login"
              component={Login}
            />
            <Drawer.Screen
              name="DisplayCotsumers"
              component={DisplayCotsumers}
            />
             <Drawer.Screen
              name="DisplayRestoraunts"
              component={DisplayRestoraunts}
            />
            
            
    </Drawer.Navigator>
    
    
        </NavigationContainer>
 
   
  );
}

}



const CustomDrawerContentComponent = (props) => {
 let text_ver = "גרסה " + version
  return (
    <Container>
      <Header style={[{ backgroundColor: '#000', height: 90 }, styles.androidHeader]}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="person" style={{ color: 'white' }} />
          <Text style={{ marginLeft: 5, fontSize: 22, color: 'white', fontStyle: 'italic' }}>{text_ver}</Text>
      
        </Left>
        
      </Header>
      <Content>
        <FlatList
          data={[
           "התנתק", "הכנס משתמש חדש","הכנס שליח חדש","הצג שליחים","הצג לקוחות"
          ]}

          renderItem={({ item }) => (

            <ListItem noBorder onPress={()=>{
               if (item ==  "התנתק")
              {
             //   console.warn("ffff hitnatek")
                firebase.auth().signOut();
                props.navigation.navigate("Login")
              }else if (item ==    "הכנס משתמש חדש")
              {
               // props.navigation.navigate("InsertCostumer")
               props.navigation.navigate("InsertCostumer",{
                admin:GLOBALS.admin
               })
              }
              else if (item ==    "הכנס שליח חדש")
              {
               // props.navigation.navigate("InsertCostumer")
               props.navigation.navigate("InsertDelivGuy",{
                admin:GLOBALS.admin
               })
              }
              else if (item ==    "הצג שליחים")
              {
               // props.navigation.navigate("InsertCostumer")
               props.navigation.navigate("DisplayCotsumers",{
                admin:GLOBALS.admin
               })
              }
              else if (item ==    "הצג לקוחות")
              {
               // props.navigation.navigate("InsertCostumer")
               props.navigation.navigate("DisplayRestoraunts",{
                admin:GLOBALS.admin
               })
              }
            }}>
              <Text>{item}</Text>
            </ListItem>

          )}



        />
        {/* <FlatList
          style={{ borderTopWidth: 0.5, borderTopColor: '#f0f0f0' }}
          data={[
            'Your Wish List', 'Your Account', "Amazon Pay", "Prime", "Sell on Amazon"
          ]}
          renderItem={({ item }) => (

            <ListItem noBorder>
              <Text>{item}</Text>
            </ListItem>

          )}



        />

        <FlatList
          style={{ borderTopWidth: 0.5, borderTopColor: '#f0f0f0' }}
          data={[
            'Settings', 'Customer Service'
          ]}
          renderItem={({ item }) => (

            <ListItem noBorder>
              <Text>{item}</Text>
            </ListItem>

          )}



        /> */}
      </Content>
    </Container>
  )
}
const version = "2.0.7"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      }
    })
  }
});
