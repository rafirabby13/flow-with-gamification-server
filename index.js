const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors({ origin: '*' }));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ufsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri)
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
    const ansCollection = client.db("quiz").collection("ans");
    const markCollection = client.db("quiz").collection("mark");
    const quizCollection = client.db("quiz").collection("quizdata");


    app.get("/data", async (req, res) => {
      const data = await quizCollection.find({}).toArray()
      res.send(data);
    });

    app.post("/ans", async (req, res) => {
      const data = req.body;
      console.log(data)
      if (!data) {
        res.send({ message: false })
      }
      const result = await ansCollection.insertMany(data.ans);
      res.send(result);
    });
    app.get("/ans", async (req, res) => {
      const query = {};
      // console.log(data)
      const result = await ansCollection.find(query).toArray();
      // console.log(result)
      // if (!response.ok) {
      //   console.log('kuch to garbar he')
      // }
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
      const result = await ansCollection.deleteMany(query);
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
