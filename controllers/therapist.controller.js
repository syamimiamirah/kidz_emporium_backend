const therapistServices = require("../services/therapist.services");
const { DateTime } = require('luxon');

exports.createTherapist = async (req, res, next)=> {
    try{
        const {managedBy, therapistId, hiringDate, specialization, aboutMe} = req.body;
        let therapist = await therapistServices.createTherapist(therapistId, hiringDate, specialization, aboutMe, managedBy);
        res.json({status: true, success: therapist});

    }catch(error){
        next(error);
    }
}

exports.getTherapist = async (req, res, next) => {
    try {
        const therapistId = req.query.therapistId;
        let therapist = await therapistServices.getTherapist(therapistId);
        res.json({ status: true, success: therapist });
    } catch (error) {
        next(error);
    }

}

exports.updateTherapist = async (req, res, next) => {
    try {
        const{ therapistId} = req.params;
        const updatedData = req.body.updatedData;
        const updatedTherapist = await therapistServices.updateTherapist(therapistId, updatedData);
  
      res.json({ status: true, success: updatedTherapist });
    } catch (error) {
      console.error('Error updating therapist:', error);
      return res.status(500).json({ status: false, error: 'Error updating therapist' });
    }
}


exports.deleteTherapist = async (req, res, next) => {
    try {
        const {id} = req.body;
        let deletedTherapist = await therapistServices.deleteTherapist(id);

        if (!deletedTherapist) {
            return res.status(404).json({ status: false, error: 'Therapist not found' });
        }

        return res.json({ status: true, success: 'Therapist deleted successfully' });
    } catch (error) {
        console.error('Error deleting therapist:', error);
        return res.status(500).json({ status: false, error: 'Error deleting therapist' });
    }
}

exports.getTherapistDetails = async (req, res, next) => {
    try {
        const { therapistId } = req.params; 
        console.log('Therapist ID:', therapistId);// Use req.params to get the ID from the URL
        let therapistDetails = await therapistServices.getTherapistDetails(therapistId);
        
        if (!therapistDetails) {
            return res.status(404).json({ status: false, error: 'Therapist not found' });
        }

        res.json({ status: true, success: therapistDetails });
    } catch (error) {
        console.error('Error fetching therapist details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching therapist details' });
    }
}

exports.getAllTherapists = async (req, res, next) => {
    try {
        const allTherapists = await therapistServices.getAllTherapists();
        res.json({ status: true, success: allTherapists });
    } catch (error) {
        console.error('Error fetching all therapists:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all therapists' });
    }
};

exports.checkTherapistAvailability = async (req, res, next) => {
    try {
      const{ therapistId }= req.params;
      const { fromDate, toDate } = req.query;
      console.log(fromDate);
      // Parse fromDate and toDate to JavaScript Date objects
      const fromDateObj = DateTime.fromISO(fromDate, { zone: 'utc' });
      const toDateObj = DateTime.fromISO(toDate, { zone: 'utc' });
        console.log('fromDateObj:', fromDateObj);
      // Check therapist availability
      const isAvailable = await therapistServices.checkTherapistAvailability(therapistId, fromDateObj, toDateObj);
      res.json({ success: true, isTherapistAvailable: isAvailable });
    } catch (error) {
      console.error('Error checking therapist availability:', error);
      res.status(500).json({ success: false, error: 'Error checking therapist availability' });
    }
}; //for checking therapist availability based on therapistId

exports.getAvailableTherapists = async (req, res, next) => {
    try {
      const { fromDate, toDate } = req.query;
      // Parse fromDate and toDate to JavaScript Date objects
      const fromDateObj = DateTime.fromISO(fromDate, { zone: 'utc' });
      const toDateObj = DateTime.fromISO(toDate, { zone: 'utc' });
      console.log('fromDateObj:', fromDateObj);
      // Call a function to get the list of available therapists on the selected date
      const availableTherapists = await therapistServices.getAvailableTherapists(fromDateObj, toDateObj);
  
      res.json({ success: true, availableTherapists });
    } catch (error) {
      console.error('Error checking therapist availability:', error);
      res.status(500).json({ success: false, error: 'Error checking therapist availability' });
    }
  };
  