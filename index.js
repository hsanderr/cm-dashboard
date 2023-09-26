// const express = require('express');
// const app = express();
// const appPort = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(appPort, () => console.log(`Express app running on port ${appPort}!`));

const mqtt = require('mqtt')
const protocol = 'mqtt';
const host = 'broker.emqx.io';
const mqttPort = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const mainTopic = 'conditionMonitoring';

const connectUrl = `${protocol}://${host}:${mqttPort}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('Connected');
  client.subscribe(mainTopic, () => {
    console.log(`Subscribed to topic '${mainTopic}'`);
  });
});

client.on('message', (topic, payload) => {
  console.log(`Received Message: [${mainTopic}]`, payload.toString());
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hsanderr:h%40ndSt4nd@cluster0.6hfdjdz.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();
    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}
run().catch(console.dir);