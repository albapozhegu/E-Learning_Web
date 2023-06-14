const PodcastModel = require('../../models/Extras/podcastModel.js')
exports.addPodcast = async(req, res) => {
    try {
        const { title, file, duration, authour } = req.body;
        const podcastInfo = {
            title,
            file,
            duration,
            authour

        }
        const newPodcast = await PodcastModel.create(podcastInfo)
        if (newPodcast) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getPodcast =async (req, res) => {
    try {
        let podcasts = await PodcastModel.find({})
        if (podcasts) {
            return res.status(200).json({ podcasts })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updatePodcast = async(req, res) => {
    const id = { _id: req.params.id };
    const { title, file, duration, authour } = req.body;
    try {
        const update = await PodcastModel.findByIdAndUpdate(id, { title, file, duration, authour })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deletePodcast =async (req, res) => {
    try {
        const id = { _id: req.params.id };
        const isDelete = await PodcastModel.findByIdAndDelete(id);
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
