const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const coreRoutes = require('./routes/coreRoutes');

const db = require('./config/db');
const port = process.env.PORT || 3001;

app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: false }))

mongoose.connect(db.DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    else {
        console.log("Database Connected");
    }
});

app.listen(port, () => {
    console.log('server running on :' + port);
})

app.use('/apis', coreRoutes)


