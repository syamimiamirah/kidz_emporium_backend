const taskServices = require("../services/task.services");

exports.createTask= async (req, res, next)=>{
    try {
        const { userId, taskTitle, taskDescription, fromDate, toDate, therapistId } = req.body;
        let task = await taskServices.createTask(userId, taskTitle, taskDescription, fromDate, toDate, therapistId);
        res.json({ status: true, success: task });

    } catch (error) {
        next(error);
    }
}
exports.getTask = async (req, res, next) => {
    try{
        const userId = req.query.userId;
        let task = await taskServices.getTask(userId);
        res.json({ status: true, success: task});
    }catch(error){
        next(error);
    }
}

exports.getTaskDetails = async (req, res, next) => {
    try{
        const { id } = req.params;
        let taskDetails = await taskServices.getTaskDetails(id);

        if(!taskDetails){
            return res.status(404).json({status: false, error: "Task not found!"});
        }
        res.json({status: true, success: taskDetails});
    }catch(error){
        console.error('Error fetching task details:', error);
        return res.status(500).json({ status: false, error: 'Error fetching task details' });
    }
}

exports.deleteTask = async (req, res, next) => {
    try{
        const { id } = req.body;
        let deletedTask = await taskServices.deleteTask(id);

        if (!deletedTask) {
            return res.status(404).json({ status: false, error: 'Task not found!' });
        }
        return res.json({status: true, success: "Task deleted successfully"});
    } catch(error){
        console.error('Error deleting task:', error);
        return res.status(500).json({ status: false, error: 'Error deleting task' });
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const updatedData = req.body.updatedData;
        const updatedTask = await taskServices.updateTask(taskId, updatedData);
        res.json({ status: true, success: updatedTask });
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ status: false, error: 'Error updating task' });
    }
}

exports.getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await taskServices.getAllTasks();
        res.json({ status: true, success: allTasks });
    } catch (error) {
        console.error('Error fetching all tasks:', error);
        return res.status(500).json({ status: false, error: 'Error fetching all tasks' });
    }
};