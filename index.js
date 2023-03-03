const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');

require('dotenv').config();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_UserName}:${process.env.DB_Password}@cluster0.qm6ghoc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
  try {
    const allToursData = client.db('travelToursApplication').collection('allTravelToursData');
    const recommendedToursData = client.db('travelToursApplication').collection('recommendedTours');

    // get all tours data in database.
    app.get('/alltours', async (req, res) => {
      const query = {};
      const allTours = await allToursData.find(query).toArray();
      res.send(allTours);
    })

    // get recommended tours data in database.
    app.get('/recommendedTours', async (req, res) => {
      const query = {};
      const recommendedTours = await recommendedToursData.find(query).toArray();
      res.send(recommendedTours);
    })

  }
  finally {

  }
}
run().catch(error => console.log(error))




app.get('/', (req, res) => {
  res.send('Travel Server is Running')
})

app.listen(port, () => {
  console.log(`Travel Server is Running on port ${port}`)
})