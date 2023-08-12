const express = require("express")
const Post = require("../models/Postmodel.js")
const User = require("../models/Usermodel.js")


const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const { userId, description, images: postPictures } = req.body
        const user = await User.findById(userId)
        const post = await Post.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location, description, postPictures,
            pictures: user.pictures,
            likes: {},
            comments: [],
        })
        user.posts.push(post)
        user.markModified("posts")
        await user.save()
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(posts)
    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.get("/", async (req, res) => {
    try {
        const post = await Post.find().sort({ createdAt: -1 });;
        res.status(200).json(post);
    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(post);
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//update likes
router.patch("/:id/likes", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(req.body);
    try {
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        console.log(isLiked);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = router