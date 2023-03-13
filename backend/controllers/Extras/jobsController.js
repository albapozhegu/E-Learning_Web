const JobModel = require('../../models/Extras/jobModel')
exports.addJob=async(req,res)=>{
    try {
        const { title, description,status,createdBy } = req.body;
        const jobInfo = {
            title,
            description,
            status,createdBy

        }
        const newJob = await JobModel.create(jobInfo)
        if (newJob) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getJob=async(req,res)=>{
    try {
        let jobs = await JobModel.find({})
        if (jobs) {
            return res.status(200).json({ jobs })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.getJobById=async(req,res)=>{
    try {
        let jobs = await JobModel.find({_id:id})
        if (jobs) {
            return res.status(200).json({ jobs })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateJob=async(req,res)=>{
    const id = { _id: req.params.id };
    const { title, description,status } = req.body;
    try {
        const update = await JobModel.findByIdAndUpdate(id, { title, description,status })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteJob=async(req,res)=>{
    try {
        const id ={_id: req.params.id};
        const isDelete = await JobModel.findByIdAndDelete(id);
        if (isDelete) {
            return res.status(200).json({ message: "Deleted successfully." });
        }
    } catch (error) {
        console.error("DELETE ERROR: ", error);
        return res
            .status(503)
            .json({ message: "Eror, can not delete this question" });
    }
}
