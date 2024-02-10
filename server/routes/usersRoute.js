const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');



//reg
router.post('/register', async (req, res) => {
    try {
        // already exist
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new Error('User already exist')
        }
        //hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //new
        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "User registerd successfully"
        })


    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});
//log
router.post('/login', async (req, res) => {
    try {
        //exist
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("User not Found")
        }
        //active user filt
        if(user.status !=="active"){
            throw new Error("User is Blocked")
        }

        //compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            throw new Error("Invalid password");
        }
        //token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });


        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});
//get usr

router.get("/get-current-user", authMiddleware, async (req, res) => {
    console.log("h1");
    try {
        console.log(req.userId);
        const user = await User.findById(req.userId);
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

//get all users
router.get("/get-all-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});
//update users status
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: 'Status updated Successfully',
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
})



module.exports = router;
