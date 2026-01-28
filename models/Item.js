const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },       
    price: { type: Number, required: true },    
    category: { type: String, required: true },   
    description: { type: String, default: "" },
    img: { type: String, default: "https://via.placeholder.com/300" } 
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);