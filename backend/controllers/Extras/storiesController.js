const StoriesModel = require('../../models/Extras/storiesModel')
exports.addStories = async(req, res) => {
    try {
        const { createdBy, content } = req.body;
        const forumInfo = {
            createdBy,
            content

        }
        const newStories = await StoriesModel.create(forumInfo)
        if (newStories) {
            return res.status(200).json({ message: 'Success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getStories = async(req, res) => {
    try {
        let stories = await StoriesModel.find({})
        if (stories) {
            return res.status(200).json({ stories })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateStories = async(req, res) => {
    const id = { _id: req.params.id };
    const { createdBy, content } = req.body;
    try {
        const update = await StoriesModel.findByIdAndUpdate(id, { createdBy, content })
        if (update) {
            return res.status(200).json({ message: 'Success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteStories = async(req, res) => {
    try {
        const id = { _id: req.params.id };
        const isDelete = await StoriesModel.findByIdAndDelete(id);
        if (isDelete) {
            return res.status(200).json({ message: "Deleted successfully." });
        }
    } catch (error) {
        console.error("DELETE ERROR: ", error);
        return res
            .status(503)
            .json({ message: "Error, can not delete this question" });
    }
}
