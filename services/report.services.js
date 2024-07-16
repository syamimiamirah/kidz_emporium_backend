const reportModel = require('../models/report.model');
const mongoose = require("mongoose");
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'kidz-emporium-7ae9f.appspot.com';

class reportServices{
    static async createReport(userId, reportTitle, reportDescription, bookingId, childId, filePath){
        const createReport = new reportModel({userId, reportTitle, reportDescription, bookingId, childId, filePath});
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
          {$set: { reportTitle: updatedData.reportTitle, reportDescription: updatedData.reportDescription, childId: updatedData.childId, filePath: updatedData.filePath}},
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

  static async downloadPdf(id, res) {
    try {
        // Find the report by ID in the database
        const report = await reportModel.findById({_id: id});

        // Check if the report exists
        if (!report) {
            return res.status(404).json({ success: false, error: "Report not found" });
        }

        // Check if the file path exists
        if (!report.filePath) {
            return res.status(404).json({ success: false, error: "File path not found in the report" });
        }

        // Extract the file name from the file path (URL)
        const fileName = report.filePath.split('/').pop().split('?')[0];

        // Download the file from Firebase Storage
        const bucketName = 'kidz-emporium-7ae9f.appspot.com';
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(`reports/${fileName}`);

        // Pipe the file to the response
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/pdf');

        file.createReadStream()
            .on('error', (err) => {
                console.error('Error downloading file:', err);
                res.status(500).json({ success: false, error: 'Error downloading file' });
            })
            .pipe(res);

    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}
}

module.exports = reportServices;
