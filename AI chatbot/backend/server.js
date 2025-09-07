const app = require('./src/app')
require('dotenv').config()

const { createServer } = require("http");
const { Server } = require("socket.io");

const generateResponse = require('./src/services/ai.service');
const { Console } = require('console');
const { text } = require('stream/consumers');

const httpServer = createServer(app);

const io = new Server(httpServer, { 
    cors:{
        origin:"http://localhost:5173",  // frontend url
    }
});

const chatHistory = []

// there are two types of event in socketio....builtin and custom....there are only two builtin event

io.on("connection", (socket) => {    // first builtin event
    // jbb bhi ekk nya connection hmare server prr bnagea uss time prr ye callback run hoga
   console.log("A user connected")

   socket.on("disconnect",()=>{
    console.log("A user disconnected");  // 2nd buildin event
   })

   // on = listner
   // emit = event fire krna

   socket.on("ai-message",async (data)=>{
    // console.log(data)

    chatHistory.push({
        role:"user",
        parts: [{text:data}]
    })

    const response = await generateResponse(chatHistory)
    console.log("ai response : ", response);

    chatHistory.push({
        role:"model",
        parts: [{text:response}]
    })

    socket.emit("ai-message-response",{response})
   })
});

httpServer.listen(3000,()=>{
    console.log("server is running on the port 3000")
})


// io = server
// socket = single user