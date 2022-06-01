const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const orderitems = mongoose.Schema({
  menu_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Menu",
  },
  quantity: {
    type: Number,
  },
  item_name: {
    type: String,
  },
});

const orderSchema = mongoose.Schema(
  {
    Restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    Order_id: {
      type: String,
    },
    Table_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Table",
    },
    orderItems: [orderitems],
    orderDate: {
      type: String,
    },
    Accepted_at: { type: Date, required: false, default: null },
    Completed_at: { type: Date, required: false, default: null },
    Serving_time: { type: Date, default: Date.now },
    status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(timeZone, { paths: ["date", "subDocument.subDate"] });
const order = mongoose.model("orderSchema", orderSchema);

module.exports = order;
