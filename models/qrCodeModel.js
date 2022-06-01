const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const qrcodeSchema = mongoose.Schema(
  {
    Total: { type: Number },
  },
  {
    timestamps: true,
  }
);
qrcodeSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const QrCode = mongoose.model("qrcodeSchema", qrcodeSchema);

module.exports = QrCode;
