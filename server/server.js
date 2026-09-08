require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");

const port = process.env.PORT || 4000;
console.log(port);

// Connect to database
connectDB();

// Start Server
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${port}`,
  );
});
