const mongoose = require("mongoose");
// MONGO_URI =
//   "mongodb+srv://user2:simple03@node-tutorial.rsb65.mongodb.net/newUser?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();
// module.exports = connectDB;
