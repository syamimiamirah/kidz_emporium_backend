const user  = require('../models/user.model');
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");


async function login({email, password}, callback){
    const UserModel = await user.findOne({email});

    if(UserModel != null){
        if(bcrypt.compareSync(password, UserModel.password)){
            const token = auth.generateAccessToken(UserModel.toJSON());
            return callback(null, {_id: UserModel._id, ...UserModel.toJSON(), token});
        }else{
            return callback({
                message: "Invalid Email/Password"
            });
        }
    }
    else{
        return callback({
            message: "Invalid Email/Password"
        });
    }
}

async function register(params, callback){
    if(params.email === undefined){
        return callback({
            message: "Email Required"
        });
    }
    let isUserExist = await user.findOne({email: params.email});

    if(isUserExist){
        return callback({
            message: "Email already registered"
        });
    }
    const salt = bcrypt.genSaltSync(10);
    params.password = bcrypt.hashSync(params.password, salt);

    const userSchema = new user(params);
    userSchema.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}
async function getAllUsers() {
    try {
        const allUsers = await user.find();
        return allUsers;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

module.exports = {
    login, 
    register, getAllUsers
}

// class UserService{
//     static async registerUser(name, email, phone, role, password){
//         try{
//             const createUser = new UserModel({name,
//             email,
//             phone,
//             role,
//             password,
//         });
//             const savedUser = await createUser.save();
//             return savedUser;

//         }catch(error){
//             throw error;
//         }
//     };
// }

//module.exports = UserService;