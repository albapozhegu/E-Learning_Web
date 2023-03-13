const AnnouncementModel = require('../../models/Extras/announcementModel')
exports.addAnnouncement = async (req, res) => {
    try {
        const { title,content, status } = req.body;
        const announcementInfo = {
           title, content, status
        }
        const newAnnouncement = await AnnouncementModel.create(announcementInfo)
        if (newAnnouncement) {
            return res.status(200).json({ newAnnouncement })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.getAnnouncement = async (req, res) => {
    try {
        let announcements = await AnnouncementModel.find({})
        if (announcements) {
            return res.status(200).json({ data: announcements })
        }
        return null
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateAnnouncement = async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    try {
        const update = await AnnouncementModel.findByIdAndUpdate(id, { title,content: content })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteAnnouncement = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await AnnouncementModel.findByIdAndDelete({ _id: req.params.id });
        if (isDelete) {
            return res.status(200).json({ message: "Delete successfully." });
        }
    } catch (error) {
        console.error("DELETE ERROR: ", error);
        return res
            .status(503)
            .json({ message: "Eror, can not delete this question" });
    }
}
