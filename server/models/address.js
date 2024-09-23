import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Address", addressSchema);
