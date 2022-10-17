import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Loader from "../component/Loader";
import Error from "../component/Error";
import moment from "moment";

import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  duration: 1000
});

function Booking() {
  const { roomid } = useParams();
  const { userid } = useParams();

  const { todate } = useParams();
  const { fromdate } = useParams();
  const startDate = moment(fromdate, "DD-MM-YYYY");
  const endDate = moment(todate, "DD-MM-YYYY");

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const user = JSON.parse(localStorage.getItem("CurrentUser"));

  const [totalAmount, settotalAmount] = useState();

  const totalDays = moment.duration(endDate.diff(startDate)).asDays() + 1;

  useEffect(() => {

    if (!localStorage.getItem('CurrentUser')) {
      window.location.reload = '/Login'
    }
    const postRoom = async () => {
      try {
        setloading(true);
        const data = (await axios.post("/api/rooms/getRoomById", { roomid }))
          .data;
        settotalAmount(data.rentperday * totalDays);
        setroom(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    postRoom();
  }, []);

   function onToken(token) {
    const bookingRoom = async ()=> {
      const bookingDetails = {
        room,
        userid: JSON.parse(localStorage.getItem("CurrentUser", userid)),
        fromdate,
        todate,
        totalAmount,
        totalDays,
        token
      }
  
      try {
        setloading(true);
        const result = await (await axios.post("/api/bookings/bookroom", bookingDetails))
        setloading(false);
          
        Swal.fire(
          "Congratulations",
          "Your Room Booked Successfully",
          "success"
        ).then((result) => {
          window.location.href = "/bookings";
        });
     
      } catch (error) {
        setloading(false);
        Swal.fire("OOPS", "Something Went Wrong", "error");
      }
    }
    bookingRoom()
    }
    

  return (
    <div className="m-5" data-aos='flip-left'>
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs ">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="large-img" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p> Name : {user.name} </p>
                  <p> From Date : {fromdate} </p>
                  <p> To Date : {todate} </p>
                  <p> Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1> Amount </h1>
                  <hr />
                  <p> Total Days : {totalDays} </p>
                  <p> Rent Per Day : {room.rentperday} </p>
                  <p> Total Amount : {totalAmount} </p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency="EGP"
                  stripeKey="pk_test_51LpQMwE5yR0F4g93ZlVCJzCjUry4tF387gdY5UvKuUEOjW25iKHkUNTwHB2uB2jOQrgpJdeW2cpicmsWDBqf5Duw00CyelVTRM"
                >
                  <button className="btn "> Book Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Booking;
