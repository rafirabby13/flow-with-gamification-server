const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/data", async (req, res) => {
    
        const response = await fetch("https://api.jsonserve.com/Uw5CrX");
        const data = await response.json();
        console.log(data)
        res.send(data)
      
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
