const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async (req,res) => {
    


    try{
      
        const newConversation = new Conversation({
         members: [req.body.senderId, req.body.receiverId]
        //members: ["610fe6a3b451130de0b1bdf2","610fe5fbb451130de0b1bde8"]
    });
        console.log(req.body);
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err) {
        res.status(500).json(err);
    }
})
//get a conv

router.get("/:userId" , async (req,res) =>{
    try{
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
          });
          res.status(200).json(conversation);

    }catch(err) {
        res.status(500).json(err);
    }
})

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });






module.exports = router;