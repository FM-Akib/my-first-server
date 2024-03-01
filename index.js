const express = require('express')
const app = express();
const port = process.env.PORT || 5000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://muntasirakib08:3rCS1B3dBJ0Z7iag@cluster0.qvgg1my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();
   
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



// muntasirakib08
// 3rCS1B3dBJ0Z7iag



app.get('/',(req, res) => {
    res.send('My Pacha is cooooomming soon')
})


app.listen(port,()=> {
    console.log(`My phone server: ${port}`)
})