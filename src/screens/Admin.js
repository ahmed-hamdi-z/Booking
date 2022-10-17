import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";

import Loader from "../component/Loader";
import Error from "../component/Error";
import Swal from "sweetalert2";

function Admin() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("CurrentUser")).isAdmin) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="m-3 bs">
      <h1 className="text-center">
        <b> Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rooms" key="2">
          <Rooms />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Room " key="3">
          <AddRoom />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="4">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const book = async () => {
      try {
        const data = (await axios.get("/api/bookings/getAllBookings")).data;
        setBookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    book();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark ">
          <thead className="bs thead-dark">
            <th>Booking Id</th>
            <th>User Id</th>
            <th>Room</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td> {booking._id} </td>
                    <td> {booking.userid} </td>
                    <td> {booking.room} </td>
                    <td> {booking.fromdate} </td>
                    <td> {booking.todate} </td>
                    <td> {booking.status} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const room = async () => {
      try {
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        setRooms(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    room();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Rooms</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark ">
          <thead className="bs thead-dark">
            <th>Room Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Rent Per Day</th>
            <th>Max Count</th>
            <th>Phone Number</th>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td> {room._id} </td>
                    <td> {room.name} </td>
                    <td> {room.type} </td>
                    <td> {room.rentperday} </td>
                    <td> {room.maxcoun} </td>
                    <td> {room.phonenumber} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const user = async () => {
      try {
        const data = (await axios.get("/api/users/getAllUsers")).data;
        setUsers(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    user();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1> Users</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark ">
          <thead className="bs thead-dark">
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td> {user._id} </td>
                    <td> {user.name} </td>
                    <td> {user.email} </td>
                    <td> {user.isAdmin ? "Yes" : "No"} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AddRoom() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const [name, setName] = useState("");
  const [rentperday, setRentPerDay] = useState();
  const [maxcount, setMaxCount] = useState();
  const [description, setDescription] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [type, setType] = useState();
  const [imageurl1, setImageurl1] = useState();
  const [imageurl2, setImageurl2] = useState();
  const [imageurl3, setImageurl3] = useState();

  function addRoom() {
    const roomRoute = async () => {
      const newRoom = {
        name,
        rentperday,
        maxcount,
        description,
        phonenumber,
        type,
        imageurls: [imageurl1, imageurl2, imageurl3],
      };
      try {
        setloading(true);
        const result = await (
          await axios.post("/api/rooms/addRoom", newRoom)
        ).data;
        console.log(result);
        setloading(false);
        Swal.fire(
          "Congratulations",
          "your New Room Added Successfully",
          "success"
        ).then((result) => {
          window.location.href = "/homes";
        });
      } catch (error) {
        console.log(error);
        setloading(false);
        Swal.fire("Oops", "Something Went Wrong", "error");
      }
    };

    roomRoute();
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Room Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Rent Per Day"
          value={rentperday}
          onChange={(e) => {
            setRentPerDay(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Max Count"
          value={maxcount}
          onChange={(e) => {
            setMaxCount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>

      <div className="col-md-5">
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Image URL 1"
          value={imageurl1}
          onChange={(e) => {
            setImageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Image URL 2"
          value={imageurl2}
          onChange={(e) => {
            setImageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Image URL 3"
          value={imageurl3}
          onChange={(e) => {
            setImageurl3(e.target.value);
          }}
        />

        <div className="text-right">
          <button className="btn mt-2" onClick={addRoom}>
            {" "}
            Add Room{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
