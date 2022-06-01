const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const tableSchema = mongoose.Schema(
  {
    Restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    Table_number: { type: Number, required: true },
    Code: { type: String },
    Qr_code_path: { type: String },
  },
  {
    timestamps: true,
  }
);
tableSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const Table = mongoose.model("tableSchema", tableSchema);

module.exports = Table;
