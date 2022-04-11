const mongoose = require("mongoose");

const qrcodeSchema = mongoose.Schema(
  {
    Total: { type: Number },
  },
  {
    timestamps: true,
  }
);

const QrCode = mongoose.model("qrcodeSchema", qrcodeSchema);

module.exports = QrCode;
