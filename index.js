
//Load HTTP module
const express = require("express");
const mongoose = require('mongoose');

//cors provides Express middleware to enable CORS with various options.
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");



const corsOptions = {
  origin: "http://localhost:3100"
};

app.use(cors(corsOptions));

dotenv.config()

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const connUri = process.env.MONGO_LOCAL_CONN_URL;


//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, { useNewUrlParser: true , useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my blog application." });
});

require("../app/routes/posts")(app);
require("../app/routes/comments")(app);

// set port, listen for requests

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
