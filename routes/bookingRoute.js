const express = require("express");
const router = express.Router();

const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51LpQMwE5yR0F4g93D0L0GuCsKuOAoJpcRynWgOgrh1tKU0PXORkn9iiYdHlPLt5MnR8JhkaIcIJdFatEKvSzUDmc00AnsfZCaZ"
);

const Booking = require("../models/BookingModel");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalAmount, totalDays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "EGP",
        receipt_email: token.email,
      },
      {
        idemoptencyKey: uuidv4(),
      }
    );
    if (payment) {
      const startDate = moment(fromdate).format("DD-MM-YYYY");
      const endDate = moment(todate).format("DD-MM-YYYY");

      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: startDate,
        todate: endDate,
        totalAmount,
        totalDays,
        transactionId: "1234",
      });

      const booking = await newbooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: startDate,
        todate: endDate,
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();
    }
    res.send("Payment Successfull, Your Room is Booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getBookingsByUserId", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelBooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.currentbookings = temp;

    await room.save();

    res.send("Your Room Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/getAllBookings', async (req, res) => {

  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error })
    
  }
})

module.exports = router;
