import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../component/Room";
import Loader from "../component/Loader";
import Error from "../component/Error";
import "antd/dist/antd.css";
import moment from "moment";

import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function Home() {
  const [rooms, setrooms] = useState([]);
  const [loadind, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  const [duplicateRooms, setDublicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    const getRooms = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;

        setrooms(data);
        setDublicateRooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    getRooms();
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));;
    settodate(moment(dates[1]).format("DD-MM-YYYY"));;

    moment.suppressDeprecationWarnings = true;
    var tempRooms = [];
    var availability = false;
    for (const room of duplicateRooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.startDate,
              booking.endDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.startDate,
              booking.endDate
            )
          ) {
            if (
              moment(dates[0].format("DD-MM-YYYY")) !== booking.startDate &&
              moment(dates[0].format("DD-MM-YYYY")) !== booking.endDate &&
              moment(dates[1].format("DD-MM-YYYY")) !== booking.startDate &&
              moment(dates[1].format("DD-MM-YYYY")) !== booking.endDate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        tempRooms.push(room);
      }
      setrooms(tempRooms);
    }
  }
  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setrooms(tempRooms);
  }

  function filterByType(e) {
    if (e !== "all") {
      setType(e);
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );
      setrooms(tempRooms);
    } else {
      setrooms(duplicateRooms);
    }
  }
  return (
    <div className="col" style={{background:'rgba(179, 178, 2245)', height:'110vh'}}>
      <div className="col-md-12 back-img">
        <div className="col img-items ">
        <div className="row-md-6">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search Rooms"
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loadind ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
