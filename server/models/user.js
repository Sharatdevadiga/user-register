import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // One to many relation
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

export default mongoose.model("User", UserSchema);
