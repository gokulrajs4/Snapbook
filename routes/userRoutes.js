const express = require("express")
const User = require("../models/Usermodel")


const router = express.Router()

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
})


router.patch("/:id/:friendId", async(req, res)=>{
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
     
        if (user.friends.includes(friendId)) {
          user.friends = user.friends.filter((id) => id !== friendId);
          friend.friends = friend.friends.filter((fid) => fid !== id);
        } else {
          user.friends.push(friendId);
          friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
          user.friends.map((id) => User.findById(id))
        );
    
        //just formatting the friends arr based on front-end need
        const formattedFriends = friends.map(
          ({ _id, firstname, lastname, occupation, location, pictures }) => {
            return { _id, firstname, lastname, occupation, location, pictures };
          }
        );
        res.status(200).json(formattedFriends);
      } catch (err) {
        res.status(404).json({ msg: err.message });
      }
})


router.get("/:id/friends", async(req, res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
          user.friends.map((id) => User.findById(id))
        );
    
        //just formatting the friends arr based on front-end need
        const formattedFriends = friends.map(
          ({ _id, firstName, lastName, occupation, location, pictures }) => {
            return { _id, firstName, lastName, occupation, location, pictures };
          }
        );
        res.status(200).json(formattedFriends);
      } catch (err) {
        res.status(404).json({ msg: err.message });
      }
})


module.exports = router