const childServices = require("../services/child.services");

exports.createChild = async (req, res, next)=>{
    try{
        const {userId, childName, birthDate, gender, program} = req.body;
        let child = await childServices.createChild(userId, childName, birthDate, gender, program);
        res.json({status: true, success: child});

    }catch(error){
        next(error);
    }
}
exports.getChild = async (req, res, next) => {
    try{
        const userId = req.query.userId;
        let child = await childServices.getChild(userId);
        res.json({ status: true, success: child});
    }catch(error){
        next(error);
    }
}

exports.getChildDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        let childDetails = await childServices.getChildDetails(id);

        if(!childDetails){
            return res.status(404).json({status: false, error: "Child not found!"});
        }
        res.json({status: true, success: childDetails});
    }catch(error){
        console.error('Error fetching child details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching child details' });
    }
}

exports.deleteChild = async (req, res, next) => {
    try{
        const { id } = req.body;
        let deletedChild = await childServices.deleteChild(id);

        if (!deletedChild) {
            return res.status(404).json({ status: false, error: 'Child not found' });
        }
        return res.json({status: true, success: "Child profile deleted successfully"});
    } catch(error){
        console.error('Error deleting child:', error);
        return res.status(500).json({ status: false, error: 'Error deleting child' });
    }
}

exports.updateChild = async (req, res, next) => {
    try {
        const childId = req.params.id;
        const updatedData = req.body.updatedData;
        const updatedChild = await childServices.updateChild(childId, updatedData);
        res.json({ status: true, success: updatedChild });
    } catch (error) {
      console.error('Error updating child:', error);
      return res.status(500).json({ status: false, error: 'Error updating child' });
    }
}

exports.getAllChildren = async (req, res, next) => {
    try {
        const allChildren = await childServices.getAllChildren();
        res.json({ status: true, success: allChildren });
    } catch (error) {
        console.error('Error fetching all children:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all children' });
    }
};