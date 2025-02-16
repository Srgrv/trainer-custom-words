import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  russian: {
    type: String,
    required: true,
  },
  learned: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Word || mongoose.model("Word", WordSchema);
