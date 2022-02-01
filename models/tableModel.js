const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
    Restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Restaurant',
      },
    Table_number: { type: String, required: true},
    Code: { type: String},
    Qr_code_path: {type: String},

},
{
    timestamps: true
})

const Table = mongoose.model('tableSchema',tableSchema)

module.exports = Table;