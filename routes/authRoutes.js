const express = require("express")
const User = require("../models/Usermodel.js")
const bcrypt = require("bcrypt")

const router = express.Router()

//register
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, friends, location, occupation, images: pictures } = req.body;
        const viewedProfile = Math.floor(Math.random() * 10000);
        const impressions = Math.floor(Math.random() * 10000);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({ firstName, lastName, email, friends, location, occupation, pictures, password: passwordHash, viewedProfile: viewedProfile, impressions: impressions});
        res.status(201).json(user)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send("Email already exists")
        }
        res.status(400).send(error.message)
    }
})


//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (passwordCheck) {
                delete user.password;
                res.status(200).json(user);
            } else {
                res.status(400).send("Invalid Credentials");
            }
        } else {
            res.status(400).send("User not found");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router