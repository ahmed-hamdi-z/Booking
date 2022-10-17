import React, { useState, useEffect } from "react";
import axios from "axios";

import { Tabs } from "antd";

import Loader from "../component/Loader";
import Error from "../component/Error";
import Swal from "sweetalert2";
function UserProfile() {
  const user = JSON.parse(localStorage.getItem("CurrentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/Login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
          <h1> My Profile </h1>
          <br />
          <h1>Name : {user.name} </h1>
          <h1>Email : {user.email} </h1>
          <h1>Is Admin : {user.isAdmin ? "Yes" : "No"} </h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bookings" key="2">
          <MyBookings />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default UserProfile;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("CurrentUser"));

  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {
    const Booking = async () => {
      try {
        setloading(true);
        const data = await axios.post("/api/bookings/getBookingsByUserId", {
          userid: user._id,
        }).data;
        console.log(data);
        setBookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    Booking();
  }, []);

  function cancelBooking(bookingid, roomid) {
    const Cancel = async () => {
      try {
        setloading(true);
        const result = await axios.post("/api/bookings/cancelbooking", {
          bookingid,
          roomid,
        }).data;
        console.log(result);
        setloading(false);
        Swal.fire(
          "Congratulations",
          "Your booking has been cancelled",
          "success"
        ).then((result) => {
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
        setloading(false);
        Swal.fire("Oops", "Something went wrong", "error");
      }
    };
    Cancel();
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1> {booking.room} </h1>
                  <p>
                    {" "}
                    <b> Booking Id </b>: {booking._id}{" "}
                  </p>
                  <p>
                    {" "}
                    <b> Check In</b> : {booking.fromdate}{" "}
                  </p>
                  <p>
                    {" "}
                    <b> Check Out</b> : {booking.todate}{" "}
                  </p>
                  <p>
                    {" "}
                    <b>Amount </b> : {booking.totalAmount}{" "}
                  </p>
                  <p>
                    {" "}
                    <b> Status</b> :{" "}
                    {booking.status == "booked" ? "CONFIRMED" : "CANCELD"}{" "}
                  </p>

                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        {" "}
                        Canceld Booking
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
