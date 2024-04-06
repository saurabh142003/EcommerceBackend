const mongoose = require("mongoose");
const productInCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Set a default quantity if needed
    }
});

const cartSchema = new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Reference to the User model
        required: true
      },
      products: [productInCartSchema],
      totalPrice: {
        type: Number,
      },
      totalQuantity:{
        type:Number
      }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Cart", cartSchema);
