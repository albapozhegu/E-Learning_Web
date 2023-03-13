const BookModel = require('../../models/Extras/booksModel')
exports.addBooks =async (req, res) => {
    try {
        const { title, authour ,thumbnail} = req.body;
        const bookInfo = {
            title,
            authour,
            thumbnail
        }
        const newBook = await BookModel.create(bookInfo)
        if (newBook) {
            return res.status(200).json({ message: 'Blog created successfully' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getBooks =async (req, res) => {
    try {
        let books = await BookModel.find({})
        if (books) {
            return res.status(200).json({ books })
        }
        return null
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateBooks =async (req, res) => {
    const id = req.params.id;
    const { title, authour,thumbnail } = req.body;
    try {
        const update = await BookModel.findByIdAndUpdate(id, { title, authour,thumbnail })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteBooks =async (req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await BookModel.findByIdAndDelete({ _id: req.params.id });
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
