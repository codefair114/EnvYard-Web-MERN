const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    
}, {
    timestamps: true
});

const Order = mongoose.model('Order', ordersSchema);

module.exports = Order;