const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    Restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
      },
    Category_id: { type: String, required: true},
    Item_name: {type: String, required: true},
    Price: {type: Number, required: true},
    Quantity: {type: Number, required: true}
},
{
    timestamps: true
})

const menu = mongoose.model('menuSchema',menuSchema)

module.exports = menu;



