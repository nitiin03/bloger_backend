// server
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
const { errorHandler, notFound } = require("./middleware/error/errorHandler");
const cors = require("cors");
const postRoute = require("./routes/posts/postRoute");
const commentRoute = require("./routes/comments/commentRoute");
const emailMsgRoute = require("./routes/emailMsg/emailMsgRoute");
const categoryRoute = require("./routes/category/categoryRoute");
const app = express();
dbConnect();
app.use(express.json());
//cors
app.use(cors());
//Register
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/email", emailMsgRoute);
app.use("/api/category", categoryRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server Running on " + PORT + " PORT"));
