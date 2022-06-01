const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const restaurantSchema = mongoose.Schema(
  {
    Restaurant_owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Restaurant_name: { type: String, required: true },
    Address: { type: String, required: false },
    Lat: { type: String, required: false },
    Lng: { type: String, required: false },
    Code: { type: String },
    Qr_code_path: { type: String },
  },
  {
    timestamps: true,
  }
);
restaurantSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const Restaurant = mongoose.model("restaurantSchema", restaurantSchema);

module.exports = Restaurant;
