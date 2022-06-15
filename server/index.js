const PORT = process.env.PORT || 8000;

const express = require("express");
const cors = require("cors");
const path = require("path");


const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uri =
    "mongodb+srv://aliba:aliba@projects.kfyhm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
app.use(cors());
app.use(express.json());
const http = require("http");
const { Server } = require("socket.io");
const { Console } = require("console");
const { isArray } = require("util");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("User connected, id: " + socket.id)
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(data)
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("get_message", data);
    });
});

// server.listen(8080, () => {
//     console.log("SERVER RUNNING");
// });

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
            subscription: false,
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
                const token = jwt.sign(correctData, email, {
                    expiresIn: 60 * 24,
                });
                res
                    .status(201)
                    .json({ token, userId: correctData._id });
            } else {
                return res.status(401).send("Email or password is not correct!");
            }
        });
    } catch (err) {
        console.log(err);
    }
});

//get one particular user by id
app.get("/user", async(req, res) => {
    const client = new MongoClient(uri);
    const userId = ObjectId(req.query.userId); //getting id from request (axios)
    try {
        await client.connect();
        const database = client.db("skillcheck");
        const users = database.collection("users");

        const query = { _id: userId };
        const user = await users.findOne(query);
        res.send(user);
        console.log(user);
    } finally {
        await client.close();
    }
});

//get all users and return array of them
app.get("/users", async(req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("skillcheck");
        const users = database.collection("users");

        const returnedUsers = await users.find().toArray();
        res.send(returnedUsers);
    } finally {
        await client.close();
    }
});

// app.post('/user_test', async(req, res) => {
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         const database = client.db("skillcheck");
//         const users = database.collection("users");
//         let correctData = await users.findOne({ _id: ObjectId(req.body.user_id) });
//         console.log(correctData);
//         if (!correctData) {
//             return res.status(401).send("Error!");
//         }
//         return res.status(200).send

//     } catch (err) {
//         console.log(err);
//     }
// })

app.put("/user", async(req, res) => {
    const client = new MongoClient(uri);
    const formData = req.body.formData;

    try {
        await client.connect();
        const database = client.db("skillcheck");
        const users = database.collection("users");

        const query = { _id: ObjectId(formData._id) };
        const userSkills = typeof formData.skills === "string" ? formData.skills.split(",") : formData.skills;
        const userDesires = typeof formData.desires === "string" ? formData.desires.split(",") : formData.desires;
        const userShow_gender = formData.show_gender === null ? [] : formData.show_gender;
        const userMatches = formData.matches === null ? [] : formData.matches;
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: userShow_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                skills: userSkills,
                desires: userDesires,
                matches: userMatches,
            },
        };
        const insertedUser = await users.updateOne(query, updateDocument);
        console.log(insertedUser);
        res.json(insertedUser);
    } finally {
        await client.close();
    }
});

server.listen(PORT, () => console.log("Sever Running on Port " + PORT));