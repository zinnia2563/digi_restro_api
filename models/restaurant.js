const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    Restaurant_owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    Restaurant_name: { type: String, required: true},
    branch_name: {type: String, required: true},
    Address: {type: String, required: false},
    Lat: {type: String, required: false},
    Lng: {type: String, required: false},
    Code: { type: String},
    Qr_code_path: {type: String},

},
{
    timestamps: true
})

const Restaurant = mongoose.model('restaurantSchema',restaurantSchema)

module.exports = Restaurant;