// app/models/Theme.js
import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light",
  },
});

export default mongoose.models.Theme || mongoose.model("Theme", ThemeSchema);
