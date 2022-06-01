const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const totalScanSchema = mongoose.Schema(
  {
    res_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);
totalScanSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const totalScan = mongoose.model("totalScanSchema", totalScanSchema);

module.exports = totalScan;
