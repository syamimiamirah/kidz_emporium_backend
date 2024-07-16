const therapistServices = require('../services/therapist.services');
const UserService = require('../services/user.services');
const UserModel = require('../models/user.model');

exports.register = (req, res, next)=>{
    UserService.register(req.body, (error, results) => {
        if (error) {
            console.error("Registration error: ", error);
            if (error.message === 'Email already registered') {
                return res.status(400).send({
                    status: false,
                    message: error.message,
                });
            }
            return next(error);
        }
        return res.status(200).send({
            status: true,
            message: "Success",
            data: results,
        });
    });
    
    // try{
    //     const {name, email, phone, role, password} = req.body;
    //     const successRes = await UserService.registerUser(name, email, phone, role, password);

    //     res.json({status:true, success: "User registered successfully"});
    // }catch(error){
    //     throw error;
    // }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    
    UserService.login({email, password}, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            status:true,
            message: "Success",
            data: results
        })
    });
};

exports.registerFCMToken = async (req, res) => {
    try {
        const { email, fcmToken } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's FCM token
        user.fcmToken = fcmToken;
        await user.save();

        res.status(200).json({ message: 'FCM token registered successfully' });
    } catch (error) {
        console.error('Error registering FCM token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await UserService.getAllUsers();
        res.json({ status: true, success: allUsers });
    } catch (error) {
        console.error('Error fetching all users:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all users' });
    }
};
// let tokenData = {_id: UserService._id, email: UserService.email};
//         const token = UserService.generateToken(tokenData, "secretKey", '1h');
//         res.status(200).json({
//             status: true,
//             token: token