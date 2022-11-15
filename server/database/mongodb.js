import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(
    "mongodb+srv://MrTypeError:SudipDutta1234@learn-mern.nj3vwnu.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB connection is successful ");
}

export default connect;
