const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://tejas:tejas123@cluster0.vcipto8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// ✅ FIX: Define the client here
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db('myWebsite'); // Database name
  const users = db.collection('users'); // Collection name

  // POST route to receive sign-up data
  app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received sign-up:', name, email, password);

    // Save to MongoDB
    await users.insertOne({ name, email, password });

    res.send('Thank you for signing up!');
  });

  // Start the server
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}

main().catch(console.error);
