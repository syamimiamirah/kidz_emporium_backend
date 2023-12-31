const therapistServices = require("../services/therapist.services");

exports.createTherapist = async (req, res, next)=> {
    try{
        const {userId, therapistName, hiringDate, specialization, aboutMe} = req.body;
        let therapist = await therapistServices.createTherapist(userId, therapistName, hiringDate, specialization, aboutMe);
        res.json({status: true, success: therapist});

    }catch(error){
        next(error);
    }
}

exports.getTherapist = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        let therapist = await therapistServices.getTherapist(userId);
        res.json({ status: true, success: therapist });
    } catch (error) {
        next(error);
    }

}

exports.updateTherapist = async (req, res, next) => {
    try {
        const therapistId = req.params.id;
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
        const { id } = req.params; // Use req.params to get the ID from the URL
        let therapistDetails = await therapistServices.getTherapistDetails(id);
        
        if (!therapistDetails) {
            return res.status(404).json({ status: false, error: 'Therapist not found' });
        }

        res.json({ status: true, success: therapistDetails });
    } catch (error) {
        console.error('Error fetching therapist details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching therapist details' });
    }
}
