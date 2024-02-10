const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.json());

require('dotenv').config();
const dbconfig = require('./config/dbconfig');
const port = process.env.PORT || 3004;

const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const bidRoute = require('./routes/bidRoute');

app.use('/api/users', usersRoute);
app.use('/api/products',productsRoute);
app.use('/api/bids',bidRoute)

app.listen(port, () => console.log(`Node/Express Server started on port ${port}`));

