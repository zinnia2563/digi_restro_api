const mongoose = require("mongoose");

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
<<<<<<< HEAD
    Menu_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: false,
        ref: 'Menu'

    },
    
=======
    Menu_id: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            required: false,
            ref: 'Menu'
        }
      ],
>>>>>>> b5bc4f8a03db7483ff357ca9ca0016948e0aa513
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
<<<<<<< HEAD



=======
>>>>>>> b5bc4f8a03db7483ff357ca9ca0016948e0aa513
