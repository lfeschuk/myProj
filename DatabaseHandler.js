import firebase from './firebase';
import GLOBAL from './globals.js'
import { DrawerContentScrollView } from '@react-navigation/drawer';





    
  export async function  getAdmin(user,set_State)
    {
         let arr =  user.email.split("@")
        let phone = arr[0];
        let admin = null;
       if (user == null )
       {
        throw "לא נמצא משתמש";
       }
    
        console.warn("phone : " + phone)
      return firebase.database().ref('UsersAdmin').orderByChild("phone").equalTo(phone).once("value").then((snap) => {    
        //console.warn("fff1232456666 " + snap.val())
        if (!snap.exists())
        {
          throw "לא נמצא אדמין";
        }
      snap.forEach(snap2 =>{ 
        console.warn("eee2 " + snap2.val().username);
        
        set_State(snap2.val());
       // console.warn("eee21 " +this_restoraunt.name);
        return  admin;
      })
        
      
        
       
        
        // console.warn("eee3 delivguy " + delivGuy.name);
   
      });

   
    }
    export async function create_new_rest(restoraunt)
    {
      if (restoraunt == null || !restoraunt.email || !restoraunt.password  )
      {
        throw "שגיאה"
        return;
      }
      return firebase.auth().createUserWithEmailAndPassword(restoraunt.email, restoraunt.password)
        .catch(error => {
          alert("שגיאה בעט יצירת המשתמש, יתכן כי משתמש זה  כבר קיים")
          return;
        })
        .then (()=>{
          firebase.database().ref('Restoraunt').push(restoraunt)
          .then(snap => {
            firebase.database().ref('Restoraunt').child(snap.key).child("key").set(snap.key);
            alert("משתמש הוכנס בהצלחה")
          })
        })
      
      
        
     
        
      
    

    }
    export async function edit_rest(restoraunt,change_pass)
    {
      console.warn("here edit_rest 0 " + restoraunt + " " + restoraunt.key);
      if (restoraunt == null || !restoraunt.key || restoraunt.key == "" )
      {
        console.warn("here edit_rest error ");
        throw "שגיאה"
        return;
      }
      console.warn("edit_rest " + restoraunt.name + " " + restoraunt.key);
        return  firebase.database().ref('Restoraunt').child(restoraunt.key).set(restoraunt)
          .then(snap => {      
            console.warn("here1 " + change_pass)
          if (change_pass)
          {
          //  console.warn("here2 " + restoraunt.phone)
            let email =  restoraunt.phone + "@gmail.com";
            //  post('https://jetpack-delivery.tk/123', {name: email, create_new:false });
              let body = {
                name: email,
                create_new:false,
                password:restoraunt.password
              
              }
              fetch('https://jetpack-delivery.tk/123', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Origin': 'https://localhost:19006',
                
                  
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(body) 
             })
          }
            
            console.warn("here edit_rest ok ")
            alert("משתמש שונה בהצלחה")
        }).catch(e=>
          {
            console.warn("error + " + e.message)
          })
    }

    export async function deleteUser(user)
    {
      if(!user || !user.phone || user.phone == "")
      {
        return;
      }
      firebase.database().ref('User_Delivery').child(user.phone).remove()
      .then(()=>{
        let ref =  GLOBAL.admin.area_num == 0 ? "" : (GLOBAL.admin.area_num + "/")
        let to_remove = []
        firebase.database().ref(ref + "Delivery_Guys").once("value").then((snap)=>{
          snap.forEach(elem =>{
            if (elem.val().phone == user.phone)
            {
              to_remove.push(elem);
            }
          })
          to_remove.forEach(elem => {
            firebase.database().ref(ref + "Delivery_Guys").child(elem.key).remove();
          })
        })
        .then(()=>{
          if (to_remove.length > 0)
          {
          let email =  user.phone + "@gmail.com";
          //  post('https://jetpack-delivery.tk/123', {name: email, create_new:false });
            let body = {
              name: email,
              create_new:false
            
            }
            fetch('https://jetpack-delivery.tk/123', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': 'https://jetpack-deliveries.netlify.app'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(body) 
           })
          }
        })
        

      })
      .catch(err => {
        throw "לא נמצא משתמש"
      })
    }
    
    export async function deleteRestoraunt(user)
    {
      if(!user || !user.key || user.key == "")
      {
        return;
      }
      firebase.database().ref('Restoraunt').child(user.key).remove()
        .then(()=>{
         
          let email =  user.phone + "@gmail.com";
          //  post('https://jetpack-delivery.tk/123', {name: email, create_new:false });
            let body = {
              name: email,
              create_new:false
            
            }
            fetch('https://jetpack-delivery.tk/123', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': 'https://jetpack-deliveries.netlify.app'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify(body) 
           })
          })
        
      .catch(err => {
        throw "פעולה נכשלה"
      })
    }



    export async function getListOfRests(assign_function)
{
  if ( !GLOBAL.admin)
  {
      return;
  }
  let arr_out = [];
  console.warn("here getListOfRests")
  return firebase.database().ref('Restoraunt').once("value").then((snap)=>{
    snap.forEach(elem => {   
     
        if (elem.val().areaNum == GLOBAL.admin.area_num || (!elem.val().areaNum && GLOBAL.admin.area_num == 0 && elem.val().name))
        {
          arr_out.push(elem.val());
        }
    })
    assign_function(arr_out);
  })

}
export async function getListOfGuys(assign_function)
{
  if ( !GLOBAL.admin)
  {
      return;
  }
  let arr_out = [];
  console.warn("here getListOfGuys")
  return firebase.database().ref('User_Delivery').once("value").then((snap)=>{
    snap.forEach(elem => {   
      console.warn("here getListOfGuys " + elem.val().areaNum + " " + GLOBAL.admin.area_num)
        if (elem.val().areaNum == GLOBAL.admin.area_num || (!elem.val().areaNum && GLOBAL.admin.area_num == 0))
        {
          arr_out.push(elem.val());
        }
    })
    assign_function(arr_out);
  })

}
    export async function create_deliv_guy(user_delivery,delivery_guy)
        {
          if (delivery_guy == null || user_delivery == null   )
          {
            throw "שגיאה"
            return;
          }
          let email = user_delivery.phone + "@gmail.com"
          return firebase.auth().createUserWithEmailAndPassword(email, user_delivery.password)
         
          .then (()=>{
            firebase.database().ref('User_Delivery').child(user_delivery.phone).set(user_delivery)
            .then(() => {
              let ref = (user_delivery.areaNum == 0) ? "Delivery_Guys": (user_delivery.areaNum.toString() + "/Delivery_Guys") 
              console.warn("fff1 " + (user_delivery.areaNum.toString() + "/Delivery_Guys") + " " + ref  + " " + (user_delivery.areaNum == 0))
              firebase.database().ref(ref).child(delivery_guy.index_string).set(delivery_guy);
              alert("משתמש הוכנס בהצלחה")
            })
          })
          .catch(error => {
            alert("שגיאה בעט יצירת המשתמש, יתכן כי משתמש זה  כבר קיים")
            // fetch('https://mywebsite.com/endpoint/', {
            //   method: 'POST',
            //   headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({
            //     firstParam: 'yourValue',
            //     secondParam: 'yourOtherValue'
            //   })
            // });
            // post('https://jetpack-delivery.tk/123',{name: delivGuyPhone.toString() + "@gmail.com" ,pass: delivGuyPass,create_new:true});
            return;
          })

        }

        function create_user_delivery  (deliv_guy,new_index,area_num)
        {
          let user_delivery = 
          {
          username: deliv_guy.name,
          indexString: (new_index).toString(),
          phone: deliv_guy.phone	 ,
          password: deliv_guy.pass,
          salary: parseFloat(deliv_guy.salary),
          area: deliv_guy.area,
          areaNum: area_num
          };
          return user_delivery
        }
        function create_delivery_guy  (user_delivery) 
        {
            let deliv_guy_user = 
            {
            "dest_changed" : false,
            "index" : parseInt(user_delivery.indexString),
            "index_profile_array" : -1,
            "index_string" : user_delivery.indexString,
            "is_active" : false,
            "latetude" : 32.7806014,
            "longtitude" : 35.019238,
            "name" : user_delivery.username,
            "num_of_deliveries" : 0,
            "num_of_packages" : 0,
            "phone" : user_delivery.phone,
            "picture" : "",
            "reset_profile" : false,
            "salary" : user_delivery.salary,
            "sent_start_shift_report" : false,
            "timeBeFree" : "23:14",
            "time_key" : "",
            "token" : "",
            "ios_token" : "",
            "update_db" : false,
            "areaNum" : user_delivery.areaNum

            }
            return deliv_guy_user;


        }

        export async function add_Delivery_guy(delivery_guy,area_num)
        {
          firebase.database().ref().child('deliveryGuyIndex').transaction(function(deliveryGuyIndex){
            if (deliveryGuyIndex === null)
            {
            return deliveryGuyIndex;
            }
            else
            {
            let temp =  deliveryGuyIndex;
            deliveryGuyIndex++;
            return deliveryGuyIndex;
            }
            }).then(snap =>{   
              let new_index = snap.snapshot.val();
              let user_delivery = create_user_delivery(delivery_guy,new_index,area_num);
              let deliv_out = create_delivery_guy(user_delivery);
             
              create_deliv_guy(user_delivery,deliv_out)
              
            })
        }
        // export async function editDelivery_Guy(delivery_guy,area_num)
        // {
         
        //       let user_delivery = create_user_delivery(delivery_guy,new_index,area_num);
        //       let deliv_out = create_delivery_guy(user_delivery);
             
        //       create_deliv_guy(user_delivery,deliv_out)
              
            
        // }
        
       
    

    
    

