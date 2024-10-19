const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

const inquiriesRouter = require("./routes/inquiries");
app.use("/api/v1/inquiries", inquiriesRouter);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log("Error starting server:", error);
  }
}
startServer();
