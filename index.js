const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes.js")
const imageRoutes = require("./routes/imageRoutes.js")
const usersRoutes = require("./routes/userRoutes.js")
const postRoutes = require("./routes/postRoutes.js")
dotenv.config();
const app = express()

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());
app.use("/auth", authRoutes)
app.use("/images", imageRoutes)
app.use("/users", usersRoutes)
app.use("/posts", postRoutes)




mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, console.log(`Server is Connected`))
    })
    .catch((err) => console.log(err));