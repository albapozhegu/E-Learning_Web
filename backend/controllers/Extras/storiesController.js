const StoriesModel = require('../../models/Extras/storiesModel')
exports.addStories = async (req, res) => {
    try {
        const { title,content, status } = req.body;
        const storiesInfo = {
           title, content, status
        }
        const newStories = await StoriesModel.create(storiesInfo)
        if (newStories) {
            return res.status(200).json({ newStories })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.getStories = async (req, res) => {
    try {
        let storiess = await StoriesModel.find({})
        if (storiess) {
            return res.status(200).json({ data: storiess })
        }
        return null
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateStories = async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    try {
        const update = await StoriesModel.findByIdAndUpdate(id, { title,content: content })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteStories = async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await StoriesModel.findByIdAndDelete({ _id: req.params.id });
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
