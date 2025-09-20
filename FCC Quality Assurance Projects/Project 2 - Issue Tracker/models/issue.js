const mongoose = require("mongoose");
const { Schema } = mongoose;

const issuesSchema = new Schema(
  {
    project: { type: String, required: true },
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    // Optional fields with empty string defaults
    assigned_to: { type: String, default: "" },
    status_text: { type: String, default: "" },
    open: { type: Boolean, default: true },
  },
  {
    // Custom timestamp field names to match API requirements
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" },
  }
);

module.exports = mongoose.model("issues", issuesSchema);
