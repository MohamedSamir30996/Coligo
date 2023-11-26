const Announcement = require("../models/announcementModel");

exports.createAnnouncement = async (req, res, next) => {
    try {
        const {announcementTitle , announcementBody} = req.body;
        const announcement = await Announcement.create({announcementTitle,announcementBody});
        res.status(201).json({
            message: "created",
            data: {
                announcement,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "failed",
            err,
        });
    }
};

exports.getAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.find()
        res.status(200).json({
            message: "success",
            data: {
                data: announcements,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.getAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) next(err);

        res.status(200).json({
            message: "success",
            data: {
                announcement,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};
exports.updateAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            message: "success",
            data: {
                announcement,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.deleteAnnouncement = async (req, res, next) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "success",
            data: {
                announcement,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};
