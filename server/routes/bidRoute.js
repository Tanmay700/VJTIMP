const router = require('express').Router();
const Bid = require('../models/bidModal');
const authMiddleware = require('../middlewares/authMiddleware');
const productModel = require('../models/productModel');
//place a new bid

router.post('/place-new-bid', authMiddleware, async (req, res) => {
    try {
        const newBid = new Bid(req.body);
        await newBid.save();
        res.send({ success: true, message: "Bid placed successfully" })
    } catch (error) {
        res.send(
            {
                success: false,
                message: error.message
            }
        )
    }
})
//get all bids
router.post("/get-all-bid", authMiddleware, async (req, res) => {
    try {
        const { product, seller } = req.body;
        let filters = {};

        if (product) {
            filters.product = product;
        }

        if (seller) {
            filters.seller = seller;
        }

        const bids = await Bid.find(filters).populate("product").populate("buyer").populate("seller");

        
        res.send({ success: true, data: bids });
    }

    catch (error) {
        console.log("in catch");
        res.send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
