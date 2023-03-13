const ForumModel = require('../../models/Extras/ForumModel')
exports.addForum = async(req, res) => {
    try {
        const { title, content } = req.body;
        const forumInfo = {
            title,
            content

        }
        const newForum = await ForumModel.create(forumInfo)
        if (newForum) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getForum =async (req, res) => {
    try {
        let forums = await ForumModel.find({})
        if (forums) {
            return res.status(200).json({ forums })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateForum = async(req, res) => {
    const id = { _id: req.params.id };
    const { title, content } = req.body;
    try {
        const update = await ForumModel.findByIdAndUpdate(id, { title, content })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteForum = async(req, res) => {
    try {
        const id ={_id: req.params.id};
        const isDelete = await ForumModel.findByIdAndDelete(id);
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
