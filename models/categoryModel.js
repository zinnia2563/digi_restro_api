const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    Restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
      },
    Category_name: { 
        type: String,
        enum: ['Breakfast','Lunch','Dinner','Snacks','Buffet','Beverage','Fast Food','Burger','Sandwich','French Fry','Fried Chicken','Pizza','Shawrma','Set Menu'],
        required: true
    },

},
{
    timestamps: true
})

const Category = mongoose.model('categorySchema',categorySchema)

module.exports = Category;