const EventsModel = require('../../models/Extras/eventModel');
exports.addEvent = async(req, res) => {
    try {
        const { date, duration, title, host, status } = req.body;
        const eventInfo = {
            date, duration, title, host, status
        }
        const newEvent = await EventsModel.create(eventInfo)
        if (newEvent) {
            return res.status(200).json({ message: 'Blog created successfully' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Could not create blog' })

    }
}
exports.getAllEvents =async (req, res) => {
    try {
        let events = await EventsModel.find({})
        if (events) {
            return res.status(200).json({ events })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.getEventById =async (req, res) => {
    const id = req.params.id;
    try {
        let event = await EventsModel.find({_id:id})
        if (event) {
            return res.status(200).json({ event })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })
    }
}
exports.updateEvent = async(req, res) => {
    const _id = req.params.id;
    const { date, duration, title, host, status } = req.body;
    try {
        const update = await EventsModel.findByIdAndUpdate(_id, { date, duration, title, host, status })
        if (update) {
            return res.status(200).json({ message: 'success' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Operation failed' })

    }
}
exports.deleteEvent = async(req, res) => {
    try {
        const id = req.params.id;
        const isDelete = await EventsModel.findByIdAndDelete({ _id: req.params.id });
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
