const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const categorySchema = mongoose.Schema(
  {
    Restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    Category_name: {
      type: String,
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snacks",
        "Buffet",
        "Beverage",
        "Fast Food",
        "Burger",
        "Sandwich",
        "French Fry",
        "Fried Chicken",
        "Pizza",
        "Shawrma",
        "Set Menu",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const Category = mongoose.model("categorySchema", categorySchema);

module.exports = Category;
