const mongoose = require("mongoose");

const orderitems =mongoose.Schema({
    menu_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: false,
        ref: 'Menu'
     },
     quantity: {
         type: Number
     },
     item_name:{
         type: String
     }
  });

const orderSchema = mongoose.Schema({
    Restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
      },
    Order_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false,
        ref: 'Order'
    },
    Table_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false,
        ref: 'Table'
    },
    orderItems: [
       orderitems
      ],
    Accepted_at: {type: Date, required:false, default: null},
    Completed_at: {type: Date, required: false, default: null},
    Serving_time: {type : Date, default: Date.now},
    status: {
        type: Boolean,
        default: 0
    },
    
},
{
    timestamps: true
})

const order = mongoose.model('orderSchema',orderSchema)

module.exports = order;



