const reportModel = require('../models/report.model');
const mongoose = require("mongoose");

class reportServices{
    static async createReport(userId, reportTitle, reportDescription, bookingId, childId){
        const createReport = new reportModel({userId, reportTitle, reportDescription, bookingId, childId});
        return await createReport.save();
    }

    static async getReport(userId){
        const getReport = await reportModel.find({userId});
        return getReport;
    }
    
    static async deleteReport(id) {
        const deletedReport = await reportModel.findOneAndDelete({_id:id});
    
        if (!deletedReport) {
            throw new Error('Report not found');
        }
    
        return deletedReport;
    }

    static async updateReport(id, updatedData) {
      try {
        // Check if the reminder exists
        const updatedReport = await reportModel.findOneAndUpdate(
          {_id:id},
          {$set: { reportTitle: updatedData.reportTitle, reportDescription: updatedData.reportDescription}},
          { new: true } // Return the updated document
        );
    
        return updatedReport;
      } catch (error) {
        console.error(`Error updating report: ${error.message}`);
        throw error;
      }
    }
    
    static async getReportDetailsByBookingId(bookingId) {
      try {
          const reportDetails = await reportModel.find({bookingId: bookingId});
          return reportDetails;
      } catch (error) {
          console.error('Error fetching report details:', error);
          throw error;
      }
    }
    
    static async getReportDetails(id) {
      try {
          const reportDetails = await reportModel.findById({_id: id});
          return reportDetails;
      } catch (error) {
          console.error('Error fetching report details:', error);
          throw error;
      }
    }
    
    static async getAllReports() {
      try {
          const allReports = await reportModel.find();
          return allReports;
      } catch (error) {
          console.error('Error fetching all reports:', error);
          throw error;
      }
  }
  
  static async isReportExist(bookingId){
    try{
      const existingReport = await reportModel.find({
        bookingId: bookingId
      }).exec();
      
      console.log(existingReport.length);
      return existingReport.length === 1;
    }catch(error){
      console.error('Error services checking existing report', error);
      throw new Error('Error checking existing report');
    }
  }
}

module.exports = reportServices;
