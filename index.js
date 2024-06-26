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

const findAllTouristSpot = async (req, res, touristSpotCollection, sort) => {

    const cursor = touristSpotCollection.find().sort({ avg_cost: sort });
    const result = await cursor.toArray();
    res.send(result)

}

const findsixTouristSpot = async (req, res, touristSpotCollection) => {

    const cursor = touristSpotCollection.find().limit(6);
    const result = await cursor.toArray();
    res.send(result)

}


const setSpotOnDB = async (req, res, touristSpotCollection) => {

    const spot = req.body;

    // console.log("New user", spot);
    const result = await touristSpotCollection.insertOne(spot);

    res.send(result)
}

const viewMyAddedSpot = async (req, res, id, touristSpotCollection) => {
    const query = { email: id }

    const touristSpots = await touristSpotCollection.find(query);
    const result = await touristSpots.toArray();
    res.send(result);
}

const allTouristSpotonCountry = async (req, res, id, touristSpotCollection) => {
    const query = { country_name: id }

    const touristSpots = await touristSpotCollection.find(query);
    const result = await touristSpots.toArray();
    res.send(result);
}

const deleteUserFromDB = async (req, res, touristSpotCollection, id) => {
    try {
        const query = { _id: new ObjectId(id) }
        const result = await touristSpotCollection.deleteOne(query);
        res.send(result);
    }
    catch (error) {
        res.send("You give Wrong Id")
    }
}

const updateMyAddedData = async (req, res, touristSpotCollection, id, user) => {
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true }
    const updatedUser = {
        $set: {
            spot_name: user.spot_name,
            country_name: user.country_name,
            location: user.location,
            travel_time: user.travel_time,
            avg_cost: user.avg_cost,
            vis_per_y: user.vis_per_y,
            email: user.email,
            name: user.name,
            img_url: user.img_url,
            seasonality: user.seasonality,
            description: user.description,
        }
    }
    const result = await touristSpotCollection.updateOne(filter, updatedUser, options);
    res.send(result)
}


async function run() {
    try {
        const database = client.db("userDB");
        const touristSpotCollection = database.collection("touristSport");
        const countryCollection = database.collection("Country");
        app.get('/allTouristSpots/:sort', async (req, res) => {
            const sort = req.params.sort;
            findAllTouristSpot(req, res, touristSpotCollection, sort);
        })
        app.get('/allSixSpots', async (req, res) => {
            findsixTouristSpot(req, res, touristSpotCollection);
        })

        app.post('/addSpot', async (req, res) => {
            setSpotOnDB(req, res, touristSpotCollection);
        })
        app.get('/my_added_spot/:email', async (req, res) => {
            const id = req.params.email;
            viewMyAddedSpot(req, res, id, touristSpotCollection);
        })
        app.delete('/myAddedSpot/:id', async (req, res) => {
            const id = req.params.id;
            deleteUserFromDB(req, res, touristSpotCollection, id);

        })

        app.get('/myAddedSpot/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const user = await touristSpotCollection.findOne(query);
            res.send(user);

        })

        app.put('/updateSpot/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            updateMyAddedData(req, res, touristSpotCollection, id, user);

        })

        app.get('/tourist_spot_details/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const query = { _id: new ObjectId(id) }
                const touristSpot = await touristSpotCollection.findOne(query);
                res.send(touristSpot);
            }
            catch (error) {
                res.send(`Your requested ID invalid. Error:${error}`)
            }
        })

        app.get('/find_all_country/', async (req, res) => {
            findAllTouristSpot(req, res, countryCollection);
        })
        app.get('/allTouristSpot/:countryName', async (req, res) => {
            const countryName = req.params.countryName;

            allTouristSpotonCountry(req, res, countryName, touristSpotCollection);
        })


    }
    finally {
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Server is runnig on PORT ${port}`);
})
