import mongoose from "mongoose";

const kitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Kit = mongoose.model("Kit", kitSchema);
export default Kit;

