const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const menuSchema = mongoose.Schema(
  {
    Restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    Category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Category",
    },
    Category_Name: { type: String, required: true },
    Item_name: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: String, required: false },
    Uom: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
menuSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const menu = mongoose.model("menuSchema", menuSchema);

module.exports = menu;
