const express = require('express');

const app = express();

// var cors = require('cors')

const dbConfig = require('./DB');
const roomsRoutes = require('./routes/roomsRoutes');
const usersRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoute')

app.use(express.json())

app.use('/api/rooms', roomsRoutes)

//users API
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingRoute)

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running using nodemon `));