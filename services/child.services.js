const childModel = require('../models/child.model');
const mongoose = require("mongoose");

class childServices{
    static async createChild(userId, childName, birthDate, gender, program){
        const createChild = new childModel({userId, childName, birthDate, gender, program});
        return await createChild.save();
    }

    static async getChild(userId, childName, birthDate, gender, program){
        const getChild = await childModel.find({userId});
        return getChild;
    }

    static async getChildDetails(id){
        try{
            const childDetails = await childModel.findById({_id: id});
            return childDetails;
        }catch(error){
            console.error('Error fetching child details:', error);
            throw error;
        }
    }

    static async deleteChild(id){
        const deletedChild = await childModel.findOneAndDelete({_id:id});

        if(!deletedChild){
            throw new Error("Child not found");
        }
        return deletedChild;
    }

    static async updateChild(id, updatedData) {
        try {
          // Check if the reminder exists
          const updatedChild = await childModel.findOneAndUpdate(
            {_id:id},
            {$set: { childName: updatedData.childName, birthDate: updatedData.birthDate, gender: updatedData.gender, program: updatedData.program}},
            { new: true } // Return the updated document
          );
      
          return updatedChild;
        } catch (error) {
          console.error(`Error updating child: ${error.message}`);
          throw error;
        }
      }
}
module.exports = childServices;