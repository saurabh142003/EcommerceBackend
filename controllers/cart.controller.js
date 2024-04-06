const Order = require("../models/cart.model")
const productModel = require("../models/product.model")
const createOrder = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { user, products, totalPrice ,totalQuantity} = req.body;
        // Find an existing order for the user
        let order = await Order.findOne({ user });
        Quantitytotal=0;
        let Pricetotal = 0;
        for (const item of products){
            const prod = await productModel.findById(item.product)
            Pricetotal+=item.quantity*prod.price
            Quantitytotal+=item.quantity
        }

        // Calculate the total price by summing up the prices of fetched products
   

        if (!order) {
            // If no order exists, create a new one with the provided products
            order = new Order({ user, products, totalPrice:Pricetotal,totalQuantity:Quantitytotal});
        } else {
            // If an order already exists, append the new products to the existing order
            order.totalPrice+=Pricetotal
            order.totalQuantity+=Quantitytotal
            let itemNotExist = true
            for(const item of products){
                for(const prod of order.products){
                    if(item.product==prod.product){
                        itemNotExist=false
                        prod.quantity+=item.quantity

                    }
                }   
            }
            if(itemNotExist){
            order.products.push(...products);
            }

        }

        // Save the order to the database
        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order" });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products user products.product');
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error getting orders:", error);
        res.status(500).json({ message: "Error getting orders" });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('products');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("Error getting order:", error);
        res.status(500).json({ message: "Error getting order" });
    }
};

// Update order by ID
const updateOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Error updating order" });
    }
};

// Delete order by ID
const deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Error deleting order" });
    }
};
module.exports={
    createOrder:createOrder,
    getAllOrders:getAllOrders,
    getOrderById:getOrderById,
    updateOrderById:updateOrderById,
    deleteOrderById:deleteOrderById

}