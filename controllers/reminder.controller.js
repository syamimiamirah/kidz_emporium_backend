const reminderServices = require("../services/reminder.services");

exports.createReminder = async (req, res, next)=>{
    // reminderServices.createReminder(req.body, (error, results)=>{
    //     if(error){
    //         return next(error);
    //     }
    //     return res.status(200).send({
    //         status: true,
    //         message: "Success",
    //         data: results
    //     });
    // });


    try{
        const {userId, eventName, details, fromDate, toDate} = req.body;
        let reminder = await reminderServices.createReminder(userId, eventName, details, fromDate, toDate);
        res.json({status: true, success: reminder});

    }catch(error){
        next(error);
    }
}