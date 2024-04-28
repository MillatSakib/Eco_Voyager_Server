const express = require('express')
const app = express()
const port = process.env.PORT || 3010;
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lm9a1gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(process.env.DB_USER, process.env.DB_PASS);
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



const findAllTouristSpot = async (req, res, touristSpotCollection) => {

    const cursor = touristSpotCollection.find();
    const result = await cursor.toArray();
    res.send(result)

}




const setSpotOnDB = async (req, res, touristSpotCollection) => {

    const spot = req.body;

    // console.log("New user", spot);
    const result = await touristSpotCollection.insertOne(spot);

    res.send(result)
}




async function run() {
    try {
        const database = client.db("userDB");
        const touristSpotCollection = database.collection("touristSport");

        app.get('/allTouristSpots', async (req, res) => {
            findAllTouristSpot(req, res, touristSpotCollection);
        })

        app.post('/addSpot', async (req, res) => {
            setSpotOnDB(req, res, touristSpotCollection);
        })
        app.get('/my_added_spot/:id', async (req, res, id, touristSpotCollection) => {
            const id = req.params.id;
            viewMyAddedSpot(req, res, id, touristSpotCollection);
        })
    }
    finally {
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is runnig on PORT ${port}`);
})
