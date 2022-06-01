const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const branchSchema = mongoose.Schema(
  {
    Res_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    Branch_name: { type: String, required: true },
    Address: { type: String, required: false },
    Lat: { type: String, required: false },
    Lng: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
branchSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const branch = mongoose.model("branchSchema", branchSchema);

module.exports = branch;
