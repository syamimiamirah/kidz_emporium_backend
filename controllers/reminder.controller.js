const reminderServices = require("../services/reminder.services");

exports.createReminder = async (req, res, next)=>{
    try{
        const {userId, eventName, details, fromDate, toDate} = req.body;
        let reminder = await reminderServices.createReminder(userId, eventName, details, fromDate, toDate);
        res.json({status: true, success: reminder});

    }catch(error){
        next(error);
    }
}

exports.getReminder = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        let reminder = await reminderServices.getReminder(userId);
        res.json({ status: true, success: reminder });
    } catch (error) {
        next(error);
    }

}

exports.getReminderDetails = async (req, res, next) => {
    try {
        const { id } = req.params; // Use req.params to get the ID from the URL
        let reminderDetails = await reminderServices.getReminderDetails(id);
        
        if (!reminderDetails) {
            return res.status(404).json({ status: false, error: 'Reminder not found' });
        }

        res.json({ status: true, success: reminderDetails });
    } catch (error) {
        console.error('Error fetching reminder details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching reminder details' });
    }
}


exports.deleteReminder = async (req, res, next) => {
    try {
        const {id} = req.body;
        let deletedReminder = await reminderServices.deleteReminder(id);

        if (!deletedReminder) {
            return res.status(404).json({ status: false, error: 'Reminder not found' });
        }

        return res.json({ status: true, success: 'Reminder deleted successfully' });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        return res.status(500).json({ status: false, error: 'Error deleting reminder' });
    }
}

exports.updateReminder = async (req, res, next) => {
    try {
        const reminderId = req.params.id;
        const updatedData = req.body.updatedData;
      const updatedReminder = await reminderServices.updateReminder(reminderId, updatedData);
  
      res.json({ status: true, success: updatedReminder });
    } catch (error) {
      console.error('Error updating reminder:', error);
      return res.status(500).json({ status: false, error: 'Error updating reminder' });
    }
}
