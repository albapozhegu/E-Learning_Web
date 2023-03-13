const BlogModel = require('../../models/Extras/blogModel')
exports.addBlog =async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const blogInfo = {
            title,
            content,
            status
        }
        const newBlog = await BlogModel.create(blogInfo)
        if (newBlog) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getAllBlog =async (req, res) => {
    try {
        let blogs = await BlogModel.find({})
        if (blogs) {
            return res.status(200).json({ blogs })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.getBlogById = async(req, res) => {
    try {
        let findBlog = await BlogModel.find({ _id: req.params.id })
        if (findBlog) {
            return res.status(200).json({ blog: findBlog })
        }
        return null
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateBlog = async(req, res) => {
    const id = req.params.id;
    const { title,subTitle, content, status } = req.body;
    try {
        const update = await BlogModel.findByIdAndUpdate(id, { title, content,subTitle, status })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteBlog = async(req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await BlogModel.findByIdAndDelete({ _id: req.params.id });
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
