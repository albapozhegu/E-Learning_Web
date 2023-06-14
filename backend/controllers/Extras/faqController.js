const FAQModel = require('../../models/Extras/faqModel');
exports.addFAQ=async(req,res)=>{
    try {
        const { question,answer } = req.body;
        const faqInfo = {
           question,answer
        }
        const newFaq = await FAQModel.create(faqInfo)
        if (newFaq) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create faq' })

    }
}
exports.getFAQ=async(req,res)=>{
    try {
        let faqs = await FAQModel.find({})
        if (faqs) {
            return res.status(200).json({ faqs })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateFAQ=async(req,res)=>{
    const id = req.params.id;
    const { question,answer } = req.body;
    try {
        const update = await FAQModel.findByIdAndUpdate(id, {question,answer})
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteFAQ=async(req,res)=>{
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
            .json({ message: "Eror, could not delete" });
    }
}
