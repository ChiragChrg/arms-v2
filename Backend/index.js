const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const route = require('./Routes/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/', route);

mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_LOCAL_URL, {
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.listen(5000, () => console.log('Server started'));