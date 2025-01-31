const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors({ origin: '*' }));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ufsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const idCollection = client.db("quiz").collection("ids");
    const markCollection = client.db("quiz").collection("mark");


    app.get("/data", async (req, res) => {
      const response = await fetch("https://api.jsonserve.com/Uw5CrX");
      const data = await response.json();
      // console.log(data)
      res.send(data);
    });
    
    app.post("/ids-post", async (req, res) => {
      const data = req.body;
      console.log(data)
      const result = await idCollection.insertOne(data);
      res.send(result);
    });
    app.get("/all-ids", async (req, res) => {
      const query = {};
      // console.log(data)
      const result = await idCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/allmarks", async (req, res) => {
      const query = {};
      // console.log(data)
      const result = await markCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/marks", async (req, res) => {
      const data = req.body;
      // console.log(data)
      const result = await markCollection.insertOne(data);
      res.send(result);
    });
    app.delete("/ids", async (req, res) => {
      const query = {};
      // console.log(data)
      const result = await idCollection.deleteMany(query);
      res.send(result);
    });
    app.delete("/delete-marks", async (req, res) => {
      const query = {};
      // console.log(data)
      const result = await markCollection.deleteMany(query);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
