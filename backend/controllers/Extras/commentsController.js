const CommentModel = require('../../models/Extras/commentModel')

exports.addComment = async(req, res) => {
    try {
        const { forumId, content, status } = req.body;
        const createdBy ={}
        const commentInfo = {
            createdBy, forumId, content, status
        }
        const newComment = await CommentModel.create(commentInfo)
        if (newComment) {
            return res.status(200).json({ message: 'Blog created successfully' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getComment = async(req, res) => {
    try {
        let comments = await CommentModel.find({})
        if (comments) {
            return res.status(200).json({ comments })
        }
       
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.getCommentByForumId = async(req, res) => {

}
exports.updateComment =async (req, res) => {
    const id = req.params.id;
    const createdBy ={}
    const { content, status } = req.body;
    //match if comment was done by current user
    try {
        const update = await CommentModel.findByIdAndUpdate(id, { content, status  })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteComment = async(req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await CommentModel.findByIdAndDelete({ _id: id });
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
