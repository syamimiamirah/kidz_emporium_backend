const reportServices = require("../services/report.services");
const path = require('path');
const fs = require('fs');
const Report = require('../models/report.model');
const axios = require('axios');
const NotificationService = require('../services/notification.services');

exports.createReport= async (req, res, next)=>{
    try{
        const {userId, reportTitle, reportDescription, bookingId, childId, filePath} = req.body;
        let report = await reportServices.createReport(userId, reportTitle, reportDescription, bookingId, childId, filePath);
        const message = {
            title: "Your report is ready",
            body: "Your therapist has uploaded your report"
        };
        await NotificationService.sendNotificationReport(bookingId, message);
        res.json({status: true, success: report});
    }catch(error){
        next(error);
    }
}
exports.getReport = async (req, res, next) => {
    try{
        const userId = req.query.userId;
        let report = await reportServices.getReport(userId);
        res.json({ status: true, success: report});
    }catch(error){
        next(error);
    }
}

exports.getReportDetailsByBookingId = async (req, res, next) => {
    try{
        const { bookingId } = req.params;
        let reportDetails = await reportServices.getReportDetailsByBookingId(bookingId);

        if(!reportDetails){
            return res.status(404).json({status: false, error: "Report not found!"});
        }
        const formattedReportDetails = reportDetails.map(report => ({
            _id: report._id, // Include _id field
            userId: report.userId,
            reportTitle: report.reportTitle,
            reportDescription: report.reportDescription,
            bookingId: report.bookingId,
            childId: report.childId,
            filePath: report.filePath
        }));

        res.json({ status: true, success: formattedReportDetails });
    }catch(error){
        console.error('Error fetching report details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching report details' });
    }
}

exports.getReportDetails= async (req, res, next) => {
    try{
        const { id } = req.params;
        let reportDetails = await reportServices.getReportDetails(id);

        if(!reportDetails){
            return res.status(404).json({status: false, error: "Report not found!"});
        }
        res.json({status: true, success: reportDetails});
    }catch(error){
        console.error('Error fetching report details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching report details' });
    }
}

exports.deleteReport = async (req, res, next) => {
    try{
        const { id } = req.body;
        let deletedReport = await reportServices.deleteReport(id);

        if (!deletedReport) {
            return res.status(404).json({ status: false, error: 'Report not found' });
        }
        return res.json({status: true, success: "Report deleted successfully"});
    } catch(error){
        console.error('Error deleting report:', error);
        return res.status(500).json({ status: false, error: 'Error deleting report' });
    }
}

exports.updateReport = async (req, res, next) => {
    try {
        const reportId = req.params.id;
        const updatedData = req.body.updatedData;
        const updatedReport = await reportServices.updateReport(reportId, updatedData);
        res.json({ status: true, success: updatedReport });
    } catch (error) {
      console.error('Error updating report:', error);
      return res.status(500).json({ status: false, error: 'Error updating report' });
    }
}

exports.getAllReports = async (req, res, next) => {
    try {
        const allReports = await reportServices.getAllReports();
        res.json({ status: true, success: allReports });
    } catch (error) {
        console.error('Error fetching all reports:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all reports' });
    }
};

exports.checkReport = async (req, res, next) => {
    try{
        const{ bookingId} = req.params;
        console.log(bookingId);
        const isExist = await reportServices.isReportExist(bookingId);
        res.json({ success: true, isReportExist: isExist});
    }catch(error){
        console.error('Error check existance of report:', error);
        res.status(500).json({ success: false, error:'Error check existance of report'});
    }
}
exports.downloadPdf = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        await reportServices.downloadPdf(id, res); // Call the service function with the ID and response object
    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};