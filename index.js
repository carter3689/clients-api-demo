const express = require('express');
const bodyparser = require('body-parser')

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ extended: false }));      // to support JSON-encoded bodies
app.use(bodyparser.raw({ extended: false }));
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
// Import Routes
const authRoute = require('./routes/auth');
const clientsRoute = require('./routes/clients');

// Route Middleware
app.use('/api/user',authRoute);
app.use('/all',clientsRoute)

const port = process.env.PORT || 3001;

app.listen(port , () => console.log(`Server up at port ${port}`));

module.exports = app