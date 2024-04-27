const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const cors = require('cors')

app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017";

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
