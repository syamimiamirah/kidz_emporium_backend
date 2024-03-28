const livestreamServices = require("../services/livestream.services");

exports.createLivestream = async (req, res, next)=>{
    try {
        const { userId, url, bookingId } = req.body;
        let livestream = await livestreamServices.createLivestream(userId, url, bookingId);
        res.json({ status: true, success: livestream });

    } catch(error){
        next(error);
    }
}
exports.getLivestream = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        let livestream = await livestreamServices.getLivestream(userId);
        res.json({ status: true, success: livestream });
    }catch(error){
        next(error);
    }
}

exports.getLivestreamDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        let livestreamDetails = await livestreamServices.getLivestreamDetails(id);
        
        if(!livestreamDetails){
            return res.statuc(404).json({ status: false, error: "Livestream session not found!"});
        }
        res.json({ statuc: true, success: livestreamDetails});
    }catch(error){
        console.error("Error fetching livestream session details: ", error);
        return res.status(500).json({ status: false, error: "Error fetching livestream session details"})
    }
}
exports.deleteLivestream = async (req, res, next) => {
    try{
        const { id } = req.body;
        let deletedLivestream = await livestreamServices.deleteLivestream(id);

        if(!deletedLivestream) {
            return res.status(404).json({ status: false, error: "Livestream session not found!"});
        }
        return res.json({status: true, success: "Livestream session successfully deleted"});
    }
    catch(error){
        console.error("Error deleting livestream session: ", error);
        return res.status(500).json({ status: false, error: "Error deleting livestream session"});
    }
}
exports.updateLivestream = async (req, res, next) => {
    try{
        const livestreamId = req.params.id;
        const updatedData = req.body.updatedData;
        const updatedLivestream = await livestreamServices.updateLivestream(livestreamId, updatedData);
        res.json({ status: true, success: updatedLivestream});
    }catch (error){
        console.error("Error updating livestream session: ", error);
        return res.status(500).json({ status: false, error: "Error updating livestream session"});
    }
}

exports.getAllLivestreams = async(req, res, next) => {
    try{
        const allLivestreams = await livestreamServices.getAllLivestreams();
        res.json({ status: true, success: allLivestreams});
    }catch(error){
        console.error("Error fetching all livestream sessions", error);
        return res.status(500).json({ status: false, error: "Error fetching all livestream sessions"});
    }
}