const PORT =  8900
//PROCESS.ENV.PORT ||
const io = require("socket.io")(PORT, {
    cors: {
      origin: '*',
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log(userId);
      io.emit("getUsers", users);
    });
    // io.on("connection", (socket) => {
    //   //when ceonnect
    //   io.emit("check","Mssg from server")
    // });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (typeof someUndeclaredVariable == "undefined") 
        {
        console.log("User is :"+user);
        // io.to(user.socketId).emit("getMessage", {
        //   senderId,
        //   text,
        // });
      }
      else 
      {
      console.log("else")
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });