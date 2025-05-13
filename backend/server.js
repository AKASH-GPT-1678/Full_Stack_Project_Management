require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3400;
const cors = require("cors");
const redis = require("redis")
const { createServer } = require("node:http");
const { graphqlHTTP } = require("express-graphql");
const router = require("./src/routes/router.js");
const Schema = require("./src/graphql/graph.js");
const { saveJob } = require("./src/controllers/jobs.controller.js")
const { connectMongo } = require("../backend/src/configs/mongo.config.js");
const decodeToken = require("./src/middleware/checkTokenMiddleware.js");


// Setup HTTP server and socket.io
const server = createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// const redisClient = redis.createClient({
//     host: 'localhost',
//     port: 6379,
// })

// Middlewares
app.use(express.json());
app.use(cors());
app.use(decodeToken);
app.use("/api", router);
app.use("/graphql", graphqlHTTP({ schema: Schema, graphiql: true }));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello Server is running");
});
// const redisClient = redis.createClient();

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// (async () => {
//     await redisClient.connect();
//     console.log("✅ Redis connected successfully");
// })();


connectMongo();

 // Store messages in a list under the room ID
// async function loadRedis(roomid, userid, message, date, name) {
//     const messageData = JSON.stringify({
//         sender: userid,
//         text: message,
//         date: date,
//         name: name
//     });
//     await redisClient.rPush(roomid, messageData);
//     console.log("✅ Message Saved successfully");
// };

// async function getMessages(roomid) {
//     const messages = await redisClient.lRange(`messages:${roomid}`, 0, -1);
//     return messages.map(msg => JSON.parse(msg));
// }



io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // JOIN ROOM
    let roomId;
    let numofMember;
    socket.on("join-room", ({roomid , members}) => {
        socket.join(roomid);
        console.log(`Socket ${socket.id} joined room: ${roomid}`);
        roomId = roomid;
        numofMember = members

        // getMessages(roomid).then((messages) => {
        //     socket.emit("offline-messages", messages);
        // });

        
     
    });
   

  

    socket.on("send-message", ({ userid, roomid, message, date, name }) => {
        console.log(`Message from ${socket.id} to room ${roomid}: ${message}  ${date} ${name} ${userid}`);
        const numClients = io.sockets.adapter.rooms.get(roomId).size;
        console.log(`Number of clients in room ${roomId}: ${numClients}`);
        console.log(`Batau Kitne Bande hai ${numClients}`);
        console.log(roomId)



        io.to(roomid).emit("receive-message", {
            sender: userid,
            text: message,
            date: date,
            name: name,

        });
        console.log(numofMember)




        if(numClients < numofMember){
            
        // loadRedis(roomId, userid, message, date, name).then((data) => {
        //     console.log("Added Successfully");
        // });
        

        }




      


    });
    

     


    socket.on("jobposting", (payload) => {
        console.log(`Job posting from ${socket.id}: `, payload);
        saveJob(payload.id, payload.wage, payload.work, payload.description, payload.location, new Date(payload.expire));
    });


    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});


server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
