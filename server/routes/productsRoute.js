const router = require('express').Router();
const Product = require('../models/productModel');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const { response } = require('express');



//add new product

router.post('/add-product', authMiddleware, async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.send({
            success: true,
            message: 'Product added successfully'
        })


    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});

// get all products
router.post('/get-product', authMiddleware, async (req, res) => {
    try {
        const { seller, categories = [], age = [] } = req.body
        let filters = {}
        if (seller) {
            filters.seller = seller
        }
        const products = await Product.find(
            filters
        ).populate('seller').sort({ createdAt: -1 });

        res.send({
            success: true,
            data: products,
        })


    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
});


//edit product

router.put("/edit-product/:id", authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Product updated successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })

    }
})


// delete product
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

//get img

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);  //rename file with current time and extension
    }
})


//upload img
router.post("/upload-image-to-product", authMiddleware, multer({ storage: storage }).single('file'), async (req, res) => {

    console.log("in routet")
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "vjtimp",
        });
        const productId = req.body.productId;
        console.log("try")
        await Product.findByIdAndUpdate(productId, {
            $push: { images: result.secure_url },
        })
        res.send({
            success: true,
            message: "Image Uploaded successfully",
            data: result.secure_url,
        })
    } catch (error) {
        console.log(error)
        res.send({

            success: false,
            message: error.message,
        })

    }
});
//update product status
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;

        await Product.findByIdAndUpdate(req.params.id, { status });
        console.log("try route")
        res.send({
            success: true,
            message: "product status updated successfully"
        })

    } catch (error) {
        console.error(error);

        res.send({

            success: false,
            message: error.message
        })
    }
})
//get prod id
router.get('/get-product-by-id/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("seller");
        res.send({
            success: true,
            data: product
        })

    } catch (error) {
        res.send({
            success: false,
            message:error.message
        })
    }
}
)


module.exports = router;
