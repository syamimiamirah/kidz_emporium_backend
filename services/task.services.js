const taskModel = require('../models/task.model');
const therapistModel = require('../models/therapist.model');
const { DateTime } = require('luxon');
const mongoose = require("mongoose");

class taskServices{
    static async createTask(userId, taskTitle, taskDescription, fromDate, toDate, therapistId){
        const createTask = new taskModel({userId, taskTitle, taskDescription, fromDate, toDate, therapistId});
        return await createTask.save();
    }

    static async getTask(userId){
        const getTask = await taskModel.find({userId});
        return getTask;
    }
    
    static async deleteTask(id) {
        const deletedTask = await taskModel.findOneAndDelete({_id:id});
    
        if (!deletedTask) {
            throw new Error('Task not found');
        }
    
        return deletedTask;
    }

    static async updateTask(id, updatedData) {
      try {
        // Check if the reminder exists
        const updatedTask = await taskModel.findOneAndUpdate(
          {_id:id},
          {$set: { taskTitle: updatedData.taskTitle, fromDate: updatedData.fromDate, toDate: updatedData.toDate, taskDescription: updatedData.taskTitle, therapistId: updatedData.therapistId}},
          { new: true } // Return the updated document
        );
    
        return updatedTask;
      } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        throw error;
      }
    }
    
    static async getTaskDetails(id) {
      try {
          const taskDetails = await taskModel.findById({_id: id});
          return taskDetails;
      } catch (error) {
          console.error('Error fetching task details:', error);
          throw error;
      }
    }

    static async getAllTasks() {
      try {
          const allTasks = await taskModel.find();
          return allTasks;
      } catch (error) {
          console.error('Error fetching all tasks:', error);
          throw error;
      }
  }
    
}

module.exports = taskServices;
