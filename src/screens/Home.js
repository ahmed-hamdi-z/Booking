import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Room from '../component/Room';
import Loader from '../component/Loader';
import Error from '../component/Error';
import 'antd/dist/antd.css';
import moment from 'moment';

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


function Home(){

  const [rooms, setrooms] = useState([]);
  const [loadind, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()

  const [duplicateRooms, setDublicateRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      
      try {
        const data = (await axios.get('/api/rooms/getAllRooms')).data
         setrooms(data)
         console.log(data)
      } catch (error) {
        console.log(error)
      }
    
    };
  
    getRooms();
  }, []);
  
    return (
        <div>
          <h1> { rooms.length } </h1>
        </div>
    );
  
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

  
    moment.suppressDeprecationWarnings = true;
    var tempRooms = [];
    var availability = false;
    for (const room of dublicateRooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]), " DD-MM-YYYY").isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]), " DD-MM-YYYY").isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0], " DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0], " DD-MM-YYYY") !== booking.todate &&
              moment(dates[1], " DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1], " DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
}

export default Home;


















// function  Home () {


//    const [data, setdata] = useState([]);
  

  
//     async  function GetRooms() {

//       try {
//         const rooms = await axios.get('/api/rooms/getAllRooms')
//          setdata(rooms)
//          console.log(rooms)
//       } catch (error) {
//         console.log(error)
//       }
    
//   }
//   useEffect(() => {
//     GetRooms();
//   }, []);


//   return (
//     <div>
//       <h1> Hello  </h1>
//       <h1> {data.length} </h1>
//     </div>
//   )
// }

// export default Home







// import React, { useState, useEffect } from "react";
// import axios from 'axios';


// function Home() {



//   useEffect(() => {
//   const getUsers = async () => {
//     const users = await fetchUsers();
//     setUsers(users);
//   };

//   getUsers(); // run it, run it

//   return () => {
//     // this now gets called when the component unmounts
//   };
// }, []);
  
// //       useEffect(() => {
// //         (async () => {

// //           try {
// //                  const data =  await axios.get('/api/rooms/getAllRooms').data
            
// //                       console.log(data)
// //                       //  setrooms(data)
// //                   } catch (error) {
// //                       console.log(error)
// //              }
// //              return ( 
// //               <div>
// //                 <h1> hi </h1>
// //                 {/* <h1> {rooms.length} </h1> */}
          
// //            </div>
// //          )

// //         },[])
       
// //       })

 
// }



// export default Home














// import React, { useState, useEffect} from 'react'

// import axios from 'axios';


// // const Convert = require("../../007 rooms.json")
// // const welc = Convert.toWelc(json)



// function  Home() {

//     //GetRooms();

//     //  const [rooms, setrooms] = useState([])
//     useEffect(async() => {
//       try {
//           const data = ( await axios.get('/api/rooms/getAllRooms')).data

//           console.log(data)
//           //  setrooms(data)
//       } catch (error) {
//        console.log(error)
//       }
//   }, [])

//   return ( 
//     <div>
//       <h1> hi </h1>
//       {/* <h1> {rooms.length} </h1> */}

//     </div>
//   )
// }

// // function GetRooms(){
    
// //     // const [rooms, setrooms] = useState([])
// //     useEffect(async() => {
//   //             const data = ( await axios.get('/api/rooms/getAllRooms')).data
//   //         try {
    
// //             console.log(data)
// //         } catch (error) {
// //             console.log(error)
// //         }
// //     }, [])
// //     }
// export default Home
