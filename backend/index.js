const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectToMongo = require("./config/db");

const mintnft = require("./routes/mintnft");
const borrownft = require("./routes/borrownft");
const clear = require("./routes/clear");


const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
// app.use(express.bodyParser());
app.use(express.urlencoded({ extended: true }));

connectToMongo();

app.use("/api",mintnft);
app.use("/api",borrownft);
app.use("/api",clear)


app.listen(PORT, () => {
  console.log(`Server Running... ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to ZaPP nft store");
});
