const PORT = process.env.PORT || 8000;

const express = require("express");
const cors = require("cors");
const path = require('path')

const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uri =
    "mongodb+srv://aliba:aliba@projects.kfyhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json("Hello to my app");
});

app.post("/signup", async(req, res) => {
    const client = new MongoClient(uri);
    console.log(req.body);
    const { email, password } = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);

    try {
        await client.connect();
        const database = client.db("skillcheck");
        const users = database.collection("users");

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).send("user already exists. Please login");
        }

        const sanitizedEmail = email.toLowerCase();

        const data = {
            email: sanitizedEmail,
            hashed_password: hashedpassword,
        };
        const insertedUser = await users.insertOne(data);

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        });
        res
            .status(201)
            .json({ token, email: sanitizedEmail, userId: insertedUser.insertedId });
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", async(req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db("skillcheck");
        const users = database.collection("users");
        let correctData = await users.findOne({ email });
        console.log(correctData);
        if (!correctData) {
            return res.status(401).send("Email or password is not correct!");
        }
        bcrypt.compare(password, correctData.hashed_password, (error, isMatch) => {
            if (isMatch) {
                return res.status(201).send("You have successfully signed in!");
            } else {
                return res.status(401).send("Email or password is not correct!");
            }
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/users", async(req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const returnedUsers = await users.find().toArray();
        res.send(returnedUsers);
    } finally {
        await client.close();
    }
});

app.put("/user", async(req, res) => {
    const client = new MongoClient(uri);
    const formData = req.body.formData;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const query = { user_id: formData.user_id };

        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches,
            },
        };

        const insertedUser = await users.updateOne(query, updateDocument);

        res.json(insertedUser);
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => console.log("Sever Running on Port " + PORT));