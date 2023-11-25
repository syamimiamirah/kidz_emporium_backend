const UserService = require('../services/user.services');

exports.register = (req, res, next)=>{
    UserService.register(req.body, (error, results) => {
        if (error){
            return next(error);
        }
            return res.status(200).send({
                status:true,
                message: "Success",
                data: results
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

exports.login = (req, res, next) => {
    const {email, password} = req.body;
    UserService.login({email, password}, (error, results)=>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        });
    });
};