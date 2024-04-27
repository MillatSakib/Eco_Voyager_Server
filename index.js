const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lm9a1gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(process.env.DB_USER, process.env.DB_PASS);
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const findAllUser = async (req, res, userCollection) => {

    const cursor = userCollection.find();
    const result = await cursor.toArray();
    res.send(result)

}


async function run() {
    try {
        const database = client.db("userDB");
        const userCollection = database.collection("user");

        app.get('/users', async (req, res) => {
            findAllUser(req, res, userCollection);
        })
    }
    finally {
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is runnig on PORT ${port}`);
})
