const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;


//middle ware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://muntasirakib08:3rCS1B3dBJ0Z7iag@cluster0.qvgg1my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
     //await client.connect();
    // await client.db("admin").command({ ping: 1 });

     const userCollection = await client.db('userDB').collection('users');


    app.post('/users', async (req, res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    });
     
    app.get('/users', async (req, res)=>{
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const query = {_id: new ObjectId(id)}

      const options = {upsert: true}

      const updateUser = {
        $set: {
          name: user.name,
          email: user.email,
          password: user.password
        }
      }
      const result = await userCollection.updateOne(query,updateUser,options);

      res.send(result);

    })
     
    app.get('/users/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const user = await userCollection.findOne(query);
      res.send(user);
    })

    



    //await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } 
  
  finally {
    //  await client.close();
  }
}
run().catch(err=>console.log(err));



// muntasirakib08
// 3rCS1B3dBJ0Z7iag



app.get('/',(req, res) => {
    res.send('Hello from node mongo crud server')
})


app.listen(port,()=> {
    console.log(`My phone server: ${port}`)
})